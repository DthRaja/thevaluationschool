import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/fonts-global.css";
import "./css/globals.css";
import "./css/style.css";

import Analytics from "./Components/layout/Analytics";
import ContactSectionWrapper from "./Components/layout/ContactSectionWrapper";
import Footer from "./Components/layout/Footer";
import convertData from "@/utils/convartData";
import ServerApi from "@/utils/Server";
import Navbar from "./Components/layout/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://thevaluationschool.com"),
  title: "The Valuation School",
  description:
    "Finance courses in valuation, CFA, equity research, and financial modelling — taught by The Valuation School.",
  icons: {
    icon: "/img/main-logo.jpg",
  },
  verification: {
    google: "tuqjc-fdnKAGXcMBQQqRq6Y7XUlVCsTtmHmuB-DwNhI",
  },
};


export const dynamic = "force-dynamic";

interface RootLayoutProps {
  children: ReactNode;
}

export interface CourseMenuItem {
  PageName: string;
  PageUrl: string;
}

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

  return (
    <html lang="en">
      <body>
        <Navbar courses={courses} />

        <main>{children}</main>
        <ContactSectionWrapper />
        <Footer courses={courses}/>
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
