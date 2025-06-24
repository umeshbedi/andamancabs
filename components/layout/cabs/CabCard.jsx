"use client"

import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function CabCard() {
    return (

        <Link href={"#"}
        className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <p className='absolute text-[.7rem] bg-[red] text-white py-1 px-3 rounded-full top-3 left-2'>EXCLUSIVE</p>

                <p className='absolute text-[1.2rem] bg-[rgba(0,0,0,.5)] text-white py-1 px-3 rounded-full top-12 left-2 font-bold'><span className='text-[.8rem] line-through'>₹ 450</span> ₹ 500</p>

                <img
                    src='/uploads/vehicle-photos/3060.jpeg'
                    alt='Cab Image'
                    
                    className='object-cover rounded-lg'
                />
            </div>

            <div>
                <div className='flex justify-between items-center px-3 py-2 mt-2'>
                    <h4 className='font-bold'>Swift Dzire</h4>
                    <Rate defaultValue={3} disabled allowHalf />

                </div>
                <p className='px-3 text-[.9rem] mb-2 text-neutral-600'>{`Jetty Pickup to Hotel within City Jetty Pickup to Hotel within City Jetty Pickup to Hotel within City`.slice(0, 80)}...</p>
                
                <div className='flex justify-between items-center px-3 py-2 mt-2 mb-2'>
                    <p className='font-bold text-neutral-600'>PER CAB</p>
                    <h4 className='font-semibold text-[red]'>BOOK NOW</h4>
                    
                </div>
            </div>
        </Link>
    )
}
