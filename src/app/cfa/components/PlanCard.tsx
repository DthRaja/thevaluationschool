"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { IPlanApiItem } from "./PlansEveryone";

interface PlanCardProps {
  item: IPlanApiItem;
  isActive: boolean;
}

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

const PlanCard = ({ item, isActive }: PlanCardProps) => {
  const dropdownOptions = useMemo(
    () =>
      (item.CourseCard_Dropdown || [])
        .filter((option) => option.IsActive !== false)
        .sort((a, b) => (a.SortedOrder ?? 0) - (b.SortedOrder ?? 0)),
    [item.CourseCard_Dropdown],
  );

  const hasDropdown = !!item.HasDropdown && dropdownOptions.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = hasDropdown ? dropdownOptions[selectedIndex] : undefined;

  const packageId = selected?.PackageId ?? item.PackageId;
  const packagePriceId = selected?.PackagePriceId ?? item.PackagePriceId;
  const price = selected?.Price ?? item.Price;

  const enrollHref = `/secure/login?redirectUrl=${encodeURIComponent(
    `/checkout?packageId=${packageId}&priceId=${packagePriceId}`,
  )}`;

  return (
    <div className={`course-plan-card active`}>
      <div className="course-plan-card-header">
        <div>
          <span className="text">{item.CardTitle || ""}</span>
         <span className="tag">BEST</span>
        </div>
        <div>
          <h3>₹{typeof price === "number" ? formatINR(price) : price || "20,000"}</h3>
          <p>onwards</p>
        </div>
        <p className="description">{item.CardSubTitle || ""}</p>
      </div>
      <hr />
      {item.CardBody && <div dangerouslySetInnerHTML={{ __html: item.CardBody }} />}

      {hasDropdown && (
        <div className="input">
          <select
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {dropdownOptions.map((option, index) => (
              <option key={option.DropdownId ?? index} value={index}>
                {option.DropdownLabel || ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <Link href={enrollHref} className="btnEnroll">
        ENROLL NOW
      </Link>
    </div>
  );
};

export default PlanCard;
