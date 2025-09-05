// app/api/savePassenger/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Get JSON body
    const body = await req.json();
    console.log("Passenger request:", body);

    // External API endpoint
    const url = `${process.env.NEXT_PUBLIC_MAKRUZZ_BASE_URL}booking_api/savePassengers`;

    // Call external API (acts like PHP cURL)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Mak_Authorization": "YW5kYW1hbmNhYnNAbWFrcnV6ei5jb20tZU1OazJYaXM=",
      },
      body: JSON.stringify(body),
    });

    // Check if external API failed
    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: `API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Parse JSON response
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { status: "error", message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
