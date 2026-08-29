"use client";

import React, { useId, useState } from "react";
import type { ICountryCodeOption, ICountryOption, ILearningModule } from "./LearningModules";
import { BrochureIcon, PlayCircleIcon } from "./LearningModulesIcons";
import BrochureModal from "./BrochureModal";

interface LearningModulesClientProps {
  modules: ILearningModule[];
  countryCodes: ICountryCodeOption[];
  countries: ICountryOption[];
  demoVideoLink?: string;
}

const LearningModulesClient = ({
  modules,
  countryCodes,
  countries,
  demoVideoLink,
}: LearningModulesClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rawIdSuffix = useId().replace(/:/g, "");
  const headingPlayIdSuffix = `${rawIdSuffix}-heading`;
  const bottomPlayIdSuffix = `${rawIdSuffix}-bottom`;

  const openDemoVideo = () => {
    if (demoVideoLink) window.open(demoVideoLink, "_blank", "noopener,noreferrer");
  };

  const brochureButton = (key: string) => (
    <button type="button" key={key} onClick={() => setIsModalOpen(true)}>
      <BrochureIcon />
      Download Brochure
    </button>
  );

  return (
    <>
      <div className="course-learning-modules">
        <div className="container">
          <div className="course-learning-modules-container">
            <div className="course-learning-modules-heading">
              <h3>Learning Modules</h3>
              <div className="buttons">
                {brochureButton("heading-brochure")}
                {demoVideoLink && (
                  <button type="button" id="DemoVideoLink" onClick={openDemoVideo}>
                    <PlayCircleIcon idSuffix={headingPlayIdSuffix} />
                    Demo Video
                  </button>
                )}
              </div>
            </div>

            <div className="course-learning-modules-content" id="LearningModulesAnswer">
              {modules.length === 0 && <p>No Learning Modules available at the moment.</p>}

              {modules.map((mod, index) => (
                <div
                  className="course-learning-modules-content-item"
                  key={`${mod.number}-${index}`}
                >
                  <div className="tab">
                    <div>
                      <h3>{mod.number}</h3>
                      <p>{mod.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="buttons second">
              {brochureButton("bottom-brochure")}
              {demoVideoLink && (
                <button type="button" id="DemoVideoMobileLink" onClick={openDemoVideo}>
                  <PlayCircleIcon idSuffix={bottomPlayIdSuffix} />
                  Demo Video
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <BrochureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countryCodes={countryCodes}
        countries={countries}
      />
    </>
  );
};

export default LearningModulesClient;
