import type { ComponentKey } from "@/data/sessions";

interface IconProps {
  className?: string;
  size?: number;
}

// Helper for SVG wrapper with neon glow
function SvgWrap({ children, className, size = 64, viewBox = "0 0 64 64" }: { children: React.ReactNode; className?: string; size?: number; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 8px 10px rgba(0,0,0,.22))" }}
    >
      {children}
    </svg>
  );
}

// ===== ARDUINO BOARD =====
export function ArduinoIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 80 56">
      <rect x="2" y="6" width="76" height="44" rx="4" fill="#0d7c66" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="6" y="10" width="32" height="14" rx="2" fill="#0a4a3a" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
      <rect x="6" y="28" width="20" height="14" rx="1" fill="#0a4a3a" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
      {/* USB port */}
      <rect x="50" y="10" width="22" height="12" rx="1" fill="#9ca3af" stroke="#e5e7eb" strokeWidth="0.8" />
      <rect x="54" y="13" width="14" height="6" fill="#1f2937" />
      {/* Power jack */}
      <rect x="56" y="28" width="16" height="10" rx="5" fill="#374151" stroke="#6b7280" strokeWidth="0.8" />
      <circle cx="64" cy="33" r="2.5" fill="#1f2937" />
      {/* Header pins */}
      <g fill="#1f2937" stroke="#fbbf24" strokeWidth="0.4">
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <rect key={`top-${i}`} x={8 + i*3} y={4} width="2" height="3" />
        ))}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <rect key={`bot-${i}`} x={8 + i*3} y={50} width="2" height="3" />
        ))}
      </g>
      {/* Main chip */}
      <rect x="28" y="22" width="14" height="14" rx="1" fill="#1f2937" stroke="#a855f7" strokeWidth="0.8" />
      <text x="35" y="31" fontSize="4" fill="#a855f7" textAnchor="middle" fontFamily="monospace">UNO</text>
      {/* LEDs */}
      <circle cx="44" cy="48" r="1.5" fill="#34d399" />
      <circle cx="48" cy="48" r="1.5" fill="#fbbf24" />
    </SvgWrap>
  );
}

// ===== BREADBOARD =====
export function BreadboardIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 80 56">
      <rect x="2" y="4" width="76" height="48" rx="3" fill="#f3f4f6" stroke="#22d3ee" strokeWidth="1.5" />
      {/* Power rails */}
      <line x1="2" y1="10" x2="78" y2="10" stroke="#ef4444" strokeWidth="0.6" opacity="0.7" />
      <line x1="2" y1="12" x2="78" y2="12" stroke="#3b82f6" strokeWidth="0.6" opacity="0.7" />
      <line x1="2" y1="44" x2="78" y2="44" stroke="#ef4444" strokeWidth="0.6" opacity="0.7" />
      <line x1="2" y1="46" x2="78" y2="46" stroke="#3b82f6" strokeWidth="0.6" opacity="0.7" />
      {/* Hole grid */}
      <g fill="#cbd5e1">
        {Array.from({length: 10}).map((_, row) =>
          Array.from({length: 26}).map((_, col) => (
            <circle key={`${row}-${col}`} cx={4 + col*2.9} cy={16 + row*2.8} r="0.6" />
          ))
        )}
      </g>
      {/* Center gap */}
      <line x1="2" y1="28" x2="78" y2="28" stroke="#94a3b8" strokeWidth="0.3" strokeDasharray="2 2" />
    </SvgWrap>
  );
}

// ===== LED =====
export function LedIcon({ className, size, color = "#22d3ee" }: IconProps & { color?: string }) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 40 56" >
      {/* Bulb */}
      <ellipse cx="20" cy="16" rx="10" ry="12" fill={color} opacity="0.25" />
      <ellipse cx="20" cy="16" rx="8" ry="10" fill={color} opacity="0.6" />
      <ellipse cx="20" cy="16" rx="6" ry="8" fill={color} />
      {/* Highlight */}
      <ellipse cx="17" cy="12" rx="2" ry="3" fill="#ffffff" opacity="0.6" />
      {/* Base */}
      <rect x="14" y="26" width="12" height="6" rx="1" fill="#9ca3af" />
      {/* Leads */}
      <line x1="16" y1="32" x2="16" y2="52" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="24" y1="32" x2="24" y2="46" stroke="#cbd5e1" strokeWidth="1.5" />
    </SvgWrap>
  );
}

