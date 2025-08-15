"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./SeatSelectionModal.module.css";

import seatGreen from "@/public/seat-green.webp";
import seatGrey from "@/public/seat-grey.webp";
import seatBlue from "@/public/seat-blue.webp";
import boatSvg from "@/public/Nautika-luxury-mobile.svg";
import { Modal } from "antd";

export default function LuxurySeatSelectionModal({ isOpen, onClose, seatData, onConfirm }) {
    const [selected, setSelected] = useState([]);
    const [zoom, setZoom] = useState(1);

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
        setSelected((prev) =>
            prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
        );
    };

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
            <div className={styles.footer}>
                <span>Selected: {selected.join(", ") || "None"}</span>
                <button
                    disabled={!selected.length}
                    onClick={() => onConfirm(selected)}
                >
                    Confirm Booking
                </button>
                <button onClick={() => onConfirm(selected)} className='bg-[var(--primary)] py-3 px-10 rounded-full cursor-pointer'>Search</button>
            </div>
        </Modal>
    );
}
