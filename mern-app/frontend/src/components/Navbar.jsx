import { Link } from "react-router-dom";
import cooglinklogo from "../assets/cooglinklogo.png";
import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";

export default function Navbar() {
  const [showPanel, setShowPanel] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const recipientId = "Jane Smith"; // Simulated logged-in user

  useEffect(() => {
    if (!showPanel) return;

    async function fetchNotifications() {
      try {
        const response = await fetch(`/api/notifications/${recipientId}`);
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    fetchNotifications();
  }, [showPanel, recipientId]); // now only fetches when panel is shown

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <nav className="px-4 md:px-8 p-2 text-lg bg-primary text-dark flex items-center justify-between">
        <div>
          <img src={cooglinklogo} alt="Logo" className="h-20" />
        </div>
        <div className="space-x-6 font-semibold flex items-center">
          <Link to="/">
            <button>{/* Home SVG */}</button>
          </Link>
          <Link to="/manageprofile">
            <button>{/* Profile SVG */}</button>
          </Link>

          {/* Bell */}
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="relative focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 
                0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 
                1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 
                4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          <button>{/* Log Out SVG */}</button>
        </div>
      </nav>

      {showPanel && (
        <div className="absolute top-full right-4 mt-2 z-50">
          <NotificationPanel
            notifications={notifications}
            onClose={() => setShowPanel(false)}
          />
        </div>
      )}
    </div>
  );
}
