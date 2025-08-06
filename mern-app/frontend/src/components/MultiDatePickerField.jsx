import DatePicker from "react-multi-date-picker";

export default function MultiDatePickerField({
  value,
  onChange,
  name,
  format = "YYYY-MM-DD",
  minDate = new Date(),
  errorMessage,
}) {
  return (
    <div className="mb-4">
      <DatePicker
        id={name}
        name={name}
        //key={JSON.stringify(value)}
        multiple
        value={value}
        onChange={(dates) => {
          console.log("Picker onChange dates:", dates);
          const jsDates = Array.isArray(dates)
            ? dates.map(d => (typeof d.toDate === "function" ? d.toDate() : d))
            : [];
          onChange(jsDates);  // <-- call the onChange prop, NOT field.onChange
        }}
        format={format}
        minDate={minDate}
        inputClass="w-full border border-gray-300 rounded-md p-2"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}




/*import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MultiDatePickerField({
  selectedDates = [],
  onChange,
  name = "availableDates",
  errorMessage,
  minDate = new Date(),
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    if (!date) return;

    const isAlreadySelected = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    const updatedDates = isAlreadySelected
      ? selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      : [...selectedDates, date];

    onChange(updatedDates);
    setSelectedDate(null); // optional: reset picker
  };

  return (
    <div className="mb-4">
      <DatePicker
        selected={selectedDate}
        onChange={handleSelect}
        placeholderText="Select available dates"
        minDate={minDate}
        className="bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        popperPlacement="bottom-start"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedDates.map((date, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full"
          >
            {date.toLocaleDateString()}
          </span>
        ))}
      </div>
      {/* Hidden input for submission if needed //}
      <input type="hidden" name={name} value={selectedDates.join(",")} />
    </div>
  );
}
*/




/*
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
        className="w-full border border-gray-300 rounded-md p-2" // doesn't seem to play well with tailwindcss or vite...
      />
    </div>
  );
}
*/

