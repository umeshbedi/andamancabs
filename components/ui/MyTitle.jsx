import React from 'react'
import dynamic from 'next/dynamic'
const Line = dynamic(() => import('@/components/ui/Line'))

export default function MyTitle({heading="Your Heading", subheading="This is your Subheading", className}) {
  return (
    <>
    <Line justify='center' />
      <h1 className={className}>{heading}</h1>
      <p className='text-center text-xl'>{subheading}</p>
    </>
  )
}
