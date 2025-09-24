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
        showTime={showTime ? { format: "hh:mm A" } : false}   // <-- 12 hr with AM/PM
        size="large"
        format={showTime ? "DD-MM-YYYY hh:mm A" : "DD-MM-YYYY"}
        className="w-full"
        placeholder={showTime ? "Select Date & Time" : "Select Date"}
        // value={value ? dayjs(value, "DD-MM-YYYY hh:mm A") : null} // optional controlled value
        onChange={(date, dateString) => {
          onChange(dateString); // send value back to Form
          // console.log(dateString);
        }}
        disabledDate={disabledDate}
      />
    </div>
  );
}
