export const mockProfiles = {
  complete: {
    accountId: "123",
    fullName: "Jane Doe",
    address1: "123 Main St",
    address2: "Apt 4B",
    zipcode: "12345",
    city: "Houston",
    state: "TX",
    skills: ["Cooking", "Teaching"],
    preferences: "No pets",
    availableDates: [new Date("2025-08-01"), new Date("2025-08-02")],
    role: "volunteer",
  eventHistory: [
    { title: "Community Cooking", attended: true },
    { title: "Substitute Teaching", attended: false },
    ]
  },

  incomplete: {
    accountId: "456",
    fullName: "",
    address1: "",
    zipcode: "00000",
    city: "",
    state: "",
    skills: [],
    preferences: "",
    availableDates: [],
    role: "volunteer",
  eventHistory: [],
  },

  admin: {
    accountId: "789",
    fullName: "Admin Person",
    address1: "789 Admin Ave",
    address2: "",
    zipcode: "77777",
    city: "Austin",
    state: "TX",
    skills: ["Management"],
    preferences: "Indoor only",
    availableDates: [new Date()],
    role: "admin",
  eventHistory: [
    { title: "Community Cooking", attended: true },
    { title: "Event Setup", attended: true },
    { title: "Management Workshop", attended: true },
    ]
  }
};