// ===== RESISTOR =====
export function ResistorIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 80 24">
      {/* Leads */}
      <line x1="2" y1="12" x2="20" y2="12" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="60" y1="12" x2="78" y2="12" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Body */}
      <rect x="20" y="6" width="40" height="12" rx="3" fill="#d97706" stroke="#fbbf24" strokeWidth="0.8" />
      {/* Color bands */}
      <rect x="26" y="6" width="3" height="12" fill="#1f2937" />
      <rect x="32" y="6" width="3" height="12" fill="#7c2d12" />
      <rect x="38" y="6" width="3" height="12" fill="#dc2626" />
      <rect x="50" y="6" width="3" height="12" fill="#fbbf24" />
    </SvgWrap>
  );
}

// ===== PUSH BUTTON =====
export function PushButtonIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 48 48">
      {/* Legs */}
      <line x1="10" y1="14" x2="10" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="20" y1="14" x2="20" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="28" y1="14" x2="28" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="38" y1="14" x2="38" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Base */}
      <rect x="6" y="8" width="36" height="10" rx="2" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
      {/* Button cap */}
      <circle cx="24" cy="6" r="8" fill="#dc2626" />
      <circle cx="24" cy="6" r="6" fill="#ef4444" />
      <circle cx="22" cy="4" r="2" fill="#fca5a5" opacity="0.7" />
    </SvgWrap>
  );
}

// ===== BUZZER =====
export function BuzzerIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 48 48">
      {/* Body */}
      <circle cx="24" cy="24" r="14" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="11" fill="#111827" />
      {/* Hole pattern */}
      <circle cx="24" cy="18" r="1" fill="#4b5563" />
      <circle cx="20" cy="22" r="1" fill="#4b5563" />
      <circle cx="28" cy="22" r="1" fill="#4b5563" />
      <circle cx="24" cy="26" r="1" fill="#4b5563" />
      <circle cx="20" cy="28" r="1" fill="#4b5563" />
      <circle cx="28" cy="28" r="1" fill="#4b5563" />
      {/* Plus sign */}
      <text x="24" y="40" fontSize="6" fill="#dc2626" textAnchor="middle" fontWeight="bold">+</text>
      {/* Legs */}
      <line x1="18" y1="38" x2="18" y2="46" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="30" y1="38" x2="30" y2="46" stroke="#94a3b8" strokeWidth="1.5" />
    </SvgWrap>
  );
}

// ===== RGB LED =====
export function RgbLedIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 40 56">
      <ellipse cx="20" cy="16" rx="11" ry="13" fill="#1f2937" opacity="0.5" />
      {/* 3 inner colored circles */}
      <circle cx="16" cy="14" r="4" fill="#ef4444" opacity="0.85" />
      <circle cx="24" cy="14" r="4" fill="#22c55e" opacity="0.85" />
      <circle cx="20" cy="20" r="4" fill="#3b82f6" opacity="0.85" />
      {/* Glow */}
      <ellipse cx="20" cy="16" rx="13" ry="14" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" />
      {/* Base */}
      <rect x="14" y="28" width="12" height="6" rx="1" fill="#9ca3af" />
      {/* 4 leads */}
      <line x1="14" y1="34" x2="14" y2="52" stroke="#ef4444" strokeWidth="1.2" />
      <line x1="18" y1="34" x2="18" y2="46" stroke="#22c55e" strokeWidth="1.2" />
      <line x1="22" y1="34" x2="22" y2="52" stroke="#3b82f6" strokeWidth="1.2" />
      <line x1="26" y1="34" x2="26" y2="42" stroke="#cbd5e1" strokeWidth="1.2" />
    </SvgWrap>
  );
}

// ===== 7-SEGMENT DISPLAY =====
export function SevenSegmentIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 56 80">
      <rect x="4" y="4" width="48" height="72" rx="3" fill="#111827" stroke="#374151" strokeWidth="1.5" />
      {/* Segments forming "8" */}
      <g stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <line x1="18" y1="14" x2="38" y2="14" />
        <line x1="18" y1="40" x2="38" y2="40" />
        <line x1="18" y1="64" x2="38" y2="64" />
        <line x1="14" y1="18" x2="14" y2="36" />
        <line x1="42" y1="18" x2="42" y2="36" />
        <line x1="14" y1="44" x2="14" y2="60" />
        <line x1="42" y1="44" x2="42" y2="60" />
      </g>
      <circle cx="46" cy="70" r="1.5" fill="#ef4444" />
      {/* Pins */}
      <g fill="#9ca3af">
        {[0,1,2,3].map(i => <rect key={i} x={10 + i*10} y="0" width="2" height="4" />)}
        {[0,1,2,3].map(i => <rect key={`b-${i}`} x={10 + i*10} y="76" width="2" height="4" />)}
      </g>
    </SvgWrap>
  );
}

