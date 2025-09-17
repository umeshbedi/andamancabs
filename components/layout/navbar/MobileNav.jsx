"use client"
import { menu } from '@/components/lib/data'
import { Drawer, Menu } from 'antd'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { IoIosMenu } from 'react-icons/io'
import { RxCross2 } from "react-icons/rx";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

export default function MobileNav({ allLocationData, packageData,allActivitiesData }) {
  const [open, setOpen] = useState(false)
  const [Loading, setLoading] = useState(true)
  const items = [
    {
      key: 'sub1',
      label: 'Know',
      children: menu.knowItems.map((item, index) => ({ key: `Know-${index}`, label: <a href={item.url}>{item.title}</a> })),
    },
    {
      key: 'sub2',
      label: 'Location',
      children: allLocationData.map((loc, index) => (
        {
          key: `Location-${index}`,
          label: loc.title,
          children: loc.items.map((item, idx) => (
            {
              key: `Location-${index}-Item-${idx}`,
              label: <a href={item.slug}>{item.name}</a>
            }
          ))
        }
      ))
    },
    {
      key: 'sub3',
      label: 'Package',
      children: packageData
    },
    {
      key: 'sub4',
      label: 'Activities',
      children: allActivitiesData.map((loc, index) => (
        {
          key: `activities-${index}`,
          label: loc.title,
          children: loc.items.map((item, idx) => (
            {
              key: `activities-${index}-Item-${idx}`,
              label: <a href={item.slug}>{item.title}</a>
            }
          ))
        }
      ))
    },
    {
      key: 'sub5',
      label: 'Cab Rental',
      children: menu.cabRentals.map((item, index) => ({ key: `cab-${index}`, label: <a href={item.url}>{item.title}</a> })),
    },
    {
      key: 'sub6',
      label: <a href="/online-ferry-booking">Book Ferries Online</a>,
    },
  ];

  // [
  //       { key: '5', label: 'Option 5' },
  //       { key: '6', label: 'Option 6' },
  //       {
  //         key: 'sub3',
  //         label: 'Submenu',
  //         children: [
  //           { key: '7', label: 'Option 7' },
  //           { key: '8', label: 'Option 8' },
  //         ],

  const onClick = e => {
    console.log('click', e);
  };

  useEffect(() => { setLoading(false); }, [])

  if (Loading) return <></>

  return (
    <>
      <div className='sm:hidden bg-black w-full text-white z-[100] fixed top-0 left-0'>
        <header className='container mx-auto px-4 flex pt-2 justify-between items-center'>
          <a href='/' className="h-10 relative w-[100px]">
            <Image alt='andaman cab logo' src={"/img/logos/logo-yellow.png"} fill className='object-contain' />
          </a>
          <IoIosMenu onClick={() => setOpen(true)} className='text-3xl cursor-pointer' />
        </header>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement='left'
        width={300}
        style={{ background: "black", color: "white" }}

      >
        <RxCross2 onClick={() => setOpen(false)} className='mb-4 ml-2 text-2xl cursor-pointer' style={{ color: "white" }} />
        <Menu theme="dark" onClick={onClick} style={{ width: 300, fontSize: "1.2rem", background: "black" }} mode="inline" items={items} />

      </Drawer>
    </>
  )
}
