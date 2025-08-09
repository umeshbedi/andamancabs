import { UserOutlined } from '@ant-design/icons'
import { Segmented, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Makruzz from '../ferry/Makruzz'

export default function ChooseFerry({ tripData }) {
    const [ferry, setFerry] = useState([])
    const [ferryDiv, setFerryDiv] = useState(<></>)
    const makruzzLength = 10
    const NautikaLength = 5
    const IITMajestik = 0

    function SegMentSingleData({ name, value, imageSrc }) {
        return {
            label: (
                <div className='flex justify-center items-center p-1 gap-1.5'>
                    <Image width={80} height={80} alt='name' src={imageSrc} />
                    <p className='font-bold text-lg'>{name}</p>
                </div>
            ),
            value: value,
        }
    }

    useEffect(() => {
        const ferrySegmentList = [
            { name: "Makruzz", value: "makruzz", imageSrc: "/img/ferry logo/makruzz-logo.png", count: makruzzLength },
            { name: "Nautika", value: "nautika", imageSrc: "/img/ferry logo/Nautika-Logo-v2-768x223.png", count: NautikaLength },
            { name: "IIT Majestik", value: "iit-majestik", imageSrc: "/img/ferry logo/makruzz-logo.png", count: IITMajestik }
        ]

        let tempList = ferrySegmentList.filter(ferry => ferry.count > 0)

        setFerry([...tempList.map(ferry => {
            return SegMentSingleData({
                name: ferry.name,
                value: ferry.value,
                imageSrc: ferry.imageSrc
            })
        })]);

    }, [tripData])

    function onFerryChange(value) {
        
        if(value==="makruzz"){
            setFerryDiv(<Makruzz/>)
        }
    }

    return (
        <div className='mt-10'>
            <h2>Choose a Ferry</h2>
            <p className='text-gray-600'>Select a ferry from the available options below.</p>
            <Segmented block style={{ marginTop: 20 }} options={ferry} onChange={(e)=>onFerryChange(e)}/>
            {ferryDiv}
        </div>
    )
}
