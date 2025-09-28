"use client"
import { Collapse } from 'antd'
import React from 'react'
import String2Html from '../ui/String2Html'
import { CaretRightOutlined } from '@ant-design/icons'


export default function Accordian({data=[]}) {
    return (
        <Collapse
            size='large'
            expandIconPosition='end'
            defaultActiveKey={0}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            accordion={false} style={{ background: 'none' }}
            items={data.map((item, i) => {
                return {
                    key: i,
                    label: <h4>{item.heading}</h4>,
                    children: <div>
                        <String2Html id={`${item.heading}${i + 1}`} string={item.content} />
                        {(!item.image || item.image != "#") &&
                            <img src={item.image} alt={item.heading} loading='lazy' style={{ width: '100%', borderRadius: '20px', marginTop: 10 }} />
                        }
                    </div>
                }
            })}
        />
    )
}
