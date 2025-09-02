"use client"
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

const CabCard = dynamic(() => import('@/components/layout/cabs/CabCard'), 
{ssr:false, loading:()=><><Skeleton.Button style={{width:"320px", height:"350px"}}/></>})

export default function CabItem({data}) {
  return (
    <CabCard 
    title={data.title} 
    type={data.type} 
    description={data.description} 
    star={data.star}
    label={data.label}
    price={data.price}
    thumbnail={data.thumbnail}
    />
  )
}
