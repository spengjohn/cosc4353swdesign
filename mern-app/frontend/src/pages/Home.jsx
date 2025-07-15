// // import PrimaryButton from "../components/Buttons";
// // import { SecondaryButton } from "../components/Buttons";
// // import Field from "../components/Field";
// // import DropdownMenu from "../components/DropdownMenu";
// // import Selector from "../components/Selector";
// // import { useState } from "react";
// // import NotificationPanel from "../components/NotificationPanel";
// // import { sampleNotifications } from "../data/sampleNotifications";

// // const states = [
// //   "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
// //   "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
// //   "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
// //   "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
// //   "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
// // ];
// //  // from DB or static

// // export default function Home() {
// //   const handleStateSelect = (state) => {
// //     console.log("Selected state:", state);
// //     // update form input or context state
// //   };
// // const [showPanel, setShowPanel] = useState(false);
// //   return (
// //     <></>
// //   );
// // }

// // /*export default function Home() {
// //   return (
// //     <>
// //       <h1 className="text-2xl p-4">This is the Home Page!</h1>
// //       <PrimaryButton>Test Button</PrimaryButton>
// //       <SecondaryButton>Secondary Test Button</SecondaryButton>
// //       <br></br>
// //       <Field label="Email" name="email" type="email" placeholder="example@email.com" required/>
// //     </>
    
// //   );
// // }*/

import { useState } from "react";
import EventCard from "../components/EventCard";
import VolunteerHistoryModal from "../components/VolunteerHistoryModal";
import { Link } from "react-router-dom";

const sampleEvents = [
  {
    name: "Community Clean-Up",
    date: "2025-07-30",
    day: "Wednesday",
    time: "10:00 AM",
    location: "Downtown Houston",
    description: "Join us in cleaning up the local park.",
    skills: ["Teamwork", "Physical Work"],
    urgency: "Medium",
  },
];

export default function Home() {
  const [role] = useState("admin"); // modify to "volunteer" or "admin" to test
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const currentUser = {
    name: "Jane Smith",
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary mb-2">
          👋 Welcome back, {currentUser.name}!
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
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
            <div className="flex flex-wrap gap-4">
              <Link to="/manageprofile" className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm">
                👤 View My Profile
              </Link>
              <Link to="/volunteermatch" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                🤝 Volunteer Matching
              </Link>
              {/* THIS NEEDS TO BE CHANGED TO THE HISTORY MODAL POP_UP */}
              <Link to="/" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm">
                📋 View Volunteer History
              </Link>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* upcoming events */}
          <h2 className="text-2xl font-semibold text-secondary">Upcoming Events</h2>
          <div className="mb-4">
            <Link
              to="/manageevents"
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-sm mt-2"
            >
              🛠 Manage Events
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {sampleEvents.map((event, idx) => (
              <EventCard
                key={idx}
                event={event}
                isExpanded={expandedIndex === idx}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                showActions={false}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* volunteer tools */}
          <div className="max-w-xl w-full flex justify-start gap-4 mb-2">
            <Link
              to="/manageprofile"
              className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
            >
              View My Profile
            </Link>
            <button
              onClick={() => setShowHistory(true)}
              className="text-white bg-secondary hover:bg-primary px-4 py-2 rounded text-sm"
            >
              📜 View My Volunteer History
            </button>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* next event */}
          <h2 className="text-2xl font-semibold text-secondary mt-4">Your Next Event</h2>
          <EventCard
            event={sampleEvents[0]}
            isExpanded={expandedIndex === 0}
            onToggle={() => setExpandedIndex(expandedIndex === 0 ? null : 0)}
            showActions={false}
          />

          {/* history modal */}
          {showHistory && (
            <VolunteerHistoryModal
              user={currentUser}
              onClose={() => setShowHistory(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
