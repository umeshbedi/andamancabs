"use client"
import React from 'react'
import {Skeleton, Row, Col} from 'antd'
export default function SHeader() {
  return (
    <div style={{ display: "flex", height: 50,  width: '100%', justifyContent: 'space-between', alignItems: 'center', padding:"0 5%" }}>

        <div style={{ width: '20%' }}>
          <Skeleton.Button active block />
        </div>
        <div style={{ width: '60%' }}>
          <Skeleton.Button active block />
        </div>
      </div>
  )
}
