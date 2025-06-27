import { useState, useRef, useEffect } from "react";

export default function Selector({ items = [], onSelect, name = "selectedOptions", children }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      if (onSelect) onSelect(newSelected);
    }
  };

  const removeOption = (option) => {
    const newSelected = selected.filter((o) => o !== option);
    setSelected(newSelected);
    if (onSelect) onSelect(newSelected);
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
      {/* Selector Button */}
      <div
        className="bg-secondary text-white px-4 py-2 rounded cursor-pointer hover:bg-primary transition"
        onClick={toggleDropdown}
      >
        {children}
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow z-10 max-h-60 overflow-auto">
          {items.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              disabled={selected.includes(opt)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Selected Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {selected.map((opt) => (
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

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected.join(",")} />
    </div>
  );
}
