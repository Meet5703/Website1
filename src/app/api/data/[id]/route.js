// pages/api/data/[id].js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Forms from "@/models/formSubmit";
import { Result } from "postcss";

export const DataList = async () => {
  try {
    await dbConnect();

    // Use Forms.find() to fetch all form data
    const formDataList = await Forms.find();

    return formDataList;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return {
      msg: "Error fetching form data",
      success: false
    };
  }
};
export async function GET(request, content) {
  const data = await DataList();
  const userData = data.filter((item) => item.id == content.params.id);
  return NextResponse.json(userData, { status: 200 });
}
export async function PUT(request, content) {
  try {
    await dbConnect();

    const { id } = content.params;
    const payload = await request.json();

    // Find the form data by ID
    const formData = await Forms.findOne({ ID: id });

    if (!formData) {
      return NextResponse.json(
        {
          success: false,
          msg: "Form data not found for the provided ID"
        },
        { status: 404 }
      );
    }

    // Update the status to "success"
    formData.status = "success";
    await formData.save();

    return NextResponse.json(
      {
        success: true,
        formData: formData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating form data:", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Error updating form data"
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, content) {
  try {
    await dbConnect();

    const { id } = content.params;

    // Find the form data by ID and remove it
    const deletedFormData = await Forms.findOneAndDelete({ ID: id });

    if (!deletedFormData) {
      return NextResponse.json(
        { msg: "Form data not found for the provided ID", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { msg: "Data deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting form data:", error);
    return NextResponse.json(
      { msg: "Internal error", success: false },
      { status: 500 }
    );
  }
}
