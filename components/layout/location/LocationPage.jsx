export const dynamic = "force-dynamic";
import { getAllLocation } from "@/components/utils/actions/locationAction";
import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import DivCarouselMobile from './DivCarouselMobile'
import MySubTitle from "@/components/ui/MySubTitle";

export default async function LocationPage() {
  const allLocationData = await getAllLocation() || [];
  // console.log(allLocationData);
  return (
    <main className=' mt-15'>
      <MyTitle heading='Locations' subheading='Never Stop Exploring the World' />
      {allLocationData.map((item, index) => (
        <React.Fragment key={index}>
          <MySubTitle heading={item.title} subheading={item.metaDescription}/>
          <DivCarouselMobile sliderContent={item.items}/>
        </React.Fragment>
      ))}
    </main>
  )
}
