import React from 'react'
import { MegaMenu, SimpleMenu } from './Menu'
import { menu } from '@/components/lib/data'
import Image from 'next/image'

export default function DesktopNav() {
    return (
        <nav className='sm:block hidden navbar'>
            <ul className='flex items-center justify-center'>
                <SimpleMenu title="HOME" url="/" />
                <MegaMenu title="KNOW">
                    <ul>
                        {menu.knowItems.map((item, index) => (
                            <li key={index} className='hover:bg-[var(--primary)] transition duration-1000 ease px-6 py-2 rounded-xl text-nowrap'>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </MegaMenu>
                <SimpleMenu title="LOCATION" url="/bookings" />
                <SimpleMenu title="ACTIVITIES" url="/contact" />
                <SimpleMenu title="TOP DEALS" url="/blog" />
                <SimpleMenu title="BOAT TICKETS" url="/login" />
                
                <li>
                    <div className="h-10 relative w-[100px]">
                        <Image alt='andamancabs logo' src={"/img/logos/logo-yellow.png"} fill className='object-contain' />
                    </div>
                </li>
                
                <SimpleMenu title="CAB RENTAL" url="/register" />
                <SimpleMenu title="VEHICLE TYPES" url="/admin" />
                <SimpleMenu title="FERRIES" url="/admin" />
                <SimpleMenu title="CONTACT US" url="/admin" />
            </ul>
        </nav>
    )
}
