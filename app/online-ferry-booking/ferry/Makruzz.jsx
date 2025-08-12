import React, { useEffect, useState } from 'react'
import FerryDiv from './MakruzzDiv'

export default function Makruzz({ makruzzTickets }) {
  const [filteredClass, setFilteredClass] = useState([])

  // Function to convert 24-hour time to AM/PM format
  function toAmPm(timeStr) {
    let [hour, minute, second] = timeStr.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  useEffect(() => {
    const grouped = Object.values(
      makruzzTickets.reduce((acc, item) => {
        const arrivalFormatted = toAmPm(item.arrival_time);

        if (!acc[arrivalFormatted]) {
          acc[arrivalFormatted] = {
            arrival_time: arrivalFormatted,
            ship_classes: []
          };
        }

        acc[arrivalFormatted].ship_classes.push({
          shipClass: item.ship_class_title,
          price: item.ship_class_price,
          shipTitle: item.ship_title,
          sourceName: item.source_name,
          destinationName: item.destination_name,
          arrivalTime : arrivalFormatted,
          departureTime: toAmPm(item.departure_time),
        });

        return acc;
      }, {})
    );

    setFilteredClass(grouped);

  }, [makruzzTickets]);
  return (
    <div>
      {filteredClass.map((fClass, index) => (
        <FerryDiv key={index} ticketClass={fClass}/>
      ))}
    </div>
  )
}
