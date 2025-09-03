import React, { useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

export default function PlusMinus({number=1, getValue=(e)=>{}}) {

    const [count, setCount] = useState(number);
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
        getValue(count + 1);
    };
    const handleDecrement = () => {
        setCount(prevCount => (prevCount > number ? prevCount - 1 : number));
        getValue(count > number ? count - 1 : number);
    };
    
    return (
        <p className='flex items-center justify-between gap-3'>
            <MinusOutlined onClick={handleDecrement} style={{ fontSize: 13 }} className='bg-gray-200 shadow-sm p-2 rounded-full cursor-pointer' />
            <span>{count}</span>
            <PlusOutlined onClick={handleIncrement} style={{ fontSize: 13 }} className='bg-[var(--primary)] shadow-sm p-2 rounded-full cursor-pointer' />
        </p>
    )
}
