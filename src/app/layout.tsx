import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/fonts-global.css";
import "./css/style.css";
import "./css/globals.css";

import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";

export const metadata: Metadata = {
  title: "The Valuation School",
  description:
    "Finance courses in valuation, CFA, equity research, and financial modelling — taught by The Valuation School.",
  icons: {
    icon: "/img/main-logo.jpg",
  },
};

// Header reads the incoming request's headers (via ServerApi.getOrigin) on
// every route to satisfy the backend's origin check, so no route under this
// layout can be statically rendered — mark the whole app dynamic instead of
// letting Next fail trying to prerender a shell around a per-request header read.
export const dynamic = "force-dynamic";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
