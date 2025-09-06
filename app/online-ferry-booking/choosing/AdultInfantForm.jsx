import { Select } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import nationality from "@/components/lib/nationality.json"

import { useGlobalFerryContext } from '../components/GlobalFerryContext'

export default function AdultInfantForm({ number, isadult = false }) {

    const { tripData, adultData, setAdultData, infantData, setInfantData, billingData, setBillingData } = useGlobalFerryContext();

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