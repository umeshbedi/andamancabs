import { DatePicker } from 'antd'
const { RangePicker } = DatePicker;
import React from 'react'

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const disabledDate = current => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};


export default function Dates({ getDateRange = (e) => { } }) {
  return (
    <div className='w-full'>
      <p className='mb-1'>Select Date Range:</p>
      <RangePicker
        block
        size='large'
        format="DD-MM-YYYY"
        className='w-full'
        onChange={(date, dateString) => {
          getDateRange(dateString);
          // console.log(dateString); // Log the selected date in DD-MM-YYYY format
        }}
        disabledDate={disabledDate}
      />
    </div>

  )
}
