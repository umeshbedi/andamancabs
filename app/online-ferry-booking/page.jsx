import React from 'react'
import BookingPage from './BookingPage'
import GlobalFerryContext from './GlobalFerryContext'

export default function OnlineBooking() {
  return (
    <GlobalFerryContext>
       <BookingPage />
    </GlobalFerryContext>
  )
}
