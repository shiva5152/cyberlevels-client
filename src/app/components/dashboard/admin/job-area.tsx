import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-item";
import EmployShortSelect from "./short-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllJobPosts } from "@/redux/features/jobPost/api";
import Pagination from "@/ui/pagination";
import { setAdminPage } from "@/redux/features/jobPost/slice";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployJobArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const {currUser} = useAppSelector((state) => state.persistedReducer.user)
  const {
    allJobPostAdmin,
    pageForAdmin,
    totalJobsForAdmin,
    totalPagesForJobpostAdmin,
  } = useAppSelector((state) => state.jobPost);
  const [jobViewState,setJobViewState] = useState('all');
  useEffect(() => {
    if(jobViewState==="all"){
      getAllJobPosts(dispatch, pageForAdmin);
      
    }else{
      getAllJobPosts(dispatch, pageForAdmin,currUser!);

    }
  }, [pageForAdmin,jobViewState]);
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setAdminPage(event.selected + 1));
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">My Jobs</h2>
          <div className="d-flex ms-auto xs-mt-30">
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
                onClick={() => setJobViewState("all")}
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
                onClick={() => setJobViewState("my")}
              >
                My Jobs
              </button>
            </div>
            <div className="short-filter d-flex align-items-center ms-auto">
              <div className="text-dark fw-500 me-2">Sort by:</div>
              <EmployShortSelect />
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="a1" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {allJobPostAdmin.map((job, index) => {
                      return(

                        <EmployJobItem
                        title={job.title}
                        info={`${job.jobType} . ${job.location}`}
                        application={job.candidates.length.toString()}
                        date={job.createdAt}
                        status={job.status}
                        />
                        )
                    })}

                    {/* <EmployJobItem
                      title="Marketing Specialist"
                      info="Part-time . Uk"
                      application="20"
                      date="13 Aug, 2023"
                      status="pending"
                    />

                    <EmployJobItem
                      title="Accounting Manager"
                      info="Fulltime . USA"
                      application="278"
                      date="27 Sep, 2023"
                      status="expired"
                    />

                    <EmployJobItem
                      title="Developer for IT company"
                      info="Fulltime . Germany"
                      application="70"
                      date="14 Feb, 2023"
                      status="active"
                    /> */}
                  </tbody>
                </table>
              </div>
              
            </div>
            <div className="tab-pane fade" id="a2" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    
                  {allJobPostAdmin.map((job, index) => {
                      return(

                        <EmployJobItem
                        title={job.title}
                        info={`${job.jobType} . ${job.location}`}
                        application={job.candidates.length.toString()}
                        date={job.createdAt}
                        status={job.status}
                        />
                        )
                    })}

                    {/* <EmployJobItem
                      title="Brand & Producr Designer"
                      info="Fulltime . Spain"
                      application="130"
                      date="05 Jun, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Developer for IT company"
                      info="Fulltime . Germany"
                      application="70"
                      date="14 Feb, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Accounting Manager"
                      info="Fulltime . USA"
                      application="278"
                      date="27 Sep, 2023"
                      status="expired"
                    /> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {totalJobsForAdmin > 8 && 
              <Pagination handlePageClick={handlePageClick} pageCount={totalPagesForJobpostAdmin} currPage={pageForAdmin} />
            }
      </div>
    </div>
  );
};

export default EmployJobArea;
