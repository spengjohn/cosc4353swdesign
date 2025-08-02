const AttendanceCard = ({ event, isExpanded, onToggle }) => {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div
      className="w-[360px] bg-white shadow-md rounded p-4 cursor-pointer border border-secondary transition-all duration-300"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-secondary text-lg font-semibold">{event.title}</h3>
        <div
          className={`text-sm font-semibold px-2 py-1 rounded ${
            event.attendance === "Attended"
              ? "text-primary border-2 border-primary"
              : "text-tertiary border-2 border-tertiary "
          }`}
        >
          {event.attendance}
        </div>
        <span className="text-secondary text-xl">{isExpanded ? "▾" : "▸"}</span>
      </div>

      <p className="text-secondary mt-2 text-sm">
        <strong>Date:</strong> {formattedDate} &nbsp;
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-secondary text-sm"><strong>Description:</strong> {event.description}</p>
        <p className="text-secondary text-sm"><strong>Location:</strong> {event.location}</p>
        <p className="text-secondary text-sm"><strong>Required Skills:</strong> {event.skillsRequired.join(", ")}</p>
        <p className="text-secondary text-sm"><strong>Urgency:</strong> {event.urgency}</p>
      </div>
    </div>
  );
};

export default AttendanceCard;
