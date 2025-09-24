import { updateCloudinaryWidth } from '@/components/admin/media/urlUpdate'
import SHome from '@/components/skeleton/SHome'
import MyDiv from '@/components/ui/MyDiv'
import { Divider } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'
import ActivityCostSection from './ActivityCostSection'
import ActivityCard from '@/components/layout/activity/ActivityCard'

const String2Html = dynamic(() => import('@/components/ui/String2Html'), { ssr: true, loading: () => <SHome /> })

export default function ActivityPage({ data, sortedData = [], activityGroup }) {

  const newHeaderImage = data.headerImage != "" ? updateCloudinaryWidth(data.headerImage, 800) : "/uploads/header-bg/86851.jpg"

  return (
    <MyDiv title={""} image={newHeaderImage}>
      <section className="w-full flex flex-col sm:flex-row justify-center gap-4 p-4 sm:p-8 packageSection">
        <div className="w-full sm:w-[65%] bg-white p-[3%] flex flex-col gap-4">
          <h1>{data.title}</h1>
          <Divider style={{ margin: "0", backgroundColor: "var(--lightGreyColor)", height: 1 }} />
          <String2Html id="aboutIsland" string={data.about} />
          {/* <FAQ isImage={true} padding='' /> */}
        </div>

        <div className={` w-full sm:w-[35%] flex flex-col items-center mt-10`}>

          <ActivityCostSection childPrice={data.childPrice} price={data.price} packageDetails={{ packageTitle: data.title, place: data.activityPlace }} rating={data.stars} duration={data.duration} />

          <Divider style={{ height: 1 }} />
          <h2 className="text-center mb-3">Visit Other Activities</h2>
          <div className='w-full flex flex-col gap-5 items-center mt-2'>
          {sortedData.map((item, idx) => (
            <ActivityCard
              key={idx}
              name={item.title}
              image={item.thumbnail}
              slug={item.slug+"__"+activityGroup}
              price={item.price}
              duration={item.duration}
              metaDescription={item.metaDescription}
              location={item.location}
              stars={item.stars}
            />
          ))}

          </div>

          {/* {sortedData.map((item, i) => (
            <Link
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="2000"
              key={i}
              target="_blank"
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
