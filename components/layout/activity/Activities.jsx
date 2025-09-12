export const dynamic = "force-dynamic";

import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import ActivityCard from './ActivityCard'
import { getAllActivities } from '@/components/utils/actions/activityAction'
import { Tabs } from 'antd';


export default async function Activities() {
    const allActivities = await getAllActivities();

    const activitData = []

    allActivities.forEach(activity => {
        activity.items.forEach(item => activitData.push(item))
    });

    const groupedActivities = activitData.reduce((acc, item) => {
        if (!acc[item.activityPlace]) {
            acc[item.activityPlace] = [];
        }
        acc[item.activityPlace].push(item);
        return acc;
    }, {});

    // console.log("Grouped Activities:", groupedActivities);

    const tabItem = Object.keys(groupedActivities).map((place, index) => ({
        key: index.toString(),
        label: place,
        children: (
            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {groupedActivities[place].map((item, idx) => (
                    <ActivityCard
                        key={idx}
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
        )
    }));


    return (
        <>
            <main className='mt-15'>

                <MyTitle heading='Popular Activities' subheading='Explore top destinations across the islands' className={'text-center'}/>
                <div className='mt-5 w-full flex justify-center'>
                    <Tabs
                        size='large'
                        type='card'
                        items={tabItem}
                        tabPosition='top'
                        style={{width:'90%'}}
                        destroyOnHidden
                        centered
                    />

                </div>
                
            </main>
        </>
    )
}
