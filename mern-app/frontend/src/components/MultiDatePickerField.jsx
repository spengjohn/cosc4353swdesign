import React from "react";
import DatePicker from "react-multi-date-picker";

export default function MultiDatePickerField({
  label,
  value,
  onChange,
  name,
  format = "YYYY-MM-DD",
  minDate = new Date(),  // default to today
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <DatePicker
        id={name}
        name={name}
        multiple
        value={value}
        onChange={onChange}
        format={format}
        minDate={minDate}
      />
    </div>
  );
}


