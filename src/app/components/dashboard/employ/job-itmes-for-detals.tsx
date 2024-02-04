import React from "react";
import ActionDropdown from "./actionDropDownForDetails";
import Link from "next/link";
import { IResume } from "@/types/user-type";
import ResumeDownloadButton from "@/ui/downloadBtn";
import { FileArrowDown } from "@phosphor-icons/react";

const EmployJobItem = ({
  title,
  info,
  date,
  tesScore,
  status,
  id,
  appId,
  isFeedbackAsked,
  resumes,
  resumeId,
}: {
  title: string;
  info: string;
  date: string;
  tesScore: String;
  status: string;
  id: string;
  appId: string;
  isFeedbackAsked: boolean;
  resumes: IResume[];
  resumeId: string;
}) => {
  const appliedResume = resumes?.find((resume) => resume?._id === resumeId);
  return (
    <tr className={`${status}`}>
      <td>
        <div className="job-name fw-500">
          <Link href={`/candidate-profile-v1/${id}`} target="_blank">
            {title}
          </Link>
        </div>
        <div className="info1">{info}</div>
      </td>
      <td>{date}</td>
      <td>{tesScore}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td>
        <div className=" d-flex ">
          <ResumeDownloadButton
            fileName={
              appliedResume?.name || (resumes?.length ? resumes[0].name : "")
            }
            s3Key={
              appliedResume?.s3Key || (resumes?.length ? resumes[0].s3Key : "")
            }
          />
          <FileArrowDown size={24} color="black" />
        </div>
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

          <ActionDropdown
            isFeedbackAsked={isFeedbackAsked}
            id={appId}
            candidateId={id}
          />
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
