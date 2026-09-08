import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="background-color">
          <div className="container">
            <div className="footer-container">
              <div className="fixed-arrow-content">
                <p>
                  We have a lot of <br />
                  content on social media
                </p>

                <Image
                  src="/img/footerarrow.svg"
                  alt=""
                  className="arrow-icon"
                  width={92}
                  height={152}
                />
              </div>
              <div className="footer-up-section">
                <Image
                  src="/img/transparent-logo.png"
                  className="footer-logo"
                  alt="The Valuation School"
                  width={500}
                  height={244}
                />

                <div className="social-icons">
                  <a
                    className="social-icon"
                    href="https://www.instagram.com/thevaluationschool/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="28"
                      viewBox="0 0 27 28"
                      fill="none"
                    >
                      <path
                        d="M13.5771 1.44727C18.5324 1.44727 21.0103 1.44729 22.7949 2.62793C23.5918 3.15518 24.2745 3.83796 24.8018 4.63477C25.9827 6.41948 25.9834 8.89783 25.9834 13.8535C25.9834 18.809 25.9826 21.2866 24.8018 23.0713C24.2744 23.8683 23.5919 24.5508 22.7949 25.0781C21.0102 26.259 18.5327 26.2598 13.5771 26.2598C8.62146 26.2598 6.14312 26.259 4.3584 25.0781C3.56159 24.5508 2.87881 23.8681 2.35156 23.0713C1.17093 21.2866 1.1709 18.8087 1.1709 13.8535C1.1709 8.89783 1.17066 6.41948 2.35156 4.63477C2.87887 3.83786 3.56149 3.15523 4.3584 2.62793C6.14312 1.44703 8.62146 1.44727 13.5771 1.44727ZM13.5771 7.42773C10.0301 7.42793 7.15527 10.3035 7.15527 13.8506C7.15535 17.3976 10.0302 20.2732 13.5771 20.2734C17.1243 20.2734 19.9999 17.3977 20 13.8506C20 10.3034 17.1243 7.42773 13.5771 7.42773ZM13.5771 9.60059C15.9242 9.60059 17.8271 11.5035 17.8271 13.8506C17.8271 16.1976 15.9242 18.1006 13.5771 18.1006C11.2303 18.1004 9.3282 16.1975 9.32812 13.8506C9.32812 11.5036 11.2302 9.60078 13.5771 9.60059ZM20.2539 5.59766C19.4205 5.59766 18.7453 6.27312 18.7451 7.10645C18.7451 7.93992 19.4204 8.61621 20.2539 8.61621C21.0874 8.61621 21.7627 7.93992 21.7627 7.10645C21.7625 6.27312 21.0873 5.59766 20.2539 5.59766Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a
                    className="social-icon"
                    href="https://www.linkedin.com/in/caparthverma/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                    >
                      <path
                        d="M1.17139 3.87971C1.17139 3.08406 1.45081 2.42766 2.00963 1.91051C2.56845 1.39334 3.29494 1.13477 4.18905 1.13477C5.06722 1.13477 5.77771 1.38935 6.32058 1.89858C6.8794 2.4237 7.15882 3.10793 7.15882 3.95132C7.15882 4.71513 6.8874 5.35162 6.34453 5.86084C5.78571 6.38596 5.05124 6.64852 4.14115 6.64852H4.1172C3.23904 6.64852 2.52855 6.38596 1.98568 5.86084C1.44281 5.33572 1.17139 4.67534 1.17139 3.87971ZM1.48273 24.7652V8.82061H6.79957V24.7652H1.48273ZM9.74539 24.7652H15.0622V15.862C15.0622 15.305 15.1261 14.8754 15.2538 14.5731C15.4774 14.032 15.8166 13.5745 16.2717 13.2006C16.7267 12.8266 17.2975 12.6397 17.9841 12.6397C19.7724 12.6397 20.6665 13.8411 20.6665 16.2439V24.7652H25.9833V15.6233C25.9833 13.2682 25.4245 11.482 24.3068 10.2647C23.1892 9.04737 21.7123 8.4387 19.8761 8.4387C17.8164 8.4387 16.2118 9.32186 15.0622 11.0882V11.1359H15.0383L15.0622 11.0882V8.82061H9.74539C9.77732 9.32981 9.79329 10.9131 9.79329 13.5706C9.79329 16.228 9.77732 19.9595 9.74539 24.7652Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a
                    className="social-icon"
                    href="https://www.youtube.com/@thevaluationschool"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="21"
                      viewBox="0 0 29 21"
                      fill="none"
                    >
                      <path
                        d="M15.5593 19.815L9.95984 19.7104C8.14684 19.6739 6.32934 19.7467 4.5519 19.3689C1.848 18.8044 1.65645 16.0366 1.45601 13.715C1.17982 10.4511 1.28674 7.12789 1.80794 3.89121C2.10218 2.0751 3.26011 0.991407 5.05081 0.873481C11.0958 0.44551 17.1809 0.496229 23.2124 0.695893C23.8494 0.714196 24.4908 0.814238 25.119 0.928112C28.2195 1.48351 28.2951 4.62001 28.4961 7.26035C28.6965 9.92794 28.6119 12.6092 28.2288 15.2586C27.9214 17.4523 27.3334 19.2919 24.8517 19.4695C21.7422 19.7017 18.7042 19.8886 15.586 19.8291C15.5861 19.815 15.5682 19.815 15.5593 19.815ZM12.2674 14.2613C14.6106 12.8864 16.9091 11.5345 19.2389 10.1688C16.8913 8.79395 14.5972 7.44199 12.2674 6.07634V14.2613Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a
                    className="social-icon"
                    href="https://tvsweekly.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Substack"
                    title="Substack"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="28"
                      viewBox="0 0 27 28"
                      fill="none"
                    >
                      <rect x="1" y="1" width="25" height="6" fill="black" />
                      <rect x="1" y="10.5" width="25" height="6" fill="black" />
                      <path d="M1 20H26V27L13.5 20L1 27V20Z" fill="black" />
                    </svg>
                  </a>
                </div>
              </div>
              <hr />
              <div className="footer-center-section">
                <div className="mail-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="22"
                    viewBox="0 0 28 22"
                    fill="none"
                  >
                    <path
                      d="M26.7896 4.34766V17.0791C26.7896 17.9233 26.4543 18.7329 25.8574 19.3298C25.2605 19.9267 24.4509 20.262 23.6067 20.262H4.50953C3.66538 20.262 2.8558 19.9267 2.2589 19.3298C1.662 18.7329 1.32666 17.9233 1.32666 17.0791V4.34766"
                      stroke="#170F49"
                      strokeWidth="2.13889"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M26.7896 4.34498C26.7896 3.50083 26.4543 2.69125 25.8574 2.09435C25.2605 1.49745 24.4509 1.16211 23.6067 1.16211H4.50953C3.66538 1.16211 2.8558 1.49745 2.2589 2.09435C1.662 2.69125 1.32666 3.50083 1.32666 4.34498L12.3712 11.2412C12.8771 11.5574 13.4616 11.725 14.0581 11.725C14.6547 11.725 15.2392 11.5574 15.7451 11.2412L26.7896 4.34498Z"
                      stroke="#170F49"
                      strokeWidth="2.13889"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a href="mailto:contact@thevaluationschool.com">
                    contact@thevaluationschool.com
                  </a>
                </div>

                <div className="phone-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    fill="none"
                  >
                    <path
                      d="M18.2202 25.819L18.2341 25.8288C19.4366 26.5944 20.8642 26.9268 22.2812 26.7712C23.6981 26.6156 25.0196 25.9812 26.0272 24.9729L26.9025 24.0976C27.0965 23.9037 27.2504 23.6735 27.3554 23.4202C27.4604 23.1669 27.5144 22.8953 27.5144 22.6211C27.5144 22.3468 27.4604 22.0753 27.3554 21.8219C27.2504 21.5686 27.0965 21.3384 26.9025 21.1446L23.2106 17.4554C23.0167 17.2614 22.7865 17.1075 22.5332 17.0025C22.2798 16.8975 22.0083 16.8435 21.7341 16.8435C21.4598 16.8435 21.1883 16.8975 20.9349 17.0025C20.6816 17.1075 20.4514 17.2614 20.2575 17.4554C19.8661 17.8467 19.3352 18.0665 18.7817 18.0665C18.2282 18.0665 17.6974 17.8467 17.3059 17.4554L11.4027 11.5507C11.0113 11.1593 10.7915 10.6284 10.7915 10.0749C10.7915 9.52139 11.0113 8.99054 11.4027 8.59909C11.5966 8.40523 11.7505 8.17506 11.8555 7.92171C11.9605 7.66836 12.0145 7.39681 12.0145 7.12257C12.0145 6.84834 11.9605 6.57679 11.8555 6.32344C11.7505 6.07009 11.5966 5.83992 11.4027 5.64606L7.71208 1.95688C7.32063 1.56554 6.78978 1.3457 6.23626 1.3457C5.68275 1.3457 5.1519 1.56554 4.76045 1.95688L3.88373 2.83221C2.87562 3.83999 2.2415 5.16154 2.08614 6.5785C1.93078 7.99545 2.26348 9.42301 3.02927 10.6253L3.03762 10.6392C7.08193 16.6229 12.2358 21.7758 18.2202 25.819V25.819Z"
                      stroke="#170F49"
                      strokeWidth="2.13889"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a href="tel:8120812010">8120 8120 10</a>,
                  <a href="tel:+919302017656">+91 93020 17656</a>
                </div>

                <div className="address-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="31"
                    height="31"
                    viewBox="0 0 31 31"
                    fill="none"
                  >
                    <path
                      d="M25.9839 13.9396C25.9839 22.1572 17.5671 27.2199 15.818 28.1842C15.7211 28.2377 15.6122 28.2657 15.5016 28.2657C15.3909 28.2657 15.282 28.2377 15.1852 28.1842C13.4347 27.2199 5.02051 22.1572 5.02051 13.9396C5.02051 7.38848 8.95115 2.80273 15.5022 2.80273C22.0533 2.80273 25.9839 7.38848 25.9839 13.9396Z"
                      stroke="#170F49"
                      strokeWidth="2.13889"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.2617 13.2858C10.2617 14.6757 10.8139 16.0088 11.7967 16.9916C12.7796 17.9745 14.1126 18.5266 15.5026 18.5266C16.8925 18.5266 18.2256 17.9745 19.2084 16.9916C20.1913 16.0088 20.7434 14.6757 20.7434 13.2858C20.7434 11.8958 20.1913 10.5628 19.2084 9.57993C18.2256 8.59708 16.8925 8.04492 15.5026 8.04492C14.1126 8.04492 12.7796 8.59708 11.7967 9.57993C10.8139 10.5628 10.2617 11.8958 10.2617 13.2858V13.2858Z"
                      stroke="#170F49"
                      strokeWidth="2.13889"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Manorama Ganj, Indore</p>
                </div>
              </div>
              <hr />
              <div className="footer-down-section">
                <div className="footer-down-section-left">
                  <div className="footer-down-section-left-col">
                    <h3>COURSES</h3>
                    <ul>
                      <li>
                        <a href="/cfa">CFA</a>
                      </li>
                      <li>
                        <a href="/avfm">AVFM</a>
                      </li>
                      <li>
                        <a href="/erc">Equity Research Cohort</a>
                      </li>
                      <li>
                        <a href="/crw">Chart Reading</a>
                      </li>
                      <li>
                        <a href="/linkedin-mentoring-program">LinkedIn</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-down-section-left-col">
                    <h3>COMPANY</h3>
                    <ul>
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                      <li>
                        <a href="/blog">Blog</a>
                      </li>
                      <li>
                        <a href="/alumni">Alumni</a>
                      </li>
                      <li>
                        <a href="/Terms">Terms & Condition</a>
                      </li>
                      <li>
                        <a href="/PrivacyPolicy">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="/RefundPolicy">Refund Policy</a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-down-section-full-col">
                    <p>
                      CFA® and Chartered Financial Analyst® are registered
                      trademarks owned by CFA Institute. The Valuation School &
                      Parth Verma Classes are independent education providers
                      and are not affiliated with, endorsed by, sponsored by,
                      or a prep provider for CFA Institute.
                    </p>
                  </div>

                  <div className="footer-down-section-full-col last">
                    <div className="small-border"></div>
                    <p>
                      © 2025{" "}
                      <span>
                        The Valuation School. Layman Ventures Private Limited
                      </span>{" "}
                      All rights reserved.
                    </p>
                  </div>
                </div>
                <div className="footer-down-section-right">
                  <div className="fixed-image">
                    <Image
                      src="/img/footer.png"
                      alt=""
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
