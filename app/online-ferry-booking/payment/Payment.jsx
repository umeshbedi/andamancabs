"use client";
import React, { useState } from "react";
import { sendPaymentReceivedEmail } from "./paymentReceivedEmail";
import { Modal } from "antd";
import { message } from "antd";

export default function PaymentBtn({ className, amount, paymentFor, title, description, data, clickEvent=() => {}, disabled = false}) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const handlePayment = async () => {
        setLoading(true);
        clickEvent(); 
        // 1. Create order on server
        const orderRes = await fetch("/api/razorpay/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amount, currency: "INR" }), // ₹500
        });

        const orderData = await orderRes.json();

        if (!orderData.id) {
            alert("Order creation failed");
            setLoading(false);
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
                    sendPaymentReceivedEmail({
                        toEmail: "umeshkumarbedi@gmail.com",
                        toName: "Umesh Bedi",
                        amount: orderData.amount, 
                        paymentId: response.razorpay_payment_id,
                    }).then(() => {
                        // alert("Payment Successful! A confirmation email has been sent.");
                        messageApi.success("Payment Successful! A confirmation email has been sent.");
                        setIsOpen(true);
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

        setLoading(false);
    };

    return (
        <>
        {contextHolder}
            <button
                onClick={handlePayment}
                disabled={loading || disabled}
                className={typeof className === "string" ? className : ""}
            >
                {loading ? "Processing..." : title || "Pay Now"}
            </button>
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            
            {/* <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
                <div className="p-5 flex flex-col items-center">
                    <img src="/img/payement done.gif" alt="payment done gif" style={{width:"100%"}}/>
                    <h2 className="text-2xl font-bold mt-5">Payment Successful!</h2>
                    <p className="text-center mt-3">Thank you for your payment. A confirmation email has been sent to your registered email address.</p>
                </div>
            </Modal> */}
        </>
    );
}
