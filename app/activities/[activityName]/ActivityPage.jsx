"use client"

import { updateCloudinaryWidth } from '@/components/admin/media/urlUpdate'
import SHome from '@/components/skeleton/SHome'
import MyDiv from '@/components/ui/MyDiv'
import { Divider } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

const String2Html = dynamic(() => import('@/components/ui/String2Html'), { ssr: false, loading: () => <SHome /> })
const FAQ = dynamic(() => import('@/components/layout/FAQ'), { ssr: false, loading: () => <SHome /> })

export default function ActivityPage({ data }) {
  
  const newHeaderImage = data.headerImage != ""? updateCloudinaryWidth(data.headerImage, 800) : "/uploads/header-bg/86851.jpg"

  return (
    <MyDiv title={""} image={newHeaderImage}>
      <section className="w-full flex flex-col sm:flex-row justify-center gap-4 p-4 sm:p-8">
        <div className="w-[70%] sm:w-full bg-white p-[3%] flex flex-col gap-4">
          <h1>{data.title}</h1>
          <Divider style={{ margin: "0", backgroundColor: "var(--lightGreyColor)", height: 1 }} />
          <String2Html id="aboutIsland" string={data.about} />
          <FAQ isImage={true} padding='' />
        </div>

        <div className={` w-full sm:w-[30%] flex flex-col items-center mt-10`}>
          <h2 className="text-center">Visit Other Activities</h2>
          <Divider style={{ backgroundColor: "var(--lightGreyColor)", height: 1 }} />
          {/* {sortedData.map((item, i) => (
            <Link
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="2000"
              key={i}
              target="blank"
              href={item.slug}
            >
              <div
                id="cardImage"
                className="rounded-lg bg-white flex flex-col items-center shadow-md w-[260px] mb-[30px]"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  preview={false}
                  width={260}
                  height={280}
                  className="object-cover rounded-t-lg"
                />
                <h2 className="p-[5%] text-center">{item.title}</h2>
              </div>
            </Link>
          ))} */}
        </div>
      </section>

    </MyDiv>
  )
}
