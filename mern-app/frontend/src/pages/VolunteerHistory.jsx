import { useState } from "react";
import VolunteerHistoryModal from "../components/VolunteerHistoryModal";
import PrimaryButton from "../components/Buttons";

export default function VolunteerHistory() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const dummyVolunteers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];

  return (
    <div>
      <h1 className="text-2xl mb-4">Volunteer List</h1>
      <ul className="space-y-2">
        {dummyVolunteers.map((v) => (
          <li key={v.id}>
            <PrimaryButton
              onClick={() => setSelectedVolunteer(v)}
              className="text-blue-600 underline"
            >
              View {v.name}'s History
            </PrimaryButton>
          </li>
        ))}
      </ul>

      {selectedVolunteer && (
        <VolunteerHistoryModal
          user={selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
        />
      )}
    </div>
  );
}

