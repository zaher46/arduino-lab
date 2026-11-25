import { learningApi } from "./legacy-api.mjs";
// The local SQLite service and the hosted D1 service use these same parameterized queries.
export const columns = {
  Classroom: ["id", "name", "color", "notes", "createdAt", "updatedAt"],
  Student: [
    "id",
    "name",
    "age",
    "grade",
    "phone",
    "parentName",
    "parentPhone",
    "notes",
    "points",
    "badges",
    "classroomId",
    "createdAt",
    "updatedAt",
  ],
  Attendance: [
    "id",
    "studentId",
    "sessionId",
    "course",
    "status",
    "date",
    "notes",
    "classroomId",
  ],
  Progress: [
    "id",
    "studentId",
    "sessionId",
    "course",
    "completed",
    "score",
    "notes",
    "classroomId",
  ],
  Homework: [
    "id",
    "title",
    "description",
    "courseId",
    "sessionId",
    "dueDate",
    "createdAt",
  ],
  HomeworkSubmission: [
    "id",
    "homeworkId",
    "studentId",
    "status",
    "content",
    "grade",
    "feedback",
    "submittedAt",
  ],
  ExamResult: [
    "id",
    "studentId",
    "course",
    "score",
    "totalQuestions",
    "answers",
    "date",
  ],
};
const tables = Object.keys(columns);
const fail = (status, message) => {
  throw Object.assign(new Error(message), { status });
};
function id(value) {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 1) fail(400, "Invalid identifier");
  return n;
}
function courseName(value = "arduino") {
  if (value !== "arduino" && value !== "python") fail(400, "Invalid course");
  return value;
}
function textValue(value, max = 5000) {
  if (value == null || value === "") return null;
  if (typeof value !== "string" || value.length > max)
    fail(400, "Invalid text");
  return value.trim() || null;
}
function requiredName(value) {
  return textValue(value, 150) || fail(400, "Name required");
}
function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
function groupBy(rows, key) {
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row[key])) groups.set(row[key], []);
    groups.get(row[key]).push(row);
  }
  return groups;
}
async function rosters(db) {
  const [rooms, people, marks, progress] = await db.batch([
    ["SELECT * FROM Classroom ORDER BY name COLLATE NOCASE, id"],
    ["SELECT * FROM Student ORDER BY name COLLATE NOCASE, id"],
    ["SELECT * FROM Attendance ORDER BY sessionId"],
    ["SELECT * FROM Progress ORDER BY sessionId"],
  ]);
  const attendanceByStudent = groupBy(marks, "studentId");
  const progressByStudent = groupBy(
    progress.map((row) => ({ ...row, completed: !!row.completed })),
    "studentId",
  );
  const students = people.map((s) => ({
    ...s,
    attendances: attendanceByStudent.get(s.id) || [],
    progresses: progressByStudent.get(s.id) || [],
  }));
  function scoped(student, room) {
    return {
      ...student,
      attendances: student.attendances.filter((r) => r.classroomId === room),
      progresses: student.progresses.filter((r) => r.classroomId === room),
    };
  }
  const classrooms = rooms.map((c) => {
    const current = [],
      former = [];
    for (const s of students) {
      const member = scoped(s, c.id);
      if (s.classroomId === c.id) current.push(member);
      else if (member.attendances.length || member.progresses.length)
        former.push(member);
    }
    return { ...c, students: current, former };
  });
  return {
    classrooms,
    unassigned: students
      .filter((s) => s.classroomId === null)
      .map((s) => scoped(s, null)),
  };
}
async function saveMark(db, table, body) {
  const course = courseName(body.course);
  const room = id(body.classroomId),
    student = id(body.studentId),
    session = id(body.sessionId);
  if (session > (course === "arduino" ? 15 : 10)) fail(400, "Unknown session");
  let fields, values;
  if (table === "Attendance") {
    if (!["present", "absent", "late", "excused"].includes(body.status))
      fail(400, "Invalid attendance");
    fields = ["status"];
    values = [body.status];
  } else {
    if (typeof body.completed !== "boolean") fail(400, "Completion required");
    fields = ["completed"];
    values = [body.completed ? 1 : 0];
    if (Object.hasOwn(body, "score")) {
      if (body.score !== null && !Number.isSafeInteger(body.score))
        fail(400, "Invalid score");
      fields.push("score");
      values.push(body.score);
    }
  }
  if (Object.hasOwn(body, "notes")) {
    fields.push("notes");
    values.push(textValue(body.notes));
  }
  const keys = ["classroomId", "studentId", "sessionId", "course", ...fields];
  const placeholders = keys.map(() => "?").join(",");
  const rows = await db.query(
    "INSERT INTO " +
      table +
      " (" +
      keys.join(",") +
      ") SELECT " +
      placeholders +
      " WHERE EXISTS (SELECT 1 FROM Student WHERE id=? AND classroomId=?) ON CONFLICT(classroomId,studentId,sessionId,course) DO UPDATE SET " +
      fields.map((f) => f + "=excluded." + f).join(",") +
      " RETURNING *",
    [room, student, session, course, ...values, student, room],
  );
  if (!rows.length)
    fail(409, "Student moved or no longer belongs to this class");
  return rows[0];
}
async function getMarks(db, table, params) {
  const clauses = [],
    args = [];
  for (const key of ["classroomId", "studentId", "sessionId", "course"]) {
    if (!params.has(key)) continue;
    clauses.push(key + "=?");
    args.push(
      key === "course" ? courseName(params.get(key)) : id(params.get(key)),
    );
  }
  return db.query(
    "SELECT * FROM " +
      table +
      (clauses.length ? " WHERE " + clauses.join(" AND ") : "") +
      " ORDER BY id",
    args,
  );
}
async function saveEntity(db, table, entityId, body) {
  const fields = {};
  if (!entityId || Object.hasOwn(body, "name"))
    fields.name = requiredName(body.name);
  if (table === "Classroom") {
    for (const f of ["color", "notes"])
      if (Object.hasOwn(body, f))
        fields[f] = textValue(body[f]) || (f === "color" ? "cyan" : null);
  } else {
    for (const f of ["grade", "phone", "parentName", "parentPhone", "notes"])
      if (Object.hasOwn(body, f)) fields[f] = textValue(body[f]);
    if (Object.hasOwn(body, "age")) {
      fields.age = body.age === null || body.age === "" ? null : id(body.age);
      if (fields.age > 120) fail(400, "Invalid age");
    }
    if (Object.hasOwn(body, "classroomId"))
      fields.classroomId =
        body.classroomId == null || body.classroomId === ""
          ? null
          : id(body.classroomId);
  }
  fields.updatedAt = Date.now();
  const keys = Object.keys(fields),
    values = Object.values(fields);
  let sql;
  if (entityId) {
    sql =
      "UPDATE " +
      table +
      " SET " +
      keys.map((k) => k + "=?").join(",") +
      " WHERE id=?";
    values.push(entityId);
    if (table === "Student" && Object.hasOwn(body, "expectedClassroomId")) {
      sql += " AND classroomId IS ?";
      values.push(
        body.expectedClassroomId == null ? null : id(body.expectedClassroomId),
      );
    }
  } else {
    sql =
      "INSERT INTO " +
      table +
      " (" +
      keys.join(",") +
      ") VALUES (" +
      keys.map(() => "?").join(",") +
      ")";
  }
  const rows = await db.query(sql + " RETURNING *", values);
  if (!rows.length) fail(409, "Record changed or missing");
  return rows[0];
}
export async function snapshot(db) {
  const result = await db.batch(
    tables.map((t) => [
      "SELECT " + columns[t].join(",") + " FROM " + t + " ORDER BY id",
    ]),
  );
  return {
    format: "arduino-lab-register",
    version: 3,
    tables: Object.fromEntries(tables.map((t, i) => [t, result[i]])),
  };
}
export async function restoreEmpty(db, backup) {
  if (
    backup?.format !== "arduino-lab-register" ||
    backup.version !== 3 ||
    !backup.tables ||
    !tables.every((t) => Array.isArray(backup.tables[t]))
  )
    fail(400, "Invalid register backup");
  const statements = [];
  for (const table of tables) {
    const fields = columns[table];
    for (const row of backup.tables[table]) {
      if (
        !row ||
        !fields.every((k) => Object.hasOwn(row, k)) ||
        !Number.isSafeInteger(row.id) ||
        row.id < 1
      )
        fail(400, "Invalid record");
      const values = fields.map((f) => row[f]);
      if (
        values.some(
          (v) => v !== null && !["string", "number"].includes(typeof v),
        )
      )
        fail(400, "Invalid value");
      statements.push([
        "INSERT INTO " +
          table +
          " (" +
          fields.join(",") +
          ") VALUES (" +
          fields.map(() => "?").join(",") +
          ")",
        values,
      ]);
    }
  }
  if (!statements.length) fail(400, "Empty backup");
  // An intentionally failing NOT NULL insert aborts the entire atomic batch if a row exists.
  // No placeholder is inserted when every table is empty, even on a concurrent restore.
  const guard =
    "INSERT INTO Classroom (name,updatedAt) SELECT NULL,0 WHERE " +
    tables.map((t) => "EXISTS(SELECT 1 FROM " + t + ")").join(" OR ");
  try {
    await db.batch([[guard], ...statements]);
  } catch (err) {
    const populated = await db.query(
      "SELECT 1 AS found WHERE " +
        tables.map((t) => "EXISTS(SELECT 1 FROM " + t + ")").join(" OR "),
    );
    if (populated.length) fail(409, "Register already contains data");
    fail(400, "The backup could not be restored");
  }
  return Object.fromEntries(tables.map((t) => [t, backup.tables[t].length]));
}
export async function registry(request, db) {
  try {
    const url = new URL(request.url);
    const [, area, key, item, action] = url.pathname.split("/");
    if (area !== "api") fail(404, "Unknown path");
    const method = request.method;
    // A reverse proxy may rewrite the Request URL. Fetch Metadata is controlled by browsers.
    const origin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");
    if (method !== "GET" && (fetchSite === "cross-site" ||
      (origin && origin !== url.origin && fetchSite !== "same-origin"))) {
      fail(403, "Origin mismatch");
    }
    if (
      method !== "GET" &&
      method !== "DELETE" &&
      !request.headers.get("content-type")?.includes("application/json")
    )
      fail(415, "JSON required");
    let body = {};
    if (method === "POST" || method === "PUT") {
      const raw = await request.text();
      if (raw.length > 6_000_000) fail(413, "Request too large");
      try {
        body = JSON.parse(raw);
      } catch {
        fail(400, "Invalid JSON");
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        fail(400, "Invalid body");
    }
    if (key === "backup" && !item && method === "GET")
      return json(await snapshot(db));
    if (key === "backup" && item === "restore" && method === "POST")
      return json(await restoreEmpty(db, body), 201);
    if (key === "classrooms" && method === "GET" && !item)
      return json(await rosters(db));
    if ((key === "attendance" || key === "progress") && !item) {
      const table = key === "attendance" ? "Attendance" : "Progress";
      if (method === "POST") return json(await saveMark(db, table, body), 201);
      if (method === "GET")
        return json(await getMarks(db, table, url.searchParams));
    }
    if (key === "students" || key === "classrooms") {
      const table = key === "students" ? "Student" : "Classroom";
      if (
        !action &&
        ((method === "POST" && !item) || (method === "PUT" && item))
      )
        return json(
          await saveEntity(db, table, item ? id(item) : null, body),
          item ? 200 : 201,
        );
      if (method === "DELETE" && item && !action) {
        const conditions = ["id=?"];
        const args = [id(item)];
        if (table === "Classroom") {
          for (const child of ["Student", "Attendance", "Progress"]) {
            conditions.push(
              "NOT EXISTS (SELECT 1 FROM " + child + " WHERE classroomId=?)",
            );
            args.push(id(item));
          }
        }
        const removed = await db.query(
          "DELETE FROM " +
            table +
            " WHERE " +
            conditions.join(" AND ") +
            " RETURNING id",
          args,
        );
        if (!removed.length)
          fail(
            409,
            "The class has students or historical records, or no longer exists",
          );
        return json({ success: true });
      }
      if (key === "students" && !action && method === "GET") {
        const { classrooms, unassigned } = await rosters(db);
        const people = [
          ...classrooms.flatMap((c) =>
            c.students.map((s) => ({
              ...s,
              classroom: { id: c.id, name: c.name, color: c.color },
            })),
          ),
          ...unassigned.map((s) => ({ ...s, classroom: null })),
        ];
        if (item)
          return json(
            people.find((s) => s.id === id(item)) ||
              fail(404, "Student not found"),
          );
        const room = url.searchParams.get("classroomId");
        return json(
          room === null
            ? people
            : people.filter(
                (s) => s.classroomId === (room === "null" ? null : id(room)),
              ),
        );
      }
    }
    const learning = await learningApi(key, item, action, method, body, db);
    if (learning !== undefined)
      return json(learning, method === "POST" ? 201 : 200);
    fail(404, "Unknown endpoint");
  } catch (error) {
    if (
      !error.status &&
      /foreign key|constraint failed/i.test(String(error.message))
    )
      return json({ error: "Invalid or conflicting record" }, 409);
    return json(
      {
        error: error.status ? error.message : "Unable to complete the request",
      },
      error.status || 500,
    );
  }
}
