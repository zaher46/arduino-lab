"use client";
import { useSettings } from "./Preferences";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  CircuitBoard,
  Code2,
  GraduationCap,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import {
  ComponentIcon,
  componentLabels,
} from "@/components/icons/ComponentIcons";
import {
  curriculumFor,
  type Session,
  type ComponentKey,
} from "@/data/localized";
interface Props {
  onSelectSession: (session: Session) => void;
  onProjects: () => void;
  onStudents: () => void;
  onPython: () => void;
  onDashboard: () => void;
}
const phases = [
  "جميع الجلسات",
  "الأساسيات",
  "البرمجة والتحكم",
  "الحساسات والمشاريع",
];
const palette = ["#67dcc5", "#dbae78", "#a99bea", "#8bb8e4"];
export default function HomePage({
  onSelectSession,
  onProjects,
  onStudents,
  onPython,
  onDashboard,
}: Props) {
  const { t: tx, locale } = useSettings();

  const { sessions } = curriculumFor(locale);
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState(0);
  const list = sessions.filter(
    (s) =>
      (phase === 0 ||
        (phase === 1
          ? s.id <= 3
          : phase === 2
            ? s.id > 3 && s.id <= 7
            : s.id > 7)) &&
      `${s.title} ${s.subtitle} ${s.components.map((c) => tx(componentLabels[c])).join(" ")}`
        .toLocaleLowerCase(locale)
        .includes(query.trim().toLocaleLowerCase(locale)),
  );
  return (
    <div className="premium-home">
      <section className="lab-hero lab-shell">
        <div className="hero-editorial">
          <div className="eyebrow">
            <span /> {tx("مساحة صغيرة لأفكار كبيرة")}{" "}
            <span className="eyebrow-en">ARDUINO LAB</span>
          </div>
          <h1>
            {tx("فضول اليوم.")}
            <br />
            <span>{tx("اختراعات الغد.")}</span>
          </h1>
          <p>
            {tx(
              "هنا تتحول «كيف يعمل؟» إلى «أنا صنعته». رحلة عملية في الإلكترونيات والبرمجة، من أول ومضة ضوء إلى مشروع يحمل فكرتك.",
            )}
          </p>
          <div className="hero-buttons">
            <button
              className="lab-primary"
              onClick={() => onSelectSession(sessions[0])}
            >
              {tx("ابدأ رحلة التعلّم")} <ArrowLeft size={18} />
            </button>
            <button className="lab-secondary" onClick={onProjects}>
              {tx("اكتشف المشاريع")} <ArrowUpLeft size={18} />
            </button>
          </div>
          <div className="hero-proof">
            <span className="proof-mark">
              <CircuitBoard size={16} />
            </span>{" "}
            Arduino Uno <i /> {tx("برمجة بالبلوكات")} <i />{" "}
            {tx("تعلّم بالتجربة")}
          </div>
        </div>
        <div className="hero-atelier">
          <div className="atelier-top">
            <span>
              <span className="status-dot" /> {tx("مختبر الأفكار")}
            </span>
            <span dir="ltr">LAB / 001</span>
          </div>
          <div className="hero-art-frame">
            <img
              src="/visuals/hero-electronics.svg"
              alt={tx("رسم فني للوحة إلكترونية وليد وقطع تجارب")}
              className="hero-illustration"
            />
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
          </div>
          <div className="atelier-caption">
            <span>
              <Sparkles size={15} /> {tx("كل تجربة بداية اكتشاف")}
            </span>
            <span>{tx("صمّم. جرّب. ابتكر.")}</span>
          </div>
        </div>
      </section>
      <section
        className="lab-shell metrics-strip"
        aria-label={tx("معلومات الدورة")}
      >
        {[
          [String(sessions.length), "جلسة متدرّجة", BookOpen],
          ["30", "ساعة من التجربة", Wrench],
          ["mBlock", "برمجة بصرية", Layers3],
          ["10–14", "سنة · عقول فضولية", GraduationCap],
        ].map(([n, t, Icon]) => {
          const I = Icon as typeof BookOpen;
          return (
            <div className="metric" key={tx(String(t))}>
              <I size={22} />
              <div>
                <strong dir="ltr">{String(n)}</strong>
                <span>{tx(String(t))}</span>
              </div>
            </div>
          );
        })}
      </section>
      <section className="lab-shell learning-section" id="sessions-grid">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{tx("01 / رحلة التعلّم")}</span>
            <h2>{tx("خطوة صغيرة، مهارة جديدة.")}</h2>
            <p>{tx("تعلّم الفكرة، شاهد التوصيل، ثم جرّب بيديك.")}</p>
          </div>
          <span className="section-counter">
            {sessions.length.toString().padStart(2, "0")}{" "}
            <small>{tx("جلسة لاكتشاف العالم")}</small>
          </span>
        </div>
        <div className="course-toolbar">
          <div
            className="phase-tabs"
            role="group"
            aria-label={tx("تصفية الجلسات")}
          >
            {phases.map((p, i) => (
              <button
                key={tx(p)}
                aria-pressed={phase === i}
                onClick={() => setPhase(i)}
                className={phase === i ? "selected" : ""}
              >
                {tx(p)}
              </button>
            ))}
          </div>
          <label className="course-search">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tx("ابحث عن فكرة أو قطعة…")}
              aria-label={tx("ابحث عن جلسة")}
            />
          </label>
        </div>
        <div className="premium-course-grid">
          {list.map((s) => (
            <button
              className="premium-course-card"
              onClick={() => onSelectSession(s)}
              key={s.id}
              style={
                {
                  "--course-accent": palette[(s.id - 1) % 4],
                } as React.CSSProperties
              }
            >
              <div className="course-visual">
                <span className="course-index" dir="ltr">
                  {String(s.id).padStart(2, "0")}
                </span>
                <div className="component-stage">
                  <ComponentIcon name={s.icon} size={112} />
                </div>
                <span className="course-chip">{s.badge}</span>
                <div className="visual-grid" />
              </div>
              <div className="course-description">
                <div className="course-meta">
                  <span>{tx(s.difficulty)}</span>
                  <span>{s.duration}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
                <div className="course-footer">
                  <span>
                    {tx("اكتشف الجلسة")} <ArrowLeft size={16} />
                  </span>
                  <div className="mini-components">
                    {s.components.slice(0, 3).map((c) => (
                      <span key={c} title={tx(componentLabels[c])}>
                        <ComponentIcon name={c} size={22} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {!list.length && (
          <div className="lab-empty">
            <SlidersHorizontal />
            <h3>{tx("لم نجد جلسة بهذه الكلمات")}</h3>
            <p>{tx("جرّب «ليد» أو «حساس»، أو اعرض جميع الجلسات.")}</p>
            <button
              className="lab-secondary"
              onClick={() => {
                setQuery("");
                setPhase(0);
              }}
            >
              {tx("إعادة ضبط البحث")}
            </button>
          </div>
        )}
      </section>
      <section className="lab-shell discovery-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{tx("02 / على طاولة المختبر")}</span>
            <h2>{tx("تعرّف على أدوات اختراعك.")}</h2>
            <p>{tx("قطع صغيرة، وإمكانيات تستحق الاكتشاف.")}</p>
          </div>
        </div>
        <div className="component-gallery">
          {Object.entries(componentLabels)
            .slice(0, 12)
            .map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  const s = sessions.find((s) =>
                    s.components.includes(key as ComponentKey),
                  );
                  if (s) onSelectSession(s);
                }}
                className="component-tile"
              >
                <ComponentIcon name={key as ComponentKey} size={52} />
                <span>{tx(label)}</span>
              </button>
            ))}
        </div>
      </section>
      <section className="lab-shell beyond-section">
        <div className="project-feature">
          <span className="eyebrow">{tx("03 / من الفكرة إلى الواقع")}</span>
          <h2>
            {tx("اصنع شيئًا")}
            <br />
            {tx("تفخر به.")}
          </h2>
          <p>
            {tx(
              "مصباح يفهم الظلام، إشارة مرور، أو مشروع جديد من خيالك. اجمع مهاراتك وابدأ البناء.",
            )}
          </p>
          <button className="lab-primary" onClick={onProjects}>
            {tx("ادخل ورشة المشاريع")} <ArrowLeft size={18} />
          </button>
          <div className="feature-art" aria-hidden="true">
            <ComponentIcon name="servo" size={140} />
            <ComponentIcon name="rgbLed" size={92} />
          </div>
        </div>
        <div className="workspace-links">
          <button onClick={onPython}>
            <span className="workspace-icon">
              <Code2 />
            </span>
            <div>
              <small>{tx("أفق جديد للتعلّم")}</small>
              <h3>{tx("البرمجة بلغة بايثون")}</h3>
              <p>{tx("تعرف على الخوارزميات واكتب أول برنامج.")}</p>
            </div>
            <ArrowUpLeft />
          </button>
          <button onClick={onDashboard}>
            <span className="workspace-icon gold">
              <GraduationCap />
            </span>
            <div>
              <small>{tx("مساحة المعلّم")}</small>
              <h3>{tx("كل صفّ، في مكان واحد")}</h3>
              <p>{tx("خطط للقاءات وتابع تقدم التعلّم.")}</p>
            </div>
            <ArrowUpLeft />
          </button>
          <button onClick={onStudents}>
            <span className="workspace-icon violet">
              <Users />
            </span>
            <div>
              <small>{tx("تابع كل خطوة")}</small>
              <h3>{tx("سجل الطلاب والحضور")}</h3>
              <p>{tx("الأسماء والحضور والإنجازات.")}</p>
            </div>
            <ArrowUpLeft />
          </button>
        </div>
      </section>
    </div>
  );
}
