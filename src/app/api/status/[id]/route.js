import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import dbConnect from "@/lib/dbConnect";
import Forms from "@/models/formSubmit";
import { URL } from "../../../../../URL";

// Define updateFormDataStatus function outside of the POST function
async function updateFormDataStatus(data, status, merchantId, transactionId) {
  try {
    await dbConnect();
    await Forms.findOneAndUpdate(
      { merchantId, transactionId },
      { status },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating form data status:", error);
  }
}

export async function POST(req, res) {
  try {
    const data = await req.formData();
    const status = data.get("code");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");

    const st = `/pg/v1/status/${merchantId}/${transactionId}099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`;
    const checksum = sha256(st) + "###" + "1";

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`
      }
    };

    const response = await axios.request(options);

    // Use the updateFormDataStatus function
    if (response.data.code === "PAYMENT_SUCCESS") {
      await updateFormDataStatus(data, "success", merchantId, transactionId);
      return NextResponse.redirect(`${URL}/success`, {
        status: 301
      });
    } else {
      await updateFormDataStatus(data, "failed", merchantId, transactionId);
      return NextResponse.redirect(`${URL}/failure`, {
        status: 301
      });
    }
  } catch (error) {
    console.error("Error in /api/payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
