import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { mobile } from '../utils/variables';

export default function MyButton({ name, slug }) {
    const [display, setDisplay] = useState('none')
    const [padding, setPadding] = useState("10px 20px")
    

    return (
        
        <Link
            onMouseOver={() => { setDisplay("inline-block"); setPadding("10px 35px 10px 20px") }}
            onMouseOut={() => { setDisplay("none"); setPadding("10px 20px") }}
            style={{
                background: "var(--primary)",
                padding: padding,
                borderRadius: 50,
                color: 'black',
                fontWeight: 400,
                marginTop: 20,
                cursor: 'pointer',
                position: 'relative',
                transition: "padding .5s",
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
            }}
            href={slug}>
            {name} <ArrowRightOutlined style={{ display: display, position: 'absolute', right: 10 }} />
        </Link>
    )
}
