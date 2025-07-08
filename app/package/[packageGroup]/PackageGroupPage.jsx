"use client"
import MyDiv from '@/components/ui/MyDiv'
import MyTitle from '@/components/ui/MyTitle'
import React from 'react'

import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'
const PackageCard = dynamic(() => import('./PackageCard'), {ssr: false, loading:()=><Skeleton.Button className='w-xs h-96' active/>})

export default function PackageGroupPage({ data }) {
  return (
    <MyDiv>
      <div className='w-full mt-20 flex flex-col items-center'>
          <MyTitle heading={`The Best Curated ${data.name} Packages`} subheading=""/>
          <p className='text-center'>{`Discover paradise with Andamancabs! Our exceptional Andaman Holiday Packages offer an unforgettable journey through the pristine islands of the Andaman archipelago. When you choose Mohi Holidays Leisures, you're choosing the very best in Andaman travel experiences. Our meticulously crafted packages provide comprehensive coverage of all that the Andaman Islands have to offer.`}</p>
          <div className='flex flex-wrap justify-center gap-10 mt-15'>
                {Array(3).fill(0).map((_, index) => (
                    <PackageCard key={index} />
                ))}

            </div>
      </div>
    </MyDiv>
  )
}
