import MyTitle from '@/components/ui/MyTitle'
import React from 'react'
import CruizeCard from './CruizeCard'

export default function Cruize() {
    const cruizName = [
        { name: "MAKRUZZ", image: "https://res.cloudinary.com/dvgoikldl/image/upload/v1756552755/ieni6sxkiyrzvl6vqscv.jpg", slug: "/ferry/Makruzz" },
        { name: "NAUTIKA", image: "https://res.cloudinary.com/dvgoikldl/image/upload/v1756551987/ghkbaqefuztu3nbtm8do.jpg", slug: "/ferry/Nautika" },
        { name: "GREEN OCEAN", image: "https://res.cloudinary.com/dvgoikldl/image/upload/v1758730926/rscxsxfg3tpsrbrmvlt3.jpg", slug: "/ferry/Green-Ocean" },
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
