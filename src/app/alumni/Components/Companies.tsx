"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export interface ICompanies {
  name: string;
  companyImage: string;
  ContentText: string;
  studentPhoto: string;
}

const normalizePath = (path: string) =>
  typeof path === "string" ? path.replace(/\\/g, "/") : path;

// `name` on each row is the placed student, not the company, so it can't
// label the logo — fall back to a readable name derived from the file.
const fileBase = (path: string) => {
  const name = path.split("/").pop() || "";
  return name.replace(/\.[^./]+$/, "") || "company logo";
};

interface LogoCardProps {
  src: string;
  alt: string;
  hidden?: boolean;
}

const LogoCard = ({ src, alt, hidden }: LogoCardProps) => (
  <div className="company-card" aria-hidden={hidden || undefined}>
    <div className="company-logo">
      <Image
        src={src}
        alt={hidden ? "" : alt}
        loading="lazy"
        tabIndex={hidden ? -1 : undefined}
        width={160}
        height={96}
      />
    </div>
  </div>
);

const Companies = ({ data }: { data: ICompanies[] }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Multiple placement rows can share the same company logo; the ticker
  // should only show each logo once.
  const logos = useMemo(() => {
    const seen = new Set<string>();
    const unique: { src: string; alt: string }[] = [];

    (data || []).forEach((row) => {
      const src = normalizePath(row.companyImage);
      if (src && !seen.has(src)) {
        seen.add(src);
        unique.push({ src, alt: fileBase(src) });
      }
    });

    return unique;
  }, [data]);

  // The track holds two copies of the logo deck back-to-back; the animation
  // slides it left by exactly one copy's width, then jumps back to 0 —
  // since both copies are identical, that jump is invisible, giving a
  // seamless infinite scroll. The measurement has to happen after the
  // images load their intrinsic size, so it's redone on resize too.
  useEffect(() => {
    const ticker = tickerRef.current;
    const track = trackRef.current;

    if (!ticker || !track || logos.length === 0) return;

    const measure = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const count = children.length / 2;

      if (count === 0) return;

      const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;

      let oneWidth = 0;

      for (let i = 0; i < count; i += 1) {
        oneWidth += children[i].getBoundingClientRect().width;
        if (i < count - 1) oneWidth += gap;
      }

      const pps =
        parseFloat(getComputedStyle(ticker).getPropertyValue("--pps")) || 120;

      track.style.setProperty("--distance", `${Math.round(oneWidth)}px`);
      track.style.setProperty("--duration", `${oneWidth / pps}s`);
      setIsReady(true);
    };

    const raf = requestAnimationFrame(() => setTimeout(measure, 50));
    const observer = new ResizeObserver(measure);

    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [logos]);

  if (logos.length === 0) return null;

  return (
    <div className="alumni-companies-section">
      <div
        className={`companies-ticker ${isReady ? "is-ready" : ""}`}
        aria-label="Alumni companies"
        ref={tickerRef}
      >
        <div className="ticker-track" ref={trackRef}>
          {logos.map((logo, i) => (
            <LogoCard src={logo.src} alt={logo.alt} key={`a-${i}`} />
          ))}
          {logos.map((logo, i) => (
            <LogoCard src={logo.src} alt={logo.alt} key={`b-${i}`} hidden />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
