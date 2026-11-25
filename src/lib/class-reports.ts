export type Mark = {
  sessionId: number;
  course: string;
  status?: string;
  completed?: boolean;
  score?: number | null;
  notes?: string | null;
};
export type StudentRecord = {
  id: number;
  name: string;
  age: number | null;
  grade: string | null;
  phone: string | null;
  parentName: string | null;
  parentPhone: string | null;
  notes: string | null;
  points: number;
  badges: string;
  classroomId: number | null;
  attendances: Mark[];
  progresses: Mark[];
};
export type ClassroomRecord = {
  id: number;
  name: string;
  color: string;
  notes: string | null;
  students: StudentRecord[];
  former: StudentRecord[];
};
export type Translate = (ar: string, tr: string) => string;
export function attendanceLabel(code: string | undefined, t: Translate) {
  switch (code) {
    case "present":
      return t("حاضر", "Katıldı");
    case "absent":
      return t("غائب", "Gelmedi");
    case "late":
      return t("متأخر", "Geç");
    case "excused":
      return t("بعذر", "Mazeretli");
    default:
      return t("غير مسجل", "Kaydedilmedi");
  }
}
export function downloadText(filename: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function exportClass(
  room: ClassroomRecord,
  course: string,
  lessons: { id: number; title: string }[],
  t: Translate,
) {
  const rows = [
    [
      t("الصف", "Sınıf"),
      t("الطالب", "Öğrenci"),
      t("القيد", "Üyelik"),
      t("الكورس", "Kurs"),
      t("الجلسة", "Ders"),
      t("العنوان", "Başlık"),
      t("الحضور", "Yoklama"),
      t("الإكمال", "Tamamlama"),
    ],
  ];
  for (const s of [...room.students, ...room.former])
    for (const lesson of lessons) {
      const a = s.attendances.find(
        (m) => m.course === course && m.sessionId === lesson.id,
      );
      const p = s.progresses.find(
        (m) => m.course === course && m.sessionId === lesson.id,
      );
      if (s.classroomId !== room.id && !a && !p) continue;
      rows.push([
        room.name,
        s.name,
        s.classroomId === room.id ? t("حالي", "Mevcut") : t("سابق", "Eski"),
        course,
        String(lesson.id),
        lesson.title,
        attendanceLabel(a?.status, t),
        p
          ? p.completed
            ? t("مكتمل", "Tamamlandı")
            : t("قيد التعلم", "Sürüyor")
          : t("غير مسجل", "Kaydedilmedi"),
      ]);
    }
  function cell(value: string) {
    const safe = /^[\s]*[=+@-]|^[\t\r]/.test(value) ? "'" + value : value;
    return '"' + safe.replace(/"/g, '""') + '"';
  }
  const csv = rows.map((row) => row.map(cell).join(",")).join("\r\n");
  downloadText(
    "class-" + room.id + "-" + course + ".csv",
    "\uFEFF" + csv,
    "text/csv;charset=utf-8",
  );
}
