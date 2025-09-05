"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./SeatSelectionModal.module.css";

import seatGreen from "@/public/seat-green.webp";
import seatGrey from "@/public/seat-grey.webp";
import seatBlue from "@/public/seat-blue.webp";
import boatSvg from "@/public/Nautika-luxury-mobile.svg";
import { Modal } from "antd";
import PaymentBtn from "../payment/Payment";

import { useGlobalFerryContext } from "../components/GlobalFerryContext";

export default function LuxuryRoyalSeatSelectionModal({ isOpen, onClose, seatData, price, tripName, arrivalTime, departureTime, className, shipID, tripId, vesselID }) {
    const [selected, setSelected] = useState([]);
    const [zoom, setZoom] = useState(1);
    const { setTrip0Selected, setTrip1Selected, setTrip2Selected, tripData } = useGlobalFerryContext();

    const yMap = 15;
    const xMap = 35
    const seatPositions = useMemo(() => ({
        // Example layout (percent coordinates relative to boat SVG container)
        // These MUST match your seating-arrangements-Nautika.png layout
        //This is for Luxury Class Nautika Ferry
        //Top Middle Center
        "1E": { x: xMap, y: yMap }, "1F": { x: xMap + 4, y: yMap }, "1G": { x: xMap + 8, y: yMap }, "1H": { x: xMap + 12, y: yMap }, "1I": { x: xMap + 16, y: yMap },
        "2D": { x: xMap - 2.5, y: yMap + 2.5 }, "2E": { x: xMap + 2, y: yMap + 2.5 },


    }), []);

    const toggleSeat = (seatId) => {
        const seat = seatData[seatId];
        if (!seat || seat.isBooked) return;
        console.log(tripData.trip0.adults)
        if (selected.length < tripData.trip0.adults) {
            setSelected((prev) => [...prev, seatId]);
        } else {
            setSelected((prev) => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev])
        }
    };

    const selectedTripData = {
        ferry: "nautika",
        // class_id: classId,
        vesselID,
        tripId,
        shipID,
        className,
        timing: `${arrivalTime}-${departureTime}`,
        seats: selected,
        fare: price,
        no_of_passenger: tripData.trip0.adults + tripData.trip0.infants,
        travel_date: tripData.trip0.departure,
    }

    function onConfirm() {
        if (tripName === "trip 1") {
            setTrip0Selected(selectedTripData);
        } else if (tripName === "trip 2") {
            setTrip1Selected(selectedTripData);
        } else if (tripName === "trip 3") {
            setTrip2Selected(selectedTripData);
        }
        else { setTrip0Selected(selectedTripData); }

        window.scrollTo({ top: document.getElementById('booking-page').offsetTop, behavior: 'smooth' });
    }

    if (!isOpen) return null;

    return (
        <Modal open={true} onCancel={onClose} footer={null} >
            <div className="overflow-hidden relative">
                <div className='absolute z-50 top-2.5 left-2.5 flex flex-col gap-2'>
                    <button className="bg-white border w-[40px] px-2 rounded-full py-1 cursor-pointer" onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}>+</button>
                    <button className="bg-white border w-[40px] px-2 rounded-full py-1 cursor-pointer" onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}>-</button>
                </div>

                <div className="w-full relative pb-[180%]" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                    <Image src={boatSvg} alt="Boat layout" className="absolute inset-0 object-contain w-full h-full" />

                    {Object.keys(seatData).map((seatId) => {
                        const pos = seatPositions[seatId];
                        if (!pos) return null;
                        const seat = seatData[seatId];
                        const isSelected = selected.includes(seatId);
                        const imgSrc = seat.isBooked ? seatGrey : isSelected ? seatBlue : seatGreen;

                        return (
                            <Image
                                key={seatId}
                                src={imgSrc}
                                alt={seatId}
                                className="absolute cursor-pointer w-[16px] h-auto rotate-90"
                                style={{ top: `${pos.y}%`, left: `${pos.x}%`, transform: 'translate(-50%, -50%)' }}
                                onClick={() => toggleSeat(seatId)}
                            />
                        );
                    })}
                </div>

            </div>
            <div className='flex sm:flex-row flex-col mt-4 w-full justify-between items-center gap-4'>
                <div>
                    Selected:

                    {selected.length > 0
                        ?
                        (<div className="flex gap-0.5 flex-wrap">
                            {selected.map((item, i) => (
                                <span key={i} className="bg-gray-300 px-1.5 py-0.5">{item}</span>
                            ))}
                        </div>)
                        :
                        ("None")
                    }

                </div>
                {/* <PaymentBtn className={`${!selected.length ? 'bg-gray-400' : 'bg-[var(--primary)]'} mt-5 py-3 px-10 rounded-full cursor-pointer`}
                    paymentFor={"nautika"}
                    amount={price}
                    title={"Confirm Booking"}
                    disabled={!selected.length}
                    clickEvent={() => onConfirm(selected)}
                /> */}
                <button
                    disabled={selected.length < tripData.trip0.adults}
                    onClick={onConfirm}
                    className={`${selected.length < tripData.trip0.adults ? "bg-gray-300" : "bg-[var(--primary)]"} py-3 px-10 rounded-full cursor-pointer`}
                >
                    Confirm Booking
                </button>

            </div>
        </Modal>
    );
}
