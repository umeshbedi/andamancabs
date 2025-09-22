import { Input } from 'antd'
import { Select } from 'antd';
import { Space } from 'antd'
import { Form } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import CountryCode from '@/components/lib/countryCodes.json'
import { message } from 'antd';
import DateAndTime from './DatesAndTime';
import { paymentAction } from './pamentAction';
import { activityEnquiryEmail } from './activityEnquiry';


export default function ActivityForm({ packageDetails = { packageTitle: "" }, price = 0, closeForm = () => { } }) {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (packageDetails) {
            form.setFieldsValue({
                packageName: packageDetails.packageTitle || "",
            });
        }
        // console.log(packageDetails);
    }, [packageDetails, form]);

    const handleEmail = async (values) => {
        messageApi.loading('Submitting your Booking enquiry...', 0);
        try {
            await activityEnquiryEmail({
                service: values.packageTitle || "",
                name: values.name,
                email: values.email,
                mobile: `${values.mobileCode}${values.mobileNumber}`,
                childs: values.childs,
                adults: values.adults,
                date: values.date,
                price: (price * values.adults),

            }).then((res) => {
                if (res.status !== 200) {
                    messageApi.destroy();
                    throw new Error('Failed to send enquiry');
                } else {
                    messageApi.destroy();
                    console.log("Booking email sent!");
                    messageApi.success('Activity Booking submitted successfully! Check your email for confirmation.');
                    setTimeout(() => {
                        closeForm();
                    }, 2000);

                }
            });

        } catch (err) {
            console.error("Error:", err);
            messageApi.destroy();
            messageApi.error('Failed to submit enquiry. Please try again later.');
        }
    };

    return (
        <div className='mt-5 bg-gray-50'>
            {contextHolder}
            <div className='flex gap-3 flex-shrink-0 sm:h-[490px]'>
                <img src="/img/forms/Final All Cabs.png" alt="Package Form background" loading='lazy' className='w-[50%] hidden sm:block object-contain' />

                <Form
                    onFinish={(e) => {
                        messageApi.loading('Processing payment. Please be patient...', 0);
                        paymentAction({
                            amount: price *e.adults,
                            paymentFor: "Cab Booking",
                            clickEvent: (status) => {
                                if (status === "not loading") messageApi.destroy();
                                if (status === "payment success") handleEmail(e);
                            }
                        })
                    }}

                    className='w-full sm:w-[70%] bg-amber-400 rounded-xl shadow-lg'
                    layout='vertical'
                    style={{ padding: '2rem', boxSizing: 'border-box' }}
                    initialValues={{ packageTitle: packageDetails?.packageTitle || "" }}
                >

                    <h1 className='mb-3' style={{ fontSize: '1.8rem' }}>Book Your Ride</h1>


                    <Form.Item layout='horizontal' label="Services You'r going to book" name="packageTitle" rules={[{ required: true }]} >
                        <Input size='large' disabled style={{ background: 'white', color: 'black' }} />
                    </Form.Item>

                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>
                        <Form.Item layout='horizontal' label="Name" name="name" rules={[{ required: true }]}>
                            <Input size='large' placeholder='Enter Your Name' />
                        </Form.Item>
                        <Form.Item layout='horizontal' label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Your Email' />
                        </Form.Item>

                    </div>


                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>


                        <Form.Item
                            label="Mobile No."
                            name="mobile"
                            rules={[{ required: true, message: "Please enter mobile number" }]}
                            getValueFromEvent={(_, allValues) => {
                                const code = allValues?.mobileCode || "+91";
                                return `${code}${allValues?.mobileNumber || ""}`;
                            }}
                            style={{ width: "100%" }}
                        >
                            <Space.Compact >
                                <Form.Item name="mobileCode" noStyle initialValue="+91">
                                    <Select size="large" showSearch style={{ width: 100 }} options={CountryCode} />
                                </Form.Item>
                                <Form.Item name="mobileNumber" noStyle>
                                    <Input size="large" type="number" placeholder="Enter Your Mobile No." />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>

                        <Form.Item label="Date of Activity" name="date" rules={[{ required: true }]} style={{ width: "100%" }}>
                            <DateAndTime showTime={false} />
                        </Form.Item>

                    </div>

                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>


                    </div>

                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>
                        <Form.Item label="Adults (>12 years)" name="adults" rules={[{ required: true }]} style={{ width: "100%" }}>
                            <Input size='large' type='number' placeholder='Enter Adult number' />
                        </Form.Item>

                        <Form.Item label="Childs (3-12 years)" name="childs" style={{ width: "100%" }}>
                            <Input size='large' type='number' placeholder='Enter Child number' />
                        </Form.Item>

                    </div>

                    <Input type='submit' value={"Pay Now"} style={{ background: 'teal', padding: "0.7rem 2.5rem", borderRadius: "3rem", fontSize: '1.1rem', marginTop: ".5rem", color: "white", cursor: 'pointer' }} />
                </Form>
            </div>
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        </div>
    )
}
