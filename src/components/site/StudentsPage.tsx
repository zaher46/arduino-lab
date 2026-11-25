"use client";
import { useEffect, useState } from "react";
import { useSettings } from "./Preferences";
import { sessions } from "@/data/sessions";
import { pythonLessons } from "@/data/python-course";
import { turkishSessions, turkishPythonLessons } from "@/data/turkish-content";
import { RegisterBackup } from "./RegisterBackup";
import {
  attendanceLabel,
  exportClass,
  type ClassroomRecord as Classroom,
  type StudentRecord as Student,
} from "@/lib/class-reports";
const blank = {
  name: "",
  age: "",
  grade: "",
  phone: "",
  parentName: "",
  parentPhone: "",
  notes: "",
  classroomId: "",
};
export default function StudentsPage({ onBack }: { onBack: () => void }) {
  const { language } = useSettings();
  const l = (ar: string, tr: string) => (language === "ar" ? ar : tr);
  const [classEdit, setClassEdit] = useState(false);
  const [classes, setClasses] = useState<Classroom[]>([]),
    [unassigned, setUnassigned] = useState<Student[]>([]),
    [classId, setClassId] = useState(""),
    [course, setCourse] = useState("arduino"),
    [lessonId, setLessonId] = useState(1),
    [tab, setTab] = useState("students");
  const [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [studentForm, setStudentForm] = useState<typeof blank | null>(null),
    [editing, setEditing] = useState<number | null>(null),
    [className, setClassName] = useState(""),
    [showClass, setShowClass] = useState(false),
    [detail, setDetail] = useState<number | null>(null);
  const selected = classes.find((c) => String(c.id) === classId);
  const students =
    selected?.students ?? (classId === "unassigned" ? unassigned : []);
  const lessons =
    course === "arduino"
      ? language === "tr"
        ? turkishSessions
        : sessions
      : language === "tr"
        ? turkishPythonLessons
        : pythonLessons;
  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch("/api/classrooms", { cache: "no-store" });
      if (!r.ok) throw Error();
      const d = await r.json();
      setClasses(d.classrooms ?? []);
      setUnassigned(d.unassigned ?? []);
    } catch {
      setError(
        l(
          "تعذر تحميل الصفوف. أعد المحاولة.",
          "Sınıflar yüklenemedi. Yeniden deneyin.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void refresh();
  }, []);
  async function mutate(url: string, method: string, data?: unknown) {
    if (busy) return false;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data === undefined ? undefined : JSON.stringify(data),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw Error(
          r.status === 409
            ? l(
                "تغير صف الطالب. راجع البيانات وحدّث الصفحة.",
                "Öğrencinin sınıfı değişti. Verileri yenileyin.",
              )
            : d.error || l("تعذر حفظ البيانات", "Veriler kaydedilemedi"),
        );
      }
      await refresh();
      setNotice(l("تم الحفظ", "Kaydedildi"));
      return true;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : l("تعذر الحفظ", "Kaydedilemedi"),
      );
      return false;
    } finally {
      setBusy(false);
    }
  }
  function choose(id: string) {
    setClassEdit(false);
    setShowClass(false);
    setClassId(id);
    setDetail(null);
    setStudentForm(null);
    setError("");
    setNotice("");
    if (id === "unassigned" || !id) setTab("students");
  }
  async function mark(s: Student, status: string) {
    if (!selected) return;
    await mutate("/api/attendance", "POST", {
      studentId: s.id,
      sessionId: lessonId,
      course,
      classroomId: selected.id,
      status,
    });
  }
  const count = (s: Student) =>
    s.attendances.filter(
      (a) =>
        a.course === course && (a.status === "present" || a.status === "late"),
    ).length;
  const former = selected?.former || [];
  const current = [...students, ...former].find((s) => s.id === detail);
  return (
    <section className="lab-shell classroom-workspace">
      <button className="scope-button" onClick={onBack}>
        {l("العودة للرئيسية", "Ana sayfa")}
      </button>
      <header className="workspace-heading">
        <div>
          <h1>{l("سجل الطلاب والحضور", "Öğrenci ve yoklama defteri")}</h1>
          <p>
            {l(
              "اختر صفًا أولًا؛ الحضور والتقدم والتقارير تخص طلابه فقط.",
              "Önce bir sınıf seçin. Yoklama ve ilerleme yalnızca o sınıfın öğrencilerine aittir.",
            )}
          </p>
        </div>
        <button
          className="scope-button primary"
          onClick={() => {
            setClassEdit(false);
            setClassName("");
            setShowClass(!showClass);
          }}
        >
          {l("إنشاء صف", "Sınıf oluştur")}
        </button>
      </header>
      {error && (
        <p role="alert" className="scope-error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="scope-success">
          {notice}
        </p>
      )}
      {showClass && (
        <form
          className="scope-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              await mutate(
                classEdit ? "/api/classrooms/" + classId : "/api/classrooms",
                classEdit ? "PUT" : "POST",
                { name: className },
              )
            ) {
              setShowClass(false);
              setClassName("");
            }
          }}
        >
          <label>
            {l("اسم الصف", "Sınıf adı")}
            <input
              required
              maxLength={100}
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </label>
          <button
            disabled={busy || !className.trim()}
            className="scope-button primary"
          >
            {l("حفظ الصف", "Sınıfı kaydet")}
          </button>
        </form>
      )}
      <div className="class-scope-panel">
        <label htmlFor="class-scope">{l("الصف الحالي", "Seçili sınıf")}</label>
        <select
          id="class-scope"
          value={classId}
          onChange={(e) => choose(e.target.value)}
        >
          <option value="">{l("اختر الصف", "Sınıf seçin")}</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.students.length})
            </option>
          ))}
          <option value="unassigned">
            {l("طلاب بدون صف", "Sınıfa atanmamış öğrenciler")} (
            {unassigned.length})
          </option>
        </select>
        <label htmlFor="course-scope">{l("الكورس", "Kurs")}</label>
        <select
          id="course-scope"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setLessonId(1);
          }}
        >
          <option value="arduino">Arduino</option>
          <option value="python">Python</option>
        </select>
        <button
          className="scope-button"
          disabled={busy}
          onClick={() => void refresh()}
        >
          {l("تحديث", "Yenile")}
        </button>
      </div>
      {!classId && (
        <div className="class-grid">
          {classes.map((c) => (
            <button
              className="scope-panel class-card"
              key={c.id}
              onClick={() => choose(String(c.id))}
            >
              <h2>{c.name}</h2>
              <p>
                {c.students.length} {l("طالب", "öğrenci")}
              </p>
              <span>{l("فتح الصف ←", "Sınıfı aç →")}</span>
            </button>
          ))}
          {!loading && !classes.length && (
            <p>
              {l(
                "أنشئ أول صف ثم أضف طلابه.",
                "İlk sınıfı oluşturun, ardından öğrencileri ekleyin.",
              )}
            </p>
          )}
        </div>
      )}
      {selected && (
        <div className="scope-tabs">
          <button
            className="scope-button"
            onClick={() => {
              setClassName(selected.name);
              setClassEdit(true);
              setShowClass(true);
            }}
          >
            {l("تعديل اسم الصف", "Sınıf adını düzenle")}
          </button>
          {!students.length && !former.length && (
            <button
              disabled={busy}
              className="scope-button danger"
              onClick={async () => {
                if (
                  confirm(
                    l("حذف هذا الصف الفارغ؟", "Bu boş sınıf silinsin mi?"),
                  ) &&
                  (await mutate("/api/classrooms/" + selected.id, "DELETE"))
                )
                  choose("");
              }}
            >
              {l("حذف الصف الفارغ", "Boş sınıfı sil")}
            </button>
          )}
          <button
            className="scope-button"
            onClick={() => exportClass(selected, course, lessons, l)}
          >
            {l("تنزيل حضور الصف CSV", "Sınıf yoklamasını indir (CSV)")}
          </button>
        </div>
      )}
      {classId && (
        <>
          <div className="scope-tabs">
            <button
              className="scope-button"
              aria-pressed={tab === "students"}
              onClick={() => {
                setTab("students");
                setDetail(null);
              }}
            >
              {l("طلاب الصف", "Sınıf öğrencileri")} ({students.length})
            </button>
            <button
              className="scope-button"
              disabled={!selected}
              aria-pressed={tab === "attendance"}
              onClick={() => {
                setTab("attendance");
                setDetail(null);
              }}
            >
              {l("الحضور والتقدم", "Yoklama ve ilerleme")}
            </button>
            <button
              className="scope-button primary"
              disabled={!selected}
              onClick={() => {
                setEditing(null);
                setStudentForm({ ...blank, classroomId: classId });
              }}
            >
              {l("إضافة طالب لهذا الصف", "Bu sınıfa öğrenci ekle")}
            </button>
          </div>
          {studentForm && (
            <form
              className="scope-panel"
              onSubmit={async (e) => {
                e.preventDefault();
                if (
                  await mutate(
                    editing ? `/api/students/${editing}` : "/api/students",
                    editing ? "PUT" : "POST",
                    editing
                      ? {
                          ...studentForm,
                          expectedClassroomId: selected?.id ?? null,
                        }
                      : studentForm,
                  )
                )
                  setStudentForm(null);
              }}
            >
              <h2>
                {editing
                  ? l("تعديل الطالب", "Öğrenciyi düzenle")
                  : l("طالب جديد", "Yeni öğrenci")}
              </h2>
              <div className="scope-fields">
                {(
                  [
                    ["name", "الاسم", "Ad"],
                    ["age", "العمر", "Yaş"],
                    ["grade", "المستوى", "Seviye"],
                    ["phone", "الهاتف", "Telefon"],
                    ["parentName", "اسم ولي الأمر", "Veli adı"],
                    ["parentPhone", "هاتف ولي الأمر", "Veli telefonu"],
                    ["notes", "ملاحظات", "Notlar"],
                  ] as const
                ).map(([key, ar, tr]) => (
                  <label key={key}>
                    {l(ar, tr)}
                    <input
                      required={key === "name"}
                      type={key === "age" ? "number" : "text"}
                      min={key === "age" ? 1 : undefined}
                      max={key === "age" ? 100 : undefined}
                      value={studentForm[key]}
                      onChange={(e) =>
                        setStudentForm({
                          ...studentForm,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </label>
                ))}
                <label>
                  {l("الصف", "Sınıf")}
                  <select
                    required
                    value={studentForm.classroomId}
                    onChange={(e) =>
                      setStudentForm({
                        ...studentForm,
                        classroomId: e.target.value,
                      })
                    }
                  >
                    <option value="">{l("اختر الصف", "Sınıf seçin")}</option>
                    {classes.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <p>
                {l(
                  "نقل الطالب يغير صفه الحالي ويحافظ على سجله التعليمي.",
                  "Öğrenciyi taşımak mevcut sınıfını değiştirir; öğrenme kayıtları korunur.",
                )}
              </p>
              <button disabled={busy} className="scope-button primary">
                {l("حفظ", "Kaydet")}
              </button>{" "}
              <button
                type="button"
                className="scope-button"
                onClick={() => setStudentForm(null)}
              >
                {l("إلغاء", "İptal")}
              </button>
            </form>
          )}
          {current ? (
            <div className="scope-panel">
              <button onClick={() => setDetail(null)} className="scope-button">
                {l("رجوع للصف", "Sınıfa dön")}
              </button>
              <h2>{current.name}</h2>
              <p>
                {l("حضور أو تأخر", "Katılım veya gecikme")}: {count(current)} /{" "}
                {lessons.length}
              </p>
              {lessons.map((session) => {
                const a = current.attendances.find(
                  (a) => a.course === course && a.sessionId === session.id,
                );
                const p = current.progresses.find(
                  (m) => m.course === course && m.sessionId === session.id,
                );
                return (
                  <p key={session.id}>
                    {session.id}. {session.title} —{" "}
                    {attendanceLabel(a?.status, l)} ·{" "}
                    {p?.completed
                      ? l("مكتمل", "Tamamlandı")
                      : l("لم يكتمل", "Tamamlanmadı")}
                    {p?.score != null ? " · " + p.score : ""}
                    {p?.notes ? " · " + p.notes : ""}
                  </p>
                );
              })}
            </div>
          ) : tab === "students" ? (
            <div className="class-grid">
              {students.map((s) => (
                <article className="scope-panel" key={s.id}>
                  <h2>{s.name}</h2>
                  <p>
                    {count(s)} / {lessons.length} {l("جلسات حضور", "katılım")}
                  </p>
                  <div className="scope-tabs">
                    <button
                      className="scope-button"
                      onClick={() => setDetail(s.id)}
                    >
                      {l("سجل التعلم", "Öğrenme kaydı")}
                    </button>
                    <button
                      className="scope-button"
                      onClick={() => {
                        setEditing(s.id);
                        setStudentForm({
                          name: s.name,
                          age: String(s.age ?? ""),
                          grade: s.grade ?? "",
                          phone: s.phone ?? "",
                          parentName: s.parentName ?? "",
                          parentPhone: s.parentPhone ?? "",
                          notes: s.notes ?? "",
                          classroomId: String(s.classroomId ?? ""),
                        });
                      }}
                    >
                      {l("تعديل / نقل", "Düzenle / taşı")}
                    </button>
                    <button
                      className="scope-button danger"
                      disabled={busy}
                      onClick={() => {
                        if (
                          confirm(
                            l(
                              "حذف الطالب وجميع سجلاته؟",
                              "Öğrenci ve tüm kayıtları silinsin mi?",
                            ),
                          )
                        )
                          void mutate(`/api/students/${s.id}`, "DELETE");
                      }}
                    >
                      {l("حذف", "Sil")}
                    </button>
                  </div>
                </article>
              ))}
              {!students.length && !loading && (
                <p>{l("لا يوجد طلاب هنا بعد.", "Henüz öğrenci yok.")}</p>
              )}
            </div>
          ) : (
            <div className="scope-panel">
              <h2>
                {selected?.name} · {course === "arduino" ? "Arduino" : "Python"}
              </h2>
              <label htmlFor="attendance-session">{l("الجلسة", "Ders")}</label>
              <select
                id="attendance-session"
                value={lessonId}
                onChange={(e) => setLessonId(Number(e.target.value))}
              >
                {lessons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.title}
                  </option>
                ))}
              </select>
              <p>
                {l(
                  "غير مسجل لا يعني غائبًا. سجّل الحالة لكل طالب.",
                  "Kaydedilmedi, gelmedi anlamına gelmez. Her öğrencinin durumunu kaydedin.",
                )}
              </p>
              <div className="scope-table">
                <table>
                  <thead>
                    <tr>
                      <th>{l("الطالب", "Öğrenci")}</th>
                      <th>{l("حالة الحضور", "Yoklama durumu")}</th>
                      <th>{l("إكمال الجلسة", "Dersi tamamlama")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => {
                      const a = s.attendances.find(
                        (a) => a.course === course && a.sessionId === lessonId,
                      );
                      const p = s.progresses.find(
                        (p) => p.course === course && p.sessionId === lessonId,
                      );
                      return (
                        <tr key={s.id}>
                          <td>
                            {s.name}
                            {!a && (
                              <small>{l("غير مسجل", "Kaydedilmedi")}</small>
                            )}
                          </td>
                          <td>
                            <div className="scope-tabs">
                              {[
                                ["present", "حاضر", "Katıldı"],
                                ["late", "متأخر", "Geç"],
                                ["absent", "غائب", "Gelmedi"],
                              ].map(([status, ar, tr]) => (
                                <button
                                  key={status}
                                  aria-pressed={a?.status === status}
                                  disabled={busy}
                                  className="scope-button"
                                  onClick={() => void mark(s, status)}
                                >
                                  {l(ar, tr)}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={!!p?.completed}
                                disabled={busy}
                                onChange={(e) =>
                                  void mutate("/api/progress", "POST", {
                                    studentId: s.id,
                                    sessionId: lessonId,
                                    course,
                                    classroomId: selected!.id,
                                    completed: e.target.checked,
                                  })
                                }
                              />
                              {l("مكتمل", "Tamamlandı")}
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
      {selected && former.length > 0 && (
        <details className="scope-panel">
          <summary>
            {l(
              "سجلات الطلاب الذين انتقلوا من الصف",
              "Sınıftan ayrılan öğrencilerin kayıtları",
            )}{" "}
            ({former.length})
          </summary>
          {former.map((s) => (
            <button
              className="scope-button"
              key={s.id}
              onClick={() => setDetail(s.id)}
            >
              {s.name}
            </button>
          ))}
        </details>
      )}
      <RegisterBackup onRestored={() => void refresh()} />
      <a className="scope-button" href="/legacy/#/students">
        {l("سجل المتصفح من النسخة السابقة", "Önceki sürümün tarayıcı defteri")}
      </a>
      {loading && <p role="status">{l("جاري التحميل...", "Yükleniyor...")}</p>}
    </section>
  );
}
