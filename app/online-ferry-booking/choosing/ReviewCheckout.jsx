import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useGlobalFerryContext } from '../components/GlobalFerryContext'
import FerrySummary from './FerrySummary'
import AdultInfantForm from './AdultInfantForm'
import BillingContact from './BillingContact'

export default function ReviewCheckout() {

  const { tripData, adultData, setAdultData, infantData, setInfantData } = useGlobalFerryContext();
  
  useEffect(() => {
    let adults = []
    let infants = []
    setAdultData([])
    setInfantData([])

    Array(tripData.trip0.adults).fill(0).map((_, i) => (
      adults.push({ name: '', age: '', gender: 'male', nationality: "Indian" })
    ))

    Array(tripData.trip0.infants).fill(0).map((_, i) => (
      infants.push({ name: '', age: '', gender: 'male', nationality: "Indian" })
    ))

    setAdultData(adults)
    setInfantData(infants)
  }, [tripData.trip0.adults, tripData.trip0.infants])

  // console.log("Review", adultData, infantData)

  function CancelText({ text }) {
    return <span className='flex gap-2 mb-2'><IoMdCheckmarkCircleOutline className='mt-.5' size={20} color='green' />{text}</span>
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 my-10'>
      <div className='flex flex-col gap-3 sm:w-[60%] w-full rounded-lg'>

        <div >
          <h2 className='mb-3'>Add {(tripData.trip0.adults + tripData.trip0.infants) > 1 ? "Travellers" : "Traveller"} Details</h2>
          {adultData.length > 0 && adultData.map((_, i) => (
            <AdultInfantForm isadult key={i} number={i} />
          ))}
          {infantData.length > 0 && infantData.map((_, i) => (
            <AdultInfantForm key={i} number={i} />
          ))}
        </div>

        <div>
          <h2 className='mb-3'>Add Contact Details</h2>
          <BillingContact />
        </div>

        <div>
          <h2 className='mb-3'>Cancellation Charge</h2>
          <CancelText text={"Cancellation 48 hours or more before ferry departure: Rs 250 per ticket."} />
          <CancelText text={"Cancellation between 24 and 48 hours before departure: 50% of the ticket price."} />
          <CancelText text={"Cancellation within 24 hours of departure: 100% of the ticket price."} />

        </div>




      </div>

      <div className='sm:w-[40%] w-full  relative'>
        <h2 className='mb-5'>Fare Summary</h2>
        <div className='sticky top-20 bg-gray-50 p-5 rounded-lg'>
          <FerrySummary />
        </div>
      </div>


    </div>
  )
}
