import React, { useState } from "react";
import EventCard from "../components/EventCard";
import CreateEditEventCard from "../components/CreateEditEventCard";
import PrimaryButton from "../components/Buttons";

const initialEvents = [
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
    name: "School Supply Drive",
    description: "Distribute supplies to children.",
    location: "Houston Elementary",
    skills: ["Organization", "People Skills"],
    urgency: "Low",
    date: "2025-08-10",
    day: "Monday",
    time: "8:00 AM",
  },
  {
    name: "Food Bank Volunteering",
    description: "Help sort and organize food donations.",
    location: "Houston Food Bank",
    skills: ["Coordination", "Packing"],
    urgency: "High",
    date: "2025-08-15",
    day: "Thursday",
    time: "1:00 PM",
  },
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dates: [],
    address: "",
    city: "",
    state: "",
    description: "",
    skills: [],
    urgency: "",
  });

  const handleCreate = () => {
    const newEvent = {
      name: formData.name,
      description: formData.description,
      location: formData.address,
      skills: formData.skills,
      urgency: formData.urgency,
      date: formData.dates?.[0] || "TBD",
      day: "TBD",
      time: "TBD",
    };
    setEvents([...events, newEvent]);
    setIsFormOpen(false);
    setFormData({
      name: "",
      dates: [],
      address: "",
      city: "",
      state: "",
      description: "",
      skills: [],
      urgency: "",
    });
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">
        Manage Events
      </h1>

      <div className="flex justify-center mb-10">
        <PrimaryButton onClick={() => setIsFormOpen(true)}>
          + Create New Event
        </PrimaryButton>
      </div>

      <div className="flex flex-col gap-6 items-center">
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            event={event}
            isExpanded={expandedIndex === idx}
            onToggle={() =>
              setExpandedIndex(expandedIndex === idx ? null : idx)
            }
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => window.location.href = "/matching-volunteer"}
          className="bg-secondary hover:bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Matching Volunteer →
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/10 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl transform transition-all scale-100 w-full max-w-3xl p-4">
            <CreateEditEventCard
              formData={formData}
              setFormData={setFormData}
              onCancel={() => setIsFormOpen(false)}
              onSubmit={handleCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
