import { Input } from 'antd'
import { Select } from 'antd';
import { Space } from 'antd'
import { Form } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import CountryCode from '@/components/lib/countryCodes.json'

import { message } from 'antd';
import { packageEnquiryEmail } from './PackageEnquiry';


export default function PackageForm({ packageDetails, dateRange = [null, null], price = 0, closeForm=() => { } }) {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (packageDetails) {
            form.setFieldsValue({
                packageName: packageDetails.packageName || "",
                dateRange
            });
        }
        // console.log(packageDetails);
    }, [packageDetails, form]);

    const handleFinish = async (values) => {
        messageApi.loading('Submitting your enquiry...', 0);
        try {
            await packageEnquiryEmail({
                packageName: `${values.packageName || ""} (${packageDetails?.packageTitle || ""})`,
                price: (price * values.adult),
                name: values.name,
                email: values.email,
                mobile: `${values.mobileCode}${values.mobileNumber}`,
                adult: values.adult,
                child: values.child,
                infant: values.infant,
                dateRange
            }).then((res)=>{
                if(res.status !== 200){
                    messageApi.destroy();
                    throw new Error('Failed to send enquiry');
                }else{
                    messageApi.destroy();
                    messageApi.success('Enquiry submitted successfully!');
                    console.log("Enquiry email sent!");
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
                <img src="/img/forms/Final All Package.png" alt="Package Form background" loading='lazy' className='w-[50%] hidden sm:block object-contain' />

                <Form
                    onFinish={handleFinish}
                    className='w-full sm:w-[50%] bg-amber-400 rounded-xl shadow-lg'
                    layout='vertical'
                    style={{ padding: '2rem', boxSizing: 'border-box' }}
                    initialValues={{ packageName: packageDetails?.packageName || "", dateRange }}
                >

                    <h1 className='mb-3' style={{ fontSize: '1.8rem' }}>Book Your Package</h1>
                    
                    <Form.Item layout='horizontal' label="Package You'r going to book" name="packageName" rules={[{ required: true }]} >
                        <Input size='large' disabled style={{ background: 'white', color: 'black' }} />
                    </Form.Item>

                    <Form.Item layout='horizontal' label="Name" name="name" rules={[{ required: true }]}>
                        <Input size='large' placeholder='Enter Your Name' />
                    </Form.Item>

                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>

                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Your Email' />
                        </Form.Item>

                        <Form.Item
                            label="Mobile No."
                            name="mobile"
                            rules={[{ required: true, message: "Please enter mobile number" }]}
                            getValueFromEvent={(_, allValues) => {
                                const code = allValues?.mobileCode || "+91";
                                return `${code}${allValues?.mobileNumber || ""}`;
                            }}
                        >
                            <Space.Compact>
                                <Form.Item name="mobileCode" noStyle initialValue="+91">
                                    <Select size="large" showSearch style={{ width: 100 }} options={CountryCode} />
                                </Form.Item>
                                <Form.Item name="mobileNumber" noStyle>
                                    <Input size="large" type="number" placeholder="Enter Your Mobile No." />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>

                    </div>

                    <div className='flex gap-3 flex-wrap sm:flex-nowrap'>
                        <Form.Item label="Adults (>12Years)" name="adult" rules={[{ required: true }]}>
                            <Input size='large' type='number' placeholder='Enter Adults Number' />
                        </Form.Item>

                        <Form.Item label="Child (5-12years)" name="child" >
                            <Input size='large' type='number' placeholder='Enter Childs Number' />
                        </Form.Item>

                        <Form.Item label="Infant (0-5years)" name="infant">
                            <Input size='large' type='number' placeholder='Enter Infants Number' />
                        </Form.Item>
                    </div>

                    <Input type='submit' value={"Submit"} style={{ background: 'teal', padding: "0.7rem 2.5rem", borderRadius: "3rem", fontSize: '1.1rem', marginTop: ".5rem", color: "white", cursor: 'pointer' }} />
                </Form>
            </div>
        </div>
    )
}
