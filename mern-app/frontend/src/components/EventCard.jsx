import React, { useState } from "react";
import PrimaryButton from "./Buttons";
import TertiaryButton from "./TertiaryButton";

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

  const goToMatchingPage = (e) => {
    e.stopPropagation();
    window.location.href = "/volunteermatch";
  };  

  return (
    <>
      <div
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 cursor-pointer border transition-all duration-300 relative"
        style={{ borderColor: "#72A7BC" }}
        onClick={onToggle}
      >
        {/* Urgency Badge */}
        <div
          className={`absolute top-3 right-4 px-3 py-1 text-sm font-semibold border rounded-full ${urgencyStyle}`}
        >
          {event.urgency}
        </div>

        {/* Event title and arrow */}
        <div className="flex justify-between items-start">
          <button
            className="text-left text-xl font-semibold text-secondary hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            {event.name}
          </button>
          <span className="text-2xl mt-7">{isExpanded ? "▾" : "▸"}</span>
        </div>

        {/* Date and time */}
        <p className="mt-2 text-base text-gray-700">
          <strong>Date:</strong> {event.day} {event.date} &nbsp;
          <strong>Time:</strong> {event.time}
        </p>

        {/* Short description always visible */}
        <p className="mt-1 text-gray-700 text-base">
          <strong>Description:</strong> {event.description}
        </p>

        {/* Expanded details */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[500px] mt-4" : "max-h-0"
          }`}
        >
          <p className="text-base text-gray-700"><strong>Location:</strong> {event.location}</p>
          <p className="text-base text-gray-700"><strong>Required Skills:</strong> {event.skills.join(", ")}</p>
          <p className="text-base text-gray-700"><strong>Urgency:</strong> {event.urgency}</p>

          {/* Edit & Delete buttons */}
          <div className="mt-5 flex justify-end gap-4">
            <PrimaryButton
              onClick={handleEdit}
              className="text-sm px-4 py-2 rounded"
            >
              ✏️ Edit
            </PrimaryButton>
            <TertiaryButton
              onClick={handleDelete}
              className="text-sm px-4 py-2 rounded"
            >
              🗑 Delete
            </TertiaryButton>
          </div>

          {/* Match Volunteer button */}
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={goToMatchingPage}
              className="w-full text-base py-3 rounded border transition font-medium"
              style={{
                backgroundColor: "#72A7BC",
                color: "white",
                borderColor: "#72A7BC",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#72A7BC";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#72A7BC";
                e.target.style.color = "white";
              }}
            >
              Match Volunteer →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
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
