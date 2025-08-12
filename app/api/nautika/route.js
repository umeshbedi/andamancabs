export async function POST(req) {
    try {
      const body = await req.json();
  
      if (!body.date || !body.from || !body.to) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            }
          }
        );
      }
  
      const payload = {
        date: body.date,
        from: body.from,
        to: body.to,
        userName: "andamancabs",
        token: process.env.NEXT_PUBLIC_NAUTIKA_TOKEN
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_NAUTIKA_BASE_URL}getTripData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const data = await res.json();
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("API Error:", error);
      return new Response(
        JSON.stringify({ error: "Server error" }),
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      );
    }
  }
  
  export async function OPTIONS() {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  