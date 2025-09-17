import React from 'react'
import ActivityPage from './ActivityPage'
import { getActivityData, getSortedData } from '@/components/utils/actions/activityAction'
import { notFound } from 'next/navigation';



export default async function Activities({params, searchParams}) {
  const res = await getActivityData({ slug: params.activityName });
  // console.log("params",params.activityName)
  // console.log(res);

  const activityGroup = params.activityName.split("__")[1];

  if (res.length === 0) return notFound();
  
  const sortedRes = await getSortedData({ slug: params.activityName });
  
  // console.log("sortedRes",soretedRes);
  // console.log("Activity Data:", tempData);
  

  return <ActivityPage data={res[0]} sortedData={sortedRes} activityGroup={activityGroup}/>
}
