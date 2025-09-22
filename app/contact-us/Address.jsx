import React from 'react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Address({ Address, Locate, Phone, Email }) {
    return (
        <div className="bg-black p-8 flex flex-col gap-6 w-full sm:w-1/2 rounded-xl">
            <div className="flex flex-col items-center text-white gap-2.5">
                <h2 className="text-[var(--primary)] flex items-center gap-2 text-lg font-semibold">
                    <FiMapPin className="text-2xl" /> Address
                </h2>
                <p className="text-center leading-snug">{Address}</p>
                <hr className="w-4/5 border-gray-600" />
            </div>
            <div className="flex flex-col items-center text-white gap-2.5">
                <h2 className="text-[var(--primary)] flex items-center gap-2 text-lg font-semibold">
                    <FiMail className="text-2xl" /> Email
                </h2>
                <p className="text-center leading-snug">{Email || ""}</p>
                <hr className="w-4/5 border-gray-600" />
            </div>
            <div className="flex flex-col items-center text-white gap-2.5">
                <h2 className="text-[var(--primary)] flex items-center gap-2 text-lg font-semibold">
                    <FiPhone className="text-2xl" /> Phone/WA:
                </h2>
                <p className="text-center leading-snug">{Phone}</p>
            </div>
            <div>
                {/* <Location location={Locate} /> */}
            </div>
        </div>
    )
}