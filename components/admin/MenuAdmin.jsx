"use client"
import React, { useState, useEffect } from 'react'
import { HomeOutlined, PlusOutlined, MenuOutlined, MedicineBoxOutlined, BookOutlined, WechatFilled } from '@ant-design/icons';
import { FaCar, FaEye, FaGoogleDrive, FaImage, FaList, FaMountain, FaNewspaper, FaShip, FaSwimmer } from 'react-icons/fa'
import { Menu } from 'antd';

export default function MenuAdmin({ menuClick }) {

const items = [
    {
      key: 'homepage',
      icon: <HomeOutlined />,
      label: 'Home Banner',
    },
    {
      key: 'activityAndaman',
      icon: <FaSwimmer />,
      label: 'Activities',
    },

    {
      key: 'island',
      icon: <FaSwimmer />,
      label: 'Popular Islands',
    },

    {
      key: 'cabsAndaman',
      icon: <FaCar />,
      label: 'Cabs',
    },

    // {
    //   key: 'dayTrip',
    //   icon: <FaCar />,
    //   label: 'Day Trip',
    // },

    {
      key: 'addcruises',
      icon: <FaShip />,
      label: 'Cruises',
    },
    {
      key: 'packages',
      label: 'Packages',
      icon: <BookOutlined />,
      children: [
        {
          key: 'packageAndaman',
          icon: <MedicineBoxOutlined />,
          label: 'Add Package',
        },
        {
          key: 'packageAndmanDetail',
          icon: <MedicineBoxOutlined />,
          label: 'Add/Update Details',
        }
      ],
    },
    {
      key: 'Know',
      label: 'Know',
      icon: <FaNewspaper />,
      children: [
        {
          key: 'about-andamancabs',
          label: 'About Andaman Cabs',
        },
        {
          key: 'how-to-reach-andaman',
          label: 'How to reach Andaman Island',
        },
        {
          key: 'dos-and-dont',
          label: `${"Do's & Don't"}`,
        },
        {
          key: 'fun-facts',
          label: `Fun Facts`,
        },
        {
          key: 'cancellaction-policy',
          label: `Cancellation Policy`,
        },
        {
          key: 'privacy-policy',
          label: `Privacy Policy`,
        },
        {
          key: 'terms-and-conditions',
          label: `Terms & Conditions`,
        },
      ],
    },
    {
      key: 'Testimonials',
      icon: <WechatFilled />,
      label: 'Testimonials',
    },
    {
      key: 'media',
      icon: <FaImage />,
      label: 'Media',
    },
    
  ]

  return (
    <div style={{ width: 256 }} className=''>
      <Menu
        defaultSelectedKeys={['homepage']}
        defaultOpenKeys={['packages']}
        mode="inline"
        theme="dark"
        items={items}
        onClick={(e) => menuClick(e.key)}
      />
    </div>
  )
}