// ===== LCD SCREEN =====
export function LcdIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 80 56">
      <rect x="2" y="4" width="76" height="48" rx="3" fill="#1e40af" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="8" y="10" width="64" height="28" rx="1" fill="#60a5fa" opacity="0.85" />
      {/* Text lines */}
      <g fill="#1e3a8a" fontFamily="monospace" fontSize="4">
        <text x="12" y="20">Hello World!</text>
        <text x="12" y="32">Arduino Lab</text>
      </g>
      {/* Pins */}
      <g fill="#9ca3af">
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => <rect key={i} x={4 + i*4.5} y="44" width="2" height="6" />)}
      </g>
    </SvgWrap>
  );
}

// ===== IR SENSOR =====
export function IrSensorIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 64 48">
      <rect x="2" y="4" width="60" height="36" rx="3" fill="#1f2937" stroke="#a855f7" strokeWidth="1.5" />
      {/* IR LED transmitter */}
      <circle cx="18" cy="22" r="6" fill="#3b82f6" opacity="0.4" />
      <circle cx="18" cy="22" r="4" fill="#60a5fa" />
      <circle cx="17" cy="21" r="1.5" fill="#dbeafe" />
      {/* Receiver */}
      <circle cx="46" cy="22" r="6" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
      <circle cx="46" cy="22" r="3" fill="#111827" />
      {/* IR beam */}
      <g stroke="#a855f7" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7">
        <line x1="24" y1="22" x2="40" y2="22" />
      </g>
      {/* Pot adjuster */}
      <circle cx="32" cy="34" r="2" fill="#6b7280" />
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="14" y="40" width="2" height="4" />
        <rect x="30" y="40" width="2" height="4" />
        <rect x="46" y="40" width="2" height="4" />
      </g>
    </SvgWrap>
  );
}

// ===== ULTRASONIC =====
export function UltrasonicIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 72 48">
      <rect x="2" y="4" width="68" height="36" rx="3" fill="#1e40af" stroke="#22d3ee" strokeWidth="1.5" />
      {/* Two cylindrical eyes */}
      <circle cx="22" cy="22" r="9" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1" />
      <circle cx="22" cy="22" r="6" fill="#0c4a6e" />
      <circle cx="22" cy="22" r="3" fill="#22d3ee" opacity="0.6" />
      <circle cx="50" cy="22" r="9" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="1" />
      <circle cx="50" cy="22" r="6" fill="#0c4a6e" />
      <circle cx="50" cy="22" r="3" fill="#22d3ee" opacity="0.6" />
      {/* Wave arcs */}
      <g stroke="#22d3ee" strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M 36 14 Q 36 22 36 30" />
        <path d="M 33 11 Q 30 22 33 33" opacity="0.5" />
      </g>
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="14" y="40" width="2" height="4" />
        <rect x="26" y="40" width="2" height="4" />
        <rect x="42" y="40" width="2" height="4" />
        <rect x="54" y="40" width="2" height="4" />
      </g>
    </SvgWrap>
  );
}

// ===== SOUND SENSOR =====
export function SoundSensorIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 64 48">
      <rect x="2" y="4" width="60" height="36" rx="3" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Mic element */}
      <circle cx="32" cy="20" r="7" fill="#111827" stroke="#fbbf24" strokeWidth="1" />
      <circle cx="32" cy="20" r="4" fill="#1f2937" />
      <line x1="28" y1="20" x2="36" y2="20" stroke="#fbbf24" strokeWidth="0.6" />
      {/* Sound waves */}
      <g stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M 16 16 Q 14 20 16 24" />
        <path d="M 12 12 Q 8 20 12 28" opacity="0.6" />
        <path d="M 48 16 Q 50 20 48 24" />
        <path d="M 52 12 Q 56 20 52 28" opacity="0.6" />
      </g>
      {/* Pot */}
      <circle cx="20" cy="34" r="2" fill="#6b7280" />
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="14" y="40" width="2" height="4" />
        <rect x="30" y="40" width="2" height="4" />
        <rect x="46" y="40" width="2" height="4" />
      </g>
    </SvgWrap>
  );
}

