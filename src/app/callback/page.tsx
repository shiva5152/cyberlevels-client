"use client";
import { loginWithGoogle, loginWithLn } from "@/redux/features/user/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// has to be more improved in error handling

const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    whoIsTryingToLoginWithLn,
    whoIsTryingToLoginWithGoogle,
    loading,
    currUser,
    isAuthenticated,
  } = useAppSelector((state) => state.persistedReducer.user);
  console.log(
    "LinkedIn",
    whoIsTryingToLoginWithLn,
    "Google",
    whoIsTryingToLoginWithGoogle
  );
  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get("state");
  if ((!whoIsTryingToLoginWithLn && !whoIsTryingToLoginWithGoogle) || !state) {
    // console.log(state);
    // console.log(whoIsTryingToLoginWithGoogle);
    alert(
      "There is change in browser,please complete the login process with one browser only"
    );
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, []);

  useEffect(() => {
    if (whoIsTryingToLoginWithLn && state) {
      type RequestData = {
        code?: string;
        state: string;
        error?: string;
        error_description?: string;
        role: string;
      };
      const requestData: RequestData = {
        state: urlParams.get("state") as string,
        role: whoIsTryingToLoginWithLn,
      };

      if (urlParams.has("error")) {
        requestData.error = urlParams.get("error") as string;
        requestData.error_description = urlParams.get(
          "error_description"
        ) as string;
      }
      if (urlParams.has("code")) {
        requestData.code = urlParams.get("code") as string;
      }
      // console.log(requestData);
      const handleLogin = async () => {
        const isLoginSuccessful = await loginWithLn(dispatch, requestData);

        if (isLoginSuccessful && whoIsTryingToLoginWithLn === "candidate") {
          console.log("from callback", isLoginSuccessful);
          router.push(`/job-list-v1#find-jobs`);
        } else router.push("/");
      };

      handleLogin();
    } else if (whoIsTryingToLoginWithGoogle && state) {
      type RequestData = {
        code?: string;
        state: string;
        error?: string;
        error_description?: string;
        role: string;
      };
      const requestData: RequestData = {
        state: urlParams.get("state") as string,
        role: whoIsTryingToLoginWithGoogle,
      };

      if (urlParams.has("error")) {
        requestData.error = urlParams.get("error") as string;
        requestData.error_description = urlParams.get(
          "error_description"
        ) as string;
      }
      if (urlParams.has("code")) {
        requestData.code = urlParams.get("code") as string;
      }
      // console.log(requestData);
      const handleLogin = async () => {
        const isLoginSuccessful = await loginWithGoogle(dispatch, requestData);

        if (isLoginSuccessful && whoIsTryingToLoginWithGoogle === "candidate") {
          // console.log("from callback", isLoginSuccessful);
          router.push(`/job-list-v1#find-jobs`);
        } else router.push("/");
      };

      handleLogin();
    }
  }, []);

  return (
    <div className="_callback overflow-hidden ">
      <div>
        <Loader />
      </div>
    </div>
  );
};

export default page;
