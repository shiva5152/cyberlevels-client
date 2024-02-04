import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-itmes-for-detals";
import EmployShortSelect from "./short-select";
import { IJobApp } from "@/types/job-app-type";
import { getDate } from "@/utils/helper";
import ChatModal from "../../common/popup/chatModal";
import FeedbackModal from "../../common/popup/feedback";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import JobLetterModal from "../../common/popup/jobLetterModer";
import CandidateFilterByJobApp from "../../common/popup/candidateFilterByJobApp";
import { IJobPost } from "@/types/jobPost-type";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  jobApp: IJobApp[];
  jobPostId: string;
};
const EmployJobArea = ({ setIsOpenSidebar, jobApp, jobPostId }: IProps) => {
  const { jobPostsForEmployer } = useAppSelector((state) => state.jobPost);
  const [currJobPost, setCurrJobPost] = useState<IJobPost | null>();

  useEffect(() => {
    const foundJobPost = jobPostsForEmployer.find(
      (job) => job._id === jobPostId
    );
    setCurrJobPost(foundJobPost);
  }, [jobPostsForEmployer, jobPostId]);

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
            <h2 className="main-title m0">
              <Link
                style={{ color: "#31795A" }}
                className=""
                href={`/dashboard/employer-dashboard/jobs`}
              >
                My Jobs
              </Link>
              /{currJobPost?.title}
            </h2>
            {/* <div className="d-flex ms-auto xs-mt-30">
            <div
              className="nav nav-tabs tab-filter-btn me-4"
              id="nav-tab"
              role="tablist"
            >
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#a1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                All
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#a2"
                type="button"
                role="tab"
                aria-selected="false"
              >
                New
              </button>
            </div>
            <div className="short-filter d-flex align-items-center ms-auto">
              <div className="text-dark fw-500 me-2">Short by:</div>
              <EmployShortSelect />
            </div>
          </div> */}
            <button
              type="button"
              className="filter-btn fw-500 tran3s me-3"
              data-bs-toggle="modal"
              data-bs-target="#candidateFilterForJobApp"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
          </div>

          <div className="bg-white card-box border-20">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="a1"
                role="tabpanel"
              >
                <div className="table-responsive">
                  <table className="table job-alert-table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Applied At</th>
                        <th scope="col">Test Score</th>
                        <th scope="col">Expertise</th>
                        <th scope="col">Resume</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody className="border-0">
                      {jobApp?.map((app) => {
                        const createdAt = getDate(app.createdAt);
                        console.log(jobApp, "Check Error");
                        if (typeof app.candidate !== "string") {
                          return (
                            <>
                              <EmployJobItem
                                title={`${app.candidate?.firstName} ${app.candidate?.lastName}`}
                                info={`${
                                  app.candidate?.location?.city || "Delhi"
                                }`}
                                tesScore={String(app.testScore) || "89%"}
                                date={createdAt}
                                status={
                                  app.candidate?.experienceInShort || "expert"
                                }
                                id={app.candidate?._id}
                                appId={app._id}
                                isFeedbackAsked={app.isFeedbackAsked}
                                resumes={app.candidate?.resumes}
                                resumeId={app.appliedWithResume}
                              />
                              <JobLetterModal
                                candidateName={
                                  app.candidate?.firstName +
                                  " " +
                                  app.candidate?.lastName
                                }
                                text={app.jobLetter}
                              />
                            </>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                  {jobApp?.length === 0 && (
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
                      No candidates to Show
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatModal />
      <FeedbackModal />
      <CandidateFilterByJobApp />
    </>
  );
};

export default EmployJobArea;
