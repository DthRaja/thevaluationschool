import Image from "next/image";
import Link from "next/link";
import React from "react";

import CourseSwiper from "./CourseSwiper";

interface Course {
  href: string;
  image: string;
  title: React.ReactNode;
  description: string;
}

const courses: Course[] = [
  {
    href: "/cfa",
    image: "/img/courses/CFA®.png",
    title: "CFA® level 1 for Students",
    description: "Accepting admission for August 2026",
  },
  {
    href: "/avfm",
    image: "/img/courses/AVFM.png",
    title: (
      <>
        Advanced Valuation & Financial <br />
        Modelling
      </>
    ),
    description: "Accepting admission for Aug 2026.",
  },
  {
    href: "/erc",
    image: "/img/courses/ERC.png",
    title: (
      <>
        Equity Research <br />
        Cohort
      </>
    ),
    description: "Accepting admission for July 2026.",
  },
  {
    href: "/crw",
    image: "/img/courses/CRW.png",
    title: (
      <>
        Chart Reading <br />
        Workshop
      </>
    ),
    description: "Registration open for August 2026 Workshop.",
  },
  {
    href: "/linkedin-mentoring-program",
    image: "/img/courses/LMC.png",
    title: (
      <>
        LinkedIn Mentoring <br />
        Cohort
      </>
    ),
    description: "Registration open for Apr 2026",
  },
];

const OurCourses = () => {
  return (
    <>
      <div className="course-section">
        <div className="course-container">
          <div className="container">
            <div className="course-heading">
              <h3>
                Our Courses
                <Image
                  src="/img/course-section-line.svg"
                  alt=""
                  width={150}
                  height={12}
                />
              </h3>

              <p>
                Mastering Finance Concepts Made Easy Empower Your <br />
                Learning with Our Comprehensive Courses
              </p>
            </div>
          </div>

          <CourseSwiper>
            {courses.map((course) => (
              <div className="course-card" key={course.href}>
                <div className="course-card-image">
                  <Link className="c__heaing" href={course.href}>
                    <Image
                      src={course.image}
                      alt="course-card-image"
                      width={1280}
                      height={720}
                    />
                  </Link>
                </div>
                <div className="course-card-content">
                  <Link className="c__heaing" href={course.href}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </Link>
                </div>
              </div>
            ))}
          </CourseSwiper>
        </div>
      </div>
    </>
  );
};

export default OurCourses;
