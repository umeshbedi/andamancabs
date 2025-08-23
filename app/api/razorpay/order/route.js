import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount, currency, receipt } = await req.json();

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
