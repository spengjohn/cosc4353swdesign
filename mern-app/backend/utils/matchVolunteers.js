export function matchVolunteers(profiles, event) {
  const { date, city, skillsRequired } = event;

  return profiles
    .filter(profile => {
      const isAvailable = profile.availableDates.some(
        d => new Date(d).toDateString() === new Date(date).toDateString()
      );

      // Check if profile.skills includes *all* skillsRequired
      const hasAllSkills = skillsRequired.every(skill => profile.skills.includes(skill));

      return isAvailable && hasAllSkills;
    })
    .sort((a, b) => {
      const aCityMatch = a.city === city ? 1 : 0;
      const bCityMatch = b.city === city ? 1 : 0;
      return bCityMatch - aCityMatch; // Prefer same city
    });
}
