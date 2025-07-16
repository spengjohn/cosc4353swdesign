import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VolunteerHistoryModal from "../components/VolunteerHistoryModal";
import { getMatch } from "../api/volunteerMatch";
import { fetchEvent } from "../api/event";

export default function VolunteerMatch() {
  const eventId = 1;//useParams();
  const navigate = useNavigate();
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [event, setEvent] = useState(null);
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch matched volunteers
        const volunteers = await getMatch(eventId);
        setMatchedVolunteers(volunteers);

        // Fetch event separately if needed
        
        const fetchedEvent = await fetchEvent(eventId);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchData();
  }, [eventId]);
/*
const mockEvent = {
  name: "Community Clean-Up",
  day: "Wednesday",
  date: "2025-07-30",
  time: "10:00 AM",
  description: "Join us in cleaning up the local park.",
  location: "Downtown Houston",
  skills: ["Teamwork", "Physical Work"],
  urgency: "Medium",
  maxVolunteers: 5,
};*/
/*
const mockVolunteers = [
  {
    id: 1,
    name: "John Doe",
    city: "Albuquerque",
    state: "NM",
    skills: ["Gardening", "Cooking", "Cleaning"],
    preferences: "Gardening tasks preferred",
  },
  {
    id: 2,
    name: "Jane Smith",
    city: "Houston",
    state: "TX",
    skills: ["Organizing", "Communication"],
    preferences: "Enjoys event coordination",
  },
  {
    id: 3,
    name: "Alice Johnson",
    city: "Austin",
    state: "TX",
    skills: ["Landscaping", "Lifting", "Teamwork"],
    preferences: "Good with outdoor work",
  },
  {
    id: 4,
    name: "Michael Brown",
    city: "Dallas",
    state: "TX",
    skills: ["Setup", "Manual labor"],
    preferences: "Prefers setup tasks",
  },
  {
    id: 5,
    name: "Samantha Lee",
    city: "San Antonio",
    state: "TX",
    skills: ["First Aid", "Public Speaking"],
    preferences: "Enjoys helping at info booths",
  },
  {
    id: 6,
    name: "Carlos Rivera",
    city: "El Paso",
    state: "TX",
    skills: ["Painting", "Setup", "Heavy Lifting"],
    preferences: "Prefers physical and creative work",
  },
  {
    id: 7,
    name: "Emily Nguyen",
    city: "Plano",
    state: "TX",
    skills: ["Photography", "Event Planning"],
    preferences: "Loves capturing event moments",
  },
];*/
  const handleSelect = (volunteer) => {
    const alreadySelected = selectedVolunteers.some((v) => v.id === volunteer.id);
    if (alreadySelected) {
      setSelectedVolunteers((prev) => prev.filter((v) => v.id !== volunteer.id));
    } else {
      if (event && selectedVolunteers.length < event.maxVolunteers) {
        setSelectedVolunteers((prev) => [...prev, volunteer]);
      }
    }
  };

  const handleViewHistory = (volunteer) => {
    if (volunteer.name === "John Doe" || volunteer.name === "Jane Smith") {
      setSelectedVolunteer(volunteer);
      setShowHistoryModal(true);
    } else {
      alert("No volunteer history available.");
    }
  };

  const isSelected = (vol) => selectedVolunteers.some((v) => v.id === vol.id);
  const isMaxReached = event ? selectedVolunteers.length >= event.maxVolunteers : false;

  if (!event) return <div>Loading event info...</div>;

  else return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full">
        {/* Event Card */}
        <div className="w-1/3 p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#3e7b91]">Event</h2>
          <div className="bg-white border-2 border-[#3e7b91] rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-[#3e7b91]">{event.title}</h3>
              <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                {event.urgency}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Date:</strong> {/*event.day*/} {event.date}
              &nbsp;&nbsp;
              <strong>Time:</strong> {"time"}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Description:</strong> {event.description}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Required Skills:</strong> {event.skillsRequired.join(", ")}
            </p>
            <p className="text-sm text-gray-700 mt-3">
              <strong>Max Volunteers:</strong> {event.maxVolunteers}
            </p>
          </div>

          <button
            onClick={() => navigate("/manageevents")}
            className="mt-4 ml-1 px-4 py-2 rounded-md bg-pink-200 hover:bg-pink-300 transition text-gray-800 font-semibold"
          >
            ← Back to Manage Events
          </button>
        </div>

        {/* Selected Volunteers */}
        <div className="w-2/3 p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2 text-[#3e7b91]">Matched Volunteers</h2>

          <div className="space-y-2">
            {selectedVolunteers.map((user) => (
              <div
                key={user.id}
                className="bg-[#fef3f0] border-2 border-[#a5c7d4] p-4 rounded-lg shadow-md animate-bounce-in"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-[#3e7b91]">{user.name}</h3>
                    <p className="text-sm">
                      <strong>Skills:</strong> {user.skills.join(", ")}<br />
                      <strong>Preferences:</strong> {user.preferences}
                    </p>
                  </div>
                  <div className="text-sm text-right">{user.city}, {user.state}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button
              className={`w-full py-2 px-4 rounded font-semibold transition ${
                selectedVolunteers.length > 0
                  ? "bg-[#3e7b91] text-white hover:bg-[#336b7a]"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
              disabled={selectedVolunteers.length === 0}
              onClick={() => {
                if (selectedVolunteers.length > 0) {
                  console.log("Finalized Volunteers:", selectedVolunteers);
                  alert("Volunteers submitted!");
                }
              }}
            >
              Submit Final Decision
            </button>
          </div>
        </div>
      </div>

      {/* Volunteer Selection */}
      <div className="px-6 pb-12">
        <h3 className="text-xl font-semibold text-[#3e7b91] mb-3">Please choose volunteers from the list below:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchedVolunteers.map((vol) => (
            <div
              key={vol.accountId}
              className={`border-2 rounded p-4 shadow-sm flex flex-col justify-between transition duration-200 ${
                isSelected(vol)
                  ? "border-[#a5c7d4] bg-[#e6f2f5] scale-105 ring-2 ring-[#a5c7d4]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <div className="flex justify-between">
                  <strong>{vol.fullName}</strong>
                  <span className="text-sm text-gray-600">{vol.city}, {vol.state}</span>
                </div>
                <p className="text-sm mt-2">
                  <strong>Skills:</strong> {vol.skills.join(", ")}<br />
                  <strong>Preferences:</strong> {vol.preferences}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleViewHistory(vol)}
                  className="px-3 py-1 rounded text-sm font-semibold text-[#3e7b91] border border-[#3e7b91] hover:bg-[#e6f2f5] transition"
                >
                  View History
                </button>
                <button
                  onClick={() => handleSelect(vol)}
                  className={`px-3 py-1 rounded text-sm font-semibold ${
                    isSelected(vol)
                      ? "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
                      : isMaxReached
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#3e7b91] text-white hover:bg-[#336b7a]"
                  }`}
                  disabled={!isSelected(vol) && isMaxReached}
                >
                  {isSelected(vol) ? "Undo" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && selectedVolunteer && (
        <VolunteerHistoryModal
          user={selectedVolunteer}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
}