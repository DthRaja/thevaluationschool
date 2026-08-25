import React from "react";
import ServerApi from "@/utils/Server";
import convertData from "@/utils/convartData";
import PlanCard from "./PlanCard";

export interface IPlanDropdownItem {
  DropdownId?: number;
  DropdownLabel?: string;
  PackageId?: number;
  PackagePriceId?: number;
  Price?: string | number;
  SortedOrder?: number;
  IsActive?: boolean;
}

export interface IPlanApiItem {
  CardTitle?: string;
  BadgeLabel?: string;
  Price?: string;
  CardSubTitle?: string;
  CardBody?: string;
  PackageId?: number;
  PackagePriceId?: number;
  HasDropdown?: boolean;
  CourseCard_Dropdown?: IPlanDropdownItem[];
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
            {plans.map((item, index) => (
              <PlanCard
                item={item}
                isActive={index % 2 !== 0}
                key={`${item.CardTitle}-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansEveryone;
