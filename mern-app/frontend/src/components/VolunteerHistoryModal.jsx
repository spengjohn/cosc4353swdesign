import AttendanceCard from "../components/AttendanceCard.jsx";
import { fetchUserHistory } from "../api/profile.js";
import { fetchEvent } from "../api/event.js";
import { useEffect, useState } from "react";
//import { sampleAttend } from "../data/sampleAttend.js";
//import { useState } from "react";

export default function VolunteerHistoryModal({ user, onClose }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const rawHistory = await fetchUserHistory(user.accountId);
        
        console.log(rawHistory);
        const fullEvents = await Promise.all(
          rawHistory.map(async ({ eventId, attendance }) => {
            console.log("Raw attendance:", attendance);
            const event = await fetchEvent(eventId);
            const isAttended = attendance === true || attendance === "true";
            return {
              ...event,
              attendance: isAttended ? "Attended" : "Absent",
            };
          })
        );

        setHistory(fullEvents);
      } catch (err) {
        console.error("Failed to load volunteer history:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user.accountId]);
if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full mx-auto px-4 py-10 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-6 text-secondary text-center">
            <h1>{user.name}</h1>
            <h1>Attendance</h1>
          </div>

          <div className="flex flex-col gap-4">
            {history.map((event, index) => (
              <AttendanceCard
                key={event.eventId}
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