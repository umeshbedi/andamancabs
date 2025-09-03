import React from 'react'
import dynamic from 'next/dynamic'

import { Skeleton } from 'antd';
import MyDiv from '@/components/ui/MyDiv';


const SingleCab = dynamic(() => import('./SingleCab'), {
  ssr: true, loading: () => <Skeleton.Button active={true} block style={{ width: '100%', height: '200px', marginBottom: '16px' }} />
});

const MyTitle = dynamic(() => import('@/components/ui/MyTitle'))

export default function CabPage({ cabpage, cabData = [] }) {
  return (
    <MyDiv image={cabpage.headerImage} title={cabpage.title} styles={{ marginTop: "3rem" }}>
      <MyTitle className={"text-center text-2xl"} heading="Enjoy Hassle Free Ride Service" subheading="Choose the best service for your travel" />

      <div className='w-full mt-10'>
        {cabData.map((item, index) => (
          <SingleCab 
          key={index} 
          thumbnail={item.thumbnail} 
          title={item.title} 
          price={item.price} 
          distance={item.distance || 0} 
          star={item.star}
          type={item.type}
          description={item.description}
          />
        ))}
        {/* <SingleCab thumbnail={"/uploads/header-bg/86851.jpg"} title={"This is the best car"} price={500} distance={20} /> */}
      </div>
    </MyDiv>
  )
}
