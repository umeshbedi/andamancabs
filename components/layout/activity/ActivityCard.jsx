"use client"

import { HeartFilled } from '@ant-design/icons'
import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoLocationOutline } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function ActivityCard({ name, image, price = 6500 }) {
    return (

        <Link href={"/activities/activity-name"}
            className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className='object-cover rounded-lg '
                />

                <p className='absolute text-[0.9rem] left-2 top-3 bg-[rgba(0,0,0,.5)] text-white py-1 px-3 rounded-full'>Certified</p>
                <HeartFilled className='absolute text-[0.8rem] right-2 top-3 bg-white p-2 rounded-full' style={{ color: 'red' }} />


            </div>

            <div className='px-3'>
                <div className='flex justify-between items-center px-3 py-2 mt-2'>
                    <h4 className='font-bold'>Swift Dzire</h4>
                    <Rate defaultValue={3} disabled allowHalf />

                </div>
                <div className='flex justify-between items-center py-2 mt-1'>
                    <div className='flex gap-1 items-center'>
                        <IoLocationOutline />
                        <p>Port Blair</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <RxLapTimer />
                        <p>3 hrs</p>
                    </div>
                </div>

                <div className='flex justify-between items-center py-2 mt-1'>
                    <p className='font-bold text-[1.2rem]'><span className='line-through font-normal text-[.8rem] text-gray-400'>₹{(price * 1.2).toFixed(0)}</span> ₹{price}</p>
                    <p className='py-1 px-3 rounded-full text-white bg-[black] text-[.8rem]'>20% OFF</p>
                </div>

                <p className='text-[.9rem] mb-3 mt-2 text-neutral-600'>{`Something description for this activity. Something description for this activity.Something description for this activity.`.slice(0, 80)}...</p>

                <div className='flex w-full justify-between items-center rounded-full px-3 py-2 mt-2 mb-2 bg-[var(--primary)]'>
                    <p className='font-bold text-[black]'>BOOK NOW</p>
                    <FaArrowRight className='bg-white rounded-full p-2 text-3xl' />

                </div>
            </div>

        </Link>
    )
}
