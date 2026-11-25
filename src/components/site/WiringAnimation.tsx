'use client';
import {useSettings} from './Preferences';

import { useState, useEffect } from "react";
import { ComponentIcon } from "@/components/icons/ComponentIcons";
import type { ComponentKey } from "@/data/sessions";

interface Props {
  components: ComponentKey[];
  accent: "cyan" | "violet" | "amber" | "emerald" | "rose";
}

const accentColorMap: Record<Props["accent"], { primary: string; secondary: string; light: string }> = {
  cyan: { primary: "#22d3ee", secondary: "#67e8f9", light: "rgba(34, 211, 238, 0.18)" },
  violet: { primary: "#a855f7", secondary: "#c084fc", light: "rgba(168, 85, 247, 0.18)" },
  amber: { primary: "#fbbf24", secondary: "#fcd34d", light: "rgba(251, 191, 36, 0.18)" },
  emerald: { primary: "#34d399", secondary: "#6ee7b7", light: "rgba(52, 211, 153, 0.18)" },
  rose: { primary: "#fb7185", secondary: "#fda4af", light: "rgba(251, 113, 133, 0.18)" },
};

export default function WiringAnimation({ components, accent }: Props) {
  const {t:tx,locale}=useSettings();

  const [powered, setPowered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const colors = accentColorMap[accent];

  useEffect(() => {
    if (!powered) {
      return;
    }
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 400);
    return () => clearInterval(interval);
  }, [powered]);

  const handleTogglePower = () => {
    if (!powered) {
      setActiveStep(0);
    }
    setPowered(!powered);
  };

  // Pick a sensible subset for the animation
  const hasArduino = components.includes("arduino");
  const hasBreadboard = components.includes("breadboard");
  const hasLed = components.find(c => c.startsWith("led")) || components.includes("rgbLed");
  const hasResistor = components.includes("resistor");
  const hasButton = components.includes("pushButton");
  const hasBuzzer = components.includes("buzzer");
  const hasSensor = components.find(c => ["irSensor", "ultrasonic", "soundSensor", "dht", "ldr"].includes(c));
  const hasMotor = components.find(c => ["dcMotor", "servo", "stepper"].includes(c));

  return (
    <div
      className="rounded-2xl p-6 md:p-8 glass-strong relative overflow-hidden"
      style={{ borderColor: `${colors.primary}33` }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-1" style={{ color: colors.primary }}> {tx("محاكاة تدفق التيار الكهربائي")} </h3>
          <p className="text-sm text-muted-foreground"> {tx("اضغط على زر التشغيل لرؤية كيف يسري التيار من الموجب عبر القطع إلى السالب")} </p>
        </div>
        <button
          onClick={handleTogglePower}
          className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{
            background: powered ? "rgba(244, 63, 94, 0.18)" : `${colors.primary}22`,
            color: powered ? "#fb7185" : colors.primary,
            border: `1px solid ${powered ? "#fb7185" : colors.primary}`,
            boxShadow: powered ? "none" : `0 0 18px ${colors.light}`,
          }}
        >
          {tx(powered ? "⏸ إيقاف" : "▶ تشغيل المحاكاة")}
        </button>
      </div>

      {/* SVG Circuit */}
      <div className="relative rounded-xl overflow-hidden bg-grid" style={{ background: "rgba(5, 8, 22, 0.6)" }}>
        <svg viewBox="0 0 600 360" className="w-full h-auto" style={{ minHeight: "280px" }}>
          <defs>
            <linearGradient id={`wire-${accent}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colors.secondary} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0.9" />
            </linearGradient>
            <filter id={`glow-${accent}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="power-source">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Power source halo when on */}
          {powered && (
            <circle cx="80" cy="180" r="60" fill="url(#power-source)" className="animate-pulse" />
          )}

          {/* Wires (animated current) */}
          {/* Top wire from battery + */}
          <path
            d="M 100 180 L 100 80 L 200 80"
            stroke={powered ? colors.primary : "#475569"}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={powered ? 0.4 : 0.5}
          />
          {powered && (
            <path
              d="M 100 180 L 100 80 L 200 80"
              stroke={colors.secondary}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter={`url(#glow-${accent})`}
              className="animate-current"
            />
          )}

          {/* Right side from first component to second */}
          <path
            d="M 320 80 L 400 80"
            stroke={powered ? colors.primary : "#475569"}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={powered ? 0.4 : 0.5}
          />
          {powered && (
            <path
              d="M 320 80 L 400 80"
              stroke={colors.secondary}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter={`url(#glow-${accent})`}
              className="animate-current"
            />
          )}

          {/* Right down */}
          <path
            d="M 500 80 L 540 80 L 540 180"
            stroke={powered ? colors.primary : "#475569"}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={powered ? 0.4 : 0.5}
          />
          {powered && (
            <path
              d="M 500 80 L 540 80 L 540 180"
              stroke={colors.secondary}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter={`url(#glow-${accent})`}
              className="animate-current"
            />
          )}

          {/* Bottom return to battery - */}
          <path
            d="M 540 220 L 540 280 L 100 280 L 100 220"
            stroke={powered ? colors.primary : "#475569"}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity={powered ? 0.4 : 0.5}
          />
          {powered && (
            <path
              d="M 540 220 L 540 280 L 100 280 L 100 220"
              stroke={colors.secondary}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter={`url(#glow-${accent})`}
              className="animate-current"
            />
          )}

          {/* Battery / Power source (left) */}
          <g>
            <rect x="60" y="170" width="40" height="60" rx="4" fill="#1f2937" stroke={colors.primary} strokeWidth="2" />
            <rect x="100" y="185" width="6" height="30" rx="1" fill="#9ca3af" />
            <text x="80" y="205" fontSize="11" fill={colors.primary} textAnchor="middle" fontWeight="bold">9V</text>
            <text x="80" y="165" fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="bold">+</text>
            <text x="80" y="245" fontSize="10" fill="#3b82f6" textAnchor="middle" fontWeight="bold">−</text>
          </g>

          {/* Component 1 (top-left): usually Arduino */}
          {hasArduino ? (
            <g transform="translate(200, 60)">
              <rect x="0" y="0" width="120" height="40" rx="4" fill="#0d7c66" stroke={colors.primary} strokeWidth="1.5" />
              <text x="60" y="25" fontSize="10" fill="#ffffff" textAnchor="middle" fontWeight="bold">ARDUINO</text>
              {/* Status LED */}
              <circle cx="100" cy="20" r="3" fill={powered ? colors.primary : "#374151"} className={powered ? "animate-led-blink" : ""} style={{ color: colors.primary }} />
            </g>
          ) : (
            <g transform="translate(200, 60)">
              <rect x="0" y="0" width="120" height="40" rx="4" fill="#1f2937" stroke={colors.primary} strokeWidth="1.5" />
              <text x="60" y="25" fontSize="10" fill={colors.primary} textAnchor="middle">SOURCE</text>
            </g>
          )}

          {/* Component 2 (top-right): LED or sensor or motor */}
          <g transform="translate(400, 60)">
            {hasLed ? (
              <>
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#0f1830" stroke={colors.primary} strokeWidth="1.5" />
                <circle cx="50" cy="20" r="12" fill={powered ? colors.primary : "#1f2937"} opacity={powered ? 0.9 : 0.4} className={powered ? "" : ""} style={{ filter: powered ? `drop-shadow(0 0 8px ${colors.primary})` : "none" }} />
                <circle cx="50" cy="20" r="6" fill={powered ? colors.secondary : "#374151"} />
                <text x="50" y="38" fontSize="8" fill={colors.primary} textAnchor="middle">LED</text>
              </>
            ) : hasBuzzer ? (
              <>
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#0f1830" stroke={colors.primary} strokeWidth="1.5" />
                <circle cx="50" cy="20" r="12" fill="#1f2937" stroke={colors.primary} strokeWidth="1.5" />
                <text x="50" y="25" fontSize="9" fill={colors.primary} textAnchor="middle">BUZZER</text>
                {powered && (
                  <g stroke={colors.primary} strokeWidth="1" fill="none" opacity="0.8">
                    <path d="M 36 14 Q 33 20 36 26" />
                    <path d="M 64 14 Q 67 20 64 26" />
                  </g>
                )}
              </>
            ) : hasSensor ? (
              <>
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#0f1830" stroke={colors.primary} strokeWidth="1.5" />
                <circle cx="35" cy="20" r="6" fill="#1f2937" stroke={colors.primary} strokeWidth="1" />
                <circle cx="65" cy="20" r="6" fill="#1f2937" stroke={colors.primary} strokeWidth="1" />
                <text x="50" y="36" fontSize="8" fill={colors.primary} textAnchor="middle">SENSOR</text>
              </>
            ) : hasMotor ? (
              <>
                <rect x="0" y="0" width="100" height="40" rx="4" fill="#0f1830" stroke={colors.primary} strokeWidth="1.5" />
                <circle cx="50" cy="20" r="14" fill="#1f2937" stroke={colors.primary} strokeWidth="1.5" />
                <g transform={`translate(50, 20) rotate(${powered ? activeStep * 60 : 0})`} style={{ transition: "transform 0.3s linear" }}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke={colors.primary} strokeWidth="2" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke={colors.primary} strokeWidth="2" />
                </g>
                <text x="50" y="36" fontSize="8" fill={colors.primary} textAnchor="middle">MOTOR</text>
              </>
            ) : (
              <rect x="0" y="0" width="100" height="40" rx="4" fill="#0f1830" stroke={colors.primary} strokeWidth="1.5" />
            )}
          </g>

          {/* Resistor in the middle (if any) */}
          {hasResistor && (
            <g transform="translate(260, 200)">
              <rect x="0" y="0" width="80" height="14" rx="3" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
              <rect x="10" y="0" width="3" height="14" fill="#1f2937" />
              <rect x="20" y="0" width="3" height="14" fill="#7c2d12" />
              <rect x="30" y="0" width="3" height="14" fill="#dc2626" />
              <rect x="60" y="0" width="3" height="14" fill="#fbbf24" />
              <text x="40" y="30" fontSize="8" fill={colors.primary} textAnchor="middle">220Ω</text>
            </g>
          )}

          {/* Push button indicator */}
          {hasButton && (
            <g transform="translate(420, 200)">
              <circle cx="20" cy="0" r="14" fill={powered ? "#ef4444" : "#dc2626"} opacity={powered ? 1 : 0.7} />
              <circle cx="20" cy="0" r="10" fill={powered ? "#f87171" : "#ef4444"} />
              <text x="20" y="30" fontSize="8" fill={colors.primary} textAnchor="middle">BUTTON</text>
            </g>
          )}

          {/* Component tags / labels */}
          <text x="80" y="320" fontSize="10" fill={colors.primary} textAnchor="middle" fontWeight="bold">{tx("المصدر")}</text>
          <text x="260" y="320" fontSize="10" fill={colors.primary} textAnchor="middle" fontWeight="bold">{tx("التحكم")}</text>
          <text x="450" y="320" fontSize="10" fill={colors.primary} textAnchor="middle" fontWeight="bold">{tx("المخرَج")}</text>

          {/* Animated electron particles */}
          {powered && [0, 1, 2, 3].map(i => (
            <circle
              key={i}
              r="3"
              fill={colors.secondary}
              filter={`url(#glow-${accent})`}
              opacity={Math.max(0, 1 - Math.abs((activeStep - i) / 4))}
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path="M 100 180 L 100 80 L 200 80 L 320 80 L 400 80 L 500 80 L 540 80 L 540 180 L 540 220 L 540 280 L 100 280 L 100 220 Z"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Status indicators */}
      <div className="grid grid-cols-3 gap-3 mt-5 text-center">
        <div className="rounded-lg p-3" style={{ background: `${colors.primary}11`, border: `1px solid ${colors.primary}33` }}>
          <div className="text-xs text-muted-foreground mb-1">{tx("حالة الدائرة")}</div>
          <div className="font-bold text-sm" style={{ color: powered ? colors.primary : "#64748b" }}>
            {tx(powered ? "مغلقة ✓" : "مفتوحة")}
          </div>
        </div>
        <div className="rounded-lg p-3" style={{ background: `${colors.primary}11`, border: `1px solid ${colors.primary}33` }}>
          <div className="text-xs text-muted-foreground mb-1">{tx("التيار")}</div>
          <div className="font-bold text-sm" style={{ color: powered ? colors.primary : "#64748b" }}>
            {tx(powered ? "يسري بنجاح" : "متوقف")}
          </div>
        </div>
        <div className="rounded-lg p-3" style={{ background: `${colors.primary}11`, border: `1px solid ${colors.primary}33` }}>
          <div className="text-xs text-muted-foreground mb-1">{tx("المخرَج")}</div>
          <div className="font-bold text-sm" style={{ color: powered ? colors.primary : "#64748b" }}>
            {tx(powered ? "يعمل ✓" : "متوقف")}
          </div>
        </div>
      </div>

      {/* Mini component preview icons */}
      {components.length > 0 && (
        <div className="mt-5 pt-5 border-t border-border">
          <div className="text-xs text-muted-foreground mb-3">{tx("القطع المستخدمة في هذه الدائرة:")}</div>
          <div className="flex flex-wrap gap-3">
            {components.slice(0, 6).map((c) => (
              <div key={c} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: `${colors.primary}11`, border: `1px solid ${colors.primary}33` }}>
                <ComponentIcon name={c} size={20} />
                <span className="text-xs font-medium" style={{ color: colors.primary }}>
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
