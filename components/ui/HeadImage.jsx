"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function HeadImage({image="/uploads/header-bg/86851.jpg", title}) {
    
    const [scale, setScale] = useState(1.5)

    useEffect(()=>{
        
    },[])
    
    return (
        <div className='w-full h-[550px] relative overflow-hidden mt-10'>
            <Image
                src={image}
                fill
                loading='lazy'
                style={{ objectFit: 'cover', transform:`scale(${scale})`, transition:'transform 10s ease' }}
                placeholder='blur'
                blurDataURL={image + '?blur'}
                onLoad={()=>setScale(1)}
                alt={title}
            />
            <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <h1 style={{ color: 'white',textShadow:"2px 2px 4px #000000", textAlign:'center' }}>{title}</h1>
            </div>
            <div className='absolute sm:-bottom-5 bottom-0 left-0 w-full z-10'>
                <img src="/img/bottom-svg.svg" alt="footer curve" loading='lazy' />
            </div>
        </div>
    )
}
