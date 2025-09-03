export async function checkMakruzzSeat({ selectedSeatData, tripData, adults }) {
    const location = { "portblair": "1", "havelock": "2", "neilisland": "3" }
    const res = await fetch("/api/makruzz/schedule_search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fromLocation: location[tripData.fromIsland],
            toLocation: location[tripData.toIsland],
            travelDate: tripData.departure,
            numAdult: adults
        })
    });

    const data = await res.json();
    const finalData = data?.data || []
    if (finalData.find(f => f.id == selectedSeatData.schedule_id)) return true;
    else return false;
}
export async function checkNautikaSeat({ selectedSeatData, tripData }) {
    const location = { "portblair": "Port Blair", "havelock": "Swaraj Dweep", "neilisland": "Shaheed Dweep" }

    const dateParts = tripData.departure.split("-");
    const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

    const res = await fetch("/api/nautika", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date: formattedDate,
            from: location[tripData.fromIsland],
            to: location[tripData.toIsland]
        })
    });
    
    const data = await res.json();
    const finalData = data?.data || []
    const selectedShip = finalData.find(seat => seat.id == selectedSeatData.shipID)

    let availabe = true;

    if (selectedSeatData.className === "Royal") {
        selectedSeatData.seats.forEach(seat => {
            if (selectedShip.bClass[seat].isBooked == 1) 
            availabe = false;    
            return ;
        });
    } else {
        selectedSeatData.seats.forEach(seat => {
            if (selectedShip.pClass[seat].isBooked == 1) 
                availabe = false;
                return;
        });
    }
    return availabe;
}



