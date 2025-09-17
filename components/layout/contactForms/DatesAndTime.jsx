import { DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  // Disable past days
  return current && current < dayjs().endOf("day");
};

export default function DateAndTime({ value, onChange, showTime = true }) {
  return (
    <div className="w-full relative">
      <DatePicker
        showTime={showTime ? { format: "HH:mm" } : false}
        size="large"
        format={showTime?"DD-MM-YYYY HH:mm":"DD-MM-YYYY"}
        className="w-full"
        placeholder="Select Date and Time"
        // value={value ? dayjs(value) : null}   // controlled value
        onChange={(date, dateString) => {
          onChange(dateString);              // send value back to Form
        }}
        disabledDate={disabledDate}
      />
    </div>
  );
}
