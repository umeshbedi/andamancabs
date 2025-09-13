import React from 'react'
import CabPage from './CabPage'
import { getAllCabs, getCabsData } from '@/components/utils/actions/cabsAction'
import { notFound } from 'next/navigation'

export default async function Page({ params, searchParams }) {

  const cabpage = await getCabsData({slug:params.cabsIsland})

  if(!cabpage)return notFound()

  const cabsData = await getAllCabs({id:cabpage.id})
  // console.log(cabsData)

  return <CabPage cabpage={cabpage} cabData={cabsData}/>
}
