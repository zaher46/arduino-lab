'use client';
import {useSettings} from './Preferences';

import { AlgorithmSource, LessonPracticePlan } from "./AlgorithmSource";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Lightbulb, Code2, AlertTriangle, CheckCircle2, Info, Target, GitBranch } from "lucide-react";
import { FlowchartRenderer } from "@/components/site/FlowchartRenderer";
import { curriculumFor, totalProblems, type PythonLesson } from "@/data/localized";

const accentColorMap: Record<string, { primary: string; light: string }> = {
  cyan: { primary: "#22d3ee", light: "rgba(34, 211, 238, 0.18)" },
  violet: { primary: "#a855f7", light: "rgba(168, 85, 247, 0.18)" },
  amber: { primary: "#fbbf24", light: "rgba(251, 191, 36, 0.18)" },
  emerald: { primary: "#34d399", light: "rgba(52, 211, 153, 0.18)" },
  rose: { primary: "#fb7185", light: "rgba(251, 113, 133, 0.18)" },
};

interface Props {
  onBack: () => void;
}

export default function PythonCoursePage({ onBack }: Props) {
  const {t:tx,locale}=useSettings();

  const {pythonLessons}=curriculumFor(locale);
  const [selectedId,setSelectedId]=useState<number|null>(null);
  const selectedLesson=pythonLessons.find(lesson=>lesson.id===selectedId);

  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative pt-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-50" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(34, 211, 238, 0.15)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(168, 85, 247, 0.15)" }} />

        <div className="container mx-auto px-4 md:px-8 relative">
          <button onClick={onBack} className="text-sm mb-4 transition-colors hover:opacity-100" style={{ color: "#22d3ee", opacity: 0.85 }}> {tx("← العودة إلى الرئيسية")} </button>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(34, 211, 238, 0.08)", border: "1px solid rgba(34, 211, 238, 0.25)" }}>
              <Code2 className="w-4 h-4" style={{ color: "#22d3ee" }} />
              <span className="text-sm font-medium" style={{ color: "#22d3ee" }}>{pythonLessons.length} {tx("دروس ·")} {totalProblems} {tx("مسألة")}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-3">
              <span className="text-gradient-cyan-violet">{tx("كورس بايثون والخوارزميات")}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground"> {tx("تعلم البرمجة بالبايثون وحل المسائل بخوارزميات والمخططات الانسيابية للأطفال")} </p>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-6 flex-1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pythonLessons.map((lesson, idx) => {
              const colors = accentColorMap[lesson.accent];
              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => setSelectedId(lesson.id)}
                  whileHover={{ y: -6 }}
                  className="group relative text-right rounded-2xl p-6 transition-all duration-300 glass-strong overflow-hidden cursor-pointer"
                  style={{ borderColor: `${colors.primary}33` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${colors.light}, transparent 70%)` }} />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                        {tx(lesson.difficulty)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                        {lesson.id}
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{lesson.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{lesson.subtitle}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${colors.primary}10`, color: colors.primary }}>
                        {lesson.problems.length} {tx("مسألة")} </span>
                      <span className="text-xs text-muted-foreground">{lesson.objectives.length} {tx("أهداف")}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all" style={{ color: colors.primary }}> {tx("ابدأ الدرس ←")} </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== Lesson Detail =====
function LessonDetail({ lesson, onBack }: { lesson: PythonLesson; onBack: () => void }) {
  const {t:tx,locale}=useSettings();

  const colors = accentColorMap[lesson.accent];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative pt-8 pb-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 700px at 30% 0%, ${colors.light}, transparent 60%)` }} />
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <button onClick={onBack} className="text-sm mb-4 transition-colors hover:opacity-100" style={{ color: colors.primary, opacity: 0.85 }}> {tx("← العودة لدروس بايثون")} </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl" style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}>
              {lesson.id}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black" style={{ color: colors.primary, textShadow: `0 0 24px ${colors.light}` }}>
                {lesson.title}
              </h1>
              <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}>
              {tx(lesson.difficulty)}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {lesson.duration}
            </span>
            <span className="text-xs text-muted-foreground">{lesson.problems.length} {tx("مسألة حللية")}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-6 flex-1">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <LessonPracticePlan lessonId={lesson.id}/>
          {/* Objectives */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("أهداف الدرس")}</h3>
            </div>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: colors.primary }}>●</span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Theory */}
          {lesson.theorySections.map((section, i) => (
            <div key={i} className="glass-strong rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{section.title}</h3>
              </div>
              <div className="space-y-2">
                {section.content.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-foreground/90">{tx(p)}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Problems */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>{tx("المسائل المحلولة (")}{lesson.problems.length})</h3>
            <div className="space-y-4">
              {lesson.problems.map((problem, idx) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
                  className="glass-strong rounded-2xl overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                        #{problem.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base mb-1">{problem.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                      </div>
                    </div>

                    <AlgorithmSource problemId={problem.id}/>
                    {/* Steps */}
                    {problem.steps.length > 0 && (
                      <div className="mt-3 pr-11">
                        <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>{tx("خطوات الحل:")}</div>
                        <ol className="space-y-1">
                          {problem.steps.map((step, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span style={{ color: colors.primary }}>{i + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Flowchart */}
                    {problem.flowchart && (
                      <div className="mt-3 pr-11">
                        <div className="text-xs font-bold mb-2 flex items-center gap-1" style={{ color: colors.primary }}>
                          <GitBranch className="w-3.5 h-3.5" /> {tx("المخطط الانسيابي:")} </div>
                        <FlowchartRenderer data={problem.flowchart} accentColor={colors.primary} />
                      </div>
                    )}

                    {/* Example */}
                    {problem.example && (
                      <div className="mt-3 pr-11">
                        <div className="text-xs px-3 py-2 rounded-lg" style={{ background: `${colors.primary}08`, border: `1px solid ${colors.primary}20` }}>
                          <span className="font-bold" style={{ color: colors.primary }}>{tx("مثال:")} </span>
                          <span className="text-foreground">{tx("المدخل:")} {problem.example.input} {tx("→ الناتج:")} {problem.example.output}</span>
                        </div>
                      </div>
                    )}

                    {/* Python Code */}
                    <div className="mt-3 pr-11">
                      <div className="text-xs font-bold mb-2 flex items-center gap-1" style={{ color: colors.primary }}>
                        <Code2 className="w-3.5 h-3.5" /> {tx("كود بايثون:")} </div>
                      <pre dir="ltr" className="rounded-lg p-4 text-xs font-mono leading-relaxed overflow-x-auto" style={{ background: "rgba(5, 8, 22, 0.8)", border: `1px solid ${colors.primary}20`, color: "#e6f1ff" }}>
                        <code>{problem.pythonCode}</code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>{tx("نصائح")}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {lesson.tips.map((tip, i) => {
                const cfg = tip.type === "warning"
                  ? { icon: <AlertTriangle className="w-4 h-4" />, color: "#fbbf24", bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.3)" }
                  : tip.type === "success"
                  ? { icon: <CheckCircle2 className="w-4 h-4" />, color: "#34d399", bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.3)" }
                  : { icon: <Info className="w-4 h-4" />, color: "#22d3ee", bg: "rgba(34, 211, 238, 0.08)", border: "rgba(34, 211, 238, 0.3)" };
                return (
                  <div key={i} className="rounded-lg p-3" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span className="font-bold text-xs" style={{ color: cfg.color }}>{tip.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
