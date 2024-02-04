import instance from "@/lib/axios";
import axios from "axios";
import React from "react";

const ResumeDownloadButton = ({
  fileName,
  s3Key,
  text,
  style,
}: {
  fileName: string;
  s3Key: string;
  text?: string;
  style?: string;
}) => {
  const handleDownloadClick = async () => {
    const { data } = await instance.post("/candidate/download", { s3Key });
    // console.log("downloaded data", data);
    const { data: resume } = await axios(data.url, {
      responseType: "blob",
    });
    console.log("resume", resume);

    const url = window.URL.createObjectURL(new Blob([resume]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className={`${style ? style : ""}`} onClick={handleDownloadClick}>
        {text ? text : "Download"}{" "}
      </button>
    </div>
  );
};

export default ResumeDownloadButton;
