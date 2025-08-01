import { Link, useNavigate } from "react-router-dom";
import cooglinklogo from "../assets/cooglinklogo.png"
import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";
import { fetchNotifications, updateAllNotifications, deleteAllNotifications } from "../api/notifications";

export default function Navbar() {
  const userId = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const navigate  = useNavigate();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(userId);
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await updateAllNotifications(userId);
      const updated = await fetchNotifications(userId);
      setNotifications(updated);
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllNotifications(userId);
      setNotifications([]);
    } catch (err) {
      console.error("Failed to delete notifications:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
        {/* Nav Bar */}
        <nav className="px-4 md:px-8 p-2 text-lg bg-primary text-dark flex items-center justify-between">
            {/* Left: Logo */}
            <div>
                <img src={cooglinklogo} alt="Logo" className="h-20" />
            </div>
            {/* Center Site Name 
            <div className="space-x-6 font-bold text-tertiary text-5xl border-dark flex items-center">
                CoogsLink
            </div>
            */}
            {/* Right: Icons */}
            <div className="space-x-6 font-semibold flex items-center">
                {/* Home Button */}
                <Link to="/">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25  
                            0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 
                            0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 
                            1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                    </button>
                </Link>
                {/* Profile Button */}
                <Link to="/manageprofile">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 
                      6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 
                      7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 
                      0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Link>

                {/* Bell Icon */}
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
                {/*  Log Out Button */}
                <button onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 -scale-x-100">
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
            notifications={notifications}
            onClose={() => setShowPanel(false)}
            onMarkAllRead={handleMarkAllRead}
            onDeleteAll={handleDeleteAll}
          />
        </div>
      )}
    </div>
  );
}
