"use client"
import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import SHeader from '@/components/skeleton/SHeader';
import StepsBooking from './choosing/StepsBooking';
import PaymentBtn from './payment/Payment';
const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
    ssr: false, loading: () => <SHeader />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
    ssr: false, loading: () => <SHome />
});

const BookingHeader = dynamic(() => import('./BookingHeader'), {
    ssr: false,
    loading: () => <SHome />
})

export default function BookingPage() {
    const [loading, setLoading] = useState(true);

    const [tripData, setTripData] = useState(null)

    useEffect(() => {
        setLoading(false);
        setTripData(null)
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
            <Navbar />
            <BookingHeader getTripData={(e) => {
                console.log(e);
                setTripData(e);
                // Add logic to navigate or handle the event
                window.scrollTo({ top: document.getElementById('booking-page').offsetTop, behavior: 'smooth' });
            }} />
            
            <br /><br />
            <div className='w-full mt-10 h-full flex flex-col items-center'>
                <div className='w-[80%]'>
                <StepsBooking tripData={tripData}/>

                </div>

            </div>
            <Footer />
        </>
    )
}
