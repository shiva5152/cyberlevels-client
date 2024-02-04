import React from "react";
import Image from "next/image";
import Link from "next/link";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeCandidate, saveCandidate } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICompanyForAdmin } from "@/types/for-admin-type";

const CompanyListItem = ({
  item,
  style_2 = false,
}: {
  item: ICompanyForAdmin;
  style_2?: boolean;
}) => {
  const { page, loading } = useAppSelector((state) => state.employer);
  const { isAuthenticated, currUser } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useAppDispatch();
  const isActive = false;
  const handleSaveCandidate = (candidateId: string) => {
    if (!isActive) {
      saveCandidate(dispatch, {
        candidateId,
        employerId: currUser,
        page: page,
      });
    } else {
      removeCandidate(dispatch, {
        candidateId,
        employerId: currUser,
        page: page,
      });
    }
  };
  const handleSubscribePopup = () => {};
  return (
    <>
      <div
        className={`candidate-profile-card py-2  ${
          isActive ? "favourite" : ""
        } ${style_2 ? "border-0" : ""} list-layout mb-25 `}
      >
        <div className="d-flex">
          <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
            <Link href="/candidate-profile-v2" className="rounded-circle">
              <Image
                src={job_img_1}
                alt="image"
                className="lazy-img rounded-circle"
              />
            </Link>
          </div>
          <div className="right-side justify-content-center ">
            <div className="row gx-1 align-items-center justify-content-center ">
              <div className="col-xl-3">
                <div className="position-relative">
                  <h4 className="candidate-name mb-0">
                    <Link href="/candidate-profile-v2" className="tran3s">
                      {item.name}
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  {/* <span>{item.email}</span> */}
                  <div>{item.contactNumber}</div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <div>{item.email}</div>
                  <div>
                    {item.location[0].city},{item.location[0].country}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="d-flex justify-content-lg-end">
                  <Link
                    target="_blank"
                    href={`/company-details/${item._id}`}
                    className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyListItem;
