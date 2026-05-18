import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { Container, Grid, Box, Typography, Alert, Button, CssBaseline } from '@mui/material';
import NotificationCard from './components/NotificationCard';
import FilterBar from './components/FilterBar';
import PaginationBar from './components/PaginationBar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import { fetchNotifications } from './services/api';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme';

// Beginner-friendly App component
export default function App() {
  // State to hold notifications fetched from API
  const [notifications, setNotifications] = useState([]);
  // Current selected filter: 'All' | 'Event' | 'Result' | 'Placement'
  const [filter, setFilter] = useState('All');
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Search query for filtering by text
  const [search, setSearch] = useState('');
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 6; // items per page

  // Info message state (used when we fallback to mock data)
  const [infoMessage, setInfoMessage] = useState(null);

  // Use mock data toggle for demo/testing (persist in localStorage)
  const [useMock, setUseMock] = useState(() => {
    try { return localStorage.getItem('useMock') === 'true'; } catch { return false; }
  });
  const toggleUseMock = () => {
    setUseMock((v) => { const nv = !v; try { localStorage.setItem('useMock', nv.toString()); } catch {} return nv; });
  };

  // Function to fetch data from API. useCallback makes the function stable
  // so it can be used by buttons or effects without causing extra renders.
  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    setInfoMessage(null);
    try {
      const data = await fetchNotifications(useMock);

      // If the API returned a fallback object, show info and use mock data
      const raw = data && data.fallback ? (Array.isArray(data.data) ? data.data : []) : (Array.isArray(data) ? data : []);
      if (data && data.fallback) setInfoMessage('Using offline mock data (API unavailable): ' + (data.message || ''));

      // Normalize each notification to ensure required fields for the UI
      const normalized = raw.map((item, idx) => {
        const id = item.id || item._id || `n-${idx}`;
        const title = item.title || item.subject || 'No title';
        const message = item.message || item.body || '';
        const type = item.type || 'Event';
        const date = item.date || item.createdAt || new Date().toISOString();
        // Default priority: Event->Medium, Result->High, Placement->High
        const defaultPriority = (String(type).toLowerCase() === 'event') ? 'Medium' : 'High';
        const priority = item.priority || defaultPriority;
        const read = typeof item.read === 'boolean' ? item.read : false;
        return { id, title, message, type, date, priority, read };
      });

      setNotifications(normalized);
    } catch (err) {
      // This should be rare because fetchNotifications returns fallback, but
      // keep error handling to be safe.
      setError(err.message || 'Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [useMock]);

  // Fetch notifications on first render
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Filter notifications by type
  const filtered = notifications.filter((n) => {
    // Filter by type
    if (filter !== 'All' && String(n.type).toLowerCase() !== filter.toLowerCase()) {
      return false;
    }
    // Filter by search text in title or message (case-insensitive)
    if (!search) return true;
    const text = (n.title || '') + ' ' + (n.message || '');
    return text.toLowerCase().includes(search.toLowerCase());
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  // Ensure page is within bounds
  // Add `page` to the dependency list so ESLint knows we use it here.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const startIndex = (page - 1) * pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + pageSize);

  // When filter changes, reset to first page
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    // Reset to first page and clear search so filters behave predictably
    setPage(1);
    setSearch('');
  }

  // Toggle read/unread for a notification
  function toggleRead(notification) {
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: !n.read } : n)));
  }

  // Theme mode (light/dark)
  const [mode, setMode] = useState('light');
  const toggleTheme = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <>
        <Header total={notifications.length} mode={mode} onToggleTheme={toggleTheme} useMock={useMock} onToggleMock={toggleUseMock} />

        <Container maxWidth="lg" className="app-container">
        <Box sx={{ my: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Clean and modern dashboard to view campus notifications.
          </Typography>
        </Box>

        <StatsCards
          total={notifications.length}
          events={notifications.filter((n) => String(n.type).toLowerCase() === 'event').length}
          results={notifications.filter((n) => String(n.type).toLowerCase() === 'result').length}
          placements={notifications.filter((n) => String(n.type).toLowerCase() === 'placement').length}
        />

        <SearchBar value={search} onChange={setSearch} />

        <FilterBar filter={filter} onFilterChange={handleFilterChange} />

        {infoMessage && (
          <Box sx={{ my: 2 }}>
            <Alert severity="info">{infoMessage}</Alert>
          </Box>
        )}

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <Box sx={{ my: 4 }}>
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            <Button variant="contained" onClick={loadNotifications}>Retry</Button>
          </Box>
        ) : (
          // Display notifications grid or empty state
          <>
            {pageItems.length === 0 ? (
              <EmptyState onRefresh={loadNotifications} />
            ) : (
              <>
                <Grid container spacing={2}>
                  {pageItems.map((n, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={n.id || Math.random()} className={`fade-up stagger-${(idx % 3) + 1}`}>
                      <NotificationCard notification={n} onToggleRead={toggleRead} />
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <PaginationBar page={page} totalPages={totalPages} onChange={(e, value) => setPage(value)} />
                </Box>
              </>
            )}
          </>
        )}

        <Footer />
      </Container>

      <ScrollTopButton />
    </>
    </ThemeProvider>
  );
}
