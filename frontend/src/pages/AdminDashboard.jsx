import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppointmentTable from '../components/AppointmentTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/adminDashboard.css';

const BASE_URL = 'http://localhost:5000/api/appointments';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'date', label: 'Appointment Date' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login', { replace: true });
  };
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(BASE_URL);
      setAppointments(data.data || []);
    } catch {
      setError('Unable to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id, status) => {
    setBusyId(id);
    try {
      await axios.put(`${BASE_URL}/${id}`, { status });
      await fetchAppointments();
    } catch {
      setError('Failed to update appointment status. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const handleConfirm = (id) => updateStatus(id, 'Confirmed');
  const handleCancel = (id) => updateStatus(id, 'Cancelled');

  const handleDeleteRequest = (id) => setDeleteTarget(id);
  const handleDeleteCancel = () => setDeleteTarget(null);

  const handleDeleteConfirm = async () => {
    const id = deleteTarget;
    setDeleteTarget(null);
    setBusyId(id);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      await fetchAppointments();
    } catch {
      setError('Failed to delete appointment. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const total = appointments.length;
  const pending = appointments.filter((a) => a.status === 'Pending').length;
  const confirmed = appointments.filter((a) => a.status === 'Confirmed').length;
  const cancelled = appointments.filter((a) => a.status === 'Cancelled').length;

  const displayed = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = appointments.filter((a) => {
      if (statusFilter !== 'All' && a.status !== statusFilter) return false;
      if (!q) return true;
      return (
        (a.full_name || '').toLowerCase().includes(q) ||
        (a.email || '').toLowerCase().includes(q) ||
        (a.phone || '').toLowerCase().includes(q) ||
        (a.service || '').toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
      if (sortBy === 'date') return new Date(a.appointment_date) - new Date(b.appointment_date);
      return 0;
    });

    return list;
  }, [appointments, search, statusFilter, sortBy]);

  return (
    <div className="admin-dashboard">
      {deleteTarget && (
        <ConfirmModal
          message="Are you sure you want to delete this appointment? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <div className="admin-header">
        <div>
          <h1>Appointment Dashboard</h1>
          <p>Manage all customer bookings</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
        <div className="stat-card stat-confirmed">
          <div className="stat-label">Confirmed</div>
          <div className="stat-value">{confirmed}</div>
        </div>
        <div className="stat-card stat-cancelled">
          <div className="stat-label">Cancelled</div>
          <div className="stat-value">{cancelled}</div>
        </div>
      </div>

      {error && (
        <div className="state-container error-state">
          <span className="state-icon" aria-hidden="true">⚠️</span>
          <p>{error}</p>
          <button className="btn-refresh" onClick={fetchAppointments} style={{ marginTop: '1rem' }}>
            Try Again
          </button>
        </div>
      )}

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>All Appointments</h2>
          <button className="btn-refresh" onClick={fetchAppointments} disabled={loading}>
            ↻ Refresh
          </button>
        </div>

        <div className="admin-controls">
          <input
            type="text"
            className="admin-search"
            placeholder="Search by name, email, phone or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search appointments"
          />
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            className="admin-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort appointments"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <AppointmentTable
            appointments={displayed}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onDelete={handleDeleteRequest}
            busyId={busyId}
            filtered={search.trim() !== '' || statusFilter !== 'All'}
          />
        )}
      </div>
    </div>
  );
}
