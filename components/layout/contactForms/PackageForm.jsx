import { Input } from 'antd'
import { Space } from 'antd'
import { Form } from 'antd'
import React, { useState } from 'react'

export default function PackageForm({ packageDetails }) {

    const [name, setName] = useState(packageDetails.packageName || "")


    return (
        <div className='mt-5'>

            <div className='flex gap-3 flex-shrink-0'>
                <img src="/img/forms/Final All Package.png" alt="Package Form background" loading='lazy' className='w-[50%] h-full hidden sm:block' />

                <Form onFinish={(e) => { console.log(e) }} className='w-[50%] bg-amber-400 rounded-xl shadow-lg' layout='vertical' style={{ padding: '2rem', boxSizing: 'border-box' }}>

                    <h1 className='mb-3'>Book Your Package</h1>

                    <Form.Item label="Package You'r going to book" name="packageName" rules={[{ required: true }]} >
                        <Input value={name} disabled size='large' placeholder='Enter Package Name' className='bg-white'/>
                    </Form.Item>

                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input size='large' placeholder='Enter Your Name' />
                    </Form.Item>

                    <div className='flex gap-3 flex-wrap'>

                    <Form.Item label="Mobile No." name="mobile" rules={[{ required: true }]}>
                        <Input size='large' placeholder='Enter Your Name' />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input size='large' placeholder='Enter Your Email' />
                    </Form.Item>
                    </div>

                    <div className='flex gap-3'>
                        <Form.Item label="Arrival Time" name="arival" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Arrival Time' disabled/>
                        </Form.Item>

                        <Form.Item label="Departure Time" name="departure" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Departure Time' disabled/>
                        </Form.Item>
                    </div>

                    
                    <div className='flex gap-3'>
                        <Form.Item label="Adults (>12Years)" name="arival" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Arrival Time' />
                        </Form.Item>

                        <Form.Item label="Child (5-12years)" name="departure" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Departure Time' />
                        </Form.Item>
                        
                        <Form.Item label="Infant (0-5years)" name="departure" rules={[{ required: true, type: 'email' }]}>
                            <Input size='large' placeholder='Enter Departure Time' />
                        </Form.Item>
                    </div>

                    <Input type='submit' value={"Submit"} style={{ background: 'teal', padding: "0.7rem 2.5rem", borderRadius: "3rem", fontSize: '1.1rem', marginTop: "1rem", color:"white", cursor:'pointer' }} />
                </Form>
            </div>
        </div>
    )
}
