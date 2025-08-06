
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const downloadVolunteerCSV = () => {
  // Open the file download in a new tab (or same tab)
  window.open(`${API_BASE}/reports/volunteers/csv`, '_blank');
};

export const downloadVolunteerJSON = () => {
  window.open(`${API_BASE}/reports/volunteers/json`, '_blank');
}

export const downloadEventCSV = () => {
  window.open(`${API_BASE}/reports/events/csv`, '_blank');
}
export const downloadEventJSON = () => {
  window.open(`${API_BASE}/reports/events/json`, '_blank');
}