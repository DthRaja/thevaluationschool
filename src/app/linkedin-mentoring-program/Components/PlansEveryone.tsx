import React from "react";
import Link from "next/link";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";

interface IPlanApiItem {
  CardTitle?: string;
  BadgeLabel?: string;
  Price?: string;
  CardSubTitle?: string;
  CardBody?: string;
  PackageId?: number;
  PackagePriceId?: number;
}

interface PlansEveryoneProps {
  linkId?: number;
}

const PlansEveryone = async ({ linkId }: PlansEveryoneProps) => {
  const plansApi = new ServerApi({ withAuth: false, spName: "SPClientAnonymous", mode: 56 });

  const plansRes = await plansApi.request({ LinkId: linkId });
  const plans: IPlanApiItem[] = convertData(plansRes?.result) || [];

  return (
    <div className="course-plan" id="enroll">
      <div className="container">
        <div className="course-plan-container">
          <h3 className="title">Plans for everyone</h3>

          <div className="course-plan-cards" id="course-planCard">
            <div className="course-plan-card session" >
          <div className="course-plan-card-header">
            <div data-key="root-17-1-1-3-1-1-1"><span className="text" data-key="root-17-1-1-3-1-1-1-0">SESSION DETAILS</span></div>
          </div>
          <ol className="lp2-list" data-key="root-17-1-1-3-1-3">
            <li className="lp2-item" data-key="root-17-1-1-3-1-3-1">
              <div className="lp2-row" data-key="root-17-1-1-3-1-3-1-1">
                <span className="lp2-num" data-key="root-17-1-1-3-1-3-1-1-1">#Session 1 –</span><span className="lp2-title" data-key="root-17-1-1-3-1-3-1-1-2"> Profile Optimisation (1 hr)</span>
              </div>
              <div className="lp2-meta" data-key="root-17-1-1-3-1-3-1-3">
                <span className="lp2-meta-item lp2-cal" data-key="root-17-1-1-3-1-3-1-3-1">6th September 2026 (Sunday) </span><span className="lp2-sep" data-key="root-17-1-1-3-1-3-1-3-2">•</span><span className="lp2-meta-item lp2-time" data-key="root-17-1-1-3-1-3-1-3-3"> 1:00 PM</span>
              </div>
            </li>
            <li className="lp2-item" data-key="root-17-1-1-3-1-3-3">
              <div className="lp2-row" data-key="root-17-1-1-3-1-3-3-1">
                <span className="lp2-num" data-key="root-17-1-1-3-1-3-3-1-1">#Session 2 –</span><span className="lp2-title" data-key="root-17-1-1-3-1-3-3-1-2"> Content Creation (1 hr)</span>
              </div>
              <div className="lp2-meta" data-key="root-17-1-1-3-1-3-3-3">
                <span className="lp2-meta-item lp2-cal" data-key="root-17-1-1-3-1-3-3-3-1">13th September 2026 (Sunday)</span><span className="lp2-sep" data-key="root-17-1-1-3-1-3-3-3-2">•</span><span className="lp2-meta-item lp2-time" data-key="root-17-1-1-3-1-3-3-3-3">1:00 PM</span>
              </div>
            </li>
            <li className="lp2-item" data-key="root-17-1-1-3-1-3-5">
              <div className="lp2-row" data-key="root-17-1-1-3-1-3-5-1">
                <span className="lp2-num" data-key="root-17-1-1-3-1-3-5-1-1">#Session 3 –</span><span className="lp2-title" data-key="root-17-1-1-3-1-3-5-1-2"> Review and Mentoring (1 hr)</span>
              </div>
              <div className="lp2-meta" data-key="root-17-1-1-3-1-3-5-3">
                <span className="lp2-meta-item lp2-cal" data-key="root-17-1-1-3-1-3-5-3-1">20th September 2026 (Sunday)</span><span className="lp2-sep" data-key="root-17-1-1-3-1-3-5-3-2">•</span><span className="lp2-meta-item lp2-time" data-key="root-17-1-1-3-1-3-5-3-3">1:00 PM</span>
              </div>
            </li>
            <li className="lp2-item" data-key="root-17-1-1-3-1-3-7">
              <div className="lp2-row" data-key="root-17-1-1-3-1-3-7-1">
                <span className="lp2-num" data-key="root-17-1-1-3-1-3-7-1-1">#Session 4 –</span><span className="lp2-title" data-key="root-17-1-1-3-1-3-7-1-2">Roadmap for 10x Growth (1 hr)</span>
              </div>
              <div className="lp2-meta" data-key="root-17-1-1-3-1-3-7-3">
                <span className="lp2-meta-item lp2-cal" data-key="root-17-1-1-3-1-3-7-3-1">27th September 2026 (Sunday)</span><span className="lp2-sep" data-key="root-17-1-1-3-1-3-7-3-2">•</span><span className="lp2-meta-item lp2-time" data-key="root-17-1-1-3-1-3-7-3-3">1:00 PM</span>
              </div>
            </li>
          </ol>
        </div>
            {plans.map((item, index) => {
              const enrollHref = `/secure/login?redirectUrl=${encodeURIComponent(
                `/checkout?packageId=${item.PackageId}&priceId=${item.PackagePriceId}`,
              )}`;

              return (
                <div
                  className={`course-plan-card${index % 2 === 1 ? "" : " active"}`}
                  key={`${item.CardTitle}-${index}`}
                >
                  <div className="course-plan-card-header">
                    <div>
                      <span className="text">{item.CardTitle || ""}</span>
                      {item.BadgeLabel && <span className="tag">{item.BadgeLabel}</span>}
                    </div>
                    <div>
                      <h3>₹{item.Price || "20,000"}</h3>
                    </div>
                    <p className="description">{item.CardSubTitle || ""}</p>
                  </div>
                  <hr />
                  {item.CardBody && (
                    <div dangerouslySetInnerHTML={{ __html: item.CardBody }} />
                  )}
                  <Link href={enrollHref} className="btnEnroll">
                    ENROLL NOW
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansEveryone;
