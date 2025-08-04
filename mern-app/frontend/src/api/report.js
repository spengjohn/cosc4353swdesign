export const downloadVolunteerCSV = () => {
  // Open the file download in a new tab (or same tab)
  window.open('/api/reports/volunteers/csv', '_blank');
};
