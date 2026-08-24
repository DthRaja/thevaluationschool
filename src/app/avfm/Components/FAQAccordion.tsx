"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { IFaqItem } from "./FAQ";

interface FAQAccordionProps {
  faqs: IFaqItem[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(faqs.length > 0 ? 0 : null);

  return (
    <div className="questions" id="questionsAns">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={`question${isOpen ? " open" : ""}`} key={`${faq.FaqQuestions}-${index}`}>
            <div
              className="tab"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(isOpen ? null : index);
                }
              }}
            >
              <h3>{faq.FaqQuestions}</h3>
              <button
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                aria-label={isOpen ? "Collapse answer" : "Expand answer"}
              >
                {isOpen ? <Minus /> : <Plus />}
              </button>
            </div>
            <div className="answer" aria-hidden={!isOpen}>
              <div className="answer-inner" dangerouslySetInnerHTML={{ __html: faq.FaqAnswer }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
