'use client';
import {useSettings} from './Preferences';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Users,
  Target,
  Cpu,
  Zap,
  Battery,
  Code2,
  Wrench,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  ListChecks,
  BookOpen,
  PlayCircle,
} from "lucide-react";
import { ComponentIcon, componentLabels } from "@/components/icons/ComponentIcons";
import WiringAnimation from "./WiringAnimation";
import type { Session } from "@/data/localized";
import { WorkshopPractice } from "./WorkshopPractice";
import { curriculumFor } from "@/data/localized";

const accentColorMap: Record<Session["accent"], { primary: string; secondary: string; light: string }> = {
  cyan: { primary: "#22d3ee", secondary: "#67e8f9", light: "rgba(34, 211, 238, 0.18)" },
  violet: { primary: "#a855f7", secondary: "#c084fc", light: "rgba(168, 85, 247, 0.18)" },
  amber: { primary: "#fbbf24", secondary: "#fcd34d", light: "rgba(251, 191, 36, 0.18)" },
  emerald: { primary: "#34d399", secondary: "#6ee7b7", light: "rgba(52, 211, 153, 0.18)" },
  rose: { primary: "#fb7185", secondary: "#fda4af", light: "rgba(251, 113, 133, 0.18)" },
};

// Theory icon mapping (lucide icon names to components)
const theoryIconMap: Record<string, React.FC<any>> = {
  cpu: Cpu,
  zap: Zap,
  battery: Battery,
  code: Code2,
  "toggle-right": Target,
  "refresh-cw": Wrench,
  led: Lightbulb,
  button: PlayCircle,
  "git-branch": Wrench,
  box: Cpu,
  palette: Lightbulb,
  volume: Zap,
  layout: ListChecks,
  "toggle-left": Target,
  variable: Code2,
  monitor: BookOpen,
  grid: ListChecks,
  settings: Wrench,
  radar: Target,
  infrared: Zap,
  "git-pull-request": Wrench,
  ruler: Target,
  "git-merge": Wrench,
  mic: Zap,
  thermometer: Target,
  sun: Lightbulb,
  sliders: Wrench,
  map: Target,
  gamepad: Wrench,
  fan: Wrench,
  "rotate-cw": Wrench,
  cog: Wrench,
  footprints: Wrench,
  "git-compare": Wrench,
  rocket: Target,
  lightbulb: Lightbulb,
  bug: XCircle,
};

interface Props {
  session: Session;
  onBack: () => void;
  onSelectSession: (session: Session) => void;
}

type TabId = "overview" | "theory" | "wiring" | "code" | "mblock" | "practical" | "quiz";

