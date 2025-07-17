export function matchVolunteers(profiles, event) {
  const { date, city, state, skillsRequired, assignedVolunteers } = event;

  return profiles
    .filter(profile => {
      // remove already assigned volunteers from potential matches
      //if (assignedVolunteers?.includes(profile.accountId)) return false;

      const isAvailable = profile.availableDates.some(
        d => new Date(d).toDateString() === new Date(date).toDateString()
      );

      const hasAllSkills = skillsRequired.every(skill => profile.skills.includes(skill));

      const isSameState = profile.state === state;

      return isAvailable && hasAllSkills && isSameState;
    })
    .sort((a, b) => {
      const aCityMatch = a.city === city ? 1 : 0;
      const bCityMatch = b.city === city ? 1 : 0;
      return bCityMatch - aCityMatch; // Prefer same city
    });
}

