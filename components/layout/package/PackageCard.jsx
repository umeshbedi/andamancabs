"use client"
import { commaPrice } from '@/components/utils/actions/commaPrice'
import { HeartFilled } from '@ant-design/icons'
import { Rate } from 'antd'
import { Divider } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { IoLocationOutline } from "react-icons/io5";
import { RxLapTimer } from "react-icons/rx";

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function PackageCard({ data }) {

    function Include({ icon, name }) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={icon} alt={name} width={30} height={30} />
                <p className='text-[.7rem] line-clamp-1'>{name}</p>
            </div>
        )
    }

    return (

        <Link href={data.slug || "#"} about='_blank'
            className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <Image
                    src={data.thumbnail || "/img/logos/logo-header.png"}
                    alt={data.name || "Test"}
                    fill
                    className='object-cover rounded-lg '
                />

                <HeartFilled className='absolute text-[0.8rem] right-2 top-3 bg-white p-2 rounded-full' style={{ color: 'red' }} />

                {/* <Rate defaultValue={stars} disabled allowHalf className='absolute bottom-15 left-2' /> */}
                <div className='flex gap-1 items-center absolute bottom-3 right-2 bg-[rgba(255,255,255,.8)] py-1 px-3 rounded-full text-[0.8rem]'>
                    <RxLapTimer color='black' />
                    <p className='text-black'>{data.title || "3 hr"}</p>
                </div>
            </div>

            <div className='px-3'>
                <div className='py-2 mt-2'>
                    <h4 className='font-bold text-black line-clamp-1'>{data.name || "Test"}</h4>
                    <p className='text-sm line-clamp-1 text-black'>{data.subtitle || ""}</p>
                </div>

                <Divider style={{ margin: 10 }} />

                <div className='flex gap-2.5'>
                    {data.includeIcon.slice(0, 4).map((item, i) => (
                        <Include key={i} icon={item.icon} name={item.name} />
                    ))}
                </div>

                <Divider style={{ margin: 10 }} />

                <p className='text-[.8rem] mt-2 -mb-3 text-black'>Starting From</p>
                <div className='flex justify-between items-center py-2 mt-1'>
                    <p className='font-bold text-[1.2rem] text-black'><span className='line-through font-normal text-[.8rem] text-gray-400'>₹{((data.price || 0) * 1.3).toFixed(0)}</span> ₹{commaPrice(data.price || 0)}</p>
                    <p className='py-1 px-3 rounded-full text-white bg-[black] text-[.8rem]'>30% OFF</p>
                </div>

                {/* <p className='text-[.9rem] mb-3 mt-2 text-neutral-600 line-clamp-2'>{data.metaDescription || "test description"}</p> */}

                <div className='flex w-full justify-between items-center rounded-full px-3 py-2 mt-2 mb-2 bg-[var(--primary)]'>
                    <p className='font-bold text-[black]'>View Package</p>
                    <FaArrowRight className='bg-white rounded-full p-2 text-3xl' />

                </div>
            </div>

        </Link>
    )
}
