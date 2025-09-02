import React, { useEffect, useRef, useState } from 'react'
import { useGlobalFerryContext } from '../GlobalFerryContext'
import { Avatar } from 'antd';
import { MdOutlineWorkspacePremium } from "react-icons/md";

import { IoTimeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Checkbox } from 'antd';
import { message } from 'antd';

export default function FerrySummary() {

    const { tripData, location, trip0Selected, trip1Selected, trip2Selected, adultData, infantData, billingData } = useGlobalFerryContext();

    const selectedItems = {
        "makruzz": { src: "/img/ferry logo/makruzz-logo.png", name: "Makruzz", infantPrice: 0 },
        "nautika": { src: "/img/ferry logo/Nautika-Logo-square.PNG", name: "Nautika", infantPrice: 105 }
    }

    const [messageApi, contextHolder] = message.useMessage()

    const [grandTotal, setGrandTotal] = useState(
        (trip0Selected ? ((trip0Selected.fare * tripData.trip0.adults) + (selectedItems[trip0Selected.ferry].infantPrice * tripData.trip0.infants) + 50) : 0)
        +
        (trip1Selected ? ((trip1Selected.fare * tripData.trip0.adults) + (selectedItems[trip1Selected.ferry].infantPrice * tripData.trip0.infants) + 50) : 0)
        +
        (trip2Selected ? ((trip2Selected.fare * tripData.trip0.adults) + (selectedItems[trip2Selected.ferry].infantPrice * tripData.trip0.infants) + 50) : 0)
    )

    const [isChecked, setIsChecked] = useState(false)

    function checkPassegners() {
        let isAdultCheck = false;
        let isInfantCheck = false;
        let isBillingcheck = false;

        if (adultData.length > 0) {
            adultData.forEach(item => {
                if (item.name == '' || item.age == '' || item.gender == '' || item.nationality == '')
                    return messageApi.error("Some Fields are missing in adults data. All fields are required")
                else { isAdultCheck = true }
            })
        }

        if (infantData.length > 0) {
            infantData.forEach(item => {
                if (item.name == '' || item.age == '' || item.gender == '' || item.nationality == '')
                    return messageApi.error("Some Fields are missing in infants data. All fields are required")
                else { isInfantCheck = true }
            })
        } else { isInfantCheck = true }

        if (billingData.name == '' || billingData.email == '' || billingData.countryCode == '' || billingData.phone == '' || billingData.idType == '' || billingData.idNumber == '')
            return messageApi.error("Some Fields are missing in billing data. All fields are required")
        else { isBillingcheck = true }

        if(isAdultCheck&&isInfantCheck&&isBillingcheck)
            alert("working fine")
    }

    function SingleFare({ tripName }) {

        const TripTitle = () => {
            if (tripName == "trip 1") {
                return <span>Trip 1</span>
            } else if (tripName == "trip 2") {
                return <span>Trip 2</span>
            } else return <span>Trip 3</span>
        }

        const fromIsland = () => {
            if (tripName == "trip 1") {
                return location[tripData.trip0.fromIsland]
            } else if (tripName == "trip 2") {
                return location[tripData.trip1.fromIsland]
            } else return location[tripData.trip2.fromIsland]
        }

        const toIsland = () => {
            if (tripName == "trip 1") {
                return location[tripData.trip0.toIsland]
            } else if (tripName == "trip 2") {
                return location[tripData.trip1.toIsland]
            } else return location[tripData.trip2.toIsland]
        }

        const ferryName = () => {
            if (tripName == "trip 1") {
                return selectedItems[trip0Selected.ferry].name;
            } else if (tripName == "trip 2") {
                return selectedItems[trip1Selected.ferry].name;
            } else return selectedItems[trip2Selected.ferry].name;
        }

        const ferrySrc = () => {
            if (tripName == "trip 1") {
                return selectedItems[trip0Selected.ferry].src;
            } else if (tripName == "trip 2") {
                return selectedItems[trip1Selected.ferry].src;
            } else return selectedItems[trip2Selected.ferry].src;
        }

        const departure = () => {
            if (tripName == "trip 1") {
                return tripData.trip0.departure;
            } else if (tripName == "trip 2") {
                return tripData.trip1.departure;
            } else return tripData.trip2.departure;
        }

        const className = () => {
            if (tripName == "trip 1") {
                return trip0Selected.className;
            } else if (tripName == "trip 2") {
                return trip1Selected.className;
            } else return trip2Selected.className;
        }

        const timing = () => {
            if (tripName == "trip 1") {
                return trip0Selected.timing;
            } else if (tripName == "trip 2") {
                return trip1Selected.timing;
            } else return trip2Selected.timing;
        }

        const price = () => {
            if (tripName == "trip 1") {
                return trip0Selected.fare;
            } else if (tripName == "trip 2") {
                return trip1Selected.fare;
            } else return trip2Selected.fare;
        }
        const infantPrice = () => {
            if (tripName == "trip 1") {
                return selectedItems[trip0Selected.ferry].infantPrice;
            } else if (tripName == "trip 2") {
                return selectedItems[trip1Selected.ferry].infantPrice;
            } else return selectedItems[trip2Selected.ferry].infantPrice;
        }


        return (
            <div className='flex flex-col gap-2'>
                {(tripData.trip1.added || tripData.trip2.added) &&
                    <span className='text-blue-950 italic bg-gray-300 py-0.5 px-2.5 w-fit text-sm'>#<TripTitle /></span>
                }
                <h4>{`${fromIsland()} -> ${toIsland()}`}
                </h4>
                <div className='w-full flex justify-between'>
                    <div>
                        <div className='flex flex-col sm:flex-row items-center'>
                            <Avatar style={{ padding: 3, background: 'white' }} src={ferrySrc()} />
                            <h4>{ferryName()}</h4>
                        </div>
                        <span className='flex flex-col sm:flex-row gap-2 items-center mt-1'><SlCalender size={20} /> {departure()}</span>
                    </div>

                    <div>
                        <span className='flex flex-col sm:flex-row gap-2 items-center mb-1'><MdOutlineWorkspacePremium size={25} /> {className()}</span>
                        <span className='flex flex-col sm:flex-row gap-2 items-center'><IoTimeOutline size={22} /> {timing()}</span>
                    </div>
                </div>

                <div className='mt-3'>
                    <span className='font-bold'>Billing Details</span>
                    <span className='flex justify-between'>
                        <span>Price for {tripData.trip0.adults} adult</span>
                        <span>₹ {price() * tripData.trip0.adults}</span>
                    </span>

                    {tripData.trip0.infants > 0 &&
                        <span className='flex justify-between'>
                            <span>Price for {tripData.trip0.infants} infant</span>
                            <span>₹ {infantPrice() * tripData.trip0.infants}</span>
                        </span>
                    }

                    <span className='flex justify-between'>
                        <span>Post Service Fee</span>
                        <span>₹ 50</span>
                    </span>

                    <span className='flex justify-between'>
                        <span className='font-bold'>Total</span>
                        <span>₹ {(price() * tripData.trip0.adults) + (infantPrice() * tripData.trip0.infants) + 50}</span>
                    </span>

                </div>

                <div className='border-t border-gray-300 mt-3 mb-3'></div>
            </div>
        )
    }

    return (
        <div>
            {contextHolder}

            {trip0Selected && <SingleFare tripName={"trip 1"} />}
            {trip1Selected && <SingleFare tripName={"trip 2"} />}
            {trip2Selected && <SingleFare tripName={"trip 3"} />}

            <span className='flex justify-between mb-5'>
                <span className='font-bold'>Grand Total</span>
                <span>₹ {grandTotal}</span>
            </span>

            <span><Checkbox onChange={(e) => setIsChecked(e.target.checked)} /> I agree with the <a className='text-blue-900' href='/terms-and-condition'>Terms & Conditions</a></span>

            <button className={`w-full ${isChecked ? 'bg-[var(--primary)]' : 'bg-gray-300'} cursor-pointer py-3 rounded-full mt-5 font-semibold`}
                onClick={checkPassegners}
                disabled={isChecked ? false : true}
            >
                Proceed to Checkout
            </button>
        </div>
    )
}
