import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import PrimaryButton from "./Buttons";
import TertiaryButton from "./TertiaryButton";

const urgencyColors = {
  High: "bg-red-100 text-red-700 border-red-400",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-400",
  Low: "bg-green-100 text-green-700 border-green-400",
};

const EventCard = ({ event, isExpanded, onToggle, showActions = true }) => {
  const [showModal, setShowModal] = useState(false);
  const urgencyStyle =
    urgencyColors[event.urgency] || "bg-gray-100 text-gray-700 border-gray-300";
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    alert(`Edit "${event.title}"`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirm = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (confirm) alert(`Deleted "${event.title}".`);
  };

  const goToMatchingPage = (e) => {
    e.stopPropagation();
    //window.location.href = "/volunteermatch";
    navigate(`/volunteermatch/${event.eventId}`);
  };

  return (
    <>
      <div
        className="w-full max-w-md pb-12 bg-white shadow-md rounded-xl p-6 cursor-pointer border transition-all duration-300 relative"
        style={{ borderColor: "#72A7BC" }}
        onClick={onToggle}
      >
        <div className={`absolute top-3 right-4 px-3 py-1 text-sm font-semibold border rounded-full ${urgencyStyle}`}>
          {event.urgency}
        </div>
        

        <div className="flex justify-between items-start">
          <button
            className="text-left text-xl font-semibold text-secondary hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            {event.title}
          </button>
          <span className="text-2xl mt-7">{isExpanded ? "▾" : "▸"}</span>
        </div>

        <p className="mt-2 text-base text-gray-700">
          <strong>Date:</strong> {event.day} {event.date} {/*<strong>Time:</strong> {event.time}*/}
        </p>
        <p className="mt-1 text-gray-700 text-base">
          <strong>Description:</strong> {event.description}
        </p>

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[500px] mt-4" : "max-h-0"}`}>
          <p className="text-base text-gray-700"><strong>Location:</strong> {event.location}</p>
          <p className="text-base text-gray-700"><strong>Required Skills:</strong> {event.skillsRequired.join(", ")}</p>
          <p className="text-base text-gray-700"><strong>Urgency:</strong> {event.urgency}</p>

          {showActions && (
            <>
              {/* Edit & Delete buttons */}
              <div className="mt-5 flex justify-end gap-4">
                <button
                  onClick={handleEdit}
                  className="text-sm px-4 py-2 rounded border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-sm px-4 py-2 rounded border border-red-500 text-red-600 hover:bg-red-100"
                >
                  🗑 Delete
                </button>
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
            </>
          )}
        </div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300 rounded-full px-2 py-1">
          {(event.assignedVolunteers?.length || 0)} / {event.maxVolunteers || 0} slots
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <button
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <p><strong>Date:</strong> {event.day} {event.date}</p>
            {/*<p><strong>Time:</strong> {event.time}</p>*/}
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Required Skills:</strong> {event.skillsRequired.join(", ")}</p>
            <p><strong>Urgency:</strong> {event.urgency}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
