import React from "react";

const WhatLearn = () => {
  return (
    <div className="what-you-will-learn-section">
      <div className="container">
        <div className="what-you-will-learn-container">
          <h2>What you will learn</h2>
          <div className="cards-tabs">
            <div className="card-tab">
              <p>Price Patterns</p>
            </div>
            <div className="card-tab">
              <p>Chart Interpretation</p>
            </div>
            <div className="card-tab">
              <p>Trend Recognition</p>
            </div>
            <div className="card-tab">
              <p>Volume Insights</p>
            </div>
          </div>

          <div className="cards-tabs">
            <div className="card-tab">
              <p>Entry-Exit Planning</p>
            </div>
            <div className="card-tab">
              <p>Risk Awareness</p>
            </div>
            <div className="card-tab">
              <p>Data-Driven Thinking</p>
            </div>
            <div className="card-tab">
              <p>Beginner’s Market Toolkit</p>
            </div>
          </div>
          <div className="content">
            <p>
              This workshop will teach you how to truly read a chart — not just
              look at one. You’ll start with the core ideas of price movement,
              trends, and support-resistance levels that shape every market.
              Step by step, you’ll understand candlestick patterns and how they
              reveal what buyers and sellers are thinking. As you move ahead,
              you’ll also explore time-tested tools like Gann principles and
              structured charting techniques that bring discipline to your
              analysis. By the end, you’ll know how to interpret any market move
              with confidence and clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatLearn;
