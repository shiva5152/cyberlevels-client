import { IFunding } from "@/types/company";
import React from "react";

interface Props {
  funding?: IFunding[] | undefined;
}

const Funding = ({ funding }: Props) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {funding?.map((obj, index) => (
        <div className="info position-relative">
          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
            {index + 1}
          </div>
          <div className="text_1 fw-500"> $ {obj.amount}</div>
          <h4>{obj.round}</h4>
          <p>
            Funded by {obj.fundedBy} in {obj.yearOfFunding}.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Funding;
