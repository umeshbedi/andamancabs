"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from 'next/image';

const sliderImages = [
  "/img/instagram/andmancab activity.jpg",
  "/img/instagram/Cellular jail.png",
  "/img/island/ross-island.webp",
]
import { mobile, textShadow } from '@/components/utils/variables';




export default function DivCarouselMobile({ lightHead, darkHead, backgroundImage, sliderContent = [], button, category }) {

  const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
  const [sliderStyle, setSliderStyle] = useState({ width: '100%' })

  const slideRef = useRef()
  const containerRef = useRef()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])

  const sliderContentLocal = [
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Havelock Island", thumbnail: sliderImages[0], slug: "/islands/havelock-island", title: "Havelock" },
    { name: "Neil Island", thumbnail: sliderImages[1], slug: "/islands/neil-island", title: "Neil" },
    { name: "Ross Island", thumbnail: sliderImages[2], slug: "/islands/ross-island", title: "Ross" },
  ]


  return (
    <div ref={containerRef} style={{ width: '100%', float: 'right', position: 'relative' }}>
      <div style={{ display: 'flex', width: '100%', position: 'relative' }} >

        {/* for carousel */}
        <div style={sliderStyle} >
          <Swiper
            style={{ padding: `${isMobile ? .5 : 2.5}rem 10px`, "--swiper-navigation-color": "#fff", transition: 'ease-out' }}
            ref={slideRef}
            effect={"coverflow"}
            grabCursor={true}
            navigation={isMobile ? false : true}
            modules={[Pagination, Navigation]}
            slidesPerView={"auto"}
            spaceBetween={isMobile ? 10 : 30}
            rewind
            speed={1500}


          >
            {sliderContent.map((item, index) => (
              <SwiperSlide style={{ width: 250, height: 350 }} key={index} className='singleSwiper shadow-xl rounded-3xl overflow-hidden'>
                <Link target='_blank' href={item.slug}>
                  <div style={{ height: 350 }} >
                    <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', position: 'absolute', zIndex: -1 }} />
                    <div className='absolute bg-gradient-to-t from-black via-black/60 to-transparent bottom-0 p-4 w-full'>
                      <p style={{ color: 'white', textShadow: textShadow }} className='text-center'>
                        {item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
