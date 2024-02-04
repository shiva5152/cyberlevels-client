"use client";
import React, { useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import instance from "@/lib/axios";
import { getCandidateSub } from "@/redux/features/subscription/api";
import { IEmployerSub, Offering, OfferingField } from "@/types/template";
import { camelCaseToNormal } from "@/utils/helper";
declare global {
  interface Window {
    Razorpay: any;
  }
}

const calculatePrice = (price: number, offer: number, isApplied: boolean) => {
  if (!isApplied) {
    return price;
  }
  const offerPrice = price - (price * offer) / 100;
  return Math.ceil(offerPrice);
};
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployMembershipArea = ({ setIsOpenSidebar }: IProps) => {
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const subscription = currCandidate?.subscription;

  const checkoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sub: IEmployerSub
  ) => {
    const bodyObj = {
      amount: sub.price.amount,
      currency: "INR",
      user: currCandidate?._id,
      userModel: "Candidate",
      product: sub._id,
      productModel: "CandidateSub",
    };

    const {
      data: { keyId },
    } = await instance.get("/payment/getKey");

    const {
      data: { order },
    } = await instance.post("/payment/checkout", bodyObj);

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Shiva Shah",
      description: "Testing of RazorPay",
      image: "https://avatars.githubusercontent.com/u/86485099?v=4",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/payment/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#00BF58",
      },
    };

    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response: any) {
      alert(`Payment failed: ${response.error.code}`);
    });
    razor.open();
  };

  const dispatch = useAppDispatch();
  const { employSub } = useAppSelector((s) => s.subscription);
  const [isYearly, setIsYearly] = React.useState<boolean>(true);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  useEffect(() => {
    getCandidateSub(dispatch);
  }, []);

  const renderOfferingItems = (offeringData: Offering) => {
    return Object.entries(offeringData).map(([key, value]) => {
      // Customize the rendering based on your requirements
      let displayKey = key;
      let displayValue = value;

      return <li key={key}>{`${camelCaseToNormal(key)}: ${displayValue}`}</li>;
    });
  };

  return (
    <>
      {subscription && (
        <div className="dashboard-body">
          <div className="position-relative">
            {/* header start */}
            <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
            {/* header end */}

            <h2 className="main-title">Membership</h2>

            <div className="membership-plan-wrapper mb-20">
              <div className="row gx-0">
                <div className="col-xxl-7 col-lg-6 d-flex flex-column">
                  <div className="column w-100 h-100">
                    <h4>
                      Current Plan (
                      {"subscriptionType" in subscription &&
                        subscription.subscriptionType}
                      )
                    </h4>
                    <ul>
                      {renderOfferingItems(subscription.offering as Offering)}
                    </ul>
                    <p>You can anytime update the subscription plan.</p>
                  </div>
                </div>
                <div className="col-xxl-5 col-lg-6 d-flex flex-column">
                  <div className="column border-left w-100 h-100">
                    <div className="d-flex">
                      <h3 className="price m0">
                        ₹
                        {"price" in subscription &&
                          "amount" in subscription.price &&
                          subscription.price.amount}
                      </h3>
                      <div className="ps-4 flex-fill">
                        <h6>Monthly Plan</h6>
                        <span className="text1 d-block">
                          Your subscription renews{" "}
                          <span className="fw-500">July 12th, 2023</span>
                        </span>
                        <a href="#" className="cancel-plan tran3s">
                          Cancel Current Plan
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${isYearly && "active"}`}
                >
                  Yearly (Save 20%)
                </p>
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${!isYearly && "active"}`}
                >
                  Monthly
                </p>
              </div>
            </div>

            <section className="pricing-section">
              <div className="row justify-content-center">
                {employSub.map((sub, index) => (
                  <div className="col-lg-4 col-md-6">
                    <div className="pricing-card-one popular-two mt-25 ">
                      {index === 1 && (
                        <div className="popular-badge">popular</div>
                      )}
                      <div className="popular-badge">
                        {subscription.hasOwnProperty("_id") &&
                        subscription._id === sub._id
                          ? "Current"
                          : null}
                      </div>

                      <div className="pack-name text-capitalize ">
                        {sub.subscriptionType}
                      </div>
                      <div className="price fw-500">
                        <sub title={sub.price.currency.name}>
                          {sub.price.currency.symbol}
                        </sub>{" "}
                        <span>
                          {calculatePrice(sub.price.amount, 20, isYearly)}
                        </span>
                        {isYearly && sub.subscriptionType !== "free" && (
                          <span className=" fs-2  ms-3  ">
                            /{" "}
                            <span
                              style={{
                                textDecoration: "line-through",
                                textDecorationThickness: "2px",
                                textUnderlineOffset: "1px",
                              }}
                            >
                              &nbsp;{sub.price.amount}&nbsp;
                            </span>
                          </span>
                        )}
                      </div>
                      <ul className="style-none">
                        {renderOfferingItems(sub.offering as Offering)}
                      </ul>
                      <button
                        disabled={subscription._id === sub._id}
                        onClick={(e) => checkoutHandler(e, sub)}
                        className={
                          subscription._id === sub._id
                            ? "get-plan-btn tran3s w-100 mt-30 mx-auto current-plan"
                            : "get-plan-btn tran3s w-100 mt-30 mx-auto"
                        }
                      >
                        {subscription.hasOwnProperty("_id") &&
                        subscription._id === sub._id
                          ? "Current Plan"
                          : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                ))}
                {/* <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one mt-25">
                    <div className="pack-name">Standard</div>
                    <div className="price fw-500">0</div>
                    <ul className="style-none">
                      <li>15 job Post </li>
                      <li>7 featured job </li>
                      <li>No Suggestion to employer </li>
                    </ul>
                    <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                      Current Plan
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one popular-two mt-25 ">
                    <div className="popular-badge">popular</div>
                    <div className="pack-name">Gold</div>
                    <div className="price fw-500">
                      <sub>₹</sub> 277.<sup>99</sup>
                    </div>
                    <ul className="style-none">
                      <li>30 job Post </li>
                      <li>15 featured job </li>
                      <li>
                        1.5X high Chance for getting suggested to the employer{" "}
                      </li>
                    </ul>
                    <button
                      onClick={checkoutHandler}
                      className="get-plan-btn tran3s w-100 mt-30 mx-auto "
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one border-0 mt-25">
                    <div className="pack-name">Diamond</div>
                    <div className="price fw-500">
                      <sub>₹</sub> 399.<sup>99</sup>
                    </div>
                    <ul className="style-none">
                      <li>60 job post </li>
                      <li>30 featured job </li>
                      <li>
                        1.5X high Chance for getting suggested to the employer.{" "}
                      </li>
                      <li>View the linting Company.</li>
                    </ul>
                    <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                      Choose Plan
                    </a>
                  </div>
                </div> */}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployMembershipArea;