// ===== DHT (Temperature/Humidity) =====
export function DhtIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 56 56">
      <rect x="12" y="4" width="32" height="44" rx="3" fill="#1e40af" stroke="#34d399" strokeWidth="1.5" />
      {/* Grille pattern */}
      <g stroke="#34d399" strokeWidth="0.6" opacity="0.7">
        <line x1="16" y1="12" x2="40" y2="12" />
        <line x1="16" y1="18" x2="40" y2="18" />
        <line x1="16" y1="24" x2="40" y2="24" />
        <line x1="16" y1="30" x2="40" y2="30" />
        <line x1="16" y1="36" x2="40" y2="36" />
        <line x1="16" y1="42" x2="40" y2="42" />
      </g>
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="20" y="48" width="2" height="6" />
        <rect x="28" y="48" width="2" height="6" />
        <rect x="36" y="48" width="2" height="6" />
      </g>
    </SvgWrap>
  );
}

// ===== LDR =====
export function LdrIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 48 48">
      {/* Squiggle leads */}
      <path d="M 4 24 L 16 24" stroke="#9ca3af" strokeWidth="1.5" fill="none" />
      <path d="M 32 24 L 44 24" stroke="#9ca3af" strokeWidth="1.5" fill="none" />
      {/* Body */}
      <circle cx="24" cy="24" r="10" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      {/* Wavy track (zigzag) */}
      <path
        d="M 18 22 L 20 20 L 22 24 L 24 18 L 26 24 L 28 20 L 30 22"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 18 26 L 20 28 L 22 24 L 24 30 L 26 24 L 28 28 L 30 26"
        stroke="#fbbf24"
        strokeWidth="1.5"
        fill="none"
      />
    </SvgWrap>
  );
}

// ===== RELAY =====
export function RelayIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 64 48">
      <rect x="2" y="4" width="60" height="40" rx="3" fill="#1f2937" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Cube relay */}
      <rect x="14" y="14" width="20" height="20" rx="1" fill="#0c4a6e" stroke="#22d3ee" strokeWidth="0.8" />
      <text x="24" y="26" fontSize="5" fill="#22d3ee" textAnchor="middle" fontFamily="monospace">RELAY</text>
      {/* Terminal block */}
      <rect x="40" y="12" width="18" height="22" rx="1" fill="#374151" />
      <g fill="#fbbf24">
        <circle cx="44" cy="17" r="1.5" />
        <circle cx="54" cy="17" r="1.5" />
        <circle cx="44" cy="24" r="1.5" />
        <circle cx="54" cy="24" r="1.5" />
        <circle cx="44" cy="31" r="1.5" />
        <circle cx="54" cy="31" r="1.5" />
      </g>
      {/* LED indicator */}
      <circle cx="38" cy="8" r="1.5" fill="#ef4444" />
    </SvgWrap>
  );
}

// ===== POTENTIOMETER =====
export function PotentiometerIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 48 56">
      {/* Knob */}
      <circle cx="24" cy="20" r="14" fill="#374151" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="24" cy="20" r="11" fill="#1f2937" />
      {/* Indicator line */}
      <line x1="24" y1="20" x2="24" y2="10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      {/* Base */}
      <rect x="14" y="34" width="20" height="6" rx="1" fill="#4b5563" />
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="16" y="40" width="2" height="14" />
        <rect x="23" y="40" width="2" height="14" />
        <rect x="30" y="40" width="2" height="14" />
      </g>
    </SvgWrap>
  );
}

// ===== JOYSTICK =====
export function JoystickIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 56 56">
      {/* Base */}
      <rect x="6" y="20" width="44" height="28" rx="3" fill="#1f2937" stroke="#a855f7" strokeWidth="1.5" />
      {/* Stick */}
      <rect x="24" y="8" width="8" height="20" rx="2" fill="#374151" stroke="#a855f7" strokeWidth="0.8" />
      {/* Cap */}
      <circle cx="28" cy="8" r="6" fill="#dc2626" />
      <circle cx="28" cy="8" r="4" fill="#ef4444" />
      <ellipse cx="26" cy="6" rx="1.5" ry="2" fill="#fca5a5" opacity="0.6" />
      {/* Pins */}
      <g fill="#9ca3af">
        <rect x="14" y="48" width="2" height="6" />
        <rect x="22" y="48" width="2" height="6" />
        <rect x="30" y="48" width="2" height="6" />
        <rect x="38" y="48" width="2" height="6" />
        <rect x="46" y="48" width="2" height="6" />
      </g>
    </SvgWrap>
  );
}

