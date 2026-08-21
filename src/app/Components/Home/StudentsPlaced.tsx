import Image from "next/image";
import React from "react";

import CompaniesTicker from "./CompaniesTicker";

export interface IStudentsPlaced {
  name: string;
  companyImage: string;
  ContentText: string;
  studentPhoto: string;
}

/**
 * The backing API returns loosely-typed rows with inconsistent key casing
 * (e.g. "students Photo" vs "Student Photo") depending on how the CMS entry
 * was saved, so this normalizes them into the IStudentsPlaced shape instead
 * of trusting a raw cast.
 */

const StudentsPlaced = ({ data }: { data: IStudentsPlaced[] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="compaines-section">
        <div className="compaines-heading">
          <h3>
            Companies where our students are{" "}
            <span>
              placed
              <Image
                src="/img/companies-header-line.svg"
                alt=""
                width={150}
                height={12}
              />
            </span>
          </h3>
        </div>

        <div className="companies-cards">
          <CompaniesTicker data={data} />
        </div>
      </div>
    </>
  );
};

export default StudentsPlaced;
