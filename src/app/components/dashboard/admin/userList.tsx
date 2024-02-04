"use client";
import React, { useState } from "react";
import ShortSelect from "../../common/short-select";
import DashboardHeader from "../candidate/dashboard-header";
// import ActionDropdown from "./action-dropdown-sabJobs";
import CandidateList from "./user/candidates";
import EmployerList from "./user/employer";
import CreateEmployerModal from "./user/utils/addemployerpopup";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserList = ({ setIsOpenSidebar }: IProps) => {
  const [isCandidate, setIsCandidate] = useState(true);
  const handleToggle = () => {
    setIsCandidate((prev) => !prev);
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Candidate
            </p>
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Employer
            </p>
          </div>
          <div className="short-filter d-flex align-items-center">
          <div className="short-filter d-flex align-items-center dash-btn-one me-3 ">
            <button
              data-bs-toggle="modal"
              data-bs-target="#createEmployerModal"
              type="button"
              className="apply-btn text-center tran3s"
            >
              Create employer
            </button>
          </div>
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
            </div>
        </div>

        <div className="wrapper">
          {isCandidate ? <CandidateList /> : <EmployerList />}
        </div>
      </div>
      <CreateEmployerModal />
    </div>
  );
};

export default UserList;
