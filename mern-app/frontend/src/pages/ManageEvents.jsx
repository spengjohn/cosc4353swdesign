import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import CreateEditEventCard from "../components/CreateEditEventCard";
import PrimaryButton from "../components/Buttons";
import { fetchEvent, updateEvent, fetchCurrentEvents } from "../api/event";
/*
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
];*/

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [formData, setFormData] = useState({
    eventId: "",
    title: "",
    date: [],
    address: "",
    city: "",
    state: "",
    description: "",
    skillsRequired: [],
    urgency: "",
    maxVolunteers: "",
    assignedVolunteers: [],
  });
  // load current events from backend
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetched = await fetchCurrentEvents();
        console.log("Fetched Events:", fetched);

        const sorted = fetched
        .filter(e => e.date) // ensure date exists
        .sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(sorted);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    };

    loadEvents();
  }, []);
  // create the events for display
  const handleCreate = () => {
    const newEvent = {
      eventId: formData.eventId,
      title: formData.title,
      description: formData.description,
      location: formData.address,
      skillsRequired: formData.skillsRequired,
      urgency: formData.urgency,
      date: formData.date || "TBD",
      day: formData.date
      ? new Date(formData.date).toLocaleDateString("en-US", { weekday: "long" })
      : "TBD",
      maxVolunteers: "",
      assignedVolunteers: formData.assignedVolunteers || [],
    };
    setEvents([...events, newEvent]);
    setIsFormOpen(false);
    setFormData({
      eventId: "",
      title: "",
      date: [],
      address: "",
      city: "",
      state: "",
      description: "",
      skillsRequired: [],
      urgency: "",
      maxVolunteers: "",
      assignedVolunteers: [],
    });
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">
        Manage Events
      </h1>

      <p className="text-center text-gray-600 mb-6 italic">
        There are {events.length} upcoming {events.length === 1 ? "event" : "events"}.
      </p>

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
    onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
  />
))}

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
