"use client";
import { useSettings } from "./Preferences";
import { workshopBridges } from "@/data/workshop-bridges";
import { algorithmSourceById } from "@/data/algorithm-source";
import { AlgorithmSource } from "./AlgorithmSource";

export function WorkshopPractice({ sessionId }: { sessionId: number }) {
  const { locale, t } = useSettings();
  const task = workshopBridges[sessionId];
  if (!task) return null;
  return (
    <section className="algorithm-plan mb-5">
      <p className="eyebrow">
        {t("تدريب الخوارزميات", "Algoritma alıştırması")}
      </p>
      <h2>{task.title[locale]}</h2>
      <p>{task.activity[locale]}</p>
      {task.problemIds.map((id) => (
        <div key={id}>
          <h3>{algorithmSourceById[id].title[locale]}</h3>
          <AlgorithmSource problemId={id} />
        </div>
      ))}
      <details>
        <summary>{t("تحقّق من إجابتك", "Yanıtını kontrol et")}</summary>
        <p>{task.expected[locale]}</p>
        {task.blocks && (
          <ol className="workshop-blocks">
            {task.blocks[locale].map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </details>
    </section>
  );
}
