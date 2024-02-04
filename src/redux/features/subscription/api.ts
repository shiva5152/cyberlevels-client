import instance from "@/lib/axios";
import { requestFail, requestStart, requestSuccess, submitCandidateSubSuccess, getEmploySubSuccess, submitEmploySubSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";
import { notifyError, notifySuccess } from "@/utils/toast";


export const submitCandidateSub = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/subscription/candidate`, bodyObj);
        dispatch(submitCandidateSubSuccess(data.candidateSub));
        notifySuccess("new subscription Template created.");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }
}

export const submitEmploySub = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/subscription/employer`, bodyObj);
        dispatch(submitEmploySubSuccess(data.employerSub));
        notifySuccess("new subscription Template created.");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }

}

export const getEmploySub = async (dispatch: AppDispatch) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/subscription/employer`);
        dispatch(getEmploySubSuccess(data.subscriptions));

    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
    }

}
export const getCandidateSub = async (dispatch: AppDispatch) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/subscription/candidate`);
        dispatch(getEmploySubSuccess(data.subscriptions));
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
    }

}

export const updateCandidateSubscription = async (dispatch: AppDispatch, bodyObj:any) => {
    dispatch(requestStart());
    console.log(bodyObj);
    try {
        await instance.patch(`/subscription/candidate`,bodyObj);
        await instance.patch(`/subscription/employer`,bodyObj);
        
            getCandidateSub(dispatch);
            // getEmploySub(dispatch);

        
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const updateEmployerSubscription = async (dispatch: AppDispatch, bodyObj:any) => {
    dispatch(requestStart());
    console.log(bodyObj);
    try {
        // await instance.patch(`/subscription/candidate`,bodyObj);
        await instance.patch(`/subscription/employer`,bodyObj);
        
            // getCandidateSub(dispatch);
            getEmploySub(dispatch);

        
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}