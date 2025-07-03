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

const sampleEvents = [
  {
    name: "Community Clean-Up",
    day: "Sat",
    date: "July 6",
    time: "9:00 AM",
    location: "123 Main St, Houston",
    description: "Join us to help clean up the park!",
    skills: ["Teamwork", "Cleaning"],
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

  const urgencyColors = {
    High: "bg-red-100 text-red-700 border-red-400",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-400",
    Low: "bg-green-100 text-green-700 border-green-400",
  };

  const EventCard = ({ event, isExpanded, onToggle }) => {
    const urgencyStyle = urgencyColors[event.urgency] || "bg-gray-100 text-gray-700 border-gray-300";

    return (
      <div
        className="w-full max-w-md bg-white shadow-md rounded-xl p-6 cursor-pointer border relative transition duration-300"
        style={{ borderColor: "#72A7BC" }}
        onClick={onToggle}
      >
        <div className={`absolute top-3 right-4 px-3 py-1 text-sm font-semibold border rounded-full ${urgencyStyle}`}>
          {event.urgency}
        </div>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-secondary">{event.name}</h3>
          <span className="text-2xl mt-7">{isExpanded ? "▾" : "▸"}</span>
        </div>
        <p className="mt-2 text-base text-gray-700">
          <strong>Date:</strong> {event.day} {event.date} <strong>Time:</strong> {event.time}
        </p>
        <p className="mt-1 text-gray-700 text-base">
          <strong>Description:</strong> {event.description}
        </p>
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[500px] mt-4" : "max-h-0"}`}>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Required Skills:</strong> {event.skills.join(", ")}</p>
          <p><strong>Urgency:</strong> {event.urgency}</p>
        </div>
      </div>
    );
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
          {/* admin tools */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-secondary">My Profile & Admin Tools</h2>
            <div className="flex flex-wrap gap-4">
              <a href="/manageprofile" className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm">
                👤 View My Profile
              </a>
              <a href="/volunteermatch" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                🤝 Volunteer Matching
              </a>
              <a href="/volunteerhistory" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm">
                📋 View Submission History
              </a>
              {/*<a href="/reports" className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded text-sm">
                📈 Generate Reports
              </a>   use this later !!!! */}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* upcoming events */}
          <h2 className="text-2xl font-semibold text-secondary">Upcoming Events</h2>
          <div className="mb-4">
            <a
              href="/manageevents"
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-sm mt-2"
            >
              🛠 Manage Events
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            {sampleEvents.map((event, idx) => (
              <EventCard
                key={idx}
                event={event}
                isExpanded={expandedIndex === idx}
                onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* volunteer tools */}
          <div className="max-w-xl w-full flex justify-start gap-4 mb-2">
            <a
              href="/manageprofile"
              className="bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded text-sm"
            >
              View My Profile
            </a>
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
          />

          {/* history modal */}
          {showHistory && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white max-w-4xl w-full mx-auto px-4 py-10 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowHistory(false)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                >✕</button>
                <div className="text-4xl font-bold mb-6 text-secondary text-center">
                  <h1>{currentUser.name}</h1>
                  <h1>Attendance</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-full bg-white shadow-md rounded p-4 border">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">Community Clean-Up</h3>
                      <div className="text-sm font-semibold px-2 py-1 rounded text-green-600 border border-green-600">
                        Attended
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Date:</strong> June 15 <strong>Time:</strong> 10:00 AM
                    </p>
                    <div className="mt-2 text-sm">
                      <p><strong>Description:</strong> Park cleanup event.</p>
                      <p><strong>Location:</strong> 123 Main St</p>
                      <p><strong>Skills:</strong> Teamwork</p>
                      <p><strong>Urgency:</strong> Medium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
