import { Divider } from 'antd'
import React from 'react'
import PlusMinus from './PlusMinus'


export default function AdultInfant({ getAdult = (e) => { }, getInfant = (e) => { } }) {
    return (
        <div className='flex mb-4 gap-5'>
            <div>
                <p className='text-sm text-gray-500 mb-2'>Adults (2+ years)</p>
                <PlusMinus number={1} getValue={(e) => { getAdult(e) }} />
            </div>

            <Divider type="vertical" style={{ height: 60 }} />

            <div>
                <p className='text-sm text-gray-500 mb-2'>Infants (0-2 years)</p>
                <PlusMinus number={0} getValue={(e) => { getInfant(e) }} />
            </div>

        </div>
    )
}
