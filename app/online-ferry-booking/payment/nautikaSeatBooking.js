import { sendSeatConfirmationEmail } from "./confirmTicketEmail";
import { sendTicketNotConfirmedEmail } from "./notConfirmEmail";

export async function nautikaSeatBooking({
  adultDetails,
  infantDetails,
  billingData,
  selectedSeatData,
  fromIsland,
  toIsland
}) {
  const location = {
    portblair: "Port Blair",
    havelock: "Swaraj Dweep",
    neilisland: "Shaheed Dweep"
  };

  const pax = [];
  const infantPax = [];

  selectedSeatData.seats.forEach((element, index) => {
    pax.push({
      id: index + 1,
      seat: element,
      tier: selectedSeatData.className === "Royal" ? "B" : "P",
      passport: "",
      name: adultDetails[index].name,
      age: adultDetails[index].age,
      gender: adultDetails[index].gender === "male" ? "M" : "F",
      nationality: adultDetails[index].nationality,
      isCancelled: 0
    });
  });

  infantDetails.forEach((element, index) => {
    infantPax.push({
      id: index + 1,
      name: element.name,
      gender: element.gender === "male" ? "M" : "F",
      nationality: element.nationality,
      isCancelled: 0,
      ...calculateInfantDOB(element.age),
      passport: ""
    });
  });

  const paxDetail = {
    email: billingData.email,
    phone: `${billingData.countryCode}${billingData.phone}`,
    pax,
    infantPax,
    bClassSeats: selectedSeatData.className === "Royal" ? selectedSeatData.seats : [],
    pClassSeats: selectedSeatData.className === "Luxury" ? selectedSeatData.seats : []
  };

  const requestData = {
    id: selectedSeatData.shipID,
    tripId: selectedSeatData.tripId,
    vesselID: selectedSeatData.vesselID,
    from: location[fromIsland],
    to: location[toIsland],
    date: selectedSeatData.travel_date, // ✅ FIX
    bookingTS: Math.floor(Date.now() / 1000),
    paxDetail
  };

  const res = await fetch("/api/nautika/bookSeat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData)
  });

  const data = await res.json();
  console.log("Nautika:", data);

  if (data.err == null || data.error == null) {
    sendSeatConfirmationEmail({
      toEmail: billingData.email,
      toName: billingData.name,
      pnr: data.map(item => item.pnr).join('|'),
      ferryName: "Nautika",
      date: selectedSeatData.travel_date,
      fromLocation: fromIsland,
      toLocation: toIsland,
    })
    return data
  };

  if (data.err || data.error) {
    sendTicketNotConfirmedEmail({
      toEmail: billingData.email,
      toName: billingData.name,
      error: data.err || data.error,
      ferryName: "Nautika",
      date: selectedSeatData.travel_date,
      fromLocation: fromIsland,
      toLocation: toIsland,
    })
    alert(`Oops! Your booking is not confirmed. Reason: ${data.error}. Don't worry your deducted amount will be refunded for this ferry after confirmation.`) || "Something went wrong!";
    return data
  }
}

function calculateInfantDOB(ageInput) {
  const now = new Date();
  const years = parseInt(ageInput);
  if (isNaN(years)) throw new Error("Invalid age input");

  const dobDate = new Date(now.getFullYear() - years, now.getMonth(), now.getDate());
  const dob = dobDate.toISOString().split("T")[0];
  const dobTS = Math.floor(dobDate.getTime() / 1000);

  return { dob, dobTS };
}
