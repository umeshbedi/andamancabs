export async function GET() {
    try {
      // Step 1: Login request
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
  
      // Step 2: Get sectors with token
      const sectorsResponse = await fetch(`${process.env.NEXT_PUBLIC_MAKRUZZ_BASE_URL}booking_api/get_sectors`, {
        method: "GET",
        headers: {
          "Mak_Authorization": token
        }
      });
  
      if (!sectorsResponse.ok) {
        return Response.json({ error: "Failed to fetch sectors" }, { status: sectorsResponse.status });
      }
  
      const sectorsData = await sectorsResponse.json();
  
      return Response.json(sectorsData?.data || []);
    } catch (error) {
      console.error("Makruzz API Error:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  