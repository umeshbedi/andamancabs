import React from 'react'

export default function Dropdown({ menu }) {
    return (
        <ul>
            {menu.map((item, index) => (
                <li key={index} className='hover:bg-[var(--primary)] transition duration-1000 ease px-6 py-2 rounded-xl text-nowrap'>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    )
}
