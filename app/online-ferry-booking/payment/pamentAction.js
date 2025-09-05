import { sendPaymentReceivedEmail } from "./paymentReceivedEmail";


export const handlePayment = async ({ email, name, amount, paymentFor, title, description, data, clickEvent=(e) => {}}) => {
    
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
                    clickEvent("sending email");
                    sendPaymentReceivedEmail({
                        toEmail: email,
                        toName: name,
                        amount: orderData.amount, 
                        paymentId: response.razorpay_payment_id,
                    }).then(() => {
                        // alert("Payment Successful! A confirmation email has been sent.");
                        clickEvent("payment success")
                        alert("Payment Successful! A confirmation email has been sent.");
                        
                    }).catch((error) => {
                        console.error("Error sending email:", error);
                        alert("Payment Successful but failed to send confirmation email.");
                        // messageApi.error("Payment Successful but failed to send confirmation email.");
                    });
                    // You can now confirm booking / order in DB
                } else {
                    alert("Payment Verification Failed ❌");
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        clickEvent("not loading");
        
    };