import React from "react";

import JoyBringsSlider from "./JoyBringsSlider";

export interface IJoyBrings {
  name: string;
  ContentText: string;
  studentPhoto: string;
  LinkedInUrl?: string;
}

const JoyBringsSection = ({ data }: { data: IJoyBrings[] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const limitedData = data.slice(0, 9);

  return (
    <>
      <div className="testimonial-section">
        <section className="container">
          <div className="testimonial-container">
            <div className="testimonial-heading">
              <h3>Joy brings results. Results bring joy.</h3>
            </div>

            <JoyBringsSlider data={limitedData} />
          </div>
        </section>
      </div>
    </>
  );
};

export default JoyBringsSection;
