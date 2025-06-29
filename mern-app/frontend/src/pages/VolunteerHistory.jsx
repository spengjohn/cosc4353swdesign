import AttendanceCard from "../components/AttendanceCard.jsx";
import { sampleAttend } from "../data/sampleAttend.js";
import { useState } from "react";

const user = {
  name: "John Doe"
};

export default function VolunteerHistory() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="text-[#2A5167] font-semibold text-2xl mb-4 flex flex-col items-center">
        <h1>{user.name}</h1>
        <h1>Attendance</h1>
      </div>
      
      <div className="flex flex-col gap-4">
        {sampleAttend.map((event, index) => (
          <AttendanceCard
            key={index}
            event={event}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
}
