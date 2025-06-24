import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import ActivityCard from './ActivityCard'

export default function Activities() {
    return (
        <>
            <main className='mt-15'>

                <MyTitle heading='Popular Activities' subheading='Explore top destinations across the islands' />
                <div className='flex flex-wrap justify-center gap-10 mt-5'>
                    {Array(6).fill(0).map((_, index) => (
                        <ActivityCard key={index} name={"Activity Name"} image={"/uploads/activity-photos/83268.jpg"} />
                    ))}
                </div>
            </main>
        </>
    )
}
