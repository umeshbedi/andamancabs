"use client"
import SHome from '@/components/skeleton/SHome'
import MyDiv from '@/components/ui/MyDiv'
import MyTitle from '@/components/ui/MyTitle'

import dynamic from 'next/dynamic'
import React from 'react'
const String2Html = dynamic(() => import('@/components/ui/String2Html'), { ssr: false, loading:()=> <SHome /> })

export default function OtherPage({data}) {
    return (
        <MyDiv title={data.title} image={data.headerImage}>
            <div className='mt-15 w-full px-[5%]'>
            <div className='w-full flex flex-col items-center'><MyTitle heading={data.title} subheading={data.metaDescription}/></div>
            <String2Html id={"others"} string={data.about}/>
            </div>
        </MyDiv>
    )
}
