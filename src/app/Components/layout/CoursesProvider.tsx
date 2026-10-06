"use client";

import type { CourseMenuItem } from "@/app/layout";
import { createContext, type ReactNode, useContext } from "react";

const CoursesContext = createContext<CourseMenuItem[]>([]);

export const normalizePath = (url: string | null | undefined) => {
  if (!url) return "/";

  let path = url
    .split("?")[0]
    .split("#")[0]
    .replace(/\/+$/, "")
    .toLowerCase();

  if (!path || path === "/index") {
    path = "/";
  }

  return path;
};

export const useCourses = () => useContext(CoursesContext);

const CoursesProvider = ({ courses, children }: { courses: CourseMenuItem[]; children: ReactNode }) => (
  <CoursesContext.Provider value={courses}>{children}</CoursesContext.Provider>
);

export default CoursesProvider;
