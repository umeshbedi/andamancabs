import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import CruizeCard from './CruizeCard'

export default function Cruize() {
    const cruizName = [
        { name: "MAKRUZZ", image: "/uploads/cruise-photos/27811.jpg" },
        { name: "NAUTIKA", image: "/uploads/cruise-photos/11360.jpg" },
        { name: "GREEN OCEAN", image: "/uploads/cruise-photos/74546.jpg" },
    ]
    return (
        <main className='mt-15'>

            <MyTitle heading='Cruizes' subheading='Travel in the luxury cruise' />

            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {cruizName.map((item, index) => (
                    <CruizeCard key={index} name={item.name} image={item.image}/>
                ))}

            </div>
        </main>


    )
}
