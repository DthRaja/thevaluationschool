import Image from "next/image";
import React from "react";

import AboutSwiper from "./AboutSwiper";

const AboutSection = () => {
  return (
    <>
      <div className="about-section">
        <div className="about-container">
          <AboutSwiper>
            <div className="container">
              <div className="about-card">
                <div className="content-col">
                  <div className="top-about-card-content">
                    <div className="heading-col">
                      <h2>
                        THE <br />
                        VALUATION <br />
                        SCHOOL
                      </h2>
                      <p style={{ letterSpacing: "10px" }}>NO RISK NO STORY</p>
                    </div>
                    <div className="dash-border"></div>
                    <div className="para-col">
                      <p>
                        Finance is for everyone, not just experts. We’re
                        here to make financial knowledge clear, accessible,
                        and hands-on — so you’re prepared for both exams and
                        real-world careers.
                      </p>
                    </div>
                  </div>
                  <div className="dash-border-bottom"></div>
                  <div className="bottom-about-card-content">
                    <div className="about-card-col">
                      <h3>20,000+</h3>
                      <p>Students</p>
                    </div>
                    <div className="about-card-col">
                      <h3>350+</h3>
                      <p>Total Hours of Lectures</p>
                    </div>
                    <div className="about-card-col">
                      <Image
                        src="/img/stars.svg"
                        alt="star-icon"
                        width={154}
                        height={31}
                      />
                      <p>Average rating</p>
                    </div>
                  </div>
                </div>
                <div className="image-col">
                  <div className="fixed-image-container">
                    <p>
                      Expert in <br />
                      Finance Skills
                    </p>
                    <Image
                      src="/img/crown.svg"
                      alt="arrow-icon"
                      className="crown-icon"
                      width={46}
                      height={46}
                    />
                    <Image
                      src="/img/about-1.png"
                      alt="about-section-image"
                      className="about-section-image"
                      width={813}
                      height={881}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="about-card second-about-card">
                <div className="content-col">
                  <div className="top-about-card-content">
                    <div className="heading-col">
                      <div className="heading-col-content">
                        <h2>PARTH VERMA</h2>
                        <p className="founder-name">
                          Founder & Mentor of The Valuation School
                        </p>
                      </div>
                      <div className="social-icons">
                        <a
                          className="social-icon cursor-pointer"
                          href="https://www.instagram.com/thevaluationschool/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <Image
                            src="/img/Instagram.svg"
                            alt="instagram-icon"
                            width={27}
                            height={28}
                          />
                        </a>
                        <a
                          className="social-icon cursor-pointer"
                          href="https://www.linkedin.com/in/caparthverma/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <Image
                            src="/img/LinkedIn.svg"
                            alt="LinkedIn-icon"
                            width={27}
                            height={25}
                          />
                        </a>
                        <a
                          className="social-icon cursor-pointer"
                          href="https://www.youtube.com/@thevaluationschool"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                        >
                          <Image
                            src="/img/YouTube.svg"
                            alt="YouTube-icon"
                            width={29}
                            height={21}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="dash-border"></div>
                    <div className="para-col">
                      <p>
                        He’s a Chartered Accountant and NYU Stern alum, but
                        above all, a mentor. With years of financial
                        expertise, he guides students step by step, turning
                        complex concepts into career-ready skills. Inspired
                        by Charlie Munger, he believes true success comes
                        from shared wisdom.
                      </p>
                    </div>
                  </div>
                  <div className="dash-border-bottom"></div>
                  <div className="bottom-about-card-content">
                    <div className="about-card-col">
                      <h3>20,000+</h3>
                      <p>Students</p>
                    </div>
                    <div className="about-card-col">
                      <h3>350+</h3>
                      <p>Total Hours of Lectures</p>
                    </div>
                    <div className="about-card-col">
                      <Image
                        src="/img/stars.svg"
                        alt="star-icon"
                        width={154}
                        height={31}
                      />
                      <p>Average rating</p>
                    </div>
                  </div>
                </div>
                <div className="image-col">
                  <div className="fixed-image-container">
                    <p>
                      Expert in <br />
                      Finance Skills
                    </p>
                    <Image
                      src="/img/crown.svg"
                      alt="arrow-icon"
                      className="crown-icon"
                      width={46}
                      height={46}
                    />
                    <Image
                      src="/img/unnamed.png"
                      alt="about-section-image"
                      className="about-section-image"
                      width={861}
                      height={835}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AboutSwiper>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
