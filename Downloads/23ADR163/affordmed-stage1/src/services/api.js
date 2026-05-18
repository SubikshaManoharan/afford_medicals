import axios from 'axios';

// Use environment variable if provided (for production), otherwise use
// the relative path which will be proxied in development via setupProxy.js
const BASE_URL = process.env.REACT_APP_API_URL || '/evaluation-service';

// Small set of mock notifications to use when API is unavailable.
const MOCK_NOTIFICATIONS = [
  {
    id: 'mock-1',
    title: 'Campus Drive: ABC Corp',
    message: 'On-campus recruitment drive scheduled on 2026-06-01.',
    type: 'Event',
    priority: 'Medium',
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Semester Results Published',
    message: 'Final year results are published on the portal.',
    type: 'Result',
    priority: 'High',
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Placement: XYZ Pvt Ltd',
    message: 'Placement offers released for selected students.',
    type: 'Placement',
    priority: 'High',
    read: false,
    date: new Date().toISOString(),
  },
];

// Fetch notifications from the API. If the network call fails (CORS, down, etc.),
// return a fallback object with mock data so the UI can continue to function.
// `useMock` forces returning the built-in mock data (helpful for demos).
export async function fetchNotifications(useMock = false) {
  if (useMock) {
    return { fallback: true, message: 'Mock data forced', data: MOCK_NOTIFICATIONS };
  }
  try {
    const response = await axios.get(`${BASE_URL}/notifications`);
    // Return the data directly when successful.
    return response.data;
  } catch (error) {
    // Log the error for debugging and return fallback mock data.
    // We return an object with `fallback: true` so the caller can show a notice.
    // This avoids throwing and keeps the UI usable for beginners.
    // Capture a readable message if available.
    const message = error?.response?.data?.message || error.message || 'Network error';
    console.warn('fetchNotifications failed, returning mock data:', message);
    return { fallback: true, message, data: MOCK_NOTIFICATIONS };
  }
}
