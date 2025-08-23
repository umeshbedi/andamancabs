import { Select } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import countryCode from "@/components/lib/countryCodes.json"
import idType from "@/components/lib/idTypes.json"


export default function ReviewCheckout({ adult = 3, infant = 4 }) {

  const [adultData, setAdultData] = useState([])
  const [infantData, setInfantData] = useState([])

  const [billingData, setBillingData] = useState({
    name: null,
    email: null,
    countryCode: "+91",
    phone: null,
    idType: "aadhaar",
    idNumber: null
  })

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


    return (
      <div className='border border-gray-300 p-3 rounded-2xl mb-5'>
        <h3 style={{ fontSize: "1rem", fontStyle: 'italic' }}>{isadult ? "#Adult" : "#Infant"} {number + 1}</h3>
        <div className='flex flex-col sm:flex-row gap-3 mt-1.5'>

          <Input size='large'
            defaultValue={isadult ? adultData[number].name : infantData[number].name}
            required placeholder='Enter Full Name' onBlur={handleNameBlur}
          />
          <Input size='large'
            defaultValue={isadult ? adultData[number].age : infantData[number].age}
            required type='number' placeholder='Enter Age'
            onBlur={handleAgeBlur}
          />
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

    Array(adult).fill(0).map((_, i) => (
      adults.push({ name: null, age: null, gender: null })
    ))

    Array(infant).fill(0).map((_, i) => (
      infants.push({ name: null, age: null, gender: null })
    ))

    setAdultData(adults)
    setInfantData(infants)
  }, [adult, infant])

  console.log(adultData, infantData)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 my-10'>
      <div className='flex flex-col gap-3 sm:w-[60%] w-full rounded-lg'>
        
        <div>
          <h2 className='mb-3'>Add Contact Details</h2>
          <BillingContact />
        </div>

        <div >
          <h2 className='mb-3'>Add {(adult+infant)>1?"Travellers":"Traveller"} Details</h2>
          {adultData.length > 0 && Array(adult).fill(0).map((_, i) => (
            <AdultInfant isadult key={i} number={i} />
          ))}
          {infantData.length > 0 && Array(infant).fill(0).map((_, i) => (
            <AdultInfant key={i} number={i} />
          ))}
        </div>

          
      </div>

      <div className='sm:w-[40%] w-full bg-gray-50 p-5 rounded-lg relative'>
          <div className='sticky top-20'>
            <h2 className='mb-5'>Fare Summary</h2>
            
            <div className='flex justify-between items-center mb-3'>
              <p>Adult x {adult}</p>
              <p>₹ 500</p>
            </div>
            <div className='flex justify-between items-center mb-3'>
              <p>Infant x {infant}</p>
              <p>₹ 200</p>
            </div>
            <div className='border-t border-gray-300 mt-3 mb-3'></div>
            <div className='flex justify-between items-center font-bold text-lg'>
              <p>Total Fare</p>
              <p>₹ {adult*500 + infant*200}</p>
            </div>
            <button className='w-full bg-[var(--primary)] cursor-pointer py-3 rounded-lg mt-5 font-semibold'>
              Proceed to Payment
            </button>
          </div>
      </div>


    </div>
  )
}
