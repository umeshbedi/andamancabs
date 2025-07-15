import React from 'react'
import ActivityPage from './ActivityPage'
import { getActivityData } from '@/components/utils/actions/activityAction'



export default async function Activities({params, searchParams}) {
  const res = getActivityData({ slug: params.activityName });
  console.log("params",params.activityName)
  let tempData;
  await res.then(data => {
    // console.log("Activity Data:", data[0]);
    tempData = data[0];
  }).catch(error => {
    console.error("Error fetching activity data:", error);
  });
  
  console.log("Activity Data:", tempData);
  

  return <ActivityPage data={tempData}/>
}
