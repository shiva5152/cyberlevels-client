import React from "react";
import Image from "next/image";
import Link from "next/link";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeCandidate, saveCandidate } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEmployerForAdmin } from "@/types/for-admin-type";

const EmployerListItem = ({
  item,
  style_2 = false,
}: {
  item: IEmployerForAdmin;
  style_2?: boolean;
}) => {
  const { page, loading } = useAppSelector((state) => state.employer);
  const { isAuthenticated, currUser } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const isActive = false;

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
                      {item.firstName + " " + item.lastName}
                    </Link>
                  </h4>
                  {/* <div className="candidate-post">{item.title}</div> */}
                  {/* <ul className="cadidate-skills style-none d-flex align-items-center">
                    {item.skills.slice(0, 3).map((s, i) => (
                      <li key={i}>{s.split(" ")[0]}</li>
                    ))}
                    {item.skills.length > 3 && (
                      <li className="more">
                        {item.skills.length - item.skills.slice(0, 3).length}+
                      </li>
                    )}
                  </ul> */}
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>{item.gender}</span>
                  <div>{item.phoneNumber}</div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <div>{item.email}</div>
                  {/* <div>
                    {item.location.city},{item.location.country}
                  </div> */}
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="d-flex justify-content-lg-end">
                  {item.company?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerListItem;
