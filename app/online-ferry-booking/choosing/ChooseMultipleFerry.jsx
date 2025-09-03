import { useEffect, useState } from 'react';
import { useGlobalFerryContext } from '../components/GlobalFerryContext';
import ChooseFerry from './ChooseFerry';
import { Spin } from 'antd';

export default function ChooseMultipleFerry() {
    const { tripData, location, trip0Selected, trip1Selected, trip2Selected } = useGlobalFerryContext();

    const [loading, setLoading] = useState(false);

    if (!tripData) return <Spin />;

    return (
        <div className='mt-10'>

            {(tripData.trip1.added || tripData.trip2.added) &&
                <div className='flex sm:flex-row justify-center flex-col gap-3 mb-3'>
                    {tripData.trip0.added &&
                        <span className={`${!trip0Selected ? "bg-gray-300" : "bg-green-200"} px-3 py-1 rounded-e-full`}
                        >#Trip 1 | {`${location[tripData.trip0.fromIsland]} -> ${location[tripData.trip0.toIsland]}`}
                        </span>
                    }
                    {tripData.trip1.added &&
                        <span className={`${!trip1Selected ? "bg-gray-300" : "bg-green-200"} px-3 py-1 rounded-e-full`}
                        >#Trip 2 | {`${location[tripData.trip1.fromIsland]} -> ${location[tripData.trip1.toIsland]}`}
                        </span>
                    }
                    {tripData.trip2.added &&
                        <span className={`${!trip2Selected ? "bg-gray-300" : "bg-green-200"} px-3 py-1 rounded-e-full`}
                        > #Trip 3 | {`${location[tripData.trip2.fromIsland]} -> ${location[tripData.trip2.toIsland]}`}
                        </span>
                    }
                </div>
            }

            {!trip0Selected &&
                <>
                    {/* {(tripData.trip1.added || tripData.trip2.added) &&
                        <span className='bg-gray-300 px-3 py-1 rounded-e-full'> #Trip 1 | {`${location[tripData.trip0.fromIsland]} -> ${location[tripData.trip0.toIsland]}`}</span>
                    } */}
                    <ChooseFerry tripData={tripData.trip0} tripName={"trip 1"} />
                </>
            }

            {trip0Selected && !trip1Selected &&
                <>
                    {/* <span className='bg-gray-300 px-3 py-1 rounded-e-full'> #Trip 2 | {`${location[tripData.trip0.fromIsland]} -> ${location[tripData.trip0.toIsland]}`}</span> */}
                    <ChooseFerry tripData={tripData.trip1} tripName={"trip 2"} />
                </>
            }

            {trip0Selected && trip1Selected && !trip2Selected &&
                <>
                    {/* <span className='bg-gray-300 px-3 py-1 rounded-e-full'> #Trip 3 | {`${location[tripData.trip0.fromIsland]} -> ${location[tripData.trip0.toIsland]}`}</span> */}
                    <ChooseFerry tripData={tripData.trip2} tripName={"trip 3"} />
                </>
            }
        </div>
    )
}
