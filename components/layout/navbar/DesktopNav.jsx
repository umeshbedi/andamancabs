import React from 'react'
import { MegaMenu, SimpleMenu } from './Menu'
import { menu } from '@/components/lib/data'
import { menu as localMenu } from '@/components/utils/localdb'
import Image from 'next/image'
import Dropdown from './Dropdown'
import MegaDropDown from './MegaDropDown'

export default function DesktopNav() {
    return (
        <nav className='sm:block hidden navbar'>
            <ul className='flex items-center justify-center'>
                <SimpleMenu title="HOME" url="/" />
                <MegaMenu title="KNOW">
                    <Dropdown menu={menu.knowItems} />
                </MegaMenu>
                <SimpleMenu title="LOCATION" url="#" />
                <MegaMenu title="PACKAGES">
                    <MegaDropDown content={localMenu.packages}/>
                </MegaMenu>

                <MegaMenu title="ACTIVITIES">
                    <MegaDropDown content={localMenu.activity}/>
                </MegaMenu>

                <li>
                    <div className="h-10 relative w-[100px]">
                        <Image alt='andamancabs logo' src={"/img/logos/logo-yellow.png"} fill className='object-contain' />
                    </div>
                </li>

                <MegaMenu title={"CAB RENTAL"}>
                    <Dropdown menu={menu.cabRentals} />
                </MegaMenu>

                {/* <SimpleMenu title="VEHICLE TYPES" url="/admin" /> */}
                <SimpleMenu title="BOOK FERRIES ONLINE" url="/online-ferry-booking" />
                <SimpleMenu title="HOTELS" url="/contact-us" />
                <SimpleMenu title="CONTACT US" url="/contact-us" />
            </ul>
        </nav>
    )
}
