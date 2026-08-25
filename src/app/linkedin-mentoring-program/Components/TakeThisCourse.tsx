import React from "react";

const TakeThisCourse = () => {
  return (
    <>
      <div className="why-choose-us-section">
        <div className="container">
          <div className="why-choose-us-container">
            <div className="why-choose-us-header">
              <h3>Who should take this course</h3>
            </div>
            <div className="why-choose-us-cards">
              <div className="big">
                <img
                  src="/img/cac.png"
                  alt="why-choose-us-icon"
                />
              </div>
              <div className="why-choose-us-card">
                <p>
                  Designed for college students seeking internships or
                  entry-level positions in top finance and investment firms
                </p>
              </div>
              <div className="why-choose-us-card">
                <p>
                  Ideal for professionals looking to enhance their expertise and
                  advance in their finance careers.
                </p>
              </div>
              <div className="why-choose-us-card">
                <p>
                  Perfect for those looking to transition into finance by
                  strengthening their expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeThisCourse;
