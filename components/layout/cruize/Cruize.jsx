import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import CruizeCard from './CruizeCard'

export default function Cruize() {
    const cruizName = [
        { name: "MAKRUZZ", image: "/uploads/cruise-photos/27811.jpg", slug: "/ferry/Makruzz" },
        { name: "NAUTIKA", image: "/uploads/cruise-photos/11360.jpg", slug: "/ferry/Nautika" },
        { name: "GREEN OCEAN", image: "/uploads/cruise-photos/74546.jpg", slug: "/ferry/Green-Ocean" },
    ]
    return (
        <main className='mt-15'>

            <MyTitle heading='Cruises' subheading='Travel in the luxury cruise' />

            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {cruizName.map((item, index) => (
                    <CruizeCard key={index} name={item.name} image={item.image} slug={item.slug}/>
                ))}

            </div>
        </main>


    )
}
