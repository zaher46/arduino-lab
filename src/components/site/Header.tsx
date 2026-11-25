"use client";
import { useSettings } from "./Preferences";
import { PreferenceControls } from "./Preferences";
import { useState } from "react";
import { CircuitBoard, Menu, X, GraduationCap, ArrowLeft } from "lucide-react";
interface Props {
  onHome: () => void;
  onProjects: () => void;
  onStudents: () => void;
  onPython: () => void;
  onDashboard: () => void;
  activeView: string;
}
export default function Header({
  onHome,
  onProjects,
  onStudents,
  onPython,
  onDashboard,
  activeView,
}: Props) {
  const { t: tx, locale } = useSettings();
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: "رحلة التعلّم",
      active: activeView === "home" || activeView === "session",
      action: onHome,
    },
    {
      label: "المشاريع",
      active: activeView === "projects",
      action: onProjects,
    },
    { label: "بايثون", active: activeView === "python", action: onPython },
    { label: "الطلاب", active: activeView === "students", action: onStudents },
  ];
  return (
    <>
      <a href="#main-content" className="lab-skip">
        {tx("انتقل إلى المحتوى")}
      </a>
      <header className="premium-header">
        <div className="lab-shell header-inner">
          <button
            onClick={() => {
              onHome();
              setOpen(false);
            }}
            className="premium-brand"
            aria-label={tx("أردوينو لاب، الرئيسية")}
          >
            <span className="brand-symbol">
              <CircuitBoard size={25} />
            </span>
            <span>
              <strong>
                {tx("أردوينو")} <b>{tx("لاب")}</b>
              </strong>
              <small dir="ltr">SMALL IDEAS. BIG POSSIBILITIES.</small>
            </span>
          </button>
          <nav className="desktop-nav" aria-label={tx("التنقل الرئيسي")}>
            {items.map((item) => (
              <button
                key={tx(item.label)}
                aria-current={item.active ? "page" : undefined}
                onClick={item.action}
              >
                {tx(item.label)}
              </button>
            ))}
          </nav>
          <button
            className="teacher-nav"
            onClick={onDashboard}
            aria-current={activeView === "dashboard" ? "page" : undefined}
          >
            <GraduationCap size={17} />
            <span>{tx("مساحة المعلّم")}</span>
            <ArrowLeft size={15} />
          </button>
          <PreferenceControls />
          <button
            className="mobile-menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={tx(open ? "إغلاق القائمة" : "فتح القائمة")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label={tx("تنقل الهاتف")}
          >
            {[
              ...items,
              {
                label: "مساحة المعلّم",
                active: activeView === "dashboard",
                action: onDashboard,
              },
            ].map((i) => (
              <button
                key={tx(i.label)}
                aria-current={i.active ? "page" : undefined}
                onClick={() => {
                  i.action();
                  setOpen(false);
                }}
              >
                {tx(i.label)}
                <ArrowLeft size={16} />
              </button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
