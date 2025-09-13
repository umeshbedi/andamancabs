import { Input } from 'antd'
import { Form } from 'antd'
import React from 'react'

export default function PackageForm() {
    return (
        <div>
            <Form layout='horizontal'>
                
                <Form.Item layout="vertical" label="Name" name="name" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
            </Form>
        </div>
    )
}
