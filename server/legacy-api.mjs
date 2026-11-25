// Earlier releases exposed homework, exam results and student awards under these paths.
export async function learningApi(key, item, action, method, body, db) {
  const bad = () => {
    throw Object.assign(new Error("Invalid learning record"), { status: 400 });
  };
  if (key === "students" && item && action === "points" && method === "POST") {
    const amount = Number(body.points ?? 0),
      badge = body.badge ?? "",
      sid = Number(item);
    if (
      !Number.isSafeInteger(amount) ||
      typeof badge !== "string" ||
      badge.length > 100 ||
      badge.includes(",") ||
      !Number.isSafeInteger(sid)
    )
      bad();
    const result = await db.query(
      "UPDATE Student SET points=points+?, badges=CASE WHEN ?='' OR instr(','||badges||',',','||?||',')>0 THEN badges WHEN badges='' THEN ? ELSE badges||','||? END,updatedAt=? WHERE id=? RETURNING *",
      [amount, badge, badge, badge, badge, Date.now(), sid],
    );
    if (!result.length) bad();
    return result[0];
  }
  if (item || action) return undefined;
  if (key === "homework" && method === "GET") {
    const [items, submissions, people] = await db.batch([
      ["SELECT * FROM Homework ORDER BY id DESC"],
      ["SELECT * FROM HomeworkSubmission"],
      ["SELECT * FROM Student"],
    ]);
    const byStudent = new Map(people.map((s) => [s.id, s]));
    return items.map((row) => ({
      ...row,
      submissions: submissions
        .filter((sub) => sub.homeworkId === row.id)
        .map((sub) => ({ ...sub, student: byStudent.get(sub.studentId) })),
    }));
  }
  if (key === "homework" && method === "POST") {
    if (typeof body.title !== "string" || !body.title.trim()) bad();
    return (
      await db.query(
        "INSERT INTO Homework(title,description,courseId,sessionId,dueDate) VALUES(?,?,?,?,?) RETURNING *",
        [
          body.title.trim(),
          body.description || "",
          body.courseId || "arduino",
          Number(body.sessionId || 0),
          body.dueDate || null,
        ],
      )
    )[0];
  }
  if (key === "exams" && method === "GET") {
    const [items, people] = await db.batch([
      ["SELECT * FROM ExamResult ORDER BY id DESC"],
      ["SELECT * FROM Student"],
    ]);
    const byStudent = new Map(people.map((s) => [s.id, s]));
    return items.map((row) => ({
      ...row,
      student: byStudent.get(row.studentId),
    }));
  }
  if (key === "exams" && method === "POST") {
    const sid = Number(body.studentId),
      score = Number(body.score),
      total = Number(body.totalQuestions);
    if (
      !Number.isSafeInteger(sid) ||
      !Number.isSafeInteger(score) ||
      !Number.isSafeInteger(total) ||
      total < 1 ||
      score < 0 ||
      score > total
    )
      bad();
    const [marks] = await db.batch([
      [
        "INSERT INTO ExamResult(studentId,course,score,totalQuestions,answers) VALUES(?,?,?,?,?) RETURNING *",
        [sid, body.course || "arduino", score, total, body.answers || ""],
      ],
      [
        "UPDATE Student SET points=points+?,updatedAt=? WHERE id=?",
        [Math.round((50 * score) / total), Date.now(), sid],
      ],
    ]);
    return marks[0];
  }
}
