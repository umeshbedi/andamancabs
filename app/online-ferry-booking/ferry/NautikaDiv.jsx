import React, { useEffect, useState } from 'react'
import { Tabs, Carousel, Divider, Image, Button } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import NautikaFerryContent from './NautikaFerryContent';


export default function NautikaDiv({ singleFerry = {}, tripName }) {

  const [ticketClass, setTicketClass] = useState([])
  
  // Function to convert 24-hour time to AM/PM format
  function toAmPm(timeStr) {
    let [hour, minute, second] = timeStr.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  const onChange = key => {
    console.log(key);
  };

 

  useEffect(() => {
    const luxury = {
      shipClass: "Luxury",
      price: singleFerry.fares.pBaseFare,
      departureTime: `${singleFerry.aTime.hour}:${singleFerry.aTime.minute}`,
      arrivalTime: `${singleFerry.dTime.hour}:${singleFerry.dTime.minute}`,
      sourceName: singleFerry.from,
      destinationName: singleFerry.to,
      shipTitle: "Nautika",
      seatClassData: singleFerry.pClass,
    }
    const royal = {
      shipClass: "Royal",
      price: singleFerry.fares.bBaseFare,
      departureTime: `${singleFerry.aTime.hour}:${singleFerry.aTime.minute}`,
      arrivalTime: `${singleFerry.dTime.hour}:${singleFerry.dTime.minute}`,
      sourceName: singleFerry.from,
      destinationName: singleFerry.to,
      shipTitle: "Nautika",
      seatClassData: singleFerry.bClass,
    }

    const tempClass = [luxury, royal];
    setTicketClass(tempClass);


  }, [singleFerry])


  

  const amenties = {
    
    "Luxury": [
      { icon: <SafetyOutlined />, label: "Premium Seating" },
      { icon: <SafetyOutlined />, label: "Onboard Cafe" },
      { icon: <SafetyOutlined />, label: "Air Conditioned" },
      { icon: <SafetyOutlined />, label: "Extra Leg Space" },
    ],

    "Royal": [
      { icon: <SafetyOutlined />, label: "Premium Seating" },
      { icon: <SafetyOutlined />, label: "Onboard Cafe" },
      { icon: <SafetyOutlined />, label: "Air Conditioned" },
      { icon: <SafetyOutlined />, label: "Extra Leg Space" },
      { icon: <SafetyOutlined />, label: "Priority Boarding" },
    ],

  }



  return (
    <div className='w-full p-6 pt-0 shadow-md hover:shadow-xl mt-5 rounded-2xl'>
      <Tabs
        onChange={onChange}
        type="card"
        items={ticketClass.map((item, i) => {
          return {
            label: item.shipClass,
            key: `${item.shipTitle}-${item.shipClass}-${i}`,
            children: <NautikaFerryContent
              amenties={amenties[item.shipClass] || amenties["Royal"]}
              price={item.price || 500}
              arrivalTime={toAmPm(item.arrivalTime) || "10:00 AM"}
              departureTime={toAmPm(item.departureTime) || "11:00 AM"}
              source={item.sourceName || "Port Blair"}
              destination={item.destinationName || "Havelock"}
              ferryName={item.shipTitle || "Nautika Ferry"}
              seatData={item.seatClassData || {}}
              className={item.shipClass}
              id={singleFerry.id}
              tripId={singleFerry.tripId}
              vesselID={singleFerry.vesselID}
            />,
          };
        })}
      />
    </div>
  )
}
