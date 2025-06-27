import { useState, useRef, useEffect } from "react";

export default function DropdownMenu({ children, items = [], onSelect, name = "dropdownValue" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    if (onSelect) onSelect(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-secondary text-white px-4 py-2 text-base rounded hover:bg-primary focus:outline-none"
        type="button"
      >
        {selected || children}
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white rounded shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Hidden input for form submission */}
      {selected && (
        <input type="hidden" name={name} value={selected} />
      )}
    </div>
  );
}

