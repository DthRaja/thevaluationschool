"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { UserCircle2 } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export interface IEligibilityItem {
  FaqQuestions: string;
  FaqAnswer: string;
}

interface CfaDetailsClientProps {
  eligibilityList: IEligibilityItem[];
}

const TABS = [
  "What is CFA® Program?",
  "Eligibility",
  "How to become",
  "Exam Schedule",
] as const;

const TESTIMONIALS = [
  {
    text: "The methodology sir use promotes deep understanding, not rote learning. He excels at turning complex concepts into clear, easy-to-understand ideas.",
    name: "Rajat Sharma",
  },
  {
    text: "Easy to understand, connectivity with real life scenarios, knowledge building in practical & theoritical both",
    name: "Yash Pal Bachchhawat",
  },
  {
    text: "Practicality and the way of explaining concepts.",
    name: "Ayush Goel",
  },
];

const HOW_TO_BECOME = [
  {
    image: "/img/Cfa-books.png",
    title: "Clear all 3 levels",
    description:
      "To become a CFA® charterholder, you must pass all three levels of the CFA® exams. Each level tests your knowledge in finance, investment, and ethics.",
  },
  {
    image: "/img/how-to-become.png",
    title: "Gain work Experience",
    description:
      "You need to complete at least 4,000 hours of work experience within a minimum of 36 months. This experience must be focused on finance and investment.",
  },
  {
    image: "/img/cfa-phone.png",
    title: "Apply for CFA® charter",
    description:
      "Submit your membership application to the CFA Institute, including a detailed experience letter that verifies your work history and qualifications.",
  },
  {
    image: "/img/cfa-result.png",
    title: "Result",
    description:
      'Once approved, you will be awarded the CFA® charter and can use the designation "CFA" after your name.',
  },
];

const EXAM_MONTHS = [
  "Feb 2026 (Levels 1 & 3)",
  "May 2026 (Levels 1 & 2)",
  "Aug 2026 (All Levels)",
  "Nov 2026 (Levels 1 & 2)",
  "Feb 2027 (Levels 1 & 3)",
];

const EXAM_ROWS: { section: string; label: string; cells: string[] }[] = [
  {
    section: "REGISTRATION",
    label: "Registration Opens",
    cells: ["29 Apr 2025", "12 Aug 2025", "11 Nov 2025", "11 Feb 2026", "5 May 2026"],
  },
  {
    section: "REGISTRATION",
    label: "Early Registration deadline",
    cells: ["7 Jul 2025", "14 Oct 2025", "21 Jan 2026", "15 Apr 2026", "7 Jul 2026"],
  },
  {
    section: "REGISTRATION",
    label: "Final Registration Deadline",
    cells: ["29 Oct 2025", "12 Feb 2026", "6 May 2026", "11 Aug 2026", "5 Nov 2026"],
  },
  {
    section: "CFA® EXAM WINDOWS",
    label: "Level 1",
    cells: ["02–08 Feb 2026", "12–18 May 2026", "18–24 Aug 2026", "11–17 Nov 2026", "22-28 Feb 2027"],
  },
  {
    section: "CFA® EXAM WINDOWS",
    label: "Level 2",
    cells: ["", "19-23 May 2026", "25-29 Aug 2026", "18-22 Nov 2026", ""],
  },
  {
    section: "CFA® EXAM WINDOWS",
    label: "Level 3",
    cells: ["29 Jan – 01 Feb 2026", "", "13-17 Aug 2026", "", "18-21 Feb 2027"],
  },
];

const splitEligibilityQuestion = (question?: string) => {
  const words = (question || "").split(" ");
  return { title: words[0] || "", rest: words.slice(1).join(" ") };
};

