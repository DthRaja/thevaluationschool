import React from "react";

const WhatLearn = () => {
  return (
    <div className="what-you-will-learn-section">
      <div className="container">
        <div className="what-you-will-learn-container">
          <h2>What you will learn</h2>
          <div className="cards-tabs">
            <div className="card-tab">
              <p>Financial Statement Analysis</p>
            </div>
            <div className="card-tab">
              <p>Corporate Governance</p>
            </div>
            <div className="card-tab">
              <p>Sector Analysis</p>
            </div>
            <div className="card-tab">
              <p>Advanced Ratios</p>
            </div>
          </div>
          <div className="cards-tabs">
            <div className="card-tab">
              <p>Annual Reports</p>
            </div>
            <div className="card-tab">
              <p>Concall Analysis</p>
            </div>
            <div className="card-tab">
              <p>Report Writing</p>
            </div>
            <div className="card-tab">
              <p>Interview Prep</p>
            </div>
          </div>
          <div className="content">
            <p id="iqmnd">
              You’ll learn how to analyze financial statements and use ratios to
              understand a company’s health. The cohort trains you to spot
              forensic red flags and evaluate corporate governance for hidden
              risks. You’ll also practice reading annual reports concalls and
              study the economy and sectors that shape businesses. By the end,
              you’ll create a full equity research report and gain the
              presentation, resume, and interview skills needed for finance
              roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatLearn;
