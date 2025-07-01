import { Link } from "react-router-dom";
import cooglinklogo from "../assets/cooglinklogo.png"
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import { sampleNotifications } from "../data/sampleNotifications";

export default function Navbar() {
  const [showPanel, setShowPanel] = useState(false);
  const unreadCount = sampleNotifications.filter(n => !n.read).length;

  return (
    <div className="relative">
        {/* Nav Bar */}
        <nav className="px-4 md:px-8 p-2 text-lg bg-primary text-dark flex items-center justify-between">
            {/* Left: Logo */}
            <div>
                <img src={cooglinklogo} alt="Logo" className="h-20" />
            </div>

            {/* Right: Links + Bell */}
            <div className="space-x-6 font-semibold flex items-center">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/createprofile">Create Profile</Link>
                <Link to="/manageevents">Manage Events</Link>
                <Link to="/volunteerhistory">Volunteer History</Link>
                <Link to="/volunteermatch">Volunteer Match</Link>
                <Link to="/test">Testing Page</Link>

                {/* Bell Icon */}
                <button
                    onClick={() => setShowPanel(!showPanel)}
                    className="relative focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="dark" className="size-6">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 
                    0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 
                    1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 
                    4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                    </svg>
                    {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </button>
                {/*  Log Out Button */}
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="dark" className="size-6 -scale-x-100">
                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 
                        0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 
                        0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 
                        0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 
                        0 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </nav>

      {/* Notification Panel - absolutely positioned */}
      {showPanel && (
        <div className="absolute top-full right-4 mt-2 z-50">
          <NotificationPanel
            notifications={sampleNotifications}
            onClose={() => setShowPanel(false)}
          />
        </div>
      )}
    </div>
  );
}
