"use client";
import { useRef, useState } from "react";
import { useSettings } from "./Preferences";
import { downloadText } from "@/lib/class-reports";

export function RegisterBackup({ onRestored }: { onRestored: () => void }) {
  const { t } = useSettings();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  async function save() {
    setBusy(true);
    try {
      const response = await fetch("/api/backup", { cache: "no-store" });
      if (!response.ok) throw Error();
      const data = await response.json();
      downloadText(
        "arduino-lab-" + new Date().toISOString().slice(0, 10) + ".json",
        JSON.stringify(data, null, 2),
        "application/json",
      );
      setMessage(
        t("جهزت نسخة من جميع الصفوف.", "Tüm sınıfların yedeği hazır."),
      );
    } catch {
      setMessage(t("تعذر تنزيل النسخة.", "Yedek indirilemedi."));
    } finally {
      setBusy(false);
    }
  }
  async function restore(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      if (file.size > 6_000_000) throw Error();
      const data = JSON.parse(await file.text());
      if (data.format !== "arduino-lab-register" || data.version !== 3)
        throw Error();
      if (
        !window.confirm(
          t(
            "استيراد جميع الصفوف إلى السجل الفارغ؟",
            "Bütün sınıflar boş deftere aktarılsın mı?",
          ),
        )
      )
        return;
      const res = await fetch("/api/backup/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 409) {
        setMessage(
          t(
            "توجد بيانات في هذا السجل. احتفظنا بها وأوقفنا الاستيراد.",
            "Bu defterde kayıt var. Mevcut kayıtlar korundu ve içe aktarma durduruldu.",
          ),
        );
        return;
      }
      if (!res.ok) throw Error();
      setMessage(
        t(
          "تم الاستيراد. اختر صفًا لعرض سجله.",
          "İçe aktarıldı. Kayıtları görmek için bir sınıf seçin.",
        ),
      );
      onRestored();
    } catch {
      setMessage(
        t(
          "تعذر قراءة النسخة. اختر ملف JSON الذي صدّرته من الموقع.",
          "Yedek okunamadı. Siteden indirdiğiniz JSON dosyasını seçin.",
        ),
      );
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }
  return (
    <details className="scope-panel">
      <summary>
        {t("نسخ سجل المدرسة واستعادته", "Okul defterini yedekle ve geri yükle")}
      </summary>
      <p>
        {t(
          "تشمل النسخة جميع الصفوف والطلاب والحضور والتقدم. تصلح للنقل إلى سجل فارغ.",
          "Yedek tüm sınıfları, öğrencileri, yoklamayı ve ilerlemeyi içerir. Boş bir deftere aktarılabilir.",
        )}
      </p>
      <div className="scope-tabs">
        <button disabled={busy} className="scope-button" onClick={save}>
          {t("تنزيل نسخة JSON", "JSON yedeğini indir")}
        </button>
        <button
          disabled={busy}
          className="scope-button"
          onClick={() => input.current?.click()}
        >
          {t("استيراد نسخة", "Yedeği içe aktar")}
        </button>
        <input
          ref={input}
          hidden
          type="file"
          accept=".json,application/json"
          onChange={(e) => void restore(e.target.files?.[0])}
        />
      </div>
      <p role="status">{message}</p>
    </details>
  );
}
