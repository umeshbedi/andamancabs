"use client"
import { FaBed, FaTag, FaTags } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { Divider } from 'antd'
import Dates from './Dates';
import { Modal } from 'antd';
import PackageForm from '@/components/layout/contactForms/PackageForm';
import { useState } from 'react';
import { message } from 'antd';
import { commaPrice } from '@/components/utils/actions/commaPrice';


export default function CostSection({ price = 3000, hotelName = [], packageDetails }) {
    const [openModal, setOpenModal] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    // Message API from antd

    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <div className="w-full border border-[var(--primary)] rounded-3xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-[var(--primary)] to-amber-100 p-5 flex justify-between rounded-3xl flex-wrap">
                    <div>
                        <span className="text-sm text-black">Starting from</span>
                        <h4 className="text-black font-bold" style={{ fontSize: 30 }}>
                            <span className="font-normal text-gray-600 line-through"
                                style={{ fontSize: 14 }}>₹{((price||0) * 1.3).toFixed(0)}</span> ₹ {commaPrice(price||0)}
                            <span className="font-normal text-black"
                                style={{ fontSize: 14 }}> /person</span>
                        </h4>
                        <span className="text-sm text-black">(inclusive 5% GST)</span>
                    </div>
                    <div className="rounded-full px-3 py-1 mt-2 bg-black text-white flex justify-center items-center h-fit">
                        <span className="text-base">Save 30%</span>
                    </div>
                </div>
                <div className="p-5">
                    <Divider style={{ margin: 0, marginBottom: 10 }} />
                    <p className="font-bold text-xl mb-1 flex items-center gap-1 shrink-0"><FaBed /> Include Hotel</p>
                    {hotelName.map((item, index) => (
                        <p className='flex items-center gap-1 shrink-0' key={index}><IoMdCheckmarkCircleOutline className='mt-.5' size={20} color='green' /> {item}</p>
                    ))}

                    <Divider />

                    <Dates getDateRange={(e) => setDateRange(e)} />

                    <button
                        onClick={() => { 
                            if (!dateRange[0] || !dateRange[1]) {
                                messageApi.warning('Please select a date range first!');
                                return;
                            }
                            setOpenModal(true)
                        }}
                        className='bg-[var(--primary)] mt-5 w-full py-3 px-10 rounded-full cursor-pointer'
                    >
                        Enquire Now 
                    </button>
                </div>
            </div>

            <Modal
                open={openModal}
                footer={null}
                onCancel={() => { setOpenModal(false) }}
                destroyOnHidden
                width={"80%"}
                style={{ top: 50 }}
            >
                <PackageForm 
                packageDetails={packageDetails} 
                dateRange={dateRange} 
                price={price}
                closeForm={()=>setOpenModal(false)}
                />
            </Modal>
        </>
    );
}