// ===== DC MOTOR =====
export function DcMotorIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 64 48">
      {/* Cylinder body */}
      <rect x="14" y="12" width="32" height="24" rx="3" fill="#374151" stroke="#22d3ee" strokeWidth="1.5" />
      <ellipse cx="14" cy="24" rx="3" ry="12" fill="#4b5563" stroke="#22d3ee" strokeWidth="1" />
      {/* Shaft */}
      <rect x="46" y="22" width="14" height="4" fill="#9ca3af" />
      {/* Fan blades */}
      <g fill="#6b7280" stroke="#22d3ee" strokeWidth="0.5">
        <path d="M 60 24 L 64 22 L 64 26 Z" />
        <path d="M 58 18 L 62 16 L 60 22 Z" opacity="0.7" />
        <path d="M 58 30 L 62 32 L 60 26 Z" opacity="0.7" />
      </g>
      {/* Terminals */}
      <circle cx="20" cy="40" r="2" fill="#dc2626" />
      <circle cx="30" cy="40" r="2" fill="#1f2937" />
      <line x1="20" y1="36" x2="20" y2="42" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="30" y1="36" x2="30" y2="42" stroke="#9ca3af" strokeWidth="1.5" />
    </SvgWrap>
  );
}

// ===== SERVO MOTOR =====
export function ServoIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 64 56">
      {/* Box body */}
      <rect x="6" y="14" width="38" height="32" rx="2" fill="#1e40af" stroke="#a855f7" strokeWidth="1.5" />
      {/* Top */}
      <rect x="6" y="14" width="38" height="6" rx="2" fill="#1e3a8a" />
      {/* Shaft */}
      <circle cx="20" cy="14" r="3" fill="#fbbf24" />
      <circle cx="20" cy="14" r="1.5" fill="#92400e" />
      {/* Horn */}
      <path d="M 20 8 L 14 14 L 20 16 L 26 14 Z" fill="#fbbf24" opacity="0.85" />
      {/* Gears icon */}
      <g fill="#a855f7" opacity="0.6">
        <circle cx="32" cy="28" r="4" />
        <circle cx="36" cy="34" r="3" />
      </g>
      {/* Cable */}
      <path d="M 44 30 Q 50 30 56 24" stroke="#22d3ee" strokeWidth="1.2" fill="none" />
      <circle cx="56" cy="24" r="1" fill="#22d3ee" />
    </SvgWrap>
  );
}

// ===== STEPPER MOTOR =====
export function StepperIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 56 56">
      {/* Square body */}
      <rect x="6" y="6" width="44" height="44" rx="3" fill="#1f2937" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="10" y="10" width="36" height="36" rx="2" fill="#111827" />
      {/* Shaft */}
      <circle cx="28" cy="28" r="5" fill="#374151" stroke="#22d3ee" strokeWidth="0.8" />
      <circle cx="28" cy="28" r="2" fill="#9ca3af" />
      {/* Mounting holes */}
      <circle cx="12" cy="12" r="1.5" fill="#4b5563" />
      <circle cx="44" cy="12" r="1.5" fill="#4b5563" />
      <circle cx="12" cy="44" r="1.5" fill="#4b5563" />
      <circle cx="44" cy="44" r="1.5" fill="#4b5563" />
      {/* Step indicator */}
      <text x="28" y="22" fontSize="4" fill="#22d3ee" textAnchor="middle" fontFamily="monospace">STEP</text>
      {/* Cable */}
      <path d="M 50 28 L 54 28" stroke="#a855f7" strokeWidth="1.5" />
    </SvgWrap>
  );
}

