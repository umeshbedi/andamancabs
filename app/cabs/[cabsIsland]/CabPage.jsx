"use client"
import React from 'react'
import dynamic from 'next/dynamic'

import { Skeleton } from 'antd';
import MyDiv from '@/components/ui/MyDiv';


const SingleCab = dynamic(() => import('./SingleCab'), {
  ssr: false, loading: () => <Skeleton.Button active={true} size='large' style={{ width: '100%' }} />
});

const MyTitle = dynamic(() => import('@/components/ui/MyTitle'))

export default function CabPage() {
  return (
    <MyDiv title={"Cabs in Port Blair"}>
      <MyTitle heading="Enjoy Hassle Free Ride Service" subheading="Choose the best service for your travel" />

      <div className='w-full mt-10'>
        {Array(5).fill().map((_, index) => (
          <SingleCab key={index} thumbnail={"/uploads/header-bg/86851.jpg"} title={"This is the best car"} price={500} distance={20} />
        ))}
        {/* <SingleCab thumbnail={"/uploads/header-bg/86851.jpg"} title={"This is the best car"} price={500} distance={20} /> */}
      </div>
    </MyDiv>
  )
}
