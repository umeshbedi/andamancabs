// import { sendPaymentReceivedEmail } from "./paymentReceivedEmail";


export const paymentAction = async ({ amount, paymentFor, clickEvent = (e) => { }, data }) => {

    clickEvent("loading");
    // 1. Create order on server
    const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount, currency: "INR" }), // ₹500
    });

    const orderData = await orderRes.json();

    if (!orderData.id) {
        alert("Order creation failed");

        return;
    }

    // 2. Load Razorpay checkout
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Andamancabs",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response) {
            // Send payment details to backend
            const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
                // alert("Payment Verified ✅");
                clickEvent("payment success")
                
            } else {
                alert("Payment Verification Failed ❌");
            }
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    clickEvent("not loading");

};