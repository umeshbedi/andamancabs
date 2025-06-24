"use client"

import { HeartFilled } from '@ant-design/icons'
import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function ActivityCard({ name, image }) {
    return (

        <Link href={"/online-ferry-booking"}
            className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>

                <p className='absolute text-[0.8rem] left-2 top-3 bg-[rgba(0,0,0,.5)] text-white py-1 px-3 rounded-full'>start at <span className='text-[1.2rem] font-bold'>  ₹ 3200</span></p>
                <HeartFilled className='absolute text-[0.8rem] right-2 top-3 bg-white p-2 rounded-full' style={{color:'red'}}/>
                <div className='absolute text-[1rem] w-full bottom-0 bg-gradient-to-t from-[rgba(0,0,0,.7)] to-transparent text-white py-2 px-4'>
                    <p className='font-bold'>{name}<span className='ml-3'><Rate disabled defaultValue={4}/></span></p>
                    <p className='text-[.9rem] mb-2'>Something description for this activity.</p>
                    <Link href={"/activities/sample-activity"}
                        className='text-[.9rem] font-semibold bg-[var(--primary)] text-black hover:bg-[red] hover:text-white px-3 transition-all ease-in-out duration-500 py-1 rounded-full'>Book Now</Link>   
                </div>
                <img
                    src={image}
                    alt={name}
                    className='object-cover rounded-lg'
                />
            </div>

        </Link>
    )
}
