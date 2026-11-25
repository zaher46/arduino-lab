"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Moon, Sun, Languages } from "lucide-react";
import { uiTr } from "@/data/ui-tr";

export type Language = "ar" | "tr";
export type Theme = "light" | "dark";
interface Settings {
  locale: Language;
  language: Language;
  theme: Theme;
  setLocale: (language: Language) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (arabic: string, turkish?: string) => string;
  tr: (arabic: string, turkish?: string) => string;
}
const SettingsContext = createContext<Settings | null>(null);
const STORAGE_KEY = "arduino-lab-preferences-v1";
function readPreferences(): { locale: Language; theme: Theme } {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      locale: value.locale === "tr" ? "tr" : "ar",
      theme: value.theme === "light" ? "light" : "dark",
    };
  } catch {
    return { locale: "ar", theme: "dark" };
  }
}
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Language>("ar");
  const setLocale = useCallback((next: Language) => {
    updateLocale(next);
  }, []);
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = readPreferences();
    setLocale(saved.locale);
    setTheme(saved.theme);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const next = readPreferences();
        setLocale(next.locale);
        setTheme(next.theme);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    document.title =
      locale === "ar"
        ? "أردوينو لاب | البرمجة والمختبر"
        : "Arduino Lab | Programlama ve atölye";
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ locale, theme }));
    } catch {
      /* Preferences still work when storage is unavailable. */
    }
  }, [locale, theme, ready]);
  const t = useCallback(
    (arabic: string, turkish?: string) =>
      locale === "ar"
        ? arabic
        : (turkish ?? uiTr[arabic.trim().replace(/\s+/g, " ")] ?? arabic),
    [locale],
  );
  const value = useMemo(
    () => ({
      locale,
      language: locale,
      theme,
      setLocale,
      setLanguage: setLocale,
      setTheme,
      t,
      tr: t,
    }),
    [locale, theme, t],
  );
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
export function useSettings(): Settings {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings requires PreferencesProvider");
  return context;
}
export function PreferenceControls() {
  const { locale, theme, setLocale, setTheme } = useSettings();
  const toggleLabel =
    locale === "ar"
      ? theme === "dark"
        ? "تفعيل الوضع الفاتح"
        : "تفعيل الوضع الداكن"
      : theme === "dark"
        ? "Açık temaya geç"
        : "Koyu temaya geç";
  return (
    <div
      className="preference-controls"
      role="group"
      aria-label={locale === "ar" ? "اللغة والمظهر" : "Dil ve görünüm"}
    >
      <label className="language-control">
        <Languages size={16} aria-hidden="true" />
        <span className="sr-only">
          {locale === "ar" ? "لغة الموقع" : "Site dili"}
        </span>
        <select
          aria-label={locale === "ar" ? "لغة الموقع" : "Site dili"}
          value={locale}
          onChange={(event) => setLocale(event.target.value as Language)}
        >
          <option lang="ar" value="ar">
            العربية
          </option>
          <option lang="tr" value="tr">
            Türkçe
          </option>
        </select>
      </label>
      <button
        type="button"
        className="theme-control"
        title={toggleLabel}
        aria-label={toggleLabel}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun size={18} aria-hidden="true" />
        ) : (
          <Moon size={18} aria-hidden="true" />
        )}
        <span>
          {locale === "ar"
            ? theme === "dark"
              ? "فاتح"
              : "داكن"
            : theme === "dark"
              ? "Açık"
              : "Koyu"}
        </span>
      </button>
    </div>
  );
}
