"use client";
import { useSettings } from "./Preferences";
import {
  algorithmSourceById,
  algorithmPageImage,
  algorithmSourceInfo,
} from "@/data/algorithm-source";
export function AlgorithmSource({ problemId }: { problemId: number }) {
  const { language } = useSettings();
  const item = algorithmSourceById[problemId];
  if (!item) return null;
  const ar = language === "ar";
  return (
    <div className="source-diagrams">
      {item.correction && (
        <p className="source-note">
          <strong>{ar ? "ملاحظة تعليمية: " : "Öğrenme notu: "}</strong>
          {item.correction[language]}
        </p>
      )}
      <details>
        <summary>
          {ar
            ? "السؤال والمخطط من الملف الأصلي"
            : "Kaynak dosyadaki soru ve akış şeması"}{" "}
          · #{problemId}
        </summary>
        <p>{item.description[language]}</p>
        <p className="text-muted-foreground">
          {ar
            ? "صفحات المصدر محفوظة بلغتها الأصلية؛ الشرح المصاحب يتبع اللغة المختارة."
            : "Kaynak sayfalar özgün dilindedir; açıklama seçtiğiniz dilde gösterilir."}
        </p>
        <div className="source-pages">
          {item.pages.map((page) => (
            <figure key={page}>
              <a
                href={algorithmPageImage(page)}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  loading="lazy"
                  src={algorithmPageImage(page)}
                  width={1072}
                  height={1516}
                  alt={`${ar ? "صفحة" : "Sayfa"} ${page} — ${item.title[language]}`}
                />
              </a>
              <figcaption>
                {ar ? "صفحة" : "Sayfa"} {page} ·{" "}
                <a
                  href={`${algorithmSourceInfo.pdfUrl}#page=${page}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ar ? "فتح PDF والتكبير" : "PDF aç ve büyüt"}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </details>
    </div>
  );
}
export function LessonPracticePlan({ lessonId }: { lessonId: number }) {
  const { language } = useSettings();
  const ar = language === "ar";
  return (
    <aside className="algorithm-plan">
      <h2>
        {ar
          ? "خطة جلسة تفاعلية · 120 دقيقة"
          : "Etkileşimli ders planı · 120 dakika"}
      </h2>
      <ol>
        {(ar
          ? [
              "10 دقائق: مراجعة وتوقع الناتج قبل التنفيذ.",
              "20 دقيقة: شرح الفكرة مع تتبع مثال على الورق.",
              "25 دقيقة: قراءة المخطط ورسم مخطط مشابه.",
              "10 دقائق: استراحة قصيرة.",
              "40 دقيقة: تطبيق المسائل الأساسية ثم تحدٍّ اختياري.",
              "15 دقيقة: اختبار حالة عادية وحالة حدية وشرح الحل.",
            ]
          : [
              "10 dk: Tekrar ve çıktıyı tahmin etme.",
              "20 dk: Kavramı öğrenme, örneği kâğıtta izleme.",
              "25 dk: Akış şemasını okuma ve benzerini çizme.",
              "10 dk: Kısa mola.",
              "40 dk: Temel sorular ve isteğe bağlı meydan okuma.",
              "15 dk: Normal ve sınır durumları test etme, çözümü anlatma.",
            ]
        ).map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ol>
      <p>
        {ar
          ? "مقياس الإتقان: يشرح الطالب المدخلات والمخرجات، ويتتبع الأسهم، ويختبر حله دون نسخ."
          : "Başarı ölçütü: Öğrenci girdi ve çıktıları açıklar, okları izler ve kopyalamadan çözümünü test eder."}
      </p>
      {lessonId === 10 && (
        <p className="source-note">
          {ar
            ? "المسائل الهندسية 20–23 إثراء اختياري متقدم؛ لا يشترط إتقان قوانينها لإنهاء مستوى المبتدئين."
            : "20–23 numaralı geometri soruları isteğe bağlı ileri çalışmadır; başlangıç seviyesini tamamlamak için zorunlu değildir."}
        </p>
      )}
    </aside>
  );
}
