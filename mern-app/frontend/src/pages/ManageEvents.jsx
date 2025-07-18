import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import CreateEditEventCard from "../components/CreateEditEventCard";
import PrimaryButton from "../components/Buttons";
import { updateEvent, fetchCurrentEvents } from "../api/event";

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [editEvent, setEditEvent] = useState(null);

  // Open modal with existing event
  const handleModalEdit = (event) => {
    setEditEvent(event);
    setIsFormOpen(true);
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editEvent && editEvent._id) {
        await updateEvent(editEvent._id, data);  // backend update
        setEvents(events.map(e => (e._id === editEvent._id ? { ...e, ...data } : e)));  // update UI
      } else {
        // temporary local creation since no DB setup yet
        const newEvent = {
          ...data,
          _id: Date.now().toString(),  // mock ID
          day: new Date(data.date).toLocaleDateString("en-US", { weekday: "long" }),
        };
        setEvents(prev => [...prev, newEvent]);
      }
      setIsFormOpen(false);
      setEditEvent(null);
    } catch (err) {
      console.error("Create or update failed:", err);
    }
  };

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

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-secondary text-center">
        Manage Events
      </h1>

      <p className="text-center text-gray-600 mb-6 italic">
        There are {events.length} upcoming {events.length === 1 ? "event" : "events"}.
      </p>

      <div className="flex justify-center mb-10">
        <PrimaryButton
          onClick={() => {
            setEditEvent(null);       // ✅ CLEAR the selected event
            setIsFormOpen(true);      // ✅ THEN open the form
          }}
        >
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
    onEdit={() => handleModalEdit(event)} // ← this is new
  />
))}

      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/10 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl transform transition-all scale-100 w-full max-w-3xl p-4">
            <CreateEditEventCard
              event={editEvent}  // could be null or an object
              onCancel={() => setIsFormOpen(false)}
              onSubmit={handleCreateOrUpdate}
            />

          </div>
        </div>
      )}
    </div>
  );
}
