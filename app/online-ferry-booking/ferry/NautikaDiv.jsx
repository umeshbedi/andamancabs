import React, { useEffect, useState } from 'react'
import { Tabs, Carousel, Divider, Image, Button } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import { mobile } from '@/components/utils/variables';
import { Avatar } from 'antd';
import LuxurySeatSelectionModal from './LuxurySeatSelectionModal';
import PaymentBtn from '../payment/Payment';

export default function NautikaDiv({ singleFerry = {} }) {

  const [ticketClass, setTicketClass] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  function onSeatConfirm(selectedSeats) {
    console.log("Selected Seats:", selectedSeats);  
    setIsModalOpen(false);
  }

  useEffect(() => {
    const luxury = {
      shipClass: "Luxury",
      price: singleFerry.fares.pBaseFare,
      arrivalTime: `${singleFerry.aTime.hour}:${singleFerry.aTime.minute}`,
      departureTime: `${singleFerry.dTime.hour}:${singleFerry.dTime.minute}`,
      sourceName: singleFerry.from,
      destinationName: singleFerry.to,
      shipTitle: "Nautika",
      seatClassData: singleFerry.pClass,
    }
    const royal = {
      shipClass: "Royal",
      price: singleFerry.fares.bBaseFare,
      arrivalTime: `${singleFerry.aTime.hour}:${singleFerry.aTime.minute}`,
      departureTime: `${singleFerry.dTime.hour}:${singleFerry.dTime.minute}`,
      sourceName: singleFerry.from,
      destinationName: singleFerry.to,
      shipTitle: "Nautika",
      seatClassData: singleFerry.bClass,
    }

    const tempClass = [luxury, royal];
    setTicketClass(tempClass);


  },[singleFerry])


  const customData = [
    { image: "/uploads/sliders/27283.jpg", heading: "Andaman Cab", subHeading: "Explore the beauty of nature with us" },
    { image: "/uploads/sliders/17768.png", heading: "See You Here", subHeading: "Explore the beauty of nature with us" },
  ]

  function SliderCarousel() {
    return (
      <Carousel arrows infinite={false}>

        {customData.map((item, i) => (
          <div key={i} className='w-full h-[100px]'>
            <Image src={item.image} alt={item.heading} height={100} className='object-cover' />
          </div>
        ))}

      </Carousel>
    )
  }

  function FerryContent({ amenties = [], price, arrivalTime, departureTime, source, destination, ferryName, seatData={} }) {
    return (
      <div>
        <div className='flex flex-col sm:flex-row justify-between items-center w-full mb-2'>
          {/* Image div */}
          {/* <div className='w-[150px] h-[100px] overflow-hidden bg-gray-300 rounded-2xl'>
            <SliderCarousel />
          </div> */}

          {/* Ferry name div */}
          <div className='flex flex-col justify-center items-center'>
            <Image src='/img/ferry logo/Nautika-Logo-v2-768x223.png' alt="Nautika logo" height={30} width={60} className='object-contain'/>
            <h4>{ferryName}</h4>
          </div>

          {/* timing div */}
          <div className='flex gap-10'>
            <div>
              <h4>{toAmPm(arrivalTime)}</h4>
              <p>{source}</p>
            </div>

            <div className='flex items-center'>
              <div className='h-1 w-1 bg-gray-400 rounded-full p-1' />
              <div className='w-[50px] md:w-[100px] lg:w-[150px]'><Divider style={{ borderWidth: 1, borderColor: 'gray' }} variant="dashed" /></div>
              <div className='h-1 w-1 bg-gray-400 rounded-full p-1' />
            </div>

            <div>
              <h4>{toAmPm(departureTime)}</h4>
              <p>{destination}</p>
            </div>


          </div>
          <div>
            {/* Price div */}
            <p className='text-2xl font-bold'><span className='line-through text-[1rem] font-normal'>₹{price + 150}</span> ₹{price}</p>
            <button onClick={()=>{setIsModalOpen(true); console.log(seatData)}} className='bg-[var(--primary)] mt-5 py-3 px-10 rounded-full cursor-pointer'>Book Now</button>
            
          </div>

        </div>

        <div className='flex gap-2 flex-wrap mt-3'>
          {amenties.map((item, i) => (
            <p className='bg-gray-200 px-2 py-1 rounded-full' key={i}><span>{item.icon}</span> {item.label}</p>
          ))}
        </div>

        <LuxurySeatSelectionModal isOpen={isModalOpen} price={price} onClose={()=>setIsModalOpen(false)} onConfirm={onSeatConfirm} seatData={seatData}/>
      </div>
    );
  }

  const amenties = {
    "Premium": [
      { icon: <SafetyOutlined />, label: "Premium Seating" },
      { icon: <SafetyOutlined />, label: "Onboard Cafe" },
      { icon: <SafetyOutlined />, label: "Air Conditioned" },
    ],

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
            children: <FerryContent 
            amenties={amenties[item.shipClass] || amenties["Royal"]} 
            price={item.price || 500} 
            arrivalTime={item.arrivalTime || "10:00 AM"}
            departureTime={item.departureTime || "11:00 AM"}
            source={item.sourceName || "Port Blair"}
            destination={item.destinationName || "Havelock"}
            ferryName={item.shipTitle || "Nautika Ferry"}
            seatData={item.seatClassData || {}}
            />,
          };
        })}
      />
    </div>
  )
}
