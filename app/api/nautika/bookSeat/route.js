export async function POST(req) {
    try {
        const body = await req.json();

        // Basic validation
        if (
            !body.date ||
            !body.paxDetail ||
            !body.to ||
            !body.from ||
            !body.tripId ||
            !body.id ||
            !body.vesselID
        ) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }


        // Construct payload exactly as Nautika API expects
        const payload = {
            bookingData: [
                {
                    id: body.id,
                    tripId: body.tripId,
                    vesselID: body.vesselID,
                    bookingTS: Math.floor(Date.now() / 1000), // current timestamp
                    date: body.date,
                    from: body.from,
                    to: body.to,
                    gstin: "",
                    paxDetail: body.paxDetail,
                    userData: {
                        apiUser: {
                            userName: "andamancabs",
                            agency: "travel agency",
                            token: process.env.NEXT_PUBLIC_NAUTIKA_TOKEN,
                            walletBalance: 0,
                        },
                    },
                    paymentData: {
                        gstin: "",
                    },
                },
            ],
            userName: "andamancabs",
            token: process.env.NEXT_PUBLIC_NAUTIKA_TOKEN,
        };

        // console.log("BookSeat Request Payload:", JSON.stringify(payload));

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_NAUTIKA_BASE_URL}bookSeats`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            console.error("BookSeat API Error:", res.status, errorText);
            return new Response(
                JSON.stringify({ error: "Nautika API error", details: errorText }),
                { status: res.status }
            );
        }

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
