import React from 'react'

import dynamic from 'next/dynamic'
import MySubTitle from '@/components/ui/MySubTitle'
import { getAllCabs } from '@/components/utils/actions/cabsAction'
import { Empty } from 'antd'
import CabItem from './CabItem'

const CabCard = dynamic(() => import('@/components/layout/cabs/CabCard'))
const Line = dynamic(() => import('@/components/ui/Line'))

export default async function CabsIsland({ heading, subheading, id }) {

    const cabsData = await getAllCabs({ id: id, limitCount: 3 })
    // console.log(cabsData)

    return (
        <div>
            <MySubTitle heading={heading} subheading={subheading} />
            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {cabsData.length > 0
                    ?
                    cabsData.map((item, index) => (
                        <CabItem key={index} data={item}/>
                    ))
                    :
                    (<Empty />)
                }

            </div>

        </div>
    )
}
