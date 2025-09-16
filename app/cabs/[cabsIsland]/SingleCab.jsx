"use client"
import Image from 'next/image'
import { FaMap, FaUser } from 'react-icons/fa'
import { CarFilled } from '@ant-design/icons'
import { boxShadow, mobile } from "@/components/utils/variables";
import { Button, Divider, Modal } from "antd";
import React, { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";
import CabForm from '@/components/layout/contactForms/CabForm';


export default function SingleCab({ thumbnail, title, price, distance, type, star, description }) {

    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(mobile())
            console.log(window.innerWidth)
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        
    }, []); // Empty dependency array = run once on mount


    function Icons({ icon = <></>, title = "" }) {
        return (
            <div className='text-gray-500 bg-white border rounded-full flex gap-2 items-center px-3'>
                {icon}
                <p className='text-sm sm:text-base'>{title}</p>
            </div>
        )
    }

    return (
        <div
            data-aos-anchor-placement="top-bottom"
            data-aos="fade-up"
            data-aos-duration="1000"
            style={{ backgroundColor: 'white', borderRadius: 30, boxShadow: boxShadow, margin: "30px 20px", paddingBottom: 10 }}>
            <div
                style={{
                    width: "100%",
                    display: isMobile ? "block" : 'flex',
                    gap: "3%",
                    padding: isMobile ? "20px 20px 0 20px" : "20px 0 0 20px"
                }}
            >
                <div style={{ width: isMobile ? "100%" : "15%", display: 'flex', justifyContent: 'center', marginBottom: isMobile ? "1.5rem" : null }}>
                    <div style={{ width: isMobile ? 200 : 150, position: 'relative', height: isMobile ? 200 : 150 }}>
                        <Image alt={title} src={thumbnail} fill style={{ objectFit: 'cover', borderRadius: 20 }} />
                    </div>

                </div>

                <div style={{ width: isMobile ? "100%" : "60%" }}>
                    <div className='flex flex-wrap gap-2.5 items-center mb-3'>
                        <span className='bg-purple-600 text-white rounded-full px-3 py-0.5'>{type} wheeler</span>
                        <span className='flex gap-1 items-center bg-amber-300 text-black rounded-full px-3 py-0.5'>Rating: <FaStar /> {star}</span>
                    </div>

                    <h2 style={{ fontWeight: 600, fontSize: "1.3rem", textAlign: isMobile ? "center" : null }}>{title}</h2>
                    <p>{description}</p>
                    <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', marginTop: "2rem" }}>
                        <div style={{ width: "90%", height: 1, background: '#98a6b3', position: 'absolute' }} />
                        <p style={{ position: 'absolute', alignSelf: 'center', background: 'white', border: "1px solid #98a6b3", borderRadius: 50, padding: "1px 15px", color: 'grey' }}>Distance: {distance} kms</p>
                    </div>
                </div>

                <div style={{ width: isMobile ? "100%" : "25%", flexDirection: 'column', display: "flex", justifyContent: 'space-between', borderLeft: isMobile ? null : "1px solid #e2e8ee", marginTop: isMobile ? "2.5rem" : null }}>
                    <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                        <h3>Price:</h3>
                        <h1 style={{ fontSize: '2rem' }}><span className='text-[1rem] line-through text-gray-500'>₹{(price*1.12).toFixed(0)}</span> ₹{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h1>
                    </div>
                    <div style={{ height: "3rem", width: '100%', background: "var(--primary)", marginTop: "1.5rem", display: 'flex', alignItems: "center", justifyContent: 'center', cursor: 'pointer', borderRadius: isMobile ? 50 : null }}
                        onClick={() => setOpen(true)}>
                        <p style={{ fontSize: "1.2rem", color: "black" }}>Book Now</p>
                    </div>


                </div>
            </div>

            <div style={{ width: isMobile ? "100%" : "75%", height: 1, background: '#e2e8ee', margin: "1rem 0" }} />

            <div style={{ display: "flex", gap: ".5rem", marginLeft: "1rem", flexWrap: 'wrap' }}>

                <Icons icon={<FaMap />} title='Pickup' />
                <Icons icon={<CarFilled />} title='Cab' />
                <Icons icon={<FaUser />} title='Travel Executive' />

            </div>



            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[]}
                destroyOnHidden
                width={"80%"}
                style={{ top: 50 }}
            >
                <CabForm 
                packageDetails={{packageTitle:title, distance:distance, wheeler:type}} 
                price={price} 
                closeForm={()=>setOpen(false)}
                />
            </Modal>

        </div>
    )
}