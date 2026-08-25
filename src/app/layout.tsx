import type { Metadata } from "next";
import type { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/fonts-global.css";
import "./css/globals.css";
import "./css/style.css";

import ContactSectionWrapper from "./Components/layout/ContactSectionWrapper";
import Footer from "./Components/layout/Footer";
import Header from "./Components/layout/Header";

export const metadata: Metadata = {
  title: "The Valuation School",
  description:
    "Finance courses in valuation, CFA, equity research, and financial modelling — taught by The Valuation School.",
  icons: {
    icon: "/img/main-logo.jpg",
  },
};


export const dynamic = "force-dynamic";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {


  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>
        <ContactSectionWrapper />
        <Footer />
      </body>
    </html>
  );
}
