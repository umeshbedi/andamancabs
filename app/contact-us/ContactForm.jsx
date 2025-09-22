"use client"
import { Form } from 'antd'
import React from 'react'
import { Input, Button, Space } from 'antd';
export default function ContactForm() {
    return (
        <div className='bg-gray-100 p-8 rounded-xl w-full'>
            <Form style={{}}
                onFinish={(e) => console.log(e)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Form.Item name={"name"} style={{ margin: 0 }} required >
                        <Input size='large' placeholder='Enter Your Name' required />
                    </Form.Item>
                    <Form.Item name={"mobile"} style={{ margin: 0 }} required >
                        <Input size='large' type='number' placeholder='Enter Mobile Number' required />
                    </Form.Item>
                    <Form.Item name={"email"} style={{ margin: 0 }} required >
                        <Input size='large' type='email' placeholder='Enter Email ID' required />
                    </Form.Item>
                    <Space>
                        <Form.Item name={"adults"} style={{ margin: 0 }} required >
                            <Input size='large' type='number' placeholder='Adults' required />
                        </Form.Item>
                        <Form.Item name={"infants"} style={{ margin: 0 }} >
                            <Input size='large' type='number' placeholder='Infants' required />
                        </Form.Item>
                        <Form.Item name={"kids"} style={{ margin: 0 }} >
                            <Input size='large' type='number' placeholder='Kids(>2Y)' required />
                        </Form.Item>

                    </Space>

                    <Form.Item name={"message"} style={{ margin: 0 }} required >
                        <Input.TextArea rows={4} placeholder='Write Message' required />
                    </Form.Item>

                    <Button type='primary' style={{ background: "var(--primary)", color: "black" }} htmlType='submit' size='large'>Send Query</Button>
                </div>
            </Form>
        </div>
    )
}