export default function SessionPage({ session, onBack, onSelectSession }: Props) {
  const {t:tx,locale}=useSettings();

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const colors = accentColorMap[session.accent];

  const {sessions}=curriculumFor(locale);
  const nextSession = sessions.find(s=>s.id===session.id+1);
  const prevSession = sessions.find(s=>s.id===session.id-1);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "نظرة عامة", icon: <BookOpen className="w-4 h-4" /> },
    { id: "theory", label: "الشرح النظري", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "wiring", label: "التوصيل والأنميشن", icon: <Zap className="w-4 h-4" /> },
    { id: "code", label: "البرمجة", icon: <Code2 className="w-4 h-4" /> },
    { id: "mblock", label: "أكواد mBlock", icon: <Code2 className="w-4 h-4" /> },
    { id: "practical", label: "التطبيق العملي", icon: <Wrench className="w-4 h-4" /> },
    { id: "quiz", label: "اختبر نفسك", icon: <ListChecks className="w-4 h-4" /> },
  ];

  const tipConfig: Record<string, { icon: React.ReactNode; bg: string; border: string; color: string }> = {
    warning: { icon: <AlertTriangle className="w-5 h-5" />, bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.3)", color: "#fbbf24" },
    info: { icon: <Info className="w-5 h-5" />, bg: "rgba(34, 211, 238, 0.08)", border: "rgba(34, 211, 238, 0.3)", color: "#22d3ee" },
    success: { icon: <CheckCircle2 className="w-5 h-5" />, bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.3)", color: "#34d399" },
    danger: { icon: <XCircle className="w-5 h-5" />, bg: "rgba(244, 63, 94, 0.08)", border: "rgba(244, 63, 94, 0.3)", color: "#f43f5e" },
  };

  const codeBlockColors: Record<string, string> = {
    cyan: "#22d3ee",
    violet: "#a855f7",
    amber: "#fbbf24",
    emerald: "#34d399",
    rose: "#fb7185",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 700px at 30% 0%, ${colors.light}, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-grid bg-grid-fade pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 md:px-8 relative">
          {/* Breadcrumb / Back */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-100"
            style={{ color: colors.primary, opacity: 0.85 }}
          >
            <ArrowRight className="w-4 h-4" /> {tx("العودة إلى كل الجلسات")} </button>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-3 py-1 rounded-lg text-xs font-bold"
                  style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}
                > {tx("جلسة")} {session.id} / 15
                </div>
                <div
                  className="px-3 py-1 rounded-lg text-xs font-bold"
                  style={{ background: colors.light, color: colors.primary }}
                >
                  {session.badge}
                </div>
                <div className="px-3 py-1 rounded-lg text-xs" style={{ background: "rgba(124, 141, 181, 0.1)", color: "#7c8db5" }}>
                  {tx(session.difficulty)}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight">
                <span style={{ color: colors.primary, textShadow: `0 0 24px ${colors.light}` }}>
                  {session.title}
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-5">
                {session.subtitle}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5" style={{ color: colors.primary }}>
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{tx("10-14 سنة")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Cpu className="w-4 h-4" />
                  <span>{session.components.length} {tx("قطعة")}</span>
                </div>
              </div>
            </motion.div>

            {/* Big component icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-50 animate-pulse-glow rounded-full" style={{ background: colors.primary }} />
                <div className="relative animate-float-slow" style={{ color: colors.primary }}>
                  <ComponentIcon name={session.icon} size={140} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TABS ===== */}
      <div className="sticky top-0 z-30 backdrop-blur-md border-y border-border" style={{ background: "rgba(5, 8, 22, 0.85)" }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all"
                style={
                  activeTab === tab.id
                    ? { background: `${colors.primary}20`, color: colors.primary, border: `1px solid ${colors.primary}40` }
                    : { color: "#7c8db5", border: "1px solid transparent" }
                }
              >
                {tab.icon}
                {tx(tab.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <section className="py-10 flex-1">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* ============= OVERVIEW ============= */}
              {activeTab === "overview" && <WorkshopPractice sessionId={session.id}/>}
          {activeTab === "overview" && (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Objectives */}
                  <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5" style={{ color: colors.primary }} />
                      <h2 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("أهداف الجلسة")}</h2>
                    </div>
                    <ul className="space-y-3">
                      {session.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Components list */}
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Cpu className="w-5 h-5" style={{ color: colors.primary }} />
                      <h2 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("القطع المستخدمة")}</h2>
                    </div>
                    <div className="space-y-3">
                      {session.components.map((c) => (
                        <div key={c} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: `${colors.primary}08` }}>
                          <div style={{ color: colors.primary }}>
                            <ComponentIcon name={c} size={32} />
                          </div>
                          <span className="text-sm font-medium">{tx(componentLabels[c])}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hour breakdown */}
                  <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">
                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="font-bold" style={{ color: colors.primary }}>{tx("الساعة الأولى — الشرح النظري")}</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {session.firstHourTopics.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: colors.primary }}>•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="font-bold" style={{ color: colors.primary }}>{tx("الساعة الثانية — التطبيق العملي")}</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {session.secondHourTopics.map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span style={{ color: colors.primary }}>•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Project highlight */}
                  <div className="lg:col-span-3 rounded-2xl p-6 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${colors.light}, transparent)`, border: `1px solid ${colors.primary}30` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${colors.primary}20`, color: colors.primary }}>
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold mb-1" style={{ color: colors.primary }}>{tx("المشروع التطبيقي للجلسة")}</div>
                        <h3 className="text-lg font-bold mb-2">{session.project.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{session.project.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============= THEORY ============= */}
              {activeTab === "theory" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {session.theorySections.map((section, idx) => {
                    const IconComp = theoryIconMap[section.icon] || BookOpen;
                    return (
                      <div key={idx} className="glass-strong rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${colors.primary}15`, color: colors.primary, border: `1px solid ${colors.primary}30` }}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>
                            {section.title}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {section.content.map((p, i) => (
                            <p key={i} className="text-sm md:text-base leading-relaxed text-foreground/90">
                              {tx(p)}
                            </p>
                          ))}
                        </div>

                        {/* Key terms */}
                        {section.keyTerms && section.keyTerms.length > 0 && (
                          <div className="mt-5 pt-5 border-t border-border/40">
                            <div className="text-xs font-bold mb-3" style={{ color: colors.primary }}>{tx("مصطلحات رئيسية")}</div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {section.keyTerms.map((kt, i) => (
                                <div key={i} className="rounded-lg p-3" style={{ background: `${colors.primary}08`, border: `1px solid ${colors.primary}20` }}>
                                  <div className="font-bold text-sm mb-1" style={{ color: colors.primary }}>{kt.term}</div>
                                  <div className="text-xs text-muted-foreground leading-relaxed">{kt.definition}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ============= WIRING ============= */}
              {activeTab === "wiring" && (
                <div className="space-y-6 max-w-5xl mx-auto">
                  {/* Animation */}
                  <WiringAnimation components={session.components} accent={session.accent} />

                  {/* Steps */}
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="w-5 h-5" style={{ color: colors.primary }} />
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("خطوات التوصيل")}</h3>
                    </div>
                    <div className="space-y-4">
                      {session.wiringSteps.map((step, i) => (
                        <div key={i} className="relative pr-8">
                          {/* Vertical line */}
                          {i < session.wiringSteps.length - 1 && (
                            <div className="absolute top-8 right-[11px] bottom-0 w-0.5" style={{ background: `${colors.primary}30` }} />
                          )}
                          {/* Step number */}
                          <div
                            className="absolute right-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: colors.primary, color: "#050816" }}
                          >
                            {step.step}
                          </div>
                          <div className="pb-2">
                            <h4 className="font-bold mb-1">{step.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{step.description}</p>
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span className="px-2 py-0.5 rounded-md" style={{ background: `${colors.primary}10`, color: colors.primary }}> {tx("من:")} {step.from}
                              </span>
                              <ArrowLeft className="w-3 h-3 text-muted-foreground" />
                              <span className="px-2 py-0.5 rounded-md" style={{ background: `${colors.primary}10`, color: colors.primary }}> {tx("إلى:")} {step.to}
                              </span>
                            </div>
                            {step.note && (
                              <div className="mt-2 text-xs px-3 py-1.5 rounded-md inline-block" style={{ background: "rgba(251, 191, 36, 0.08)", color: "#fbbf24" }}>
                                💡 {step.note}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ============= CODE ============= */}
              {activeTab === "code" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {session.codeGroups.map((group, gi) => (
                    <div key={gi} className="glass-strong rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{group.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{group.description}</p>

                      {group.blocks.length === 0 ? (
                        <div className="rounded-xl p-6 text-center" style={{ background: `${colors.primary}08`, border: `1px dashed ${colors.primary}30` }}>
                          <Info className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                          <p className="text-sm text-muted-foreground"> {tx("لا يوجد كود في هذه الجلسة — التركيز على الدائرة الكهربائية فقط.")} </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {group.blocks.map((block, bi) => {
                            const blockColor = codeBlockColors[block.color];
                            return (
                              <motion.div
                                key={bi}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: bi * 0.08 }}
                                className="flex items-stretch gap-3 rounded-xl overflow-hidden"
                                style={{ background: `${blockColor}08`, border: `1px solid ${blockColor}25` }}
                              >
                                {/* Notch on the right (RTL) like puzzle block */}
                                <div
                                  className="flex-shrink-0 w-2"
                                  style={{ background: blockColor, boxShadow: `0 0 12px ${blockColor}80` }}
                                />
                                <div className="flex-1 p-4">
                                  <div
                                    className="font-mono text-sm font-bold mb-1"
                                    style={{ color: blockColor }}
                                  >
                                    {block.label}
                                  </div>
                                  <div className="text-xs text-muted-foreground leading-relaxed">{block.description}</div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ============= MBLOCK ============= */}
              {activeTab === "mblock" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {session.mblockCode && session.mblockCode.length > 0 ? (
                    session.mblockCode.map((group, gi) => (
                      <div key={gi} className="glass-strong rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-3">
                          <Code2 className="w-5 h-5" style={{ color: colors.primary }} />
                          <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{group.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{group.description}</p>
                        {group.blocks.length > 0 ? (
                          <div className="space-y-2">
                            {group.blocks.map((block, bi) => {
                              const blockColor = codeBlockColors[block.color];
                              return (
                                <motion.div
                                  key={bi}
                                  initial={{ opacity: 0, x: 20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.3, delay: bi * 0.08 }}
                                  className="flex items-stretch gap-3 rounded-xl overflow-hidden"
                                  style={{ background: `${blockColor}08`, border: `1px solid ${blockColor}25` }}
                                >
                                  <div className="flex-shrink-0 w-2" style={{ background: blockColor, boxShadow: `0 0 12px ${blockColor}80` }} />
                                  <div className="flex-1 p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${blockColor}20`, color: blockColor }}>mBlock</span>
                                      <div className="font-bold text-sm" style={{ color: blockColor }}>{block.arabicLabel}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed mt-1">{block.description}</div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="rounded-xl p-6 text-center" style={{ background: `${colors.primary}08`, border: `1px dashed ${colors.primary}30` }}>
                            <p className="text-sm text-muted-foreground">{tx("هذه الجلسة لا تحتوي على أكواد mBlock برمجية.")}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="glass-strong rounded-2xl p-8 text-center">
                      <Code2 className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: colors.primary }} />
                      <p className="text-sm text-muted-foreground">{tx("لا توجد أكواد mBlock لهذه الجلسة بعد.")}</p>
                    </div>
                  )}

                  {/* Enriched Content */}
                  {session.enrichedContent && (
                    <>
                      {session.enrichedContent.realWorldExamples.length > 0 && (
                        <div className="glass-strong rounded-2xl p-6 md:p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-5 h-5" style={{ color: colors.primary }} />
                            <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("أمثلة من الواقع")}</h3>
                          </div>
                          <ul className="space-y-2">
                            {session.enrichedContent.realWorldExamples.map((ex, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                                <span style={{ color: colors.primary }}>🌍</span>
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {session.enrichedContent.deepDive && session.enrichedContent.deepDive.length > 0 && (
                        <div className="glass-strong rounded-2xl p-6 md:p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-5 h-5" style={{ color: colors.primary }} />
                            <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("تعمق أكثر")}</h3>
                          </div>
                          {session.enrichedContent.deepDive.map((dive, i) => (
                            <div key={i} className="mb-4 last:mb-0">
                              <h4 className="font-bold text-sm mb-2" style={{ color: colors.primary }}>{dive.title}</h4>
                              {dive.content.map((p, j) => (
                                <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-1">{tx(p)}</p>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      {session.enrichedContent.troubleshooting && session.enrichedContent.troubleshooting.length > 0 && (
                        <div className="glass-strong rounded-2xl p-6 md:p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5" style={{ color: "#fbbf24" }} />
                            <h3 className="text-xl font-bold" style={{ color: "#fbbf24" }}>{tx("حل المشكلات الشائعة")}</h3>
                          </div>
                          <div className="space-y-3">
                            {session.enrichedContent.troubleshooting.map((t, i) => (
                              <div key={i} className="rounded-lg p-4" style={{ background: "rgba(251, 191, 36, 0.06)", border: "1px solid rgba(251, 191, 36, 0.15)" }}>
                                <div className="font-bold text-sm mb-1" style={{ color: "#fbbf24" }}>{tx("⚠️ المشكلة:")} {t.problem}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed">{tx("✅ الحل:")} {t.solution}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ============= PRACTICAL ============= */}
              {activeTab === "practical" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* Steps */}
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Wrench className="w-5 h-5" style={{ color: colors.primary }} />
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("خطوات التطبيق العملي")}</h3>
                    </div>
                    <div className="space-y-4">
                      {session.practicalSteps.map((step, i) => (
                        <div
                          key={i}
                          className="rounded-xl p-5"
                          style={{ background: `${colors.primary}06`, border: `1px solid ${colors.primary}20` }}
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                              style={{ background: colors.primary, color: "#050816" }}
                            >
                              {step.step}
                            </div>
                            <h4 className="font-bold text-base pt-1">{step.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-2 pr-11">{step.description}</p>
                          {step.observation && (
                            <div className="pr-11 mt-2">
                              <div
                                className="rounded-lg px-3 py-2 text-xs"
                                style={{ background: "rgba(52, 211, 153, 0.08)", border: "1px solid rgba(52, 211, 153, 0.2)", color: "#34d399" }}
                              >
                                <span className="font-bold">{tx("🔍 الملاحظة المتوقعة:")}</span> {step.observation}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5" style={{ color: colors.primary }} />
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("نصائح وأخطاء شائعة")}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {session.tips.map((tip, i) => {
                        const cfg = tipConfig[tip.type];
                        return (
                          <div
                            key={i}
                            className="rounded-xl p-4"
                            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div style={{ color: cfg.color }}>{cfg.icon}</div>
                              <h4 className="font-bold text-sm" style={{ color: cfg.color }}>{tip.title}</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-foreground/80">{tip.content}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ============= QUIZ ============= */}
              {activeTab === "quiz" && (
                <div className="max-w-3xl mx-auto">
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <ListChecks className="w-5 h-5" style={{ color: colors.primary }} />
                        <h3 className="text-xl font-bold" style={{ color: colors.primary }}>{tx("اختبر فهمك")}</h3>
                      </div>
                      <div className="text-xs text-muted-foreground">{session.quiz.length} {tx("أسئلة")}</div>
                    </div>

                    <div className="space-y-6">
                      {session.quiz.map((q, qi) => {
                        const selected = quizAnswers[qi];
                        const showResult = quizSubmitted;
                        return (
                          <div key={qi} className="rounded-xl p-5" style={{ background: `${colors.primary}06`, border: `1px solid ${colors.primary}20` }}>
                            <div className="flex items-start gap-3 mb-3">
                              <div
                                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                                style={{ background: colors.primary, color: "#050816" }}
                              >
                                {qi + 1}
                              </div>
                              <h4 className="font-bold text-sm md:text-base pt-0.5">{q.question}</h4>
                            </div>
                            <div className="space-y-2 pr-10">
                              {q.options.map((opt, oi) => {
                                const isSelected = selected === oi;
                                const isCorrect = oi === q.correctAnswer;
                                let style: React.CSSProperties = {
                                  background: "transparent",
                                  border: `1px solid ${colors.primary}20`,
                                  color: "#c7e7ff",
                                };
                                if (isSelected && !showResult) {
                                  style = { background: `${colors.primary}15`, border: `1px solid ${colors.primary}`, color: colors.primary };
                                }
                                if (showResult) {
                                  if (isCorrect) {
                                    style = { background: "rgba(52, 211, 153, 0.12)", border: "1px solid #34d399", color: "#34d399" };
                                  } else if (isSelected) {
                                    style = { background: "rgba(244, 63, 94, 0.12)", border: "1px solid #f43f5e", color: "#f43f5e" };
                                  }
                                }
                                return (
                                  <button
                                    key={oi}
                                    onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                                    disabled={quizSubmitted}
                                    className="w-full text-right rounded-lg px-4 py-2.5 text-sm transition-all hover:opacity-90 flex items-center gap-2"
                                    style={style}
                                  >
                                    <span className="font-bold text-xs flex-shrink-0">{["أ", "ب", "ج", "د"][oi]}</span>
                                    <span className="flex-1">{opt}</span>
                                    {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                                    {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 flex-shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                            {showResult && (
                              <div className="pr-10 mt-3">
                                <div className="rounded-lg px-3 py-2 text-xs" style={{ background: `${colors.primary}10`, border: `1px solid ${colors.primary}30`, color: colors.primary }}>
                                  <span className="font-bold">{tx("💡 الشرح:")}</span> {q.explanation}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit / Score */}
                    {!quizSubmitted ? (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(quizAnswers).length !== session.quiz.length}
                        className="mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          color: "#050816",
                        }}
                      > {tx("عرض النتيجة")} </button>
                    ) : (
                      <div className="mt-6 rounded-xl p-5 text-center" style={{ background: `${colors.primary}10`, border: `1px solid ${colors.primary}40` }}>
                        <div className="text-3xl font-black mb-1" style={{ color: colors.primary }}>
                          {Object.entries(quizAnswers).filter(([qi, ans]) => session.quiz[Number(qi)].correctAnswer === ans).length} / {session.quiz.length}
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {tx(Object.entries(quizAnswers).filter(([qi, ans]) => session.quiz[Number(qi)].correctAnswer === ans).length === session.quiz.length
                            ? "🎉 ممتاز! أتقنت هذه الجلسة"
                            : "أحسنت! راجع الإجابات أعلاه للتعلم منها")}
                        </div>
                        <button
                          onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                          className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                          style={{ background: `${colors.primary}20`, color: colors.primary, border: `1px solid ${colors.primary}` }}
                        > {tx("إعادة الاختبار")} </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== NAVIGATION FOOTER ===== */}
      <section className="py-10 border-t border-border" style={{ background: "rgba(11, 20, 38, 0.4)" }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Prev */}
            {prevSession ? (
              <button
                onClick={() => { onSelectSession(prevSession); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="glass rounded-2xl p-5 text-right transition-all hover:scale-[1.01] flex items-center gap-3"
                style={{ borderColor: `${accentColorMap[prevSession.accent].primary}30` }}
              >
                <ArrowRight className="w-5 h-5 flex-shrink-0" style={{ color: accentColorMap[prevSession.accent].primary }} />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{tx("الجلسة السابقة")}</div>
                  <div className="font-bold text-sm" style={{ color: accentColorMap[prevSession.accent].primary }}>
                    {prevSession.id}. {prevSession.title}
                  </div>
                </div>
              </button>
            ) : <div />}

            {/* Next */}
            {nextSession ? (
              <button
                onClick={() => { onSelectSession(nextSession); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="glass rounded-2xl p-5 text-left transition-all hover:scale-[1.01] flex items-center gap-3"
                style={{ borderColor: `${accentColorMap[nextSession.accent].primary}30`, direction: "ltr" }}
              >
                <div style={{ direction: "rtl", textAlign: "right" }}>
                  <div className="text-xs text-muted-foreground mb-1">{tx("الجلسة التالية")}</div>
                  <div className="font-bold text-sm" style={{ color: accentColorMap[nextSession.accent].primary }}>
                    {nextSession.id}. {nextSession.title}
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 flex-shrink-0 mr-auto" style={{ color: accentColorMap[nextSession.accent].primary }} />
              </button>
            ) : (
              <div className="glass rounded-2xl p-5 text-center" style={{ borderColor: `${colors.primary}30` }}>
                <div className="text-sm font-bold mb-1" style={{ color: colors.primary }}> {tx("🎉 مبروك! أكملت آخر جلسة")} </div>
                <div className="text-xs text-muted-foreground"> {tx("الآن حان وقت مشروعك الخاص!")} </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
