"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Carousel, Row, Col, Space, Button, Skeleton } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { mobile, textShadow } from '../utils/variables';
import MyButton from '../ui/MyButton';

export default function Slider({ sliderData = [] }) {

    const [height, setHeight] = useState(null)

    const [opacity, setOpactiy] = useState(null)
    const [marginBottom, setMarginBottom] = useState("2rem")

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])


    useEffect(() => {
        setHeight(document.documentElement.clientHeight - 50)
    }, [])


    const customData = [
        { image: "/uploads/sliders/27283.jpg", heading: "Andaman Cab", subHeading: "Explore the beauty of nature with us" },
        { image: "/uploads/sliders/17768.png", heading: "See You Here", subHeading: "Explore the beauty of nature with us" },
    ]



    return (
        <div className='mt-10 relative'>
            <Swiper

                // spaceBetween={30}
                centeredSlides={true}
                speed={2000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
                grabCursor={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                onSlideChangeTransitionStart={(e) => {
                    setOpactiy(0)
                    setMarginBottom(0)
                }}
                onSlideChangeTransitionEnd={() => {
                    setOpactiy(1)
                    setMarginBottom("2rem")
                }}
            >
                <SwiperSlide>
                    <div style={{ position: 'relative', width: '100%', height: height, overflow: 'hidden' }}>
                        <video
                            src="https://video.gumlet.io/60e563a0b502bacef88e556b/60ffa619738c1c4caeab6c90/0.mp4" // Replace with your video path
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                minWidth: '100%',
                                minHeight: '100%',
                                width: 'auto',
                                height: height,
                                transform: 'translate(-50%, -50%)',
                                objectFit: 'cover',
                                zIndex: 0,
                            }}
                            muted
                            autoPlay
                            loop
                        />
                        
                    </div>
                </SwiperSlide>

                {sliderData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div >
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: height,
                                    position: 'relative',

                                }}>

                                <Image
                                    src={item.image}
                                    alt={`mohi holiday slider image ${index}`}
                                    fill
                                    loading='lazy'
                                    style={{ objectFit: 'cover' }}
                                    placeholder='blur'
                                    blurDataURL={item.image + '?blur'}
                                />
                                <div style={{
                                    height: height,
                                    // backgroundImage: `linear-gradient(0deg,rgba(0,0,0, 0.9),rgba(0,0,0, .3),rgba(0,0,0, 0))`,
                                    position: 'absolute',
                                    width: '100%',

                                }}
                                />

                                <div
                                    className='h-full w-full absolute flex justify-center items-end bottom-10 sm:bottom-0 sm:ml-30 sm:justify-start sm:items-center'
                                >
                                    <div className='sm:text-left text-center'>
                                        <h1
                                            style={{
                                                color: 'white',
                                                // marginBottom: marginBottom,
                                                transition: 'all .5s ease',
                                                opacity: opacity,
                                                textShadow: textShadow
                                            }}
                                        >{item.heading}
                                        </h1>
                                        <p
                                            className='sm:text-left text-center'
                                            style={{ color: 'white', marginBottom: marginBottom, transition: 'all .5s ease', opacity: opacity, }}
                                        >
                                            {item.subHeading}
                                        </p>
                                        <div
                                            style={{ opacity: opacity, transition: 'all .5s ease', }}
                                            className='flex justify-center sm:justify-start -mt-4'
                                        >
                                            <MyButton name={"Contact Us"} slug={"/"} />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))
                }


            </Swiper>

            <div className='absolute sm:-bottom-5 bottom-0 left-0 w-full z-10'>
                <img src="/img/bottom-svg.svg" alt="footer curve" loading='lazy' />
            </div>
        </div>
    )
}
