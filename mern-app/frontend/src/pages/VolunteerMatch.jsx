import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VolunteerHistoryModal from "../components/VolunteerHistoryModal";
import { getMatch } from "../api/volunteerMatch";
import { fetchEvent, updateEvent } from "../api/event";
import { fetchUserProfile } from "../api/profile";

export default function VolunteerMatch() {
  const {eventId} = useParams();
  const navigate = useNavigate();
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [event, setEvent] = useState(null);
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("bg-green-100 text-green-700 px-4 py-2 rounded text-center mb-4 font-medium");
  const formattedDate = new Date(event?.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  useEffect(() => {
  const fetchData = async () => {
    try {
      // 1. Get matched volunteers
      const volunteers = await getMatch(eventId);
      setMatchedVolunteers(volunteers);

      // 2. Get event
      const fetchedEvent = await fetchEvent(eventId);
      setEvent(fetchedEvent);

      // 3. Fetch profile details of assigned volunteers (if any)
      // Filter out empty strings or falsy IDs
      const assignedIds = (fetchedEvent.assignedVolunteers || []).filter(Boolean);

      if (assignedIds.length > 0) {
        const assignedProfiles = await Promise.all(
          assignedIds.map((credentialId) => fetchUserProfile(credentialId._id || credentialId.toString?.() || credentialId))
        );
        setSelectedVolunteers(assignedProfiles);
      } else {
        setSelectedVolunteers([]);
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  fetchData();
}, [eventId]);

  const handleSelect = (volunteer) => {
    const alreadySelected = selectedVolunteers.some((v) => v.credentialId === volunteer.credentialId);
    if (alreadySelected) {
      setSelectedVolunteers((prev) => prev.filter((v) => v.credentialId !== volunteer.credentialId));
    } else {
      if (event && selectedVolunteers.length < event.maxVolunteers) {
        setSelectedVolunteers((prev) => [...prev, volunteer]);
      }
    }
  };

  const handleViewHistory = (volunteer) => {
    if (volunteer?.credentialId) {
    setSelectedVolunteer(volunteer);
    setShowHistoryModal(true);
  } else {
    alert("No account ID found for this volunteer.");
    }
  };

  const isSelected = (vol) => selectedVolunteers.some((v) => v.credentialId === vol.credentialId);
  const isMaxReached = event ? selectedVolunteers.length >= event.maxVolunteers : false;

  if (!event) return <div>Loading event info...</div>;

  else return (
    
    <div className="flex flex-col min-h-screen w-full lg:w-2/3">
      {/* status*/}
        {message && (
          <div className={messageStyle}>
            {message}
          </div>
        )}
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
        
        {/* Event Card */}
        <div className=" w-full p-4">

          <h2 className="text-2xl font-bold mb-2 text-[#3e7b91]">Event</h2>
          <div className="bg-white border-2 border-[#3e7b91] rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-[#3e7b91]">{event.title}</h3>
              <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                {event.urgency}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Date:</strong> {/*event.day*/} {formattedDate}
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
            onClick={() => {
              setMessage("Returning to Event Management Page.")
              setTimeout(() => {
                  navigate('../manageevents');
                }, 1000);
              
              }
              }
            className="mt-4 ml-1 px-4 py-2 rounded-md bg-primary hover:bg-secondary hover:text-white transition text-dark font-semibold"
          >
            ← Back to Manage Events
          </button>
        </div>

        {/* Selected Volunteers */}
        <div className=" w-full p-4">

          <h2 className="text-2xl font-bold mb-4 text-[#3e7b91]">Matched Volunteers</h2>

          {(
          <div className="space-y-2">
            {selectedVolunteers
              .filter((user) => user && user.credentialId)
              .map((user) => (
                <div
                  key={user.credentialId}
                  className="bg-[#fef3f0] border-2 border-[#a5c7d4] p-4 rounded-lg shadow-md animate-bounce-in"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-[#3e7b91]">{user.fullName}</h3>
                      <p className="text-sm">
                        <strong>Skills:</strong> {user.skills?.join(", ") || "None"}<br />
                        <strong>Preferences:</strong> {user.preferences || "N/A"}
                      </p>
                    </div>
                    <div className="text-sm text-right">{user.city}, {user.state}</div>
                  </div>
                </div>
              ))}
          </div>
        )}


          <div className="pt-4">
            <button
              className={`w-full py-2 px-4 rounded font-semibold transition bg-primary text-dark hover:text-white hover:bg-secondary`}
              onClick={async () => {
                const selectedIds = selectedVolunteers.map((v) => v.credentialId);
                const updatedEvent = { ...event, assignedVolunteers: selectedIds };
                try {
                  await updateEvent(eventId, updatedEvent);
                } catch (error) {
                  console.error("Failed to update event:", error);
                }
                setMessage("Assigned Volunteers successfully updated!")
                setTimeout(() => {
                  navigate('../manageevents');
                }, 1000);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedVolunteers.map((vol) => (
            <div
              key={vol.credentialId}
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