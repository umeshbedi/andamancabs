import React, { useRef, useState } from 'react'

import { SwapOutlined } from '@ant-design/icons'
import { Divider } from 'antd';
import { Select } from 'antd'


export default function FromToDiv({ getFromIsland = (e) => { }, getToIsland = (e) => { } }) {

    const [fromIsland, setFromIsland] = useState("portblair")
    const [toIsland, setToIsland] = useState("neilisland")

    const isLand = [
        { value: "portblair", label: "Port Blair" },
        { value: "neilisland", label: "Neil Island (Shaheed Dweep)" },
        { value: "havelock", label: "Havelock Island (Swaraj Dweep)" },
    ];

    function handleSwap() {
        setFromIsland(toIsland);
        setToIsland(fromIsland);
        getFromIsland(toIsland);
        getToIsland(fromIsland);
    }

    return (
        <div className='justify-center items-center flex sm:flex-row flex-col gap-5'>
            <div>
                <p className='text-sm text-gray-500 mb-2'>From</p>
                <Select
                    value={fromIsland}
                    className='md:w-[250px] sm:w-[150px] w-[300px]'
                    size='large'
                    onChange={(e) => { setFromIsland(e); getFromIsland(e) }}
                    options={isLand.map((item) => ({
                        value: item.value,
                        label: item.label,
                        disabled: item.value === toIsland ? true : false
                    }))}
                />
            </div>

            <div className='items-center justify-center sm:flex hidden relative mx-3'>
                <Divider type="vertical" style={{ height: 60 }} />
                <SwapOutlined onClick={handleSwap} style={{ fontSize: 20, position: 'absolute' }} className='bg-white shadow-sm p-2 rounded-full cursor-pointer' />
            </div>

            <div className='items-center justify-center sm:hidden flex relative mx-3 w-full my-3'>
                <Divider style={{margin:0}}/>
                <SwapOutlined onClick={handleSwap} style={{ fontSize: 20, position: 'absolute', rotate:'90deg' }} className='bg-white shadow-sm p-2 rounded-full cursor-pointer' />
            </div>


            {/* To div */}
            <div>
                <p className='text-sm text-gray-500 mb-2'>To</p>
                <Select
                    value={toIsland}
                    className='md:w-[250px] sm:w-[150px] w-[300px]'
                    size='large'
                    onChange={(e) => { setToIsland(e); getToIsland(e) }}
                    options={isLand.map((item) => ({
                        value: item.value,
                        label: item.label,
                        disabled: item.value === fromIsland ? true : false
                    }))}
                />
            </div>
        </div>
    )
}
