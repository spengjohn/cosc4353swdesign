export const mockNotifications = [
  {
    id: "1",
    recipient: "1",
    title: "Reminder",
    body: "You have an upcoming event",
    isRead: false,
    time: "1 minute ago",
    type: "reminder",
    createdAt: new Date(Date.now() - 60000),
  },
  {
    id: "2",
    recipient: "2",
    title: "Volunteer",
    body: "You might be interested in this upcoming event",
    isRead: true,
    time: "30 minutes ago",
    type: "reminder",
    createdAt: new Date(Date.now() - 120000),
  },
];

