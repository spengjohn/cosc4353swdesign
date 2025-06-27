import React, { useState } from "react";

const EventCard = ({ event, isExpanded, onToggle }) => {
  return (
    <div
      className="w-[360px] bg-white shadow-md rounded p-4 cursor-pointer border border-blue-300 transition-all duration-300"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{event.name}</h3>
        <span className="text-xl">{isExpanded ? "▾" : "▸"}</span>
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
      </div>
    </div>
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
