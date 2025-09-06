export function convertTripsToTable(htmlString) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const tripDivs = tempDiv.querySelectorAll('[id^="trip"]');

  let allTripsTable = `
    <table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse; width:100%; font-family:Arial; font-size:14px;">
      <thead>
        <tr style="background:#f2f2f2;">
          <th>Trip</th>
          <th>Route</th>
          <th>Operator</th>
          <th>Date</th>
          <th>Class</th>
          <th>Time</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;

  const singleTrips = [];

  tripDivs.forEach((trip, index) => {
    if (!trip.innerHTML.trim()) return;

    const tripNumber = `Trip ${index + 1}`;
    const route = trip.querySelector("h4")?.textContent.trim() || "";
    const operator = trip.querySelector("h4 + div h4")?.textContent.trim() || "";
    const date = trip.querySelector("svg + span")?.textContent.trim() || "";

    // FIX: Ignore headings like #Trip 2 by choosing only spans inside divs with text
    const travelClass = Array.from(trip.querySelectorAll("div span"))
      .map(span => span.textContent.trim())
      .find(text => text && !text.startsWith("#Trip")) || "";

    const time = trip.querySelector("div:nth-of-type(2) span:nth-of-type(2)")?.textContent.trim() || "";
    const price = trip.querySelector(".mt-3 span:nth-of-type(2) span:last-child")?.textContent.trim() || "";
    const total = trip.querySelector(".mt-3 span.font-bold + span")?.textContent.trim() || "";

    allTripsTable += `
      <tr>
        <td>${tripNumber}</td>
        <td>${route}</td>
        <td>${operator}</td>
        <td>${date}</td>
        <td>${travelClass}</td>
        <td>${time}</td>
        <td>${price}</td>
        <td>${total}</td>
      </tr>
    `;

    const singleTripTable = `
      <table border="1" cellspacing="0" cellpadding="5" style="border-collapse:collapse; width:100%; font-family:Arial; font-size:14px;">
        <thead>
          <tr style="background:#f2f2f2;">
            <th>Trip</th><th>Route</th><th>Operator</th><th>Date</th>
            <th>Class</th><th>Time</th><th>Price</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${tripNumber}</td>
            <td>${route}</td>
            <td>${operator}</td>
            <td>${date}</td>
            <td>${travelClass}</td>
            <td>${time}</td>
            <td>${price}</td>
            <td>${total}</td>
          </tr>
        </tbody>
      </table>
    `;
    singleTrips.push(singleTripTable);
  });

  allTripsTable += `</tbody></table>`;
  const grandTotal = tempDiv.querySelector("span.font-bold + span:last-child")?.textContent || "";

  return {
    allTripsTable: allTripsTable + `<p style="font-size:16px; font-weight:bold; margin-top:15px;">Grand Total: ${grandTotal}</p>`,
    singleTrips
  };
}
