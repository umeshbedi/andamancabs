
import React from 'react'
import dynamic from 'next/dynamic'
import MyButton from '@/components/ui/MyButton'
import { getAllCabPage } from '@/components/utils/actions/cabsAction'

const CabsIsland = dynamic(() => import('@/components/layout/cabs/CabsIsland'))
const MyTitle = dynamic(() => import('@/components/ui/MyTitle'))

export default async function Cabs() {
  const island = ["Port Blair", "Havelock Island", "Neil Island"]
  const allCabsPage = await getAllCabPage()

  // console.log(allCabsPage)
  
  return (
    <main className=' mt-10'>
      <MyTitle heading='Our Cabs' subheading='Enjoy your ride in our top class fleet' />
      <div className='w-full'>
        {allCabsPage.map((item, index) => (
          <div key={index}>
            <CabsIsland heading={item.title} subheading={item.metaDescription} id={item.id}/>
            <div className='flex justify-end'>
              <MyButton slug={item.slug} name={"View More"}/>
            </div>
          </div>
        ))}

      </div>

    </main>
  )
}
