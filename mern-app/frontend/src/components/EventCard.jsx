import React, { useState } from "react";

const urgencyColors = {
  High: "bg-red-100 text-red-700 border-red-400",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-400",
  Low: "bg-green-100 text-green-700 border-green-400",
};

const EventCard = ({ event, isExpanded, onToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const urgencyStyle =
    urgencyColors[event.urgency] || "bg-gray-100 text-gray-700 border-gray-300";

  const handleEdit = (e) => {
    e.stopPropagation();
    alert(`Edit "${event.name}"`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirm = window.confirm(`Are you sure you want to delete "${event.name}"?`);
    if (confirm) alert(`Deleted "${event.name}".`);
  };

  return (
    <>
      <div
        className="w-[360px] bg-white shadow-md rounded p-4 cursor-pointer border border-blue-300 transition-all duration-300 relative"
        onClick={onToggle}
      >
        <div
          className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold border rounded-full ${urgencyStyle}`}
        >
          {event.urgency}
        </div>

        <div className="flex justify-between items-start">
          <button
            className="text-left text-lg font-semibold text-blue-700 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            {event.name}
          </button>
          <span className="text-xl mt-5">{isExpanded ? "▾" : "▸"}</span>
        </div>

        <p className="mt-2 text-sm">
          <strong>Date:</strong> {event.day} {event.date} &nbsp;
          <strong>Time:</strong> {event.time}
        </p>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <p className="text-sm"><strong>Description:</strong> {event.description}</p>
          <p className="text-sm"><strong>Location:</strong> {event.location}</p>
          <p className="text-sm"><strong>Required Skills:</strong> {event.skills.join(", ")}</p>
          <p className="text-sm"><strong>Urgency:</strong> {event.urgency}</p>

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={handleEdit}
              className="text-sm px-3 py-1 rounded border border-blue-500 text-blue-600 hover:bg-blue-100"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 rounded border border-red-500 text-red-600 hover:bg-red-100"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{event.name}</h2>
              <button
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <p><strong>Date:</strong> {event.day} {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Required Skills:</strong> {event.skills.join(", ")}</p>
            <p><strong>Urgency:</strong> {event.urgency}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;


// example
export const sampleEvents = [
  {
    name: "Community Clean-Up",
    description: "Join us in cleaning up the local park.",
    location: "Downtown Houston",
    skills: ["Teamwork", "Physical Work"],
    urgency: "Medium",
    date: "2025-07-30",
    day: "Wednesday",
    time: "10:00 AM",
  },
  {
    name: "Food Bank Volunteering",
    description: "Help sort food donations.",
    location: "Food Bank Warehouse",
    skills: ["Packing", "Coordination"],
    urgency: "High",
    date: "2025-08-05",
    day: "Friday",
    time: "1:30 PM",
  },
  {
    name: "School Supply Drive",
    description: "Distribute supplies to children.",
    location: "Houston Elementary",
    skills: ["Organization", "People Skills"],
    urgency: "Low",
    date: "2025-08-10",
    day: "Monday",
    time: "8:00 AM",
  },
];
