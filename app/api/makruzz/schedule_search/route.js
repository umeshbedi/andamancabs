export async function POST(req) {
  try {
    const { fromLocation, toLocation, travelDate, numAdult } = await req.json();

    // 1. Login first to get token
    const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_MAKRUZZ_BASE_URL}booking_api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          username: "andamancabs@makruzz.com",
          password: "eMNk2Xis"
        }
      })
    });

    if (!loginResponse.ok) {
      return Response.json({ error: "Login failed" }, { status: loginResponse.status });
    }

    const loginData = await loginResponse.json();
    const token = loginData?.data?.token;

    if (!token) {
      return Response.json({ error: "Token not found" }, { status: 500 });
    }

    // 2. Call schedule_search
    const searchResponse = await fetch(`${process.env.NEXT_PUBLIC_MAKRUZZ_BASE_URL}booking_api/schedule_search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Mak_Authorization": token
      },
      body: JSON.stringify({
        data: {
          trip_type: "single_trip",
          from_location: fromLocation,
          travel_date: travelDate,
          no_of_passenger: numAdult,
          to_location: toLocation
        }
      })
    });

    if (!searchResponse.ok) {
      return Response.json({ error: "Failed to fetch tickets" }, { status: searchResponse.status });
    }

    const ticketData = await searchResponse.json();
    return Response.json(ticketData);
  } catch (error) {
    console.error("Makruzz API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
