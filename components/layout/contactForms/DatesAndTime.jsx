import { DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  // Disable past days
  return current && current < dayjs().endOf("day");
};

export default function DateAndTime({ value, onChange }) {
  return (
    <div className="w-full">
      <DatePicker
        showTime={{ format: "HH:mm" }}
        size="large"
        format="DD-MM-YYYY HH:mm"
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
