// components/NotificationPanel.jsx
import { useEffect } from "react";

export default function NotificationPanel({ notifications, onClose }) {
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escListener);
    return () => document.removeEventListener("keydown", escListener);
  }, [onClose]);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">
          ×
        </button>
      </div>
      <ul className="divide-y">
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((note, index) => (
            <li key={index} className="p-4 text-sm">
              <p className="font-semibold">{note.title}</p>
              <p className="text-gray-600">{note.body}</p>
              <p className="text-xs text-gray-400 mt-1">{note.time}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
