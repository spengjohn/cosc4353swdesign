import { useState } from "react";

export default function TertiaryButton({ children, onClick, className = "" }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    if (
      typeof children === "string" &&
      children.toLowerCase().includes("cancel")
    ) {
      const confirmed = window.confirm("Are you sure you want to cancel?");
      if (!confirmed) return;
    }

    setClicked(true);
    onClick?.(e);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        text-[#B80C09] border-2 border-[#B80C09] rounded px-4 py-2 font-semibold
        hover:bg-[#B80C09] hover:text-white transition-all duration-200
        ${clicked ? "bg-[#B80C09] text-white" : ""}
        w-fit ${className}
      `}
    >
      {children}
    </button>
  );
}
