/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../URL";
const Admin = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("ID");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/api/data`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFormDataList(data.formDataList);
        } else {
          console.error("Error fetching form data:", data.msg);
        }
      } else {
        console.error("Error fetching form data. HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const generateVideoDownloadLink = (fileName) => {
    return `/uploads/${fileName}`;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (formDataId) => {
    try {
      const response = await axios.delete(`${URL}/api/data/${formDataId}`);

      // If deletion was successful, update the local state
      if (response.data.success) {
        setFormDataList((prevData) =>
          prevData.filter((formData) => formData.ID !== formDataId)
        );
        console.log("Data deleted successfully:", response.data);
      } else {
        console.error("Error deleting data:", response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleLogin = () => {
    // Basic static login check (replace with a more secure mechanism)
    if (username === "user" && password === "123") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      alert("Invalid credentials. Please try again.");
    }
  };

  if (!loggedIn) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 mr-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 mr-2"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
            Login
          </button>
        </div>
      </div>
    );
  }

  const sortedData = [...formDataList].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    const order = sortOrder === "asc" ? 1 : -1;

    if (fieldA < fieldB) return -1 * order;
    if (fieldA > fieldB) return 1 * order;
    return 0;
  });

  const filteredData = sortedData.filter(
    (formData) =>
      formData.ID &&
      searchTerm &&
      formData.ID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unfilteredData = sortedData.filter(
    (formData) => !filteredData.includes(formData)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Page</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 mr-2"
        />
        <button
          onClick={() => handleSort("ID")}
          className="bg-blue-500 text-white p-2"
        >
          Sort by ID
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-5 border-b">ID</th>
            <th className="py-2 px-5 border-b">Name</th>
            <th className="py-2 px-5 border-b">Father's Name</th>
            <th className="py-2 px-5 border-b">Mother's Name</th>
            <th className="py-2 px-5 border-b">Address</th>
            <th className="py-2 px-5 border-b">Email</th>
            <th className="py-2 px-5 border-b">Acting Role</th>
            <th className="py-2 px-5 border-b">Mobile Number</th>
            <th className="py-2 px-5 border-b">WhatsApp Number</th>
            <th className="py-2 px-5 border-b">Status</th>
            <th className="py-2 px-5 border-b">Video Download</th>
            <th className="py-2 px-5 border-b">Delete</th>
            <th className="py-2 px-5 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((formData) => (
            <tr key={formData.id} className="border-b">
              <td className="text-[10px] py-2 px-2 ">{formData.ID}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.Name}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.FatherName}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.MotherName}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.Address}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.email}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.ActingRole}</td>
              <td className="text-[10px] py-2 px-2 ">
                {formData.MobileNumber}
              </td>
              <td className="text-[10px] py-2 px-2 ">
                {formData.WhatsAppNumber}
              </td>
              <td className="text-[10px] py-2 px-2 ">{formData.status}</td>
              <td className="text-[10px] py-2 px-2 ">
                <a
                  href={generateVideoDownloadLink(formData.VideoUpload)}
                  download
                  className="text-blue-500 hover:underline"
                >
                  Download
                </a>
              </td>
              <td className="text-[10px] py-2 px-2">
                <button
                  className="text-red-700"
                  onClick={() => handleDelete(formData.ID)}
                >
                  Delete
                </button>
              </td>
              <td className="text-[10px] py-2 px-4">
                {formatDate(formData.createdAt)}
              </td>
            </tr>
          ))}
          {unfilteredData.map((formData) => (
            <tr key={formData.id} className="border-b">
              <td className="text-[10px] py-2 px-2 ">{formData.ID}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.Name}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.FatherName}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.MotherName}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.Address}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.email}</td>
              <td className="text-[10px] py-2 px-2 ">{formData.ActingRole}</td>
              <td className="text-[10px] py-2 px-2 ">
                {formData.MobileNumber}
              </td>
              <td className="text-[10px] py-2 px-2 ">
                {formData.WhatsAppNumber}
              </td>
              <td className="text-[10px] py-2 px-2 ">{formData.status}</td>
              <td className="text-[10px] py-2 px-2 ">
                <a
                  href={generateVideoDownloadLink(formData.VideoUpload)}
                  download
                  className="text-blue-500 hover:underline"
                >
                  Download
                </a>
              </td>

              <td className="text-[10px] py-2 px-2">
                <button
                  className="text-red-700"
                  onClick={() => handleDelete(formData.ID)}
                >
                  Delete
                </button>
              </td>
              <td className="text-[10px] py-2 px-4">
                {formatDate(formData.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
