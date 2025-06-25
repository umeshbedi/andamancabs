"use client"

import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function CruizeCard({ name, image }) {
    return (

        <Link href={"/online-ferry-booking"}
            className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <Image
                    fill
                    src={image}
                    alt={name}
                    className='object-cover rounded-lg'
                />
                <p className='absolute text-[1rem] left-2 bottom-2 bg-[rgba(0,0,0,.5)] text-white py-1 px-3 rounded-full'>{name}</p>


            </div>


        </Link>
    )
}
