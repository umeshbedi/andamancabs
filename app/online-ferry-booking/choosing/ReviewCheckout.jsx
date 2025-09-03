import { Select } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import countryCode from "@/components/lib/countryCodes.json"
import nationality from "@/components/lib/nationality.json"
import idType from "@/components/lib/idTypes.json"
import { useGlobalFerryContext } from '../components/GlobalFerryContext'
import FerrySummary from './FerrySummary'

export default function ReviewCheckout() {

  const { tripData, adultData, setAdultData, infantData, setInfantData, billingData, setBillingData } = useGlobalFerryContext();


  // const adult = 2
  // const infant = 2

  function AdultInfant({ number, isadult = false }) {
    function handleNameBlur(e) {
      const value = e.target.value;
      // console.log(number, value, isadult)
      if (isadult) {
        setAdultData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], name: value };
          return newData;
        });
      } else {
        setInfantData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], name: value };
          return newData;
        });
      }
    }

    function handleAgeBlur(e) {
      const value = e.target.value;
      // console.log(number, value, isadult)
      if (isadult) {
        setAdultData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], age: value };
          return newData;
        });
      } else {
        setInfantData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], age: value };
          return newData;
        });
      }

    }

    function handleGenderChange(value) {
      // console.log(number, value, isadult)
      if (isadult) {
        setAdultData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], gender: value };
          return newData;
        });
      } else {
        setInfantData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], gender: value };
          return newData;
        });
      }
    }

    function handleNationalityChange(value) {
      // console.log(number, value, isadult)
      if (isadult) {
        setAdultData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], nationality: value };
          return newData;
        });
      } else {
        setInfantData(prev => {
          const newData = [...prev];
          newData[number] = { ...newData[number], nationality: value };
          return newData;
        });
      }
    }


    return (
      <div className='border border-gray-300 p-3 rounded-2xl mb-5'>
        <h3 style={{ fontSize: "1rem", fontStyle: 'italic' }}>{isadult ? "#Adult" : "#Infant"} {number + 1}</h3>
        <div className='flex flex-col gap-3 mt-1.5'>

          <div className='flex flex-col sm:flex-row gap-3'>
            <Input size='large'
              defaultValue={isadult ? adultData[number].name : infantData[number].name}
              required placeholder='Enter Full Name' onBlur={handleNameBlur}
            />
            <Input size='large'
              defaultValue={isadult ? adultData[number].age : infantData[number].age}
              required type='number' placeholder='Enter Age'
              onBlur={handleAgeBlur}
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <Select
              size='large'
              placeholder="Select Gender"
              style={{ width: '100%' }}
              defaultValue={isadult ? adultData[number].gender : infantData[number].gender}
              onChange={handleGenderChange}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
            />
            <Select
              size='large'
              showSearch
              placeholder="Select Country"
              style={{ width: '100%' }}
              defaultValue={"Indian"}
              onChange={handleNationalityChange}
              options={nationality}
            />

          </div>
        </div>
      </div>
    )
  }

  function BillingContact() {
    return (
      <div className='border border-gray-300 p-3 rounded-2xl mb-5'>
        <div className='flex flex-col gap-3 mt-1.5'>
          <Input size='large'
            defaultValue={billingData.name}
            required placeholder='Enter Billing Name'
            onBlur={(e) => setBillingData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input size='large'
            defaultValue={billingData.email}
            type='email'
            required placeholder='Enter Email Address'
            onBlur={(e) => setBillingData(prev => ({ ...prev, email: e.target.value }))}
          />
          <div className='flex w-full gap-1'>
            <Select
              size='large'
              showSearch
              placeholder="Code"
              style={{ width: '30%' }}
              defaultValue={billingData.countryCode}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => setBillingData(prev => ({ ...prev, countryCode: value }))}
              options={countryCode}
            />
            <Input size='large'
              defaultValue={billingData.phone}
              required type='number' placeholder='Enter Phone Number'
              onBlur={(e) => setBillingData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className='flex w-full gap-1'>
            <Select
              size='large'
              placeholder="ID Type"
              style={{ width: '30%' }}
              defaultValue={billingData.idType}
              onChange={(value) => setBillingData(prev => ({ ...prev, idType: value }))}
              options={idType}
            />
            <Input size='large'
              defaultValue={billingData.idNumber}
              required type='number' placeholder='Enter ID Number'
              onBlur={(e) => setBillingData(prev => ({ ...prev, idNumber: e.target.value }))}
            />
          </div>


        </div>
      </div>
    )
  }



  useEffect(() => {
    let adults = []
    let infants = []
    setAdultData([])
    setInfantData([])

    Array(tripData.trip0.adults).fill(0).map((_, i) => (
      adults.push({ name: '', age: '', gender: '', nationality: "Indian" })
    ))

    Array(tripData.trip0.infants).fill(0).map((_, i) => (
      infants.push({ name: '', age: '', gender: '', nationality: "Indian" })
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
            <AdultInfant isadult key={i} number={i} />
          ))}
          {infantData.length > 0 && infantData.map((_, i) => (
            <AdultInfant key={i} number={i} />
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
