import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import { removeSavedJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCurrJobApp } from "@/redux/features/jobApp/slice";

const ActionDropdown = ({ id, jobAppId }: { id: string; jobAppId: string }) => {
  const { savedJobsPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    removeSavedJob(dispatch, {
      jobPostId: id,
      candidateId: currUser,
      page: savedJobsPage,
    });
  };
  console.log(jobAppId);
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" href={`/job-details-v1/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Chat
        </a>
      </li> */}
      <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
