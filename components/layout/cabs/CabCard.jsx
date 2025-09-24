"use client"

import { commaPrice } from '@/components/utils/actions/commaPrice'
import { Modal } from 'antd'
import { Rate } from 'antd'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CabForm from '../contactForms/CabForm'
import Description from '@/app/cabs/[cabsIsland]/Description'

const MyButton = dynamic(() => import('@/components/ui/MyButton'))

export default function CabCard({ type, star, label = '', title, distance, price, description, thumbnail }) {
    const [isOpenViewFull, setIsOpenViewFull] = useState(false)

    const [open, setOpen] = useState(false)

    function Card({ isclamp = true }) {
        return (
            <>
                <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className='object-cover rounded-lg'
                    />
                    <p className='absolute text-[.7rem] bg-[red] text-white py-1 px-3 rounded-full top-3 left-2'>{label.toUpperCase()}</p>

                    <p className='absolute text-[1.2rem] bg-[rgba(0,0,0,.5)] text-white py-1 px-3 rounded-full top-12 left-2 font-bold'><span className='text-[.8rem] line-through'>₹ {((price||0)*1.12).toFixed(0)}</span> ₹ {commaPrice(price||0)}</p>


                </div>

                <div>
                    <div className='px-3 py-2 mt-2'>
                        <Rate defaultValue={star} disabled allowHalf />
                        <h4 className={`font-bold ${isclamp ? 'line-clamp-1' : ''}`}>{title}</h4>

                    </div>

                    <Description className={`px-3 text-[.9rem] mb-2 text-neutral-600 ${isclamp ? 'line-clamp-2' : ''}`} text={description}/>
                    {/* <p className={`px-3 text-[.9rem] mb-2 text-neutral-600 ${isclamp ? 'line-clamp-2' : ''}`}>{description}</p> */}

                    <div className='flex justify-between items-center px-3 py-2 mt-2 mb-2'>
                        {isclamp &&
                            <button onClick={() => setIsOpenViewFull(true)} className='font-bold text-neutral-600 cursor-pointer'>View Full</button>
                        }

                        <button 
                        onClick={()=>{
                            setIsOpenViewFull(false)
                            setOpen(true)
                        }}
                        className='font-semibold text-[red] cursor-pointer'>BOOK NOW</button>

                    </div>
                </div>
            </>
        )
    }

    return (

        <div>
            <div className='w-xs rounded-2xl shadow-lg bg-white hover:shadow-2xl overflow-hidden hover:-translate-y-1.5 transition-all ease-in-out duration-500 '>
                <Card />
            </div>

            {/* Modal For All matter */}
            <Modal
                open={isOpenViewFull}
                onCancel={() => setIsOpenViewFull(false)}
                footer={null}
                destroyOnHidden
            >
                <Card isclamp={false} />
            </Modal>

            {/* Modal For Contact Form   */}
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[]}
                destroyOnHidden
                width={"80%"}
                style={{ top: 50 }}
            >
                <CabForm
                    packageDetails={{ packageTitle: title }}
                    price={price}
                    closeForm={() => setOpen(false)}
                />
            </Modal>
        </div>
    )
}
