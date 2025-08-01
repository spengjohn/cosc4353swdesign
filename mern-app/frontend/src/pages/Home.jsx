import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import VolunteerHistoryModal from "../components/VolunteerHistoryModal";
import { Link } from "react-router-dom";
import { fetchUserProfile } from "../api/profile";
import { fetchMyNextEvents } from "../api/event";

export default function Home() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [role, setRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [myNextEvents, setMyNextEvents] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //console.log("userId: ", userId);
    const userRole = localStorage.getItem("userRole");
    //if (!userId) return navigate("/login"); // redirect to login if not authenticated

    setRole(userRole);
    const fetchData = async () => {
      try{
      const User = await fetchUserProfile(userId);
      setCurrentUser(User);

      const events = await fetchMyNextEvents(userId); // 👈 fetch upcoming events
      setMyNextEvents(events);
      }catch (error){
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewHistory = (volunteer) => {
    //console.log(volunteer);
    if (volunteer?.credentialId) {
    //setSelectedVolunteer(volunteer);
    setShowHistoryModal(true);
  } else {
    alert("No account ID found for this volunteer.");
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary mb-2">
          👋 Welcome back, {currentUser?.fullName}!
        </h1>
        <p className="text-lg text-center text-gray-700 max-w-2xl">
          {role === "admin"
            ? "You are an ADMIN ⚙️. You can manage events and view volunteer profiles and histories."
            : "You are a VOLUNTEER 🙋‍♀️. You can view and edit your profile, check your upcoming events, and review your volunteer history."}
        </p>
      </div>

      {role === "admin" ? (
        <>
          {/* admin profile and tools */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-secondary">My Profile & Admin Tools</h2>
            <div className="flex flex-col lg:flex-row justify-center gap-4">
              <Link to="/manageprofile" className="bg-white text-center text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm">
                👤 View My Profile
              </Link>
              <button 
                onClick={() => handleViewHistory(currentUser)} 
                className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
              >
                📜 View My Volunteer History
              </button>
              <Link
                to="/manageevents"
                className="bg-white text-secondary text-center border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
              >
                🛠 Manage Events
              </Link>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* upcoming events */}
          <h2 className="text-2xl font-semibold text-secondary">Your Next 3 Assigned Events</h2>
          <div className="flex flex-col items-center gap-4">
            {myNextEvents.length > 0 ? (
              myNextEvents.map((event, idx) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isExpanded={expandedIndex === idx}
                  onToggle={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }
                  showActions={false}
                />
              ))
            ) : (
              <p className="text-gray-600 text-sm">No upcoming events assigned.</p>
            )}

            {/* history modal */}
            {showHistoryModal && (
              <VolunteerHistoryModal
                user={currentUser}
                onClose={() => setShowHistoryModal(false)}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* volunteer tools */}
          <div className="flex flex-col lg:flex-row justify-center gap-4">
            <Link
              to="/manageprofile"
              className="bg-white text-center text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
            >
              View My Profile
            </Link>
            <button
              onClick={() => handleViewHistory(currentUser)}
              className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
            >
              📜 View My Volunteer History
            </button>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* next event */}
          <h2 className="text-2xl font-semibold text-secondary mt-4">Your Next 3 Assigned Events</h2>
          <div className="flex flex-col items-center gap-4">
          {myNextEvents.length > 0 ? (
            myNextEvents.map((event, idx) => (
              <EventCard
                key={event._id}
                event={event}
                isExpanded={expandedIndex === idx}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                showActions={false}
              />
            ))
          ) : (
            <p className="text-gray-600 text-sm">No upcoming events assigned.</p>
          )}
          </div>
        </>
      )}

      {/* history modal */}
      {showHistoryModal && (
        <VolunteerHistoryModal
          user={currentUser}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
}
