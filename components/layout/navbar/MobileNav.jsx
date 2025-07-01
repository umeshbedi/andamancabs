"use client"
import { Drawer, Menu } from 'antd'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function MobileNav() {
    const [open, setOpen] = useState(false)
    const [Loading, setLoading] = useState(true)
    const items = [
        {
          key: 'sub1',
          icon: <MailOutlined />,
          label: 'Navigation One',
          children: [
            {
              key: '1-1',
              label: 'Item 1',
              type: 'group',
              children: [
                { key: '1', label: 'Option 1' },
                { key: '2', label: 'Option 2' },
              ],
            },
            {
              key: '1-2',
              label: 'Item 2',
              type: 'group',
              children: [
                { key: '3', label: 'Option 3' },
                { key: '4', label: 'Option 4' },
              ],
            },
          ],
        },
        {
          key: 'sub2',
          icon: <AppstoreOutlined />,
          label: 'Navigation Two',
          children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            {
              key: 'sub3',
              label: 'Submenu',
              children: [
                { key: '7', label: 'Option 7' },
                { key: '8', label: 'Option 8' },
              ],
            },
          ],
        },
        {
          key: 'sub4',
          label: 'Navigation Three',
          icon: <SettingOutlined />,
          children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
          ],
        },
      ];

      const onClick = e => {
        console.log('click', e);
      };

      useEffect(() => {setLoading(false);}, [])
      
      if(Loading)return <></>

  return (
    <>
        <div className='sm:hidden bg-black w-full text-white z-[100] fixed top-0 left-0'>
            <header className='container mx-auto px-4 flex pt-2 justify-between items-center'>
                <div className="h-10 relative w-[100px]">
                    <Image alt='andaman cab logo' src={"/img/logos/logo-yellow.png"} fill className='object-contain'/>
                </div>
                <IoIosMenu onClick={()=>setOpen(true)} className='text-3xl cursor-pointer' />                
            </header>
        </div>

        <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement='left'
        width={300}
        style={{ background: "black", color:"white"}}
        
        >
            <RxCross2 onClick={() => setOpen(false)} className='mb-4 ml-2 text-2xl cursor-pointer' style={{ color: "white" }} />
            <Menu theme="dark" onClick={onClick} style={{ width: 300, fontSize:"1.2rem", background:"black" }} mode="inline" items={items} />            

        </Drawer>
    </>
  )
}
