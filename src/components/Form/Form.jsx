/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
// ./src/app/forms/page.jsx
import React, { useEffect, useRef, useState } from "react";
import "./text.css";
const MAX_VIDEO_SIZE_MB = 30;
const MAX_VIDEO_DURATION_SECONDS = 30;

const Form = () => {
  const [formData, setFormData] = useState({
    ID: "",
    Name: "",
    FatherName: "",
    MotherName: "",
    Address: "",
    ActingRole: "",
    MobileNumber: "",
    WhatsAppNumber: "",
    status: "",
    VideoUpload: null
  });

  const notificationRef = useRef("");

  useEffect(() => {
    // Clear the notification after 2 seconds
    const timer = setTimeout(() => {
      notificationRef.current = "";
    }, 2000);

    return () => clearTimeout(timer);
  }, [notificationRef.current]);

  const handleChange = (e) => {
    if (e.target.name === "VideoUpload") {
      const file = e.target.files[0];

      // Check file size
      if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
        notificationRef.current =
          "Video size exceeds the maximum allowed size (30MB)";
        return;
      }

      // Check video duration
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        if (video.duration > MAX_VIDEO_DURATION_SECONDS) {
          notificationRef.current =
            "Video duration exceeds the maximum allowed duration (30 seconds)";
        } else {
          notificationRef.current = "";
          setFormData({ ...formData, [e.target.name]: file });
        }
      };

      // Handle error during video loading
      video.onerror = () => {
        notificationRef.current = "Error loading video";
      };

      // Set a timeout to handle cases where the onloadedmetadata event is not triggered
      setTimeout(() => {
        if (!video.readyState || isNaN(video.duration)) {
          notificationRef.current = "Error loading video";
        }
      }, 2000);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        body: data // Use the FormData object directly
      });

      if (res.ok) {
        const json = await res.json();
        notificationRef.current = "Form submitted successfully";
        console.log("Form submitted successfully", json);
      } else {
        const errorText = await res.text();
        notificationRef.current = `Failed to submit form. Server error: ${errorText}`;
        console.error("Failed to submit form. Server error:", errorText);
      }
    } catch (error) {
      notificationRef.current = "Error submitting form";
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="p-10 self-center bgcstm rounded-lg shadow relative md:w-[80%] mx-auto lg:w-[75%]"
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.26)"
      }}
    >
      {notificationRef.current && (
        <div className="bg-green-500 text-white p-2 mb-2 rounded-md">
          {notificationRef.current}
        </div>
      )}
      <form
        action="/payment"
        className="bgblr"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-center absolute top-0 left-6 justify-center">
          <h1 className="font-semibold text-3xl">Apply Now</h1>
        </div>
        <div className="mb-5">
          <label htmlFor="Name" className="block mb-2 font-bold ">
            Name
          </label>
          <input
            type="text"
            id="Name"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Name"
            required
            name="Name"
            onChange={handleChange}
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="FatherName" className="block mb-2 font-bold ">
            Father's Name
          </label>
          <input
            type="text"
            id="FatherName"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Father's Name"
            required
            name="FatherName"
            onChange={handleChange}
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="MotherName" className="block mb-2 font-bold ">
            Mother's Name
          </label>
          <input
            type="text"
            id="MotherName"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Mother's Name"
            required
            name="MotherName"
            onChange={handleChange}
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="Address" className="block mb-2 font-bold ">
            Address
          </label>
          <input
            type="text"
            id="Address"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Address"
            required
            name="Address"
            onChange={handleChange}
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-bold ">
            Email
          </label>
          <input
            type="email"
            id="email"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Email Address"
            required
            name="email"
            onChange={handleChange}
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="ActingRole" className="block mb-2 font-bold ">
            Select Acting Role
          </label>
          <select
            id="ActingRole"
            className="bg-blue-200 rounded-lg w-full"
            required
            name="ActingRole"
            onChange={handleChange}
          >
            <option value="0">Select Role For Act</option>
            <option value="Lead Actor">Lead Actor</option>
            <option value="Lead Actress">Lead Actress</option>
            <option value="Side Actor">Side Actor</option>
            <option value="Side Actress">Side Actress</option>
            <option value="Comedian">Comedian</option>
            <option value="Dancer">Dancer</option>
            <option value="Stuntman">Stuntman</option>
            <option value="Music Composer">Music Composer</option>
            <option value="Director">Director</option>
            <option value="Villain">Villain</option>
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="MobileNumber" className="block mb-2 font-bold ">
            Mobile Number
          </label>
          <input
            type="number"
            id="MobileNumber"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your Mobile Number"
            name="MobileNumber"
            onChange={handleChange}
            required
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="WhatsAppNumber" className="block mb-2 font-bold ">
            WhatsApp Number
          </label>
          <input
            type="number"
            id="WhatsAppNumber"
            aria-describedby="helper-text-explanation"
            placeholder="Enter Your WhatsApp Number"
            name="WhatsAppNumber"
            onChange={handleChange}
            required
            className="border border-gray-300 shadow p-3 w-full rounded mb-"
          />
        </div>
        <div>
          <label htmlFor="VideoUpload" className="block mb-2 font-bold ">
            Upload Video (MP4 only, max 30s)
          </label>
          <input
            type="file"
            name="VideoUpload"
            onChange={handleChange}
            id="VideoUpload"
            required
          />
          <small id="fileHelp" className="text-sm text-gray-500">
            Max file size: 30MB
          </small>
          <span id="error-message" className="text-red-600"></span>
        </div>

        <button
          type="submit"
          className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
