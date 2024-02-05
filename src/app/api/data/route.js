import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import Forms from "@/models/formSubmit";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    const formDataList = await Forms.find(); // Fetch all form data

    return NextResponse.json({
      success: true,
      formDataList: formDataList
    });
  } catch (error) {
    console.error("Error fetching form data:", error);
    return NextResponse.json({
      msg: "Error fetching form data",
      success: false
    });
  }
}

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("VideoUpload");

  if (!file) {
    return NextResponse.json({ msg: "No file found", success: false });
  }

  const supportedVideoTypes = ["video/mp4", "video/webm"]; // Add more as needed

  if (!supportedVideoTypes.includes(file.type)) {
    return NextResponse.json({
      msg: "Unsupported video format",
      success: false
    });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  // Generate a unique ID starting with "EIFPE"
  const uniqueId = () => {
    const date = new Date();

    // Set the time zone to India Standard Time (IST)
    const options = { timeZone: "Asia/Kolkata" };
    const localDateString = date.toLocaleString("en-US", options);

    // Extract only numeric characters and limit to the first 14 characters
    const dateString = localDateString.replace(/[^0-9]/g, "").slice(0, 14);

    const randomness = Math.random().toString(36).substr(2, 3); // Modify this to generate only 2 to 3 characters
    const uniqueId = "EIFPE-" + dateString + randomness;

    console.log("Unique ID:", uniqueId);

    return uniqueId;
  };

  // Specify the folder structure within the public directory
  const uploadFolder = "uploads";
  const uniqueFileName = `${Date.now()}-${file.name}`;
  const absolutePath = path.resolve("public", uploadFolder, uniqueFileName);

  try {
    await writeFile(absolutePath, buffer);

    // Now that the file is saved, save other form data to the database
    const formData = {
      ID: uniqueId(),
      Name: data.get("Name"),
      FatherName: data.get("FatherName"),
      MotherName: data.get("MotherName"),
      Address: data.get("Address"),
      email: data.get("email"),
      ActingRole: data.get("ActingRole"),
      MobileNumber: data.get("MobileNumber"),
      WhatsAppNumber: data.get("WhatsAppNumber"),
      status: data.get("status") || "Failed",
      VideoUpload: uniqueFileName
    };
    console.log("FormData:", formData);

    await dbConnect();
    const result = await Forms.create(formData);

    return NextResponse.json({
      msg: "File uploaded and form data saved successfully",
      success: true,
      result: result
    });
  } catch (error) {
    console.error("Error writing file or saving form data:", error);
    return NextResponse.json({
      msg: "File upload or form data save failed",
      success: false
    });
  }
}
