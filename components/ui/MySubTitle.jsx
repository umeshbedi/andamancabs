import React from 'react'
import dynamic from 'next/dynamic'
const Line = dynamic(() => import('@/components/ui/Line'))

export default function MySubTitle({ heading = "Your Heading", subheading = "This is your Subheading" }) {
  return (
    <>
      <div className='mt-15 w-full'>
        <Line />
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>
    </>
  )
}
