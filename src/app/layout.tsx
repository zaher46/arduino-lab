import type { Metadata } from "next";
import "./globals.css";
import "./preferences.css";
import {PreferencesProvider} from "@/components/site/Preferences";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "أردوينو لاب | رحلة التعلم التفاعلية للأطفال",
  description:
    "منصة تعليمية احترافية لتعليم الأردوينو والإلكترونيات للأطفال من 10 إلى 14 سنة عبر 15 جلسة تطبيقية تفاعلية مع أنميشن وشرح بصري.",
  keywords: [
    "أردوينو",
    "تعليم الأطفال",
    "إلكترونيات",
    "mBlock",
    "روبوتيك",
    "STEM",
    "تعليم تفاعلي",
  ],
  authors: [{ name: "Arduino Lab" }],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground"
      >
        <PreferencesProvider>{children}</PreferencesProvider>
        <Toaster />
      </body>
    </html>
  );
}
