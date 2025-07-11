import { useRef, useEffect } from "react";
import React from "react";
export default function Selector({
  items = [],
  value = [],
  onChange,
  name = "selectedOptions",
  children,
  errorMessage,
}) {
  const dropdownRef = useRef();
  const [open, setOpen] = React.useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (!value.includes(option)) {
      const newSelected = [...value, option];
      onChange?.(newSelected);
    }
  };

  const removeOption = (option) => {
    const newSelected = value.filter((o) => o !== option);
    onChange?.(newSelected);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64">
      {/* Button */}
      <div
        className="bg-secondary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary transition"
        onClick={toggleDropdown}
      >
        {children}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow z-10 max-h-60 overflow-auto">
          {items.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              disabled={value.includes(opt)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((opt) => (
          <span
            key={opt}
            className="flex items-center bg-primary text-white text-sm px-2 py-1 rounded-full"
          >
            {opt}
            <button
              type="button"
              onClick={() => removeOption(opt)}
              className="ml-1 text-xs bg-white text-tertiary rounded-full px-1 hover:bg-gray-200"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
        {/* Error message */}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
      {/* Hidden input to support form submission */}
      <input type="hidden" name={name} value={value.join(",")} />
    </div>
  );
}
