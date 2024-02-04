import React from "react";
import ActionDropdown from "../candidate/action-dropdown-sabJobs";
import { getDate } from "@/utils/helper";

const EmployJobItem = ({
  title,
  info,
  date,
  application,
  status,
}: {
  title: string;
  info: string;
  date: string;
  application: string;
  status: string;
}) => {
  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{title}</div>
        <div className="info1">{info}</div>
      </td>
      <td>{getDate(date)}</td>
      <td>{application} Applications</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          {/* action dropdown start */}
          <ActionDropdown id={""} jobAppId="" />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