const CfaDetailsClient = ({ eligibilityList }: CfaDetailsClientProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [eligibilityOpenIndex, setEligibilityOpenIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState(0);

  let currentSection = "";

  return (
    <div className="course-cfa-details">
      <div className="container">
        <div className="course-cfa-details-container">
          <div className="header">
            <h3>Know all about CFA® Program</h3>
          </div>
          <div className="tabs">
            {TABS.map((label, index) => (
              <div
                key={label}
                className={`tab main-tabs${activeTab === index ? " active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveTab(index);
                  }
                }}
              >
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`what-is-cfa-content${activeTab !== 0 ? " hidden" : ""}`}>
          <div className="content-row">
            <div className="content-col">
              <div className="content-col-header">
                <div className="img-col">
                  <Image src="/img/cfa-1.png" alt="cfa-icon" width={200} height={200} />
                </div>
                <div className="content-col-content">
                  <h3>What is CFA® Program</h3>
                  <p>Unlock Your Financial Potential with Our Expert Courses</p>
                </div>
              </div>
              <div className="description">
                <p>
                  The Chartered Financial Analyst (CFA®) Program, offered by CFA
                  Institute (USA), is the gold standard in global finance. It&apos;s
                  a rigorous program covering economics, accounting, ethics,
                  portfolio management, and many more. Recognized in 165+
                  countries, the CFA® designation opens doors to careers in
                  investment banking, equity research, asset management, and
                  beyond.
                </p>
              </div>
            </div>
            <div className="slider-col">
              <Swiper
                className="what-is-cfa-swiper"
                modules={[Autoplay, Pagination]}
                direction="horizontal"
                slidesPerView={1}
                autoHeight
                loop
                speed={700}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <SwiperSlide key={testimonial.name}>
                    <div className="what-is-cfa-card">
                      <Image
                        src="/img/message-left-icon.svg"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <p>{testimonial.text}</p>
                      <div className="details">
                        <div className="user-image">
                          <UserCircle2 size={70} strokeWidth={1} aria-hidden="true" />
                        </div>
                        <div className="user-details">
                          <Image src="/img/stars.svg" alt="" width={96} height={19} />
                          <h3>{testimonial.name}</h3>
                          <p>Student The Valuation School</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        <div
          className={`eligibility course-learning-modules${activeTab !== 1 ? " hidden" : ""}`}
        >
          <div className="course-learning-modules-content" id="EligibilityAnswer">
            {eligibilityList.length === 0 ? (
              <></>
            ) : (
              eligibilityList.map((item, index) => {
                const { title, rest } = splitEligibilityQuestion(item.FaqQuestions);
                const isOpen = eligibilityOpenIndex === index;

                return (
                  <div
                    key={`${item.FaqQuestions}-${index}`}
                    className={`course-learning-modules-content-item${isOpen ? " active" : ""}`}
                  >
                    <div
                      className="tab"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => setEligibilityOpenIndex(isOpen ? -1 : index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setEligibilityOpenIndex(isOpen ? -1 : index);
                        }
                      }}
                    >
                      <div>
                        <h3>{title}</h3>
                        <p>{rest}</p>
                      </div>
                      <button type="button" aria-hidden="true" tabIndex={-1}>
                        <Image src="/img/plus.svg" alt="" width={20} height={20} />
                        <Image src="/img/minus.svg" alt="" width={20} height={20} />
                      </button>
                    </div>
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: item.FaqAnswer || "" }}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={`how-to-become${activeTab !== 2 ? " hidden" : ""}`} >
          <div className="how-to-become-cards">
            {HOW_TO_BECOME.map(({ image, title, description }) => (
              <div className="how-to-become-card" key={title}>
                <Image src={image} alt="" width={100} height={100} />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`exam-schedule${activeTab !== 3 ? " hidden" : ""}`}>
          <div className="exam-schedule-container">
            <div className="schedule-scroll">
              <div className="schedule-table">
                <div className="header">
                  <div></div>
                  {EXAM_MONTHS.map((month, index) => {
                    const [monthLabel, ...rest] = month.split(" (");
                    return (
                      <div
                        key={month}
                        className={`month${activeMonth === index ? " active" : ""}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveMonth(index)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setActiveMonth(index);
                          }
                        }}
                      >
                        {monthLabel}
                        <br />
                        {rest.length > 0 ? `(${rest.join(" (")}` : ""}
                      </div>
                    );
                  })}
                </div>

                {EXAM_ROWS.map((row, rowIndex) => {
                  const showSectionTitle = row.section !== currentSection;
                  currentSection = row.section;

                  return (
                    <div key={row.label}>
                      {showSectionTitle && (
                        <div className="section-title">{row.section}</div>
                      )}
                      <div className="row">
                        <div className="label">{row.label}</div>
                        {row.cells.map((cell, cellIndex) => (
                          <div
                            className={cell ? "cell" : ""}
                            key={`${row.label}-${cellIndex}`}
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CfaDetailsClient;
