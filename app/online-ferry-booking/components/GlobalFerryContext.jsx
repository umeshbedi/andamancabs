"use client"
import React, { useContext, createContext, useState, useEffect } from 'react'

const GlobalContext = createContext();

export default function GlobalFerryContext({ children }) {
    const [tripData, setTripData] = useState(null);

    const [trip0Selected, setTrip0Selected] = useState(null);
    const [trip1Selected, setTrip1Selected] = useState(null);
    const [trip2Selected, setTrip2Selected] = useState(null);

    
  const [adultData, setAdultData] = useState([])
  const [infantData, setInfantData] = useState([])

  const [billingData, setBillingData] = useState({
    name: '',
    email: '',
    countryCode: "+91",
    phone: '',
    idType: "aadhaar",
    idNumber: ''
  })

    const location = { "portblair": "Port Blair", "havelock": "Swaraj Dweep", "neilisland": "Shaheed Dweep" }

    function updateTripData(data) {
        setTripData(data);
    }

    useEffect(() => {
        setTrip0Selected(null);
        setTrip1Selected(null);
        setTrip2Selected(null);
    }, [tripData])





    return (
        <GlobalContext.Provider value={{
            tripData, 
            updateTripData, 
            location,
            trip0Selected, setTrip0Selected,
            trip1Selected, setTrip1Selected,
            trip2Selected, setTrip2Selected,
            adultData, setAdultData,
            infantData, setInfantData,
            billingData, setBillingData
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalFerryContext = () => useContext(GlobalContext);
