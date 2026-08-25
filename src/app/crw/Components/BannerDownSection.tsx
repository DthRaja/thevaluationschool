import React from "react";


const BannerDownSection = () => {
  return (
    <div className="course-details-section">
  <div className="container">
    <div className="course-details-container">
      <div className="course-details-card">
        <div className="icon">
          <img
            src="/img/time.png"
            alt="course-details-icon"
          />
        </div>
        <div className="content">
          <h3>10+ Hours</h3>
          <p>Of hands on lecture</p>
        </div>
      </div>
      <div className="course-details-card">
        <div className="icon">
          <img
            src="/img/live.png"
            alt="course-details-icon"
          />
        </div>
        <div className="content">
          <h3>Self Paced</h3>
          <p>Learn at your own pace</p>
        </div>
      </div>
      <div className="course-details-card">
        <div className="icon">
          <img
            src="/img/blue-book.png"
            alt="course-details-icon"
          />
        </div>
        <div className="content">
          <h3>Study Material</h3>
          <p>PDFs, Checklists & Study Material</p>
        </div>
      </div>
      <div className="course-details-card">
        <div className="icon">
          <img
            src="/img/certificate.png"
            alt="course-details-icon"
          />
        </div>
        <div className="content">
          <h3>Certification</h3>
          <p>On course completion</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default BannerDownSection;
