import MySubTitle from '@/components/ui/MySubTitle'
import { MobileFilled, PlayCircleFilled, SecurityScanOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'

export default function OurStory() {

  const content = [
    { icon: <SecurityScanOutlined />, title: 'Top Agency', description: 'Best Cab rental agency since 2015.' },
    { icon: <SecurityScanOutlined />, title: 'Online Ferry Booking', description: '3 Step Ferry Booking since 2021 in Andaman.' },
    { icon: <SecurityScanOutlined />, title: 'Water Sports Activities', description: 'Get Discounted Price and Offers.' },
    { icon: <SecurityScanOutlined />, title: 'Assistance', description: 'Get Personal Assistance.' },
    { icon: <SecurityScanOutlined />, title: 'Endless Packages', description: 'Packages for Every Budget' },
    { icon: <SecurityScanOutlined />, title: 'Destinations', description: 'Explore every Destinations.' },

  ]

  return (
    <main className='relative mt-15'
      style={{
        backgroundImage: "url('/img/bgs/summer-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0
      }}
    >
      <div className="absolute inset-0 bg-[var(--primary)] opacity-60" />

      {/* main container */}

      <div className='flex flex-wrap'>

        <div className="z-10 sm:w-[70%] w-full sm:pl-15 sm:px-0 px-15 pb-15">
          <MySubTitle heading='Know About Us' subheading='Andaman Cabs Services LLP is the only company which has 27 vehicles in Andaman Islands with the biggest Fleet.' />
          <div className='flex flex-wrap gap-8 mt-8 text-center justify-center'>
            {content.map((item, index) => (
              <div key={index} className={`flex w-[250px] mb-5 flex-col justify-center items-center gap-2 bg-white p-4 rounded-lg shadow-lg hover:-translate-y-1.5 transition-all ease-in-out duration-500 ${index%2==0 ? 'sm:translate-y-5 sm:hover:translate-y-3.5' : ''}`}>
                <div className='text-[3rem]'>{item.icon}</div>
                <span className='text-lg font-semibold'>{item.title}</span>
                <p className='text-[.9rem]'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center z-10 sm:w-[30%] py-15 w-full px-15 sm:pr-15 text-center bg-black text-white">
          <h1>Our Story</h1>
          <h2>Watch the Video</h2>
          <a href='https://www.youtube.com/watch?v=H_BtXn5kccg' target='blank' className='relative w-[300px] h-[350px] mt-5 group'>
            <Image fill src={"/uploads/about-us.jpg"} alt='our story image' className='rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-in-out'/>
            <PlayCircleFilled className='absolute top-1/2 left-1/2 text-[3rem] cursor-pointer' style={{ transform: 'translate(-50%, -50%)', color:'var(--primary)' }} />
          </a>
        </div>
      </div>
    </main>
  )
}
