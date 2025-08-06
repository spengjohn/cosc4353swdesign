import { useState } from "react";

export default function SimpleMultiDatePicker({ value = [], onChange }) {
  const [currentDate, setCurrentDate] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);

  const addDate = () => {
    if (!currentDate) return;
    if (currentDate < todayStr) return alert("Cannot select past dates.");
    if (value.includes(currentDate)) return;
    onChange([...value, currentDate]);
    setCurrentDate("");
  };

  const removeDate = (dateToRemove) => {
    onChange(value.filter((d) => d !== dateToRemove));
  };

  return (
    <div>
      {/* Input section */}
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          min={todayStr}
        />
        <button
          type="button"
          onClick={addDate}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80 text-sm"
        >
          Add
        </button>
      </div>

      {/* Selected dates */}
      <div className="flex flex-wrap gap-2">
        {value.length === 0 ? (
          <p className="text-sm text-gray-500">No dates selected</p>
        ) : (
          value.map((dateStr) => (
            <span
              key={dateStr}
              className="flex items-center bg-primary text-white text-sm px-3 py-1 rounded-full"
            >
              {dateStr}
              <button
                type="button"
                onClick={() => removeDate(dateStr)}
                className="ml-2 bg-white text-tertiary rounded-full px-1 text-xs hover:bg-gray-100"
              >
                ✕
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
