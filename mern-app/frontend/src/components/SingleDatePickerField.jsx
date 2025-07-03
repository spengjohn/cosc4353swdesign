import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SingleDatePickerField({
  label,
  value,
  onChange,
  name,
  minDate = new Date(),
  className = "",
  placeholder = "Select a date",
  errorMessage = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <DatePicker
        selected={value}
        onChange={onChange}
        name={name}
        minDate={minDate}
        placeholderText={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
