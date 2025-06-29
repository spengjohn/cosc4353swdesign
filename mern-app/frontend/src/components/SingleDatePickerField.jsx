import DatePicker from "react-multi-date-picker";

export default function SingleDatePickerField({
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
        value={value}
        onChange={onChange}
        format={format}
        minDate={minDate}
        className="" // doesn't seem to play well with tailwindcss or vite...
      />
    </div>
  );
}