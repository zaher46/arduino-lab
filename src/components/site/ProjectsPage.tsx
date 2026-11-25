'use client';
import {useSettings} from './Preferences';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Clock, Wrench, Lightbulb, Target,
  CheckCircle2, AlertTriangle, Cpu, Zap, Code2,
} from "lucide-react";
import { curriculumFor, type Project } from "@/data/localized";
import { ComponentIcon } from "@/components/icons/ComponentIcons";

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

export default function ProjectsPage({ onBack }: Props) {
  const {t:tx,locale}=useSettings();

  const {projects}=curriculumFor(locale);
  const [selectedId,setSelectedId]=useState<number|null>(null);
  const selectedProject=projects.find(project=>project.id===selectedId);
  const [filter, setFilter] = useState<"all" | "مبتدئ" | "متوسط" | "متقدم">("all");

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.difficulty === filter);

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative pt-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-50" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(251, 191, 36, 0.15)" }} />

        <div className="container mx-auto px-4 md:px-8 relative">
          <button onClick={onBack} className="text-sm mb-4 transition-colors hover:opacity-100" style={{ color: "#fbbf24", opacity: 0.85 }}> {tx("← العودة إلى الرئيسية")} </button>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(251, 191, 36, 0.08)", border: "1px solid rgba(251, 191, 36, 0.25)" }}>
              <Target className="w-4 h-4" style={{ color: "#fbbf24" }} />
              <span className="text-sm font-medium" style={{ color: "#fbbf24" }}>{projects.length} {tx("مشروع نهائي")}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-3">
              <span className="text-gradient-amber-rose">{tx("قسم المشاريع")}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground"> {tx("مشاريع نهائية متكاملة مع الفكرة والقطع وخطوات التنفيذ والأكواد والنصائح")} </p>
          </div>

          {/* Filter */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {(["all", "مبتدئ", "متوسط", "متقدم"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={filter === f ? { background: "rgba(251, 191, 36, 0.2)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.4)" } : { color: "#7c8db5", border: "1px solid transparent" }}
              >
                {tx(f === "all" ? "الكل" : f)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-6 flex-1">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, idx) => {
              const colors = accentColorMap[project.accent];
              return (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => setSelectedId(project.id)}
                  whileHover={{ y: -6 }}
                  className="group relative text-right rounded-2xl p-6 transition-all duration-300 glass-strong overflow-hidden cursor-pointer"
                  style={{ borderColor: `${colors.primary}33` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${colors.light}, transparent 70%)` }} />

                  <div className="relative">
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                        {tx(project.difficulty)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {project.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 leading-tight">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{project.subtitle}</p>

                    {/* Sessions used */}
                    <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                      <span className="text-xs text-muted-foreground">{tx("الجلسات:")}</span>
                      {project.sessionsUsed.map(sId => (
                        <span key={sId} className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${colors.primary}10`, color: colors.primary }}>
                          {sId}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all" style={{ color: colors.primary }}> {tx("عرض التفاصيل ←")} </div>
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

// ===== Project Detail =====
function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const {t:tx,locale}=useSettings();

  const colors = accentColorMap[project.accent];
  const codeBlockColors: Record<string, string> = {
    cyan: "#22d3ee", violet: "#a855f7", amber: "#fbbf24", emerald: "#34d399", rose: "#fb7185",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative pt-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 700px at 30% 0%, ${colors.light}, transparent 60%)` }} />
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 md:px-8 relative">
          <button onClick={onBack} className="text-sm mb-4 transition-colors hover:opacity-100" style={{ color: colors.primary, opacity: 0.85 }}> {tx("← العودة لقائمة المشاريع")} </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}>
              {tx(project.difficulty)}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {project.duration}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: colors.primary, textShadow: `0 0 24px ${colors.light}` }}>
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4">{project.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-6 flex-1">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Idea */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("فكرة المشروع")}</h3>
            </div>
            <p className="text-sm leading-relaxed">{project.idea}</p>
          </div>

          {/* Description */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("الوصف")}</h3>
            </div>
            <p className="text-sm leading-relaxed">{project.description}</p>
          </div>

          {/* Components */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("القطع المطلوبة")}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.components.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: `${colors.primary}08` }}>
                  <span className="text-sm">{c.name}</span>
                  <span className="text-sm font-bold" style={{ color: colors.primary }}>{c.quantity}×</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wiring Notes */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("ملاحظات التوصيل")}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.wiringNotes}</p>
          </div>

          {/* Steps */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("خطوات التنفيذ")}</h3>
            </div>
            <div className="space-y-4">
              {project.steps.map((step, i) => (
                <div key={i} className="relative pr-8">
                  {i < project.steps.length - 1 && (
                    <div className="absolute top-8 right-[11px] bottom-0 w-0.5" style={{ background: `${colors.primary}30` }} />
                  )}
                  <div className="absolute right-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: colors.primary, color: "#050816" }}>
                    {step.step}
                  </div>
                  <div className="pb-2">
                    <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    {step.tip && (
                      <div className="mt-2 text-xs px-3 py-1.5 rounded-md inline-block" style={{ background: "rgba(251, 191, 36, 0.08)", color: "#fbbf24" }}>
                        💡 {step.tip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Description */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{tx("وصف الكود")}</h3>
            </div>
            <p className="text-sm leading-relaxed">{project.codeDescription}</p>
          </div>

          {/* Tips */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5" style={{ color: "#34d399" }} />
              <h3 className="text-lg font-bold" style={{ color: "#34d399" }}>{tx("نصائح مهمة")}</h3>
            </div>
            <ul className="space-y-2">
              {project.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: "#34d399" }}>✓</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="glass-strong rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: "#fbbf24" }} />
              <h3 className="text-lg font-bold" style={{ color: "#fbbf24" }}>{tx("تحديات إضافية")}</h3>
            </div>
            <ul className="space-y-2">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: "#fbbf24" }}>⚡</span>
                  <span className="leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
