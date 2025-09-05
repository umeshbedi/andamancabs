async function confirmBooking({ bookingId }) {
  try {
    const res = await fetch("/api/makruzz/confirmBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id: bookingId }),
    });

    const data = await res.json();
    console.log("Confirm Booking Response:", data);

    if (data.status === "success") {
      return data;
      // Redirect manually
      // window.location.href = `/successMakruzz?booking_id=${data.booking_id}&payment_id=${paymentId}&pnr=${data.pnr}&order_id=${orderId}`;
    } else {
      alert(data.message || "Failed to confirm booking");
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    alert("Something went wrong while confirming booking.");
  }
}

export async function bookMakruzzTicket({ adultDetails, infantDetails, billingData, selectedSeatData }) {
  //save passagers details
  const passangers = [...adultDetails, ...infantDetails]
  let passengerData = {};
  passangers.forEach((item, index) => {
    passengerData[index + 1] = {
      "title": item.gender == "male" ? "MR" : "MS",
      "name": item.name,
      "age": item.age,
      "sex": item.gender,
      "nationality": item.nationality,
      "fcountry": "",
      "fpassport": "",
      "fexpdate": ""
    };
  });

  // console.log(passengerData);

  const requestData = {
    "data": {
      "passenger": passengerData,
      "c_name": billingData.name,
      "c_mobile": billingData.phone,
      "c_email": billingData.email,
      "p_contact": `${billingData.countryCode}${billingData.phone}`,
      "c_remark": "booking cruize",
      "no_of_passenger": `${selectedSeatData.no_of_passenger}`,
      "schedule_id": selectedSeatData.schedule_id,
      "travel_date": selectedSeatData.travel_date,
      "class_id": selectedSeatData.class_id,  // You might need to adjust this as per your system
      "fare": selectedSeatData.fare,
      "tc_check": true
    }
  };


  fetch('/api/makruzz/savePassenger', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Response from API:", data);
      if (data?.code === "200") {
        const confirmres = confirmBooking({ bookingId: data.data.booking_id })
        const confirmResult = confirmres.then(result => { return result })
        return confirmResult;
        // window.location.href = `/cruizes/payment/paymentMakruzz.php?price=${totalFare}&booking_id=
        // ${data.data.booking_id}&schedule_id=${jsonData.travelD_id}`;
      } else {
        alert(`Oops! Your seat is not confirmed. Reason: ${data?.msg}` || "Something went wrong");
      }
    })
    .catch(err => { console.error("Error:", err); alert(err.message) });


}