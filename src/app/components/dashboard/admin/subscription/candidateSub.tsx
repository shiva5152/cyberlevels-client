"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getCandidateSub,
  updateCandidateSubscription,
  updateEmployerSubscription,
} from "@/redux/features/subscription/api";
import { IEmployerSub, Offering, OfferingField } from "@/types/template";
import { camelCaseToNormal } from "@/utils/helper";
import Loader from "@/ui/loader";
import AutoCompleteCurrency from "@/ui/autoCompleteCurrency";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Currency } from "@/redux/features/currencyProvider/slice";
import { notifyError, notifySuccess } from "@/utils/toast";

const OfferingList = ({
  offeringData,
  index,
  editt,
  setOfferingsDataCopy,
  offeringsDataCopy,
}: {
  offeringData: Offering;
  index: string;
  editt: string | null;
  setOfferingsDataCopy: React.Dispatch<
    React.SetStateAction<Offering | null | undefined>
  >;
  offeringsDataCopy: Offering | any;
}) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<number | null>(null);

  // const [offeringsDataCopy, setOfferingsDataCopy] = useState<Offering | null>(
  //   offeringData
  // );
  // console.log(offeringsDataCopy);
  const handleEdit = () => {
    setEdit(1);
  };
  const handleSave = () => {
    setEdit(null);
    const Obj = { planId: "", data: { offering: offeringsDataCopy } };
    updateCandidateSubscription(dispatch, Obj);
  };
  const renderOfferingItems = () => {
    // const [keyValuePair, setKeyValuePair] = useState<Offering | null>(offeringData);
    // console.log(keyValuePair);
    const handleOnChange = (key: string, value: string) => {
      setOfferingsDataCopy({ ...offeringsDataCopy, [key]: value });
    };
    return Object.entries(offeringData).map(([key, value]) => {
      // Customize the rendering based on your requirements
      let displayKey = key;
      let displayValue = value;

      return edit !== null ? (
        <li key={key}>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="firstName">{camelCaseToNormal(key)}</label>
            <input
              key={key}
              type="text"
              value={offeringsDataCopy[key]}
              onChange={(e) => {
                handleOnChange(key, e.target.value);
              }}
            />
          </div>
        </li>
      ) : (
        <li key={key}>{`${camelCaseToNormal(key)}: ${displayValue}`}</li>
      );
    });
  };

  return (
    <>
      <ul className="style-none">{renderOfferingItems()}</ul>
      {edit !== null ? (
        <button
          className="get-plan-btn tran3s w-100 mt-30"
          onClick={() => handleSave()}
        >
          Save
        </button>
      ) : (
        <button
          className="get-plan-btn tran3s w-100 mt-30"
          onClick={() => handleEdit()}
        >
          Edit
        </button>
      )}
    </>
  );
};

