import React from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import job_data from "@/data/job-data";
import ActionDropdown from "./action-dropdown-sabJobs";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IJobPost } from "@/types/jobPost-type";
import Loader from "@/ui/loader";
import Pagination from "@/ui/pagination";
import { setSavedJobsPage } from "@/redux/features/candidate/dashboardSlice";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  savedJobs: IJobPost[];
};

const SavedJobArea = ({ setIsOpenSidebar, savedJobs }: IProps) => {
  const { totalSavedJob, totalNumOfSavedJobsPage, savedJobsPage } =
    useAppSelector((s) => s.candidate.candidateDashboard);
  const dispatch = useAppDispatch();
  const itemsPerPage = 4;
  const handlePageClick = (event: { selected: number }) => {
    console.log("from pagination", event.selected);
    dispatch(setSavedJobsPage(event.selected + 1));
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Job</h2>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div> */}
        </div>

        <div className="wrapper">
        {savedJobs?.length === 0 && (
          <div
        
          className="job-list-one style-two position-relative mb-20"
        >
                      <p
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.5em",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#888",
                        }}
                      >
                        No Jobs Saved! save jobs to visit later
                      </p>
                      </div>
                    )}
          {savedJobs?.map((j) => (
            <div
              key={j._id}
              className="job-list-one style-two position-relative mb-20"
            >
              <Link href={`/job-details-v1/${j._id}`}>
                <div className="row justify-content-between align-items-center">
                  <div className="col-xxl-3 col-lg-4">
                    <div className="job-title d-flex align-items-center">
                      <Link href={`/job-details-v1/${j._id}`} className="logo">
                        <Image
                          src={job_img_1}
                          alt="img"
                          className="lazy-img m-auto"
                        />
                      </Link>
                      <Link
                        href={`/job-details-v1/${j._id}`}
                        className="title fw-500 tran3s"
                      >
                        {j.title}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                    {j?.jobType.map((val, index) => (
                      <Link
                        href={`/job-details-v1/${j._id}`}
                        className={`job-duration fw-500 mx-1 ${
                          val == "part-time" ? "part-time" : ""
                        }`}
                      >
                        {`${val} ${" "}`}
                      </Link>
                    ))}
                    <div className="job-salary">
                      <span className="fw-500 text-dark">
                        ${j.salary.minimum}-{j.salary.maximum}
                      </span>{" "}
                      / {"monthly"} . {j.preferredExperience.join(", ")}
                    </div>
                  </div>
                  <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                    <div className="job-location">
                      <span>{j.location}</span>
                    </div>
                    <div className="job-category">
                      <Link href={`/job-details-v1/${j._id}`}>
                        {j.primarySkills.map((c, i) => (
                          <Link key={i} href={`/job-details-v1/${j._id}`}>
                            {c}
                            {i < j.primarySkills.length - 1 && ", "}
                          </Link>
                        ))}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
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
                      <ActionDropdown id={j._id} jobAppId={j._id} />
                      {/* action dropdown end */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {totalSavedJob > itemsPerPage && (
          <Pagination
            pageCount={totalNumOfSavedJobsPage}
            handlePageClick={handlePageClick}
            currPage={savedJobsPage}
          />
        )}
      </div>
    </div>
  );
};

export default SavedJobArea;
