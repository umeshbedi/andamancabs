"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import StepsBooking from '../choosing/StepsBooking';




const BookingHeader = dynamic(() => import('./BookingHeader'), {
    ssr: false,
    loading: () => <SHome />
})

export default function BookingPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <SHome />
            </div>
        );
    }

    return (
        <>
            <BookingHeader getTripData={(e) => {
                window.scrollTo({ top: document.getElementById('booking-page').offsetTop, behavior: 'smooth' });
            }} />

            <br /><br />
            <div className='w-full mt-10 h-full flex flex-col items-center'>
                <div className='w-[80%]'>
                    <div className="w-full flex flex-col items-center justify-center py-20 border-2 rounded-2xl border-amber-400">
                        <h2 className="text-3xl font-bold mb-4 text-gray-700">Coming Soon</h2>
                        <p className="text-lg text-gray-500 mb-6">Online booking API integration is in progress. Stay tuned!</p>
                        
                    </div>
                    {/* <StepsBooking /> */}
                </div>
            </div>
            
            <a target="_blank" href="/online-ferry-booking"><img src="/img/ferry logo/Final Cruise Image .webp" loading="lazy" alt="cruize banner" className="w-full mt-15"/></a>

        </>
    )
}
