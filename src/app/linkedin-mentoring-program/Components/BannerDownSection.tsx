import React from "react";

const BannerDownSection = () => {
  return (
    <div className="course-details-section">
      <div className="container">
        <div className="course-details-container">
          <div className="course-details-card">
            <div className="icon">
              <img src="/img/time.png" alt="course-details-icon" />
            </div>
            <div className="content">
              <h3>8 Hours</h3>
              <p>Of hands on lecture</p>
            </div>
          </div>
          <div className="course-details-card">
            <div className="icon">
              <img src="/img/live.png" alt="course-details-icon" />
            </div>
            <div className="content">
              <h3>Live Sessions</h3>
              <p>Learn at your own pace</p>
            </div>
          </div>
          <div className="course-details-card">
            <div className="icon">
              <img src="/img/blue-book.png" alt="course-details-icon" />
            </div>
            <div className="content">
              <h3>Unlock</h3>
              <p>New job opportunities</p>
            </div>
          </div>
          <div className="course-details-card">
            <div className="icon">
              <img src="/img/certificate.png" alt="course-details-icon" />
            </div>
            <div className="content">
              <h3>Build</h3>
              <p>Your personal brand</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDownSection;
