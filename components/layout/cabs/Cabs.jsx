"use client"

import React from 'react'


import dynamic from 'next/dynamic'
import MyButton from '@/components/ui/MyButton'

const CabsIsland = dynamic(() => import('@/components/layout/cabs/CabsIsland'))
const MyTitle = dynamic(() => import('@/components/ui/MyTitle'))

export default function Cabs() {
  const island = ["Port Blair", "Havelock Island", "Neil Island"]
  return (
    <main className=' mt-10'>
      <MyTitle heading='Our Cabs' subheading='Enjoy your ride in our top class fleet' />
      <div className='w-full'>
        {island.map((item, index) => (
          <div key={index}>
            <CabsIsland heading={`Cabs in ${item}`} subheading={"Top cruises that sail within the islands"} />
            <div className='flex justify-end'>
              <MyButton slug={"/cabs/cabs-in-port-blair"} name={"View More"}/>
            </div>
          </div>
        ))}

      </div>

    </main>
  )
}
