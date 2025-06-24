import { useState, useRef, useEffect } from "react";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpen((prev) => !prev);

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
        className="bg-[color:var(--color-secondary)] text-white px-4 py-2 text-base rounded hover:bg-[color:var(--color-primary)] focus:outline-none"
      >
        Test
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white rounded shadow-lg border border-gray-200 z-50">
          <a
            href="#meow"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            meow
          </a>
          <a
            href="#bark"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            bark
          </a>
          <a
            href="#moo"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            moo
          </a>
        </div>
      )}
    </div>
  );
}
