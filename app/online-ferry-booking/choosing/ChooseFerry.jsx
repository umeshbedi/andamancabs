import { UserOutlined } from '@ant-design/icons'
import { Segmented, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

import { Empty } from 'antd'
import { Spin } from 'antd'
import { countMakruzzFerry } from '../ferry/countMakruzz.js'
import { useGlobalFerryContext } from '../components/GlobalFerryContext.jsx'
import { message } from 'antd'



const Makruzz = dynamic(() => import('../ferry/Makruzz'), { ssr: false, loading: () => <><SHome /></> })
const Nautika = dynamic(() => import('../ferry/Nautika'), { ssr: false, loading: () => <><SHome /></> })

export default function ChooseFerry({ tripData, tripName }) {

    const context = useGlobalFerryContext();

    const [ferry, setFerry] = useState([])
    const [ferryDiv, setFerryDiv] = useState(<></>)

    const [makruzzTickets, setMakruzzTickets] = useState([])
    const [nautikaTickets, setNautikaTickets] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const [isLoading, setIsLoading] = useState(true)

    function SegMentSingleData({ name, value, imageSrc, count }) {
        return {
            label: (
                <div className='flex justify-center items-center p-1 gap-1.5'>
                    <div className='relative w-[60px] h-[40px]'>
                        <Image src={imageSrc} alt={name} fill className='object-contain' />
                    </div>
                    <h4>{name}</h4>
                    <span className='text-sm ml-3 text-white px-2 py-1 bg-green-600 rounded-full flex items-center gap-1'> <IoMdCheckmarkCircleOutline /> {count} {count > 1 ? "Ferries" : "Ferry"}</span>
                </div>
            ),
            value: value,
        }
    }



    useEffect(() => {
        setNautikaTickets([]);
        setIsLoading(true);
        setFerryDiv(<></>)
        if (!tripData.departure) return;

        const location = { "portblair": "Port Blair", "havelock": "Swaraj Dweep", "neilisland": "Shaheed Dweep" }

        const dateParts = tripData.departure.split("-");
        const formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

        async function fetchNautikaTickets() {
            const res = await fetch("/api/nautika", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: formattedDate,
                    from: location[tripData.fromIsland],
                    to: location[tripData.toIsland]
                })
            });

            const data = await res.json();
            if (data.err == null) setNautikaTickets(data?.data || []);
            console.log("Nautika:", data);
            setIsLoading(false);
            if (data.error) messageApi.error(data.error)
        }
        fetchNautikaTickets();
    }, [tripData])



    useEffect(() => {
        // fetch makruzz data;
        setMakruzzTickets([]);
        setIsLoading(true);
        setFerryDiv(<></>)
        if (!tripData.departure) return;

        const location = { "portblair": "1", "havelock": "2", "neilisland": "3" }

        async function fetchCruiseTickets() {
            const res = await fetch("/api/makruzz/schedule_search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fromLocation: location[tripData.fromIsland], toLocation: location[tripData.toIsland], travelDate: tripData.departure, numAdult: context.tripData.trip0.adults })
            });

            const data = await res.json();
            setMakruzzTickets(data?.data || []);
            console.log("Makruzz:", data);
            setIsLoading(false);
            if (data.error) messageApi.error(data.error)
        }

        fetchCruiseTickets();
    }, [tripData])


    useEffect(() => {
        const ferrySegmentList = [
            { name: "Makruzz", value: "makruzz", imageSrc: "/img/ferry logo/makruzz-logo.png", count: countMakruzzFerry({ data: makruzzTickets }) },
            { name: "Nautika", value: "nautika", imageSrc: "/img/ferry logo/Nautika-Logo-v2-768x223.png", count: nautikaTickets.length },
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
    }, [makruzzTickets, nautikaTickets])

    // console.log(makruzzTickets, nautikaTickets)


    function onFerryChange(value) {

        if (value === "makruzz") {
            setFerryDiv(<Makruzz makruzzTickets={makruzzTickets} tripName={tripName} />)
        } else if (value === "nautika") {
            setFerryDiv(<Nautika nautikaTickets={nautikaTickets} tripName={tripName} />)
        } else {
            setFerryDiv(
                <div className='flex justify-center items-center h-[200px]'>
                    <Avatar size={100} icon={<UserOutlined />} />
                    <p className='text-lg font-bold'>IIT Majestik Ferry is currently unavailable.</p>
                </div>
            )
        }

    }

    if (isLoading) return <div className='mt-10'><Spin size="large" className='w-full' /></div>

    if (makruzzTickets.length === 0 && nautikaTickets.length === 0) return <>{contextHolder} <Empty description="No ferries available for the selected route." className='mt-10' image={Empty.PRESENTED_IMAGE_SIMPLE} /></>
    // setTimeout(() => {
    // }, 100);

    return (
        <div className='mt-10'>
            {contextHolder}
            <h2>Choose a Ferry {(context.tripData.trip1.added || context.tripData.trip2.added)?`for ${tripName}`: ''}</h2>
            <p className='text-gray-600'>Select a ferry from the available options below.</p>
            <Segmented shape='round' block style={{ marginTop: 20 }} options={ferry} onChange={(e) => onFerryChange(e)} />

            {ferryDiv}
        </div>
    )
}
