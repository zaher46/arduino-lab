"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  CalendarCheck,
  BookOpen,
  Download,
} from "lucide-react";
import { useSettings } from "./Preferences";
import { curriculumFor } from "@/data/localized";
import { exportClass, type ClassroomRecord } from "@/lib/class-reports";

const badges: Record<string, [string, string]> = {
  starter: ["بادئ الرحلة", "İlk adımlar"],
  coder: ["مبرمج صاعد", "Genç programcı"],
  sensor_master: ["خبير حساسات", "Sensör uzmanı"],
  engineer: ["مهندس مشاريع", "Proje mühendisi"],
  python_starter: ["بدايات بايثون", "Python başlangıcı"],
};
export default function TeacherDashboard({ onBack }: { onBack: () => void }) {
  const { locale, t } = useSettings();
  const [rooms, setRooms] = useState<ClassroomRecord[]>([]);
  const [selected, setSelected] = useState("");
  const [course, setCourse] = useState("arduino");
  const [loading, setLoading] = useState(true),
    [error, setError] = useState(false);
  async function refresh() {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch("/api/classrooms", { cache: "no-store" });
      if (!response.ok) throw Error();
      const data = await response.json();
      setRooms(data.classrooms);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void refresh();
  }, []);
  const room = rooms.find((c) => c.id === Number(selected));
  const lessons =
    course === "arduino"
      ? curriculumFor(locale).sessions
      : curriculumFor(locale).pythonLessons;
  const members = room ? [...room.students, ...room.former] : [];
  const rows = members
    .map((s) => {
      const marks = s.attendances.filter((a) => a.course === course);
      return {
        student: s,
        present: marks.filter((a) => a.status === "present").length,
        late: marks.filter((a) => a.status === "late").length,
        absent: marks.filter((a) => a.status === "absent").length,
        done: s.progresses.filter((p) => p.course === course && p.completed)
          .length,
      };
    })
    .filter(
      (r) =>
        r.student.classroomId === room?.id ||
        r.present + r.late + r.absent + r.done ||
        r.student.attendances.some((m) => m.course === course) ||
        r.student.progresses.some((m) => m.course === course),
    );
  return (
    <section className="lab-shell classroom-workspace">
      <button className="scope-button" onClick={onBack}>
        {t("العودة للرئيسية", "Ana sayfa")}
      </button>
      <header className="workspace-heading">
        <div>
          <GraduationCap size={32} />
          <h1>{t("مساحة المعلّم", "Öğretmen alanı")}</h1>
          <p>
            {t(
              "اختر الصف والكورس لمعرفة من حضر ومن أكمل الجلسات.",
              "Kimin katıldığını ve hangi derslerin tamamlandığını görmek için sınıfı ve kursu seçin.",
            )}
          </p>
        </div>
      </header>
      <div className="class-scope-panel">
        <label htmlFor="teacher-room">{t("الصف الحالي", "Seçili sınıf")}</label>
        <select
          id="teacher-room"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">{t("اختر الصف", "Sınıf seçin")}</option>
          {rooms.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label htmlFor="teacher-course">{t("الكورس", "Kurs")}</label>
        <select
          id="teacher-course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="arduino">Arduino</option>
          <option value="python">Python</option>
        </select>
      </div>
      {loading && <p role="status">{t("جاري التحميل...", "Yükleniyor…")}</p>}
      {error && (
        <p role="alert">
          {t("تعذر تحميل الصفوف", "Sınıflar yüklenemedi")}{" "}
          <button className="scope-button" onClick={refresh}>
            {t("تحديث", "Yenile")}
          </button>
        </p>
      )}
      {room && (
        <>
          <div className="class-grid dashboard-metrics">
            <article className="scope-panel">
              <Users />
              <h2>{room.students.length}</h2>
              <span>{t("طلاب مقيدون حاليًا", "Mevcut öğrenciler")}</span>
            </article>
            <article className="scope-panel">
              <CalendarCheck />
              <h2>{rows.filter((r) => r.present + r.late > 0).length}</h2>
              <span>
                {t(
                  "حضروا لقاءً واحدًا على الأقل",
                  "En az bir derse katılanlar",
                )}
              </span>
            </article>
            <article className="scope-panel">
              <BookOpen />
              <h2>{rows.reduce((n, r) => n + r.done, 0)}</h2>
              <span>
                {t("جلسات أكملها الطلاب", "Öğrencilerin tamamladığı dersler")}
              </span>
            </article>
          </div>
          <section className="scope-panel">
            <div className="workspace-heading">
              <h2>
                {room.name} · {course === "arduino" ? "Arduino" : "Python"}
              </h2>
              <button
                className="scope-button"
                onClick={() => exportClass(room, course, lessons, t)}
              >
                <Download size={16} />
                {t("تنزيل التقرير CSV", "CSV raporunu indir")}
              </button>
            </div>
            <div className="scope-table">
              <table>
                <thead>
                  <tr>
                    {[
                      t("الطالب", "Öğrenci"),
                      t("حاضر", "Katıldı"),
                      t("متأخر", "Geç"),
                      t("غائب", "Gelmedi"),
                      t("جلسات مكتملة", "Tamamlanan dersler"),
                      t("النقاط والشارات", "Puan ve rozetler"),
                    ].map((v) => (
                      <th key={v}>{v}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ student: s, present, late, absent, done }) => (
                    <tr key={s.id}>
                      <th scope="row">
                        {s.name}
                        {s.classroomId !== room.id && (
                          <small>{t("طالب سابق", "Eski öğrenci")}</small>
                        )}
                      </th>
                      <td>{present}</td>
                      <td>{late}</td>
                      <td>{absent}</td>
                      <td>
                        {done} / {lessons.length}
                      </td>
                      <td>
                        {s.points}{" "}
                        {s.badges
                          .split(",")
                          .filter(Boolean)
                          .map((b) => (badges[b] ? t(...badges[b]) : b))
                          .join(" · ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!rows.length && (
              <p>
                {t(
                  "هذا الصف فارغ. أضف طالبًا من سجل الطلاب.",
                  "Bu sınıf boş. Öğrenci defterinden bir öğrenci ekleyin.",
                )}
              </p>
            )}
          </section>
        </>
      )}
    </section>
  );
}
