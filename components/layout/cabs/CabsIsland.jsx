"use client"

import React from 'react'

import dynamic from 'next/dynamic'

const CabCard = dynamic(() => import('@/components/layout/cabs/CabCard'))
const Line = dynamic(() => import('@/components/ui/Line'))

export default function CabsIsland({heading, subheading}) {
    return (
        <div>
            <div className='mt-15 w-full'>
                <Line />
                <h2>{heading}</h2>
                <p>{subheading}</p>
            </div>

            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {Array(3).fill(0).map((_, index) => (
                    <CabCard key={index} />
                ))}

            </div>

        </div>
    )
}