// ===== JUMPER WIRES =====
export function JumperWiresIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 80 48">
      {/* Three wires in different colors */}
      <g strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 8 10 Q 30 6 50 14 Q 64 18 72 12" stroke="#dc2626" />
        <path d="M 8 24 Q 30 20 50 28 Q 64 32 72 26" stroke="#22c55e" />
        <path d="M 8 38 Q 30 34 50 42 Q 64 46 72 40" stroke="#3b82f6" />
      </g>
      {/* Pin tips */}
      <g fill="#9ca3af">
        {[12,26,40].map((y,i) => (
          <rect key={i} x="72" y={y-1} width="4" height="2" />
        ))}
      </g>
      {/* Connector ends */}
      <g>
        <rect x="2" y="8" width="8" height="4" fill="#1f2937" rx="1" />
        <rect x="2" y="22" width="8" height="4" fill="#1f2937" rx="1" />
        <rect x="2" y="36" width="8" height="4" fill="#1f2937" rx="1" />
      </g>
    </SvgWrap>
  );
}

// ===== BATTERY =====
export function BatteryIcon({ className, size }: IconProps) {
  return (
    <SvgWrap className={className} size={size} viewBox="0 0 56 32">
      <rect x="4" y="6" width="44" height="20" rx="2" fill="#1f2937" stroke="#22d3ee" strokeWidth="1.5" />
      <rect x="48" y="11" width="4" height="10" rx="1" fill="#9ca3af" />
      {/* Cells */}
      <line x1="20" y1="6" x2="20" y2="26" stroke="#4b5563" strokeWidth="1" />
      <line x1="34" y1="6" x2="34" y2="26" stroke="#4b5563" strokeWidth="1" />
      {/* +/- */}
      <text x="12" y="20" fontSize="9" fill="#dc2626" textAnchor="middle" fontWeight="bold">+</text>
      <text x="40" y="20" fontSize="9" fill="#1f2937" textAnchor="middle" fontWeight="bold">−</text>
      <text x="27" y="20" fontSize="6" fill="#22d3ee" textAnchor="middle" fontFamily="monospace">9V</text>
    </SvgWrap>
  );
}

// ===== MAIN MAP =====
const iconMap: Record<ComponentKey, React.FC<IconProps>> = {
  arduino: ArduinoIcon,
  breadboard: BreadboardIcon,
  led: (props) => <LedIcon {...props} color="#22d3ee" />,
  ledRed: (props) => <LedIcon {...props} color="#ef4444" />,
  ledGreen: (props) => <LedIcon {...props} color="#22c55e" />,
  ledBlue: (props) => <LedIcon {...props} color="#3b82f6" />,
  resistor: ResistorIcon,
  pushButton: PushButtonIcon,
  buzzer: BuzzerIcon,
  rgbLed: RgbLedIcon,
  sevenSegment: SevenSegmentIcon,
  lcd: LcdIcon,
  irSensor: IrSensorIcon,
  ultrasonic: UltrasonicIcon,
  soundSensor: SoundSensorIcon,
  dht: DhtIcon,
  ldr: LdrIcon,
  relay: RelayIcon,
  potentiometer: PotentiometerIcon,
  joystick: JoystickIcon,
  dcMotor: DcMotorIcon,
  servo: ServoIcon,
  stepper: StepperIcon,
  jumperWires: JumperWiresIcon,
  battery: BatteryIcon,
};

export function ComponentIcon({ name, className, size = 64 }: { name: ComponentKey; className?: string; size?: number }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}

// Component Arabic labels
export const componentLabels: Record<ComponentKey, string> = {
  arduino: "لوحة الأردوينو",
  breadboard: "لوحة التجارب",
  led: "ليد",
  ledRed: "ليد أحمر",
  ledGreen: "ليد أخضر",
  ledBlue: "ليد أزرق",
  resistor: "مقاومة",
  pushButton: "كباس لحظي",
  buzzer: "زمور",
  rgbLed: "ليد RGB",
  sevenSegment: "شاشة 7-Segment",
  lcd: "شاشة LCD",
  irSensor: "حساس IR",
  ultrasonic: "حساس Ultrasonic",
  soundSensor: "حساس صوت",
  dht: "حساس DHT",
  ldr: "مقاومة ضوئية LDR",
  relay: "ريليه",
  potentiometer: "مقاومة متغيرة",
  joystick: "جويستيك",
  dcMotor: "محرك DC",
  servo: "محرك سيرفو",
  stepper: "محرك Stepper",
  jumperWires: "أسلاك توصيل",
  battery: "بطارية",
};
