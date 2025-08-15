import { Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react'
// import ChooseFerry from './ChooseFerry';
import dynamic from 'next/dynamic';
import SHome from '@/components/skeleton/SHome';
const ChooseFerry = dynamic(() => import("./ChooseFerry"), { ssr: false, loading: () => <><SHome /></> })

export default function StepsBooking({ tripData }) {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(1);

    const onChange = value => {
        console.log('onChange:', value);
        setCurrent(value);
        if (value == 0) {
            window.scrollTo({ top: document.getElementById('select-ferry').offsetTop, behavior: 'smooth' });
        }
    };

    const steps = [
        {
            title: 'Search for a Ferry',
            content: '',
        },
        {
            title: 'Choose a Ferry',
            content: <ChooseFerry tripData={tripData} />,
        },
        {
            title: 'Review & Checkout',
            content: 'Last-content',
        },
    ];

    useEffect(() => {
        if (tripData) {
            setCurrent(1)
        }
    }, [tripData])

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>  
        {tripData && tripData.trip0.departure &&
            <>
                <h1 className='text-2xl font-bold mb-5'>Book Your Ferry Trip</h1>
                <p className='text-gray-600 mb-5'>Select your departure and arrival islands, choose the date and time, and book your ferry trip.</p>
                <Steps onChange={onChange} current={current} items={items} />
                <div>{steps[current].content}</div>
            </>
        }
        </>
    )
}
