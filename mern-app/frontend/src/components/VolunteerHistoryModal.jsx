import AttendanceCard from "../components/AttendanceCard.jsx";
import { getHistory } from "../api/volunteerHistory.js";
import { fetchEvent } from "../api/event.js";
import { useEffect, useState } from "react";

export default function VolunteerHistoryModal({ user, onClose }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  //const NoHistory = false;
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const rawHistory = await getHistory(user.credentialId);
        
        console.log(rawHistory);
        const fullEvents = await Promise.all(
          rawHistory.eventHistory.map(async ({ event, attended }) => {
            console.log("Raw attendance:", attended);
            const Event = await fetchEvent(event);
            const isAttended = attended === true || attended === "true";
            return {
              ...Event,
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
  }, [user.credentialId]);
if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full mx-auto px-4 py-10 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold mb-6 text-secondary text-center">
            <h1>{user.fullName}</h1>
            <h1>Volunteer History</h1>
          </div>

          <div className="flex flex-col gap-4">
            {history.length === 0 ? (
              <p className="text-gray-500 italic text-center">No user history found.</p>
            ) : (
              history.map((Event, index) => (
                <AttendanceCard
                  key={Event._id}
                  event={Event}
                  isExpanded={expandedIndex === index}
                  onToggle={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}