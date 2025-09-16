import { NextResponse } from "next/server";
import axios from "axios";

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(req) {
  try {
    const emailData = await req.json(); // 👈 receive emailData from client
    // console.log(emailData)
    const response = await axios.post(BREVO_API_URL, emailData, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // console.log(NextResponse.json(response.data));
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error sending enquiry email:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
