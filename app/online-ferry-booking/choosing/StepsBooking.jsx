import { Steps, theme } from 'antd';
import React, { useEffect, useState } from 'react'
// import ChooseFerry from './ChooseFerry';
import dynamic from 'next/dynamic';
import SHome from '@/components/skeleton/SHome';
import ChooseMultipleFerry from './ChooseMultipleFerry';
const ChooseFerry = dynamic(() => import("./ChooseFerry"), { ssr: false, loading: () => <><SHome /></> })
const ReviewCheckout = dynamic(() => import("./ReviewCheckout"), { ssr: false, loading: () => <><SHome /></> })
import { useGlobalFerryContext } from '../GlobalFerryContext';

export default function StepsBooking() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(1);

    const {tripData, trip0Selected, trip1Selected, trip2Selected, updateTripData} = useGlobalFerryContext();

    const onChange = value => {
        console.log('onChange:', value);
        setCurrent(value);
        if (value == 0) {
            window.scrollTo({ top: document.getElementById('select-ferry').offsetTop, behavior: 'smooth' });
            updateTripData(null) ; // Reset tripData when going back to the first step
        }
    };

    const steps = [
        {
            title: 'Search for a Ferry',
            content: '',
        },
        {
            title: 'Choose a Ferry',
            content: <ChooseMultipleFerry />,
        },
        {
            title: 'Review & Checkout',
            content: <ReviewCheckout tripData={tripData} />,
        },
    ];

    // useEffect(() => {
    //     if (tripData) {
    //         setCurrent(1)
    //     }
    // }, [tripData])

    useEffect(() => {
      if(trip0Selected && !tripData.trip1.added && !tripData.trip2.added){
        setCurrent(2)
      }
      else if(trip0Selected && trip1Selected && !tripData.trip2.added){
        setCurrent(2)
      }
      else if(trip0Selected && trip1Selected && trip2Selected){
        setCurrent(2)
      }
      else{
        setCurrent(1)
      }
      
    
      console.log(trip0Selected, trip1Selected, trip2Selected);
      
    }, [trip0Selected, trip1Selected, trip2Selected])
    

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>  
        {tripData && tripData.trip0.departure &&
            <>
                <h1 className='text-2xl text-center font-bold mb-5'>Book Your Ferry Trip</h1>
                <p className='text-gray-600 mb-5 text-center'>Select your departure and arrival islands, choose the date and time, and book your ferry trip.</p>
                <Steps current={current} items={items} />
                <div>{steps[current].content}</div>
            </>
        }
        </>
    )
}
