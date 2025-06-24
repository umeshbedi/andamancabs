import React from 'react'

export default function Line({justify="start"}) {
    return (
        <div className='w-fit mb-2'>
        <div className={`flex justify-${justify} w-[160px] h-0.5 py-0 bg-gray-300`}>
            <div className={`w-[80px] h-0.5 bg-[var(--primary)]`} />
        </div>
        </div>
    )
}
