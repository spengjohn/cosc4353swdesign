import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
//import "react-multi-date-picker/styles/colors/teal.css"

export default function MultiDatePickerField({ label }) {
  const [dates, setDates] = useState([]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <DatePicker
        multiple
        value={dates}
        onChange={setDates}
        format="YYYY-MM-DD"
        className=""//"teal" // style container
      />
    </div>
  );
}

