export const dynamic = "force-dynamic";

import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import ActivityCard from './ActivityCard'
import { getAllActivities } from '@/components/utils/actions/activityAction'


export default async function Activities() {
    const allActivities = await getAllActivities();

    const activitData = []

    allActivities.forEach(activity => {
        activity.items.forEach(item => activitData.push(item))
    });

    // console.log("All Activities:", activitData);


    return (
        <>
            <main className='mt-15'>

                <MyTitle heading='Popular Activities' subheading='Explore top destinations across the islands' />
                <div className='flex flex-wrap justify-center gap-10 mt-5'>
                    {activitData.map((item, index) => (
                        <ActivityCard
                            key={index}
                            name={item.title}
                            image={item.thumbnail}
                            slug={item.slug}
                            price={item.price}
                            duration={item.duration}
                            metaDescription={item.metaDescription}
                            location={item.location}
                            stars={item.stars}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}
