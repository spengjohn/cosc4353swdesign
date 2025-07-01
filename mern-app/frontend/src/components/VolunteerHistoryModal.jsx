import AttendanceCard from "../components/AttendanceCard.jsx";
import { sampleAttend } from "../data/sampleAttend.js";
import { useState } from "react";

export default function VolunteerHistoryModal({ user, onClose }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full mx-auto px-4 py-10 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-6 text-secondary text-center">
            <h1>{user.name}</h1>
            <h1>Attendance</h1>
          </div>

          {/* Attendance Cards */}
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
      </div>
    </div>
  );
}
