import { DatePicker } from 'antd'
import React from 'react'

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};


export default function Departure({ getDeparture = (e) => { } }) {
  return (
    <div className='w-full'>
      <p className='text-sm text-gray-500 mb-2'>Departure</p>
      <DatePicker
        block
        size='large'
        format="YYYY-MM-DD"
        className='w-full'
        onChange={(date, dateString) => {
          getDeparture(dateString);
          // console.log(dateString); // Log the selected date in DD-MM-YYYY format
        }}
        disabledDate={disabledDate}
      />
    </div>

  )
}
