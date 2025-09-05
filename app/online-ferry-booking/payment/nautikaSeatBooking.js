export async function nautikaSeatBooking({ adultDetails, infantDetails, billingData, selectedSeatData, fromIsland, toIsland }) {

    const location = { "portblair": "Port Blair", "havelock": "Swaraj Dweep", "neilisland": "Shaheed Dweep" }

    const pax = []
    selectedSeatData.seats.forEach((element, index) => {
        pax.push({
            seat: element,
            tier: selectedSeatData.className == "Royal" ? "R" : "L",
            photoId: "PhotoID",
            expiry: "d-m-y",
            name: adultDetails[index].name,
            age: adultDetails[index].age,
            gender: adultDetails[index].gender == "male" ? "M" : "F",
            nationality: "Indian",
        })
    });

    const paxDetail = {
        email: billingData.email,
        phone: `${billingData.countryCode}${billingData.phone}`,
        gstin: "gstin-if-applicable",
        pax,
        infantPax: infantDetails,
    }

    const requestData = {
        id: selectedSeatData.shipID,
        tripId: selectedSeatData.tripId,
        vesselID: selectedSeatData.vesselID,
        from: location[fromIsland],
        to: location[toIsland],
        bookingTS: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
        paxDetail,
        bClassSeats: selectedSeatData.className == "Royal" ? selectedSeatData.seats : [],
        pClassSeats: selectedSeatData.className == "Luxury" ? selectedSeatData.seats : []
    }

    console.log('reqest Data: ', requestData)

    const res = await fetch("/api/nautika", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    });

    const data = await res.json();
    console.log("Nautika:", data);
    if (data.err == null) return data?.data;

    if (data.error) alert(`Oops Your Booking is not confirmed. Reason: ${data.error}`)
}