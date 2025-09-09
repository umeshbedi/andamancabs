import React, { useEffect, useState } from 'react'
import { Tabs, Carousel, Divider, Button } from 'antd';

import LuxuryRoyalSeatSelectionModal from './LuxuryRoyalSeatSelectionModal';
import PaymentBtn from '../payment/Payment';
import Image from 'next/image';

export default function NautikaFerryContent({
    amenties = [], price, arrivalTime, departureTime, id, tripId, vesselID,
    source, destination, ferryName, seatData = {}, className }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [seatDataModal, setSeatDataModal] = useState(seatData)
    const [ferryclassName, setFerryClassName] = useState(ferryName)
    const [Price, setPrice] = useState(price)
    const [arrival, setArrival] = useState(arrivalTime)
    const [departure, setDeparture] = useState(departureTime)

    function onSeatConfirm(selectedSeats) {
        console.log("Selected Seats:", selectedSeats);
        setIsModalOpen(false);
    }

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-center w-full mb-2'>
                {/* Image div */}
                {/* <div className='w-[150px] h-[100px] overflow-hidden bg-gray-300 rounded-2xl'>
            <SliderCarousel />
          </div> */}

                {/* Ferry name div */}
                <div className='flex flex-col justify-center items-center'>
                    <Image src='/img/ferry logo/Nautika-Logo-v2-768x223.png' alt="Nautika logo" height={30} width={60} className='object-contain' />
                    <h4>{ferryName}</h4>
                </div>

                {/* timing div */}
                <div className='flex gap-10'>
                    <div>
                        <h4>{arrivalTime}</h4>
                        <p>{source}</p>
                    </div>

                    <div className='flex items-center'>
                        <div className='h-1 w-1 bg-gray-400 rounded-full p-1' />
                        <div className='w-[50px] md:w-[100px] lg:w-[150px]'><Divider style={{ borderWidth: 1, borderColor: 'gray' }} variant="dashed" /></div>
                        <div className='h-1 w-1 bg-gray-400 rounded-full p-1' />
                    </div>

                    <div>
                        <h4>{departureTime}</h4>
                        <p>{destination}</p>
                    </div>


                </div>
                <div>
                    {/* Price div */}
                    <p className='text-2xl font-bold'><span className='line-through text-[1rem] font-normal'>₹{price + 150}</span> ₹{price}</p>
                    <button onClick={() => {
                        setSeatDataModal(seatData);
                        setFerryClassName(className)
                        setArrival(arrivalTime)
                        setDeparture(departureTime)
                        setPrice(price)
                        setIsModalOpen(true);
                        console.log(seatData)
                    }}
                        className='bg-[var(--primary)] mt-5 py-3 px-10 rounded-full cursor-pointer'>Book Now</button>
                </div>

            </div>

            <div className='flex gap-2 flex-wrap mt-3'>
                {amenties.map((item, i) => (
                    <p className='bg-gray-200 px-2 py-1 rounded-full' key={i}><span>{item.icon}</span> {item.label}</p>
                ))}
            </div>

            <LuxuryRoyalSeatSelectionModal
                isOpen={isModalOpen}
                price={Price}
                onClose={() => setIsModalOpen(false)}
                onConfirm={onSeatConfirm}
                seatData={seatDataModal}
                arrivalTime={arrival}
                departureTime={departure}
                className={ferryclassName}
                shipID={id}
                tripId={tripId}
                vesselID={vesselID}
            />
        </div>
    );
}