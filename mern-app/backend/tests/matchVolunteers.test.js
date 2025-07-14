import { matchVolunteers } from "../utils/matchVolunteers.js";
import { mockCompleteProfiles } from "../mocks/mockCompleteProfiles.js";
import { mockEvent } from "../mocks/mockEvents.js";

describe("matchVolunteers - Updated for strict skills match", () => {
  it("returns only volunteers with all required skills, sorted by city match", () => {
    const matches = matchVolunteers(mockCompleteProfiles, mockEvent);

    // Alice and Diana have all required skills + city match
    expect(matches.length).toBe(3);
    expect(matches[0].fullName).toBe("Alice");
    expect(matches[1].fullName).toBe("Diana");

    // Bob has all skills but lives in Dallas (city mismatch)
    expect(matches[2].fullName).toBe("Bob");

    // Charlie missing Spanish, should be excluded
    expect(matches.find(v => v.fullName === "Charlie")).toBeUndefined();
  });

  it("excludes volunteers missing any required skill", () => {
    const eventWithMoreSkills = { ...mockEvent, skillsRequired: ["First Aid", "Spanish", "Cooking"] };
    const matches = matchVolunteers(mockCompleteProfiles, eventWithMoreSkills);

    // Only Diana and Bob have all three skills
    expect(matches.length).toBe(2);
    expect(matches.some(v => v.fullName === "Diana")).toBe(true);
    expect(matches.some(v => v.fullName === "Bob")).toBe(true);
  });

  it("excludes volunteers not available on event date", () => {
    const eventDifferentDate = { ...mockEvent, date: new Date("2025-08-05") };
    const matches = matchVolunteers(mockCompleteProfiles, eventDifferentDate);

    expect(matches.length).toBe(0);
  });
});