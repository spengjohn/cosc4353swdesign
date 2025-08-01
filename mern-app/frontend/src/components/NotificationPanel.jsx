// components/NotificationPanel.jsx
import { useEffect } from "react";


export default function NotificationPanel({ notifications, onClose, onMarkAllRead,
  onDeleteAll}) {
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escListener);
    return () => document.removeEventListener("keydown", escListener);
  }, [onClose]);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300">
      <h2 className="text-lg font-bold pt-2 pl-4">Notifications</h2>
      
      <div className="p-4 border-b flex justify-end gap-4">
        <button onClick={onMarkAllRead} className="text-gray-500 hover:text-black text-xs">
          Mark All Read
        </button>
        <button onClick={onDeleteAll} className="text-gray-500 hover:text-black text-xs">
          Delete All
        </button>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-xs">
          Close
        </button>
      </div>

      <ul className="divide-y">
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No notifications</p>
        ) : (
          notifications.map((note) => (
            <li key={note._id} className="p-4 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {note.type}
                    {!note.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </p>
                  <p className="text-gray-600">{note.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
