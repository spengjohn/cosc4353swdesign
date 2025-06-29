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
      className={`font-semibold bg-white text-secondary px-4 py-2 rounded border-2  border-solid hover:bg-secondary transition-all hover:text-white
        ${clicked ? "border-white" : "border-secondary"} ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = "" }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    onClick?.(e);
    setTimeout(() => setClicked(false), 300);
  };
  return (
    <button
      onClick={handleClick}
      className={`text-secondary px-4 py-2 rounded border-2 border-solid hover:text-primary hover:border-primary transition-all  ${
        clicked ? "bg-primary" : "bg-white"
      } ${clicked ? "hover:text-white" : "hover:text-primary"} ${className}`}
    >
      {children}
    </button>
  );
}
