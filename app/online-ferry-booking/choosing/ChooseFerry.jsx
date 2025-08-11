import { UserOutlined } from '@ant-design/icons'
import { Segmented, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const Makruzz = dynamic(() => import('../ferry/Makruzz'), { ssr: false, loading: () => <><SHome /></> })
const Nautika = dynamic(() => import('../ferry/Nautika'), { ssr: false, loading: () => <><SHome /></> })

export default function ChooseFerry({ tripData }) {
    const [ferry, setFerry] = useState([])
    const [ferryDiv, setFerryDiv] = useState(<></>)

    const [makruzzTickets, setMakruzzTickets] = useState([])
    const makruzzLength = 10
    const NautikaLength = 5
    const IITMajestik = 0



    function SegMentSingleData({ name, value, imageSrc, count }) {
        return {
            label: (
                <div className='flex justify-center items-center p-1 gap-1.5'>
                    <div className='relative w-[50px] h-[50px]'>
                        <Image src={imageSrc} alt={name} fill className='object-contain' />
                    </div>
                    <p className='font-bold text-lg'>{name}</p>
                    <span className='text-sm ml-3 text-white px-2 py-1 bg-green-600 rounded-full flex items-center gap-1'> <IoMdCheckmarkCircleOutline /> {count} {count > 1 ? "Tickets" : "Ticket"}</span>
                </div>
            ),
            value: value,
        }
    }

    // async function getMakruzzData() {
    //     const res = await fetch(`/api/makruzz`, {
    //         cache: "no-store"
    //     });
    //     const sectors = await res.json();
    //     console.log(sectors)
    //     // return sectors;
    // }


    useEffect(() => {

        // getMakruzzData();
        if (!tripData) return;

        const location = { "portblair": "1", "havelock": "2", "neilisland": "3" }

        const { trip0 } = tripData;

        async function fetchCruiseTickets() {
            const res = await fetch("/api/makruzz/schedule_search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fromLocation: location[trip0.fromIsland], toLocation: location[trip0.toIsland], travelDate: trip0.departure, numAdult: trip0.adults })
            });

            const data = await res.json();
            setMakruzzTickets(data?.data || []);
            console.log("Tickets:", data);
        }

        fetchCruiseTickets();
    }, [tripData])


    useEffect(() => {
        const ferrySegmentList = [
            { name: "Makruzz", value: "makruzz", imageSrc: "/img/ferry logo/makruzz-logo.png", count: makruzzTickets.length },
            { name: "Nautika", value: "nautika", imageSrc: "/img/ferry logo/Nautika-Logo-v2-768x223.png", count: NautikaLength },
        ]

        let tempList = ferrySegmentList.filter(ferry => ferry.count > 0)

        setFerry([...tempList.map(ferry => {
            return SegMentSingleData({
                name: ferry.name,
                value: ferry.value,
                imageSrc: ferry.imageSrc,
                count: ferry.count
            })
        })]);
    }, [makruzzTickets])




    function onFerryChange(value) {

        if (value === "makruzz") {
            setFerryDiv(<Makruzz makruzzTickets={makruzzTickets} />)
        } else if (value === "nautika") {
            setFerryDiv(<Nautika />)
        } else {
            setFerryDiv(
                <div className='flex justify-center items-center h-[200px]'>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <p className='text-lg font-bold'>IIT Majestik Ferry is currently unavailable.</p>
                </div>
            )
        }

    }

    return (
        <div className='mt-10'>
            <h2>Choose a Ferry</h2>
            <p className='text-gray-600'>Select a ferry from the available options below.</p>
            <Segmented block style={{ marginTop: 20 }} options={ferry} onChange={(e) => onFerryChange(e)} />

            {ferryDiv}
        </div>
    )
}
