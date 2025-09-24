"use client"
import { Form } from 'antd'
import React from 'react'
import { Input, Button, Space } from 'antd';
import { contactUsEmail } from '@/components/layout/contactForms/contactUsEmail';
export default function ContactForm() {
    
    return (
        <div className='bg-gray-100 p-8 rounded-xl w-full'>
            <Form style={{}}
                onFinish={(e) => {
                    if(confirm("Are you sure want send enuqiry?"))
                        contactUsEmail({
                            name:e.name,
                            email:e.email,
                            mobile:e.mobile,
                            adults:e.adults,
                            childs:e.child,
                            message:e.message
                        })
                        .then(e=>alert("Message Sent Successfully!"))
                        .catch(err=>alert(err.messsage))
                }}>
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
                            <Input size='large' type='number' placeholder='Infants'  />
                        </Form.Item>
                        <Form.Item name={"child"} style={{ margin: 0 }} >
                            <Input size='large' type='number' placeholder='Kids(>2Y)'  />
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
