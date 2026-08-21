"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

import type { CourseMenuItem } from "./Header";

interface NavbarProps {
  courses: CourseMenuItem[];
}

/**
 * Normalize a path so:
 *
 * /index => /
 * /cfa/  => /cfa
 * /CFA   => /cfa
 *
 * Query strings and hashes are ignored.
 */
const normalizePath = (url: string | null | undefined) => {
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

/**
 * Course URLs coming from the CMS sometimes point at "/index" for the
 * home page. Next.js has no "/index" route, so resolve that (and any
 * empty path) to "/" before it's used as a Link href.
 */
const toSafeHref = (url: string) => {
  const normalized = normalizePath(url);

  return normalized === "/" ? "/" : url;
};

const Navbar = ({ courses }: NavbarProps) => {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);

  const currentPath = normalizePath(pathname);

  /**
   * Check whether current page is one of
   * the dynamically loaded course pages.
   */
  const isCourseActive = useMemo(() => {
    return courses.some(
      (course) => normalizePath(course.PageUrl) === currentPath,
    );
  }, [courses, currentPath]);

  /**
   * Active menu checker
   */
  const isActive = (url: string) => {
    return normalizePath(url) === currentPath;
  };

  /**
   * -------------------------------------------------
   * HEADER SCROLL SHOW / HIDE
   * -------------------------------------------------
   */
  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    document.body.classList.add("has-fixed-header");

    const previousPaddingTop = document.body.style.paddingTop;

    document.body.style.paddingTop = "93px";

    let lastScrollY = window.scrollY;
    let ticking = false;
    let hideThreshold = header.offsetHeight + 10;

    const updateHeaderHeight = () => {
      hideThreshold = header.offsetHeight + 10;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        /**
         * At top
         */
        if (currentY <= 10) {
          header.classList.remove("header--hidden", "header--scrolled");
        } else if (currentY > lastScrollY && currentY > hideThreshold) {

        /**
         * Scrolling DOWN
         */
          header.classList.add("header--hidden");
          header.classList.remove("header--scrolled");
        } else if (currentY < lastScrollY) {

        /**
         * Scrolling UP
         */
          header.classList.remove("header--hidden");

          header.classList.add("header--scrolled");
        }

        lastScrollY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", updateHeaderHeight);

      document.body.classList.remove("has-fixed-header");

      document.body.style.paddingTop = previousPaddingTop;

      header.classList.remove("header--hidden", "header--scrolled");
    };
  }, []);

  /**
   * -------------------------------------------------
   * MOBILE BODY SCROLL LOCK
   * -------------------------------------------------
   */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileMenuOpen]);

  /**
   * -------------------------------------------------
   * CLOSE MOBILE MENU
   * -------------------------------------------------
   */
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCourseOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="header-main"
        style={{
          backgroundColor: "#fff",
          padding: "10px 0",
        }}
      >
        <div className="container">
          <div className="header-container">
            {/* ===============================
                LOGO SECTION
            =============================== */}

            <div className="logo-col col-md-3">
              {/* Mobile Menu Icon */}
              <button
                type="button"
                id="mobile-menu-icon"
                className="mobile-menu-icon"
                aria-label="Open navigation menu"
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  border: 0,
                  background: "transparent",
                  padding: 0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                >
                  <path
                    d="M1.22852 5.4014H13.5714M1.22852 1.28711H13.5714M1.22852 9.51568H13.5714"
                    stroke="#1E1E1E"
                    strokeWidth="1.37143"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/img/main-logo.jpg"
                    alt="The Valuation School"
                    width={135}
                    height={80}
                  />
                </Link>
              </div>
            </div>

            {/* ===============================
                DESKTOP MENU
            =============================== */}

            <div className="menu-col">
              <ul>
                {/* Home */}
                <li className={isActive("/") ? "active-item" : ""}>
                  <Link href="/">Home</Link>

                  <Image
                    src="/img/navbar-active.svg"
                    alt=""
                    width={47}
                    height={7}
                  />
                </li>

                {/* ============================
                    DYNAMIC COURSES DROPDOWN
                ============================ */}

                <li
                  className={`dropdown ${isCourseActive ? "active-item" : ""}`}
                >
                  <a
                    href="#"
                    className="dropdown-toggle"
                    onClick={(e) => e.preventDefault()}
                  >
                    All Courses
                  </a>

                  <Image
                    src="/img/navbar-active.svg"
                    alt=""
                    width={47}
                    height={7}
                  />

                  <ul className="dropdown-menu" id="DropdownMenu">
                    {courses.length > 0 ? (
                      courses.map((course, index) => (
                        <li key={`${course.PageUrl}-${index}`}>
                          <Link
                            className={`dropdown-item ${
                              isActive(course.PageUrl) ? "active" : ""
                            }`}
                            href={toSafeHref(course.PageUrl)}
                          >
                            {course.PageName}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className="dropdown-item-text">
                          No courses available
                        </span>
                      </li>
                    )}
                  </ul>
                </li>

                {/* Alumni */}
                <li className={isActive("/alumni") ? "active-item" : ""}>
                  <Link href="/alumni">Alumni</Link>

                  <Image
                    src="/img/navbar-active.svg"
                    alt=""
                    width={47}
                    height={7}
                  />
                </li>

                {/* Contact */}
                <li className={isActive("/contact") ? "active-item" : ""}>
                  <Link href="/contact">Contact</Link>

                  <Image
                    src="/img/navbar-active.svg"
                    alt=""
                    width={47}
                    height={7}
                  />
                </li>
              </ul>
            </div>

            {/* ===============================
                LOGIN
            =============================== */}

            <div className="btn-col signupButton">
              <Link className="custom-btn" href="/login">
                Login
              </Link>
            </div>

            <div className="profileLi d-none" />
          </div>

          {/* ==================================
              MOBILE MENU
          ================================== */}

          <div
            id="mobile-menu-container"
            className={`mobile-menu-container ${
              mobileMenuOpen ? "active" : ""
            }`}
          >
            <div className="mobile-menu-content">
              {/* Mobile Header */}
              <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                  <Link href="/" onClick={closeMobileMenu}>
                    <Image
                      src="/img/main-logo.jpg"
                      alt="The Valuation School"
                      width={500}
                      height={267}
                    />
                  </Link>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="mobile-menu-close-icon"
                  className="mobile-menu-close"
                  aria-label="Close navigation menu"
                  onClick={closeMobileMenu}
                  style={{
                    border: 0,
                    background: "transparent",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.1569 1.75646L10.7426 0.34225L6.5 4.58489L2.25736 0.34225L0.843146 1.75646L5.08579 5.9991L0.843146 10.2417L2.25736 11.656L6.5 7.41332L10.7426 11.656L12.1569 10.2417L7.91421 5.9991L12.1569 1.75646Z"
                      fill="#333"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Links */}
              <div className="mobile-menu-list">
                <ul>
                  {/* Home */}
                  <li>
                    <Link
                      href="/"
                      className={isActive("/") ? "active" : ""}
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                  </li>

                  {/* ==========================
                      MOBILE DYNAMIC COURSES
                  ========================== */}

                  <li className={`dropdown ${mobileCourseOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className={`dropdown-toggle ${
                        isCourseActive ? "active" : ""
                      }`}
                      aria-expanded={mobileCourseOpen}
                      onClick={() =>
                        setMobileCourseOpen((previous) => !previous)
                      }
                    >
                      All Courses
                    </button>

                    <ul className="dropdown-menu">
                      {courses.length > 0 ? (
                        courses.map((course, index) => (
                          <li key={`mobile-${course.PageUrl}-${index}`}>
                            <Link
                              className={`dropdown-item ${
                                isActive(course.PageUrl) ? "active" : ""
                              }`}
                              href={toSafeHref(course.PageUrl)}
                              onClick={closeMobileMenu}
                            >
                              {course.PageName}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <span className="dropdown-item-text">
                            No courses available
                          </span>
                        </li>
                      )}
                    </ul>
                  </li>

                  {/* Alumni */}
                  <li>
                    <Link
                      href="/alumni"
                      className={isActive("/alumni") ? "active" : ""}
                      onClick={closeMobileMenu}
                    >
                      Alumni
                    </Link>
                  </li>

                  {/* Contact */}
                  <li>
                    <Link
                      href="/contact"
                      className={isActive("/contact") ? "active" : ""}
                      onClick={closeMobileMenu}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
