import React from 'react'
import BookingPage from './components/BookingPage'
import GlobalFerryContext from './components/GlobalFerryContext'
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'));

const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function OnlineBooking() {
  return (
    <GlobalFerryContext>
      <Navbar />
      <BookingPage />
      <Footer />
    </GlobalFerryContext>
  )
}
