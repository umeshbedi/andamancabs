import React from 'react'
import FerryDiv from './FerryDiv'

export default function Makruzz({makruzzData}) {
  return (
    <div>
        {Array(5).fill(0).map((_, index) => (
            <FerryDiv key={index} />
        ))}
    </div>
  )
}
