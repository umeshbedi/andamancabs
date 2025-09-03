import React from 'react'
import LocationPage from './IslandPage'
import { getlocationData } from '@/components/utils/actions/locationAction';
import { notFound } from 'next/navigation';



export default async function Activities({ params, searchParams }) {
  const { islandName, islandPlace } = params;
  const res = await getlocationData({ islandSlug: islandName });
  // console.log(res)
  const placeData = res.filter(d => d.slug == `/island/${islandName}/${islandPlace}`)
  
  if (placeData.length == 0) return notFound()

  // console.log(placeData[0])
  

  return <LocationPage data={placeData[0]} />
}