const CandidateSub = ({
  subscriptionArr,
}: {
  subscriptionArr: IEmployerSub[];
}) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<IEmployerSub[]>(subscriptionArr);
  const { currencies } = useSelector((state: RootState) => state.currency);
  const [currency, setCurrency] = useState<Currency>();
  const [offeringsDataCopy, setOfferingsDataCopy] = useState<
    Offering | null | undefined
  >(null);

  const handleOnChangePrice = (field: string, value: any) => {
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) || value === "") {
      const updatedData = editedData.map((item, index) =>
        item._id === edit
          ? {
              ...item,
              price: {
                ...item.price,
                [field.toLowerCase()]: numericValue,
              },
            }
          : item
      );

      setEditedData(updatedData);
    } else if (field === "currency") {
      const updatedData = editedData.map((item, index) =>
        item._id === edit
          ? {
              ...item,
              price: {
                ...item.price,
                [field.toLowerCase()]: value,
              },
            }
          : item
      );

      setEditedData(updatedData);
    } else {
      console.error(`Invalid numeric value for field ${field}`);
    }
  };

  const handleEditClick = (index: string) => {
    setEdit(index);
    const data = editedData.filter((item, key) => item._id === index);
    setOfferingsDataCopy(data[0].offering as Offering);
  };

  const handleSaveClick = async () => {
    // if (editedData[edit] && offeringsDataCopy) {
    //   if(localStorage.getItem("isCandidate") === "true") {
    //     await updateCandidateSubscription(dispatch, editedData[edit]);

    //   }else{
    //     await updateEmployerSubscription(dispatch,editedData[edit]);
    //   }
    //   console.log(editedData[edit])
    //   setEdit(null);
    // }
    const dataToBeUpdated = editedData.filter((item) => item._id === edit);
    if (localStorage.getItem("isCandidate") === "true") {
      try {
        await updateCandidateSubscription(dispatch, dataToBeUpdated[0]);
        notifySuccess("Your template is successfully updated.");
      } catch (error) {
        notifyError("Check all fields should be filled");
      }
    } else {
      try {
        await updateEmployerSubscription(dispatch, dataToBeUpdated[0]);
        notifySuccess("Your template is successfully updated.");
      } catch (error) {
        notifyError("Check all fields should be filled");
      }
    }

    // console.log(dataToBeUpdated[0]);
    setEdit(null);
  };

  const handleOnChangeOfferings = (offeringsDataCopy: Offering) => {
    const updatedData = editedData.map((item, index) => {
      if (item._id === edit) {
        return {
          ...item,
          offering: offeringsDataCopy,
        };
      } else {
        return item;
      }
    });
    setEditedData(updatedData);
  };

  useEffect(() => {
    setEditedData(subscriptionArr);
  }, [subscriptionArr]);

  useEffect(() => {
    handleOnChangePrice("currency", currency);
  }, [currency]);

  useEffect(() => {
    handleOnChangeOfferings(offeringsDataCopy as Offering);
  }, [offeringsDataCopy]);

  return (
    <section className="pricing-section">
      <div className="row justify-content-center">
        {subscriptionArr.length > 0
          ? subscriptionArr.map((subObj: IEmployerSub, index: number) => (
              <div className="col-lg-4 col-md-6" key={subObj._id}>
                <div className="pricing-card-one border-0 mt-25">
                  <div className="pack-name fs-4 mb-0">
                    {subObj.subscriptionType}
                  </div>
                  {edit === subObj._id ? (
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="firstName">Price</label>
                      <input
                        type="text"
                        value={editedData[index]?.price?.amount || 0}
                        onChange={(e) => {
                          handleOnChangePrice("amount", e.target.value);
                        }}
                      />
                      <label htmlFor="firstName">Currency</label>
                      <AutoCompleteCurrency
                        selected={editedData[index]?.price?.currency}
                        setSelected={setCurrency}
                        endPoint=""
                        suggestionsProp={currencies}
                        placeholder="Select Currency"
                      />
                    </div>
                  ) : (
                    <div className="price fw-500 mt-0">
                      <p>{subObj.price.amount}</p>{" "}
                      <p className="fs-4 ">
                        {subObj.price.currency.symbol}{" "}
                        {subObj.price.currency.name}
                      </p>
                    </div>
                  )}
                  <ul className="style-none">
                    <OfferingList
                      offeringData={subObj.offering as Offering}
                      index={subObj._id}
                      editt={edit}
                      setOfferingsDataCopy={setOfferingsDataCopy}
                      offeringsDataCopy={offeringsDataCopy}
                    />
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    {subObj.duration} Plan
                  </a>
                  {edit === subObj._id ? (
                    <div
                      className="get-plan-btn tran3s w-100 mt-30 cursor-pointer"
                      onClick={() => handleSaveClick()}
                    >
                      Save
                    </div>
                  ) : (
                    <div
                      className="get-plan-btn tran3s w-100 mt-30 cursor-pointer"
                      onClick={() => handleEditClick(subObj._id)}
                    >
                      Edit
                    </div>
                  )}
                </div>
              </div>
            ))
          : // <Loader />
            null}
      </div>
    </section>
  );
};

export default CandidateSub;
