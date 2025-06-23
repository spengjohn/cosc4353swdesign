import { useState } from "react";

export default function PrimaryButton({ children, onClick, className = "" }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    onClick?.(e); // call parent click handler if it exists
    setTimeout(() => setClicked(false), 300); // reset after brief effect
  };
  return (
    <button
      onClick={handleClick}
      className={`bg-secondary text-white px-4 py-2 rounded border-2  border-solid hover:bg-primary transition-all 
        ${clicked ? "border-white":"border-primary"} ${className}`}
    >
      {children}
    </button>
  );
}