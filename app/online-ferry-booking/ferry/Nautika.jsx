import React, { useEffect, useState } from 'react'
import LuxurySeatSelectionModal from './LuxurySeatSelectionModal'
import seatDataJson from './seatDataJson.json'

import luxuryClass from './luxuryClass.json';
import NautikaDiv from './NautikaDiv';

export default function Nautika({ nautikaTickets = [] }) {
  const [isLuxuryModalOpen, setIsLuxuryModalOpen] = useState(false);
  const [ticketClass, setTicketClass] = useState([])
 useEffect(() => {
    // Initialize luxury class data
    setTicketClass([]);
    setTicketClass(nautikaTickets)
 },[])

  return (
    <div>

      {nautikaTickets.map((ferry, index) => (
        <NautikaDiv key={index} singleFerry={ferry}/>
      ))}
      
      <LuxurySeatSelectionModal
        isOpen={isLuxuryModalOpen}
        onClose={() => setIsLuxuryModalOpen(false)}
        seatData={luxuryClass}
        onConfirm={(e) => console.log(e, " is Confirmed")}
      />
    </div>
  )
}
