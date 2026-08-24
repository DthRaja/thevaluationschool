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
            {plans.map((item, index) => {
              const enrollHref = `/login?redirectUrl=${encodeURIComponent(
                `/checkout?packageId=${item.PackageId}&priceId=${item.PackagePriceId}`,
              )}`;

              return (
                <div
                  className={`course-plan-card${index % 2 === 0 ? "" : " active"}`}
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
