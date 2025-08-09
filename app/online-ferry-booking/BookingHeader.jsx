import { DeleteFilled, PlusCircleOutlined, SwapOutlined } from '@ant-design/icons'
import { Divider, message, Button } from 'antd';
import React, { useState } from 'react'
import FromToDiv from './FromToDiv';
import Departure from './Departure';
import AdultInfant from './AdultInfant';
import { useRouter } from 'next/navigation'




export default function BookingHeader({ getTripData = (e) => { } }) {

    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();

    const [tripArray, setTripArray] = useState([])
    const [tripData, setTripData] = useState({
        trip0: { fromIsland: "portblair", toIsland: "neilisland", departure: undefined, adults: 1, infants: 0 },
        trip1: { fromIsland: "portblair", toIsland: "neilisland", departure: undefined, added: false },
        trip2: { fromIsland: "portblair", toIsland: "neilisland", departure: undefined, added: false }
    })

    function TripDiv({ index = 1 }) {
        return (
            <div className='flex justify-center items-center lg:flex-row flex-col gap-5'>
                <FromToDiv
                    getFromIsland={(value) => {
                        setTripData((prev) => ({
                            ...prev,
                            [`trip${index}`]: { ...prev[`trip${index}`], fromIsland: value }
                        }))

                    }}
                    getToIsland={(value) => {
                        setTripData((prev) => ({
                            ...prev,
                            [`trip${index}`]: { ...prev[`trip${index}`], toIsland: value }
                        }))

                    }}
                />

                <Divider type="vertical" style={{ height: 60 }} />

                <Departure getDeparture={(value) => {
                    if (index === 1) {
                        setTripData(prev => ({
                            ...prev,
                            trip1: { ...prev.trip1, departure: value }
                        }))
                    } else {
                        setTripData(prev => ({
                            ...prev,
                            trip2: { ...prev.trip2, departure: value }
                        }))
                    }
                }}
                />
            </div>
        )
    }

    function handleAddTrip() {
        if (tripArray.length >= 2) {
            messageApi.error("You can add only 2 Trips.");
            return;
        }
        setTripArray([...tripArray, <TripDiv key={tripArray.length} index={tripArray.length + 1} />])
        setTripData((prev) => ({
            ...prev,
            [`trip${tripArray.length + 1}`]: {
                ...prev[`trip${tripArray.length + 1}`],
                added: true
            }
        }));
    }

    function handleRemoveTrip(index) {
        const newTripArray = tripArray.filter((_, i) => i !== index);
        setTripArray(newTripArray);
        setTripData((prev) => ({
            ...prev,
            [`trip${index + 1}`]: {
                ...prev[`trip${index + 1}`],
                added: false
            }
        }));
    }

    const goToDetails = () => {
        // localStorage.setItem('tripData', JSON.stringify(tripData));
        // router.push('/online-ferry-booking/details');
        if (tripArray.length > 2) return;

        if (!tripData.trip0.departure || tripData.trip1.added && !tripData.trip1.departure || tripData.trip2.added && !tripData.trip2.departure) {
            messageApi.error("Please select a departure date for the first trip.");
            return;
        }
        getTripData(tripData);
    };

    return (
        <>
            {contextHolder}
            <div>
                <div id='select-ferry' className='w-full h-[450px] relative overflow-hidden mt-10 -z-10'>
                    <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <h1 style={{ color: 'white', textShadow: "2px 2px 4px #000000", textAlign: 'center' }}>Online Ferry Booking</h1>
                    </div>

                    <img
                        src="/uploads/header-banners/6899.jpg"
                        alt="Ferry Booking Header"
                        className='w-full h-full object-cover'
                    />

                </div>

                <div className='w-full -mt-10 flex justify-center items-center'>
                    <div className='w-[90%] flex flex-col items-center bg-white rounded-xl shadow-lg p-5 pb-10 border border-gray-200 relative'>

                        <div className='flex justify-center items-center lg:flex-row flex-col gap-5'>
                            <FromToDiv
                                getFromIsland={(value) => setTripData((prev) => ({
                                    ...prev,
                                    trip0: { ...prev.trip0, fromIsland: value }
                                }))}
                                getToIsland={(value) => setTripData((prev) => ({
                                    ...prev,
                                    trip0: { ...prev.trip0, toIsland: value }
                                }))}
                            />

                            <Divider type="vertical" style={{ height: 60 }} />

                            <Departure getDeparture={(value) => setTripData(prev => ({
                                ...prev,
                                trip0: { ...prev.trip0, departure: value }
                            }))}
                            />

                            <Divider type="vertical" style={{ height: 60 }} />

                            <AdultInfant
                                getAdult={(value) => setTripData((prev) => ({
                                    ...prev,
                                    trip0: { ...prev.trip0, adults: value }
                                }))}
                                getInfant={(value) => setTripData((prev) => ({
                                    ...prev,
                                    trip0: { ...prev.trip0, infants: value }
                                }))}
                            />

                        </div>

                        {tripArray.map((trip, index) => (
                            <div key={index} className='w-full mt-5 flex justify-between items-center'>
                                {trip}
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleRemoveTrip(index)}
                                    icon={<DeleteFilled />}
                                    className='mt-6'
                                >

                                </Button>
                            </div>
                        ))}

                        {/* Add Trip button */}

                        <Divider />

                        {/* Add Trip and search button */}
                        <div className='absolute bottom-0 -mb-6 flex justify-center gap-3'>
                            <button onClick={handleAddTrip} className='bg-white border border-[var(--primary)] py-3 px-6 rounded-full cursor-pointer'><PlusCircleOutlined /> Add Trip</button>
                            <button onClick={goToDetails} className='bg-[var(--primary)] py-3 px-10 rounded-full cursor-pointer'>Search</button>
                        </div>

                    </div>

                    <div id='booking-page' />
                </div>
            </div>
        </>
    )
}
