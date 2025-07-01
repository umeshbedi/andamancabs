"use client"

import React from 'react'

import dynamic from 'next/dynamic'
import MySubTitle from '@/components/ui/MySubTitle'

const CabCard = dynamic(() => import('@/components/layout/cabs/CabCard'))
const Line = dynamic(() => import('@/components/ui/Line'))

export default function CabsIsland({heading, subheading}) {
    return (
        <div>
            <MySubTitle heading={heading} subheading={subheading} />
            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {Array(3).fill(0).map((_, index) => (
                    <CabCard key={index} />
                ))}

            </div>

        </div>
    )
}
