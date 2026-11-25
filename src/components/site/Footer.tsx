"use client";
import { useSettings } from "./Preferences";
import { CircuitBoard } from "lucide-react";
export default function Footer() {
  const { t: tx, locale } = useSettings();
  return (
    <footer className="premium-footer">
      <div className="lab-shell">
        <div className="footer-top">
          <div className="premium-brand">
            <span className="brand-symbol">
              <CircuitBoard size={25} />
            </span>
            <span>
              <strong>
                {tx("أردوينو")} <b>{tx("لاب")}</b>
              </strong>
              <small>{tx("صُنعت للعقول الفضولية.")}</small>
            </span>
          </div>
          <p>
            {tx("تعلّم الفكرة. اختبرها بيديك.")}
            <br />
            {tx("واصنع شيئًا يشبه خيالك.")}
          </p>
          <div className="footer-tags">
            <span>Arduino Uno</span>
            <span>mBlock</span>
            <span>Python</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {tx("أردوينو لاب")}
          </span>
          <span>{tx("رحلة تعلّم، تجربة بعد تجربة.")}</span>
        </div>
      </div>
    </footer>
  );
}
