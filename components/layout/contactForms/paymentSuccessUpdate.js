const { db } = require("@/firebase");

export async function updatePaymentStatus({bookingId, status, data, paymentFor}) {
    try {
        await db.collection('bookings').add({bookingId, paymentFor, status, data, timestamp: new Date()})
        .then(() => {
            console.log("Payment status updated successfully");
        });
    } catch (error) {
        console.error("Error updating payment status: ", error);
        throw error;
    }
}