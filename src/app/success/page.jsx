"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
let html2pdf;

if (typeof window !== "undefined") {
  html2pdf = require("html2pdf.js");
}
// ...

const Page = () => {
  const [data, setData] = useState({
    ID: "",
    Name: "",
    ActingRole: "",
    email: "",
    status: ""
  });

  useEffect(() => {
    const fetchSubmittedDetails = async () => {
      try {
        const response = await axios.get("/api/data");
        const formDataList = response.data.formDataList;

        if (formDataList && formDataList.length > 0) {
          const latestSubmission = formDataList[formDataList.length - 1];

          setData({
            ID: latestSubmission.ID,
            Name: latestSubmission.Name,
            ActingRole: latestSubmission.ActingRole,
            email: latestSubmission.email,
            status: latestSubmission.status
          });
        }
      } catch (error) {
        console.error("Error fetching submitted details:", error);
      }
    };

    const fetchData = async () => {
      await fetchSubmittedDetails();
      downloadPDF();
    };
    fetchData();
  }, []);

  const handleUpdateData = async () => {
    try {
      const response = await axios.put(`/api/data/${data.ID}`, {
        // Specify the data you want to update here
        // For example, if you want to update the 'status' field, you can do:
        // status: 'UpdatedStatus'
      });

      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const downloadPDF = async () => {
    try {
      const element = document.getElementById("pdf-content");
      const pdfBlob = await html2pdf(element, {
        margin: 10,
        filename: "receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
      });

      const pdfDataURL = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(pdfBlob);
      });

      const link = document.createElement("a");
      link.href = pdfDataURL;
      link.download = "receipt.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating and downloading PDF:", error);
    }
  };
  handleUpdateData();

  return (
    <div>
      <div className="w-full h-full grid grid-cols-12">
        <div
          id="pdf-content"
          className=" bg-blue-100 h-fit col-start-3 col-end-11 p-8"
        >
          <div className="w-full flex flex-col items-center">
            <h1 className="text-xl md:text-3xl uppercase font-bold ">
              Reicept Of Application
            </h1>
          </div>
          <div className="w-full flex justify-between items-center mt-20">
            <div className="text-justify w-fit">
              <h1 className="uppercase font-bold text-lg md:text-xl">
                Application Details
              </h1>
              <div>
                <h1>From:- EIFPE</h1>
                <h1>To:- {data.Name}</h1>
                <h1>UID:- {data.ID}</h1>
                <h1>Applied For :- {data.ActingRole}</h1>
              </div>
            </div>
            <div className="w-1/4">
              <h1 className="uppercase font-bold text-lg md:text-xl">
                address
              </h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati, iure!
              </p>
            </div>
          </div>
          <div className="mt-20">
            <h1 className="uppercase font-bold text-lg md:text-xl text-center">
              Details Of Purchase
            </h1>
            <br />
            <h1 className="px-10">Items Purchesed</h1>
            <hr />
            <br />
            <div className="space-y-3">
              <div className="flex justify-between px-10">
                <h1>Apply Form Fees </h1>
                <h1>1000Rs.</h1>
              </div>
              <div className="flex justify-between px-10">
                <h1>Audition Fees </h1>
                <h1>5000Rs.</h1>
              </div>
            </div>
            <br />
            <hr />
            <div>
              <div className="flex justify-between px-10">
                <h1>Total Amt. </h1>
                <h1>6000Rs.</h1>
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={downloadPDF}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
