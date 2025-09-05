// app/api/confirmBooking/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Get booking_id from request body
        const { booking_id, payment_id, order_id } = await req.json();

        if (!booking_id) {
            return NextResponse.json(
                { status: "error", message: "Missing booking_id" },
                { status: 400 }
            );
        }

        // Prepare payload
        const payload = {
            data: {
                booking_id,
            },
        };

        // Call external API
        const url = `${process.env.NEXT_PUBLIC_MAKRUZZ_BASE_URL}booking_api/confirm_booking`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Mak_Authorization": "YW5kYW1hbmNhYnNAbWFrcnV6ei5jb20tZU1OazJYaXM=",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return NextResponse.json(
                { status: "error", message: `API Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Return success JSON
        if (data.code === "200") {
            return NextResponse.json(
                {
                    status: "success",
                    pnr: data.data.pnr,
                    booking_id,
                    payment_id,
                    order_id,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { status: "error", message: data.msg || "Booking failed" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { status: "error", message: error.message },
            { status: 500 }
        );
    }
}
