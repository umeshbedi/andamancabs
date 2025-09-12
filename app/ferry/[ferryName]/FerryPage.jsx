"use client"

import { Tabs } from 'antd'
import String2Html from '@/components/ui/String2Html'
export default function FerryPage({ data, sortedData }) {

  const tabItem = [
    {
      label: `About ${data.name}`,
      key: 1,
      children: <String2Html id={'aboutFerry'} string={data.about} />,
    },
    {
      label: `Terms and Conditions`,
      key: 2,
      children: <String2Html id={'termAndCondtionFerry'} string={data.termAndCondtion} />,
    }
  ]


  return (
    <div>
      
      <div className="flex justify-center packageSection">
        <div className="w-full flex gap-8 flex-col md:flex-row">
          <div className="w-full md:w-[100%] bg-white p-8 flex flex-col gap-4">
            <Tabs
              size='large'
              type='card'
              items={tabItem}
            />
          </div>
          <div>
            {/* Add content here if needed */}
          </div>
        </div>
      </div>


    </div>


  )
}


