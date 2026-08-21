"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import type { IStudentsPlaced } from "./StudentsPlaced";

const normalizePath = (path: string) =>
    typeof path === "string" ? path.replace(/\\/g, "/") : path;

interface CompaniesTickerProps {
    data: IStudentsPlaced[];
}

interface CompanyCardProps {
    row: IStudentsPlaced;
    hidden?: boolean;
}

const CompanyCard = ({ row, hidden }: CompanyCardProps) => (
    <div className="company-card" aria-hidden={hidden || undefined}>
        <div className="company-card-image">
            <Image
                src={normalizePath(row.studentPhoto)}
                alt={hidden ? "" : row.name}
                loading="lazy"
                tabIndex={hidden ? -1 : undefined}
                width={400}
                height={400}
            />
            <p>{row.name}</p>
        </div>
        <div className="company-card-content">
            <Image
                src={normalizePath(row.companyImage)}
                alt={hidden ? "" : `${row.name}'s company logo`}
                loading="lazy"
                tabIndex={hidden ? -1 : undefined}
                width={160}
                height={100}
            />
        </div>
    </div>
);

const CompaniesTicker = ({ data }: CompaniesTickerProps) => {
    const tickerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);

    // The track holds two copies of the deck back-to-back; the animation
    // slides it left by exactly one copy's width, then jumps back to 0 —
    // since both copies are identical, that jump is invisible, giving a
    // seamless infinite scroll. The measurement has to happen after the
    // images load their intrinsic size, so it's redone on resize too.
    useEffect(() => {
        const ticker = tickerRef.current;
        const track = trackRef.current;

        if (!ticker || !track || data.length === 0) return;

        const measure = () => {
            const children = Array.from(track.children) as HTMLElement[];
            const count = children.length / 2;

            if (count === 0) return;

            const gap =
                parseFloat(getComputedStyle(track).columnGap || "0") || 0;

            let oneWidth = 0;

            for (let i = 0; i < count; i += 1) {
                oneWidth += children[i].getBoundingClientRect().width;
                if (i < count - 1) oneWidth += gap;
            }

            const pps =
                parseFloat(
                    getComputedStyle(ticker).getPropertyValue("--pps"),
                ) || 120;

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
    }, [data]);

    if (data.length === 0) return null;

    return (
        <div
            className={`companies-ticker ${isReady ? "is-ready" : ""}`}
            ref={tickerRef}
        >
            <div className="ticker-track" ref={trackRef}>
                {data.map((row, i) => (
                    <CompanyCard row={row} key={`a-${i}`} />
                ))}
                {data.map((row, i) => (
                    <CompanyCard row={row} key={`b-${i}`} hidden />
                ))}
            </div>
        </div>
    );
};

export default CompaniesTicker;
