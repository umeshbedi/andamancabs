"use client"
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { EffectFade, Pagination, Navigation } from 'swiper/modules';
import { Rate } from 'antd';

export default function SwipeSlider({sliderData=[]}) {

    const customData = [
        { image: "/uploads/sliders/27283.jpg", name: "Rohit Parmar", subHeading: "Explore the beauty of nature with us. Explore the beauty of nature with us. Explore the beauty of nature with us. Explore the beauty of nature with us." },
        { image: "/uploads/sliders/17768.png", name: "Viren Parmar", subHeading: "Explore the beauty of nature with us. Explore the beauty of nature with us." },
        { image: "/uploads/sliders/17768.png", name: "Viren Parmar", subHeading: "Explore the beauty of nature with us. Explore the beauty of nature with us." },
        { image: "/uploads/sliders/27283.jpg", name: "Rohit Parmar", subHeading: "Explore the beauty of nature with us. Explore the beauty of nature with us." },
    ]

    return (

        <Swiper
            effect={'fade'}
            fadeEffect={{ crossFade: true }}
            dots={undefined && false}
            speed={2000}
            rewind
            spaceBetween={50}
            grabCursor={true}
            pagination={true}
            navigation={true}
            modules={[Navigation, EffectFade]}
            className="sm:w-[720px] transform-3d"
            style={{ padding: 50 }}
        >
            {sliderData.map((item, index) => (
                <SwiperSlide key={index} className='flex flex-col justify-center items-center text-center bg-white'>
                    <div className='w-full flex justify-center items-center relative'>
                        <div className='absolute h-[280px] w-[280px] bg-[var(--primary)] rounded-full -z-1 opacity-30' />
                        <div className='absolute h-[320px] w-[320px] bg-[var(--primary)] rounded-full -z-2 opacity-30' />
                        <img src={item.image} alt={`Slider Image ${index + 1}`} className='w-[250px] h-[250px] object-cover rounded-full' />
                    </div>
                    <div className='p-4'>
                        <p className='text-gray-600 mt-12'>{item.subHeading}</p>
                        <p className='text-xl mt-4 text-[1.5rem] font-bold'>{item.name}</p>
                        <Rate defaultValue={5} disabled />
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    )
}
