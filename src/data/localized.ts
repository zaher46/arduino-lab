import { sessions as arSessions } from "./sessions";
import { pythonLessons as arLessons } from "./python-course";
import { projects as arProjects } from "./projects";
import {
  turkishSessions,
  turkishPythonLessons,
  turkishProjects,
} from "./turkish-content";
export type { Session, ComponentKey } from "./sessions";
export type { PythonLesson, AlgorithmProblem } from "./python-course";
export type { Project } from "./projects";
export const totalProblems = arLessons.reduce(
  (n, lesson) => n + lesson.problems.length,
  0,
);
const arabic = {
  sessions: arSessions,
  pythonLessons: arLessons,
  projects: arProjects,
};
export function curriculumFor(locale: "ar" | "tr") {
  return locale === "tr"
    ? {
        sessions: turkishSessions,
        pythonLessons: turkishPythonLessons,
        projects: turkishProjects,
      }
    : arabic;
}
