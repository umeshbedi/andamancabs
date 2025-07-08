"use client"

import { Divider } from 'antd'
import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function PackageCard() {
    const price = 5000;

    function Include({ icon, name }) {
        return (
            <div className='mr-4 mb-2' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={icon} alt={name} width={40} height={40} />
                <p className='text-[.8rem]'>{name}</p>
            </div>
        )
    }

    return (

        <Link href={"#"}
            className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <Image
                    src='/uploads/vehicle-photos/3060.jpeg'
                    alt='Cab Image'
                    fill
                    className='object-cover rounded-lg'
                />

            </div>

            <div className='px-4 pt-4'>
                <h4 className='font-bold'>Enjoy Holidays in Andaman</h4>
                <p>3N Port Blair | 2N Havelock island</p>

                {/* include icons */}
                <Divider style={{ margin: 8 }} />

                <div className='flex flex-wrap'>
                    {Array(5).fill(0).map((_, index) => (
                        <Include key={index} icon='/icons/BEST SELLER.png' name={`Icon ${index + 1}`} />
                    ))}
                </div>


                <p className='font-bold text-[1.2rem]'>
                    <span className='font-normal text-[.9rem] mr-2'>Starting from</span>
                    <span className='line-through font-normal text-[.8rem] text-gray-400 mr-2'>₹{(price * 1.2).toFixed(0)}</span> 
                    ₹{price}</p>


                <div className='flex w-full justify-between items-center rounded-full px-3 py-2 mt-2 mb-2 bg-[var(--primary)]'>
                    <p className='font-bold text-[black]'>View Package</p>
                    <FaArrowRight className='bg-white rounded-full p-2 text-3xl' />

                </div>
            </div>
        </Link>
    )
}
