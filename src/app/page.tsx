'use client';

import { useState, useEffect } from "react";
import HomePage from "@/components/site/HomePage";
import SessionPage from "@/components/site/SessionPage";
import StudentsPage from "@/components/site/StudentsPage";
import ProjectsPage from "@/components/site/ProjectsPage";
import PythonCoursePage from "@/components/site/PythonCoursePage";
import TeacherDashboard from "@/components/site/TeacherDashboard";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import {useSettings} from "@/components/site/Preferences";
import {curriculumFor} from "@/data/localized";
import type { Session } from "@/data/sessions";

type View =
  | { type: "home" }
  | { type: "session"; id: number }
  | { type: "students" }
  | { type: "projects" }
  | { type: "python" }
  | { type: "dashboard" };

export default function Home() {
  const {locale}=useSettings();
  const {sessions}=curriculumFor(locale);
  const [view, setView] = useState<View>({ type: "home" });

  useEffect(() => {
    if (window.location.hash.startsWith('#/')) window.location.replace('/legacy/' + window.location.hash);
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [view]);

  const handleSelectSession = (s: Session) => setView({ type: "session", id: s.id });
  const handleBackHome = () => setView({ type: "home" });
  const handleProjects = () => setView({ type: "projects" });
  const handleStudents = () => setView({ type: "students" });
  const handlePython = () => setView({ type: "python" });
  const handleDashboard = () => setView({ type: "dashboard" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header onHome={handleBackHome} onProjects={handleProjects} onStudents={handleStudents} onPython={handlePython} activeView={view.type} onDashboard={handleDashboard} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {view.type === "home" && <HomePage onSelectSession={handleSelectSession} onProjects={handleProjects} onStudents={handleStudents} onPython={handlePython} onDashboard={handleDashboard} />}
        {view.type === "session" && <SessionPage key={view.id} session={sessions.find(s=>s.id===view.id)!} onBack={handleBackHome} onSelectSession={handleSelectSession} />}
        {view.type === "students" && <StudentsPage onBack={handleBackHome} />}
        {view.type === "projects" && <ProjectsPage onBack={handleBackHome} />}
        {view.type === "python" && <PythonCoursePage onBack={handleBackHome} />}
        {view.type === "dashboard" && <TeacherDashboard onBack={handleBackHome} />}
      </main>
      <Footer />
    </div>
  );
}
