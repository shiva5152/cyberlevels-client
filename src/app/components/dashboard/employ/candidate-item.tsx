import React from "react";
import ActionDropdown from "../candidate/action-dropdown-sabJobs";
import Image from "next/image";
import { ICandidate } from "@/types/user-type";
import job_img_1 from "@/assets/images/logo/media_22.png";
import Link from "next/link";

const CandidateItem = ({ item }: { item: ICandidate }) => {
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <a href="#" className="rounded-circle">
            <Image
              src={item?.avatar}
              width={85}
              height={85}
              alt="image"
              className="lazy-img rounded-circle"
              // style={{ height: "auto" }}
            />
          </a>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-4">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <a href="#" className="tran3s">
                    {item.firstName} {item.lastName}
                  </a>
                </h4>
                <div className="candidate-post">{item.email}</div>
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  {item.skills.slice(0, 4).map((val) => (
                    <li className=" text-nowrap " key={val}>
                      {val}
                    </li>
                  ))}
                  {item.skills?.length - 4 > 1 && (
                    <li className="more">{item.skills?.length - 4}+</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Salary</span>
                <div>
                  {item?.expectedSalary?.currency?.symbol}{item?.expectedSalary?.min}-{item?.expectedSalary?.max}/{item?.expectedSalary?.period}
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Location</span>
                <div>
                  {item.location?.city}, {item.location?.country}
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                <Link
                  href={`/candidate-profile-v1/${item._id}`}
                  className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                >
                  <i className="bi bi-eye"></i>
                </Link>
                <div className="action-dots float-end mt-10 ms-2">
                  <button
                    className="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span></span>
                  </button>
                  {/* <ActionDropdown /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateItem;
