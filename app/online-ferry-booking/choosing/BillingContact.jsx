import { Select } from 'antd'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import countryCode from "@/components/lib/countryCodes.json"
import idType from "@/components/lib/idTypes.json"
import { useGlobalFerryContext } from '../components/GlobalFerryContext'

export default function BillingContact() {
    
    const { billingData, setBillingData } = useGlobalFerryContext();

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