import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/fonts-global.css";
import "./css/globals.css";
import "./css/style.css";

import { getOrigin } from "@/app/lib/getOrigin";
import { buildSocialMetadata } from "@/app/lib/seo";
import convertData from "@/utils/convartData";
import ServerApi from "@/utils/Server";
import Analytics from "./Components/layout/Analytics";
import ContactSectionWrapper from "./Components/layout/ContactSectionWrapper";
import Footer from "./Components/layout/Footer";
import MobileBottomNav from "./Components/layout/MobileBottomNav";
import Navbar from "./Components/layout/Navbar";
import PreloadFonts from "./Components/layout/PreloadFonts";



export async function generateMetadata(): Promise<Metadata> {
  const title = "The Valuation School";
  const description =
    "Finance courses in valuation, CFA, equity research, and financial modelling — taught by The Valuation School.";

  return {
    metadataBase: new URL(await getOrigin()),
    title,
    description,
    icons: {
      icon: "/img/main-logo.jpg",
    },
    verification: {
      google: "tuqjc-fdnKAGXcMBQQqRq6Y7XUlVCsTtmHmuB-DwNhI",
    },
    ...buildSocialMetadata({ title, description, path: "/" }),
  };
}


export const dynamic = "force-dynamic";

interface RootLayoutProps {
  children: ReactNode;
}

export interface CourseMenuItem {
  PageName: string;
  PageUrl: string;
}

export interface ScheduleCalendarData {
  startDate: string;
  endDate: string;
  unavailableDates: string[];
  slots: string[];
  topics: string[];
}

const EMPTY_SCHEDULE_CALENDAR: ScheduleCalendarData = {
  startDate: "",
  endDate: "",
  unavailableDates: [],
  slots: [],
  topics: [],
};

const labelsFrom = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "label" in item) {
          return String((item as { label: unknown }).label);
        }
        return "";
      })
      .filter(Boolean)
    : [];

export default async function RootLayout({ children }: RootLayoutProps) {
  let courses: CourseMenuItem[] = [];

  try {
    const courseDropDownApi = new ServerApi({
      withAuth: false,
      spName: "SPClientAnonymous",
      mode: 55,
    });

    const courseDropDownData = await courseDropDownApi.request();

    if (
      courseDropDownData?.isSuccess &&
      courseDropDownData?.result
    ) {
      const parsedData = convertData(courseDropDownData.result)

      if (Array.isArray(parsedData)) {
        courses = parsedData;
      }
    }
  } catch (error) {
    console.error("Course dropdown API error:", error);
  }

  // The Schedule a Call form (in ContactSection, rendered here) needs live
  // country/country-code/calendar data, but panel.dthlms.com sends no CORS
  // headers — a browser-side fetch to it is always blocked. Fetching here,
  // server-side, and passing the results down avoids that entirely.
  let scheduleCountries: string[] = [];
  let scheduleCountryCodes: string[] = [];
  let scheduleCalendar: ScheduleCalendarData = EMPTY_SCHEDULE_CALENDAR;

  try {
    const [countryRes, countryCodeRes, calendarRes] = await Promise.all([
      new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 12 }).request(),
      new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 42 }).request(),
      new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 47 }).request(),
    ]);

    scheduleCountries = labelsFrom(convertData(countryRes?.result));
    scheduleCountryCodes = labelsFrom(convertData(countryCodeRes?.result));

    const calendarData = convertData(calendarRes?.result) as Record<string, unknown> | false;

    if (calendarData) {
      scheduleCalendar = {
        startDate: String(calendarData.StartDate ?? ""),
        endDate: String(calendarData.EndDate ?? ""),
        slots: Array.isArray(calendarData.ScheduleCallTimeSlot)
          ? calendarData.ScheduleCallTimeSlot.map((item) => String((item as { TimeSlot?: string }).TimeSlot ?? "")).filter(Boolean)
          : [],
        topics: Array.isArray(calendarData.ScheduleCallTopic)
          ? calendarData.ScheduleCallTopic.map((item) => String((item as { Topic?: string }).Topic ?? "")).filter(Boolean)
          : [],
        unavailableDates: Array.isArray(calendarData.ScheduleCallUnavailableDate)
          ? calendarData.ScheduleCallUnavailableDate.map((item) => String((item as { UnavailableDate?: string }).UnavailableDate ?? "")).filter(Boolean)
          : [],
      };
    }
  } catch (error) {
    console.error("Schedule options API error:", error);
  }

  return (
    <html lang="en">
      <body>
        <PreloadFonts />
        <Navbar courses={courses} />

        <main>{children}</main>
        <ContactSectionWrapper
          countries={scheduleCountries}
          countryCodes={scheduleCountryCodes}
          calendar={scheduleCalendar}
        />
        <Footer courses={courses} />
        <MobileBottomNav />
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
