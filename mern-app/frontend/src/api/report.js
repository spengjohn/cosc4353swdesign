export const downloadVolunteerCSV = () => {
  // Open the file download in a new tab (or same tab)
  window.open('/api/reports/volunteers/csv', '_blank');
};

export const downloadVolunteerJSON = () => {
  window.open('/api/reports/volunteers/json', '_blank');
}

export const downloadEventCSV = () => {
  window.open('/api/reports/events/csv', '_blank');
}
export const downloadEventJSON = () => {
  window.open('/api/reports/events/json', '_blank');
}