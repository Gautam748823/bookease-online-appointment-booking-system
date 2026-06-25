import StatusBadge from './StatusBadge';
import '../styles/appointmentTable.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(timeStr) {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':');
  const d = new Date();
  d.setHours(Number(h), Number(m));
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function AppointmentRow({ appointment, onConfirm, onCancel, onDelete, busy }) {
  const { id, full_name, email, phone, service, appointment_date, appointment_time, status, created_at } = appointment;

  return (
    <tr>
      <td className="col-name">{full_name}</td>
      <td className="col-email">{email}</td>
      <td>{phone}</td>
      <td>{service}</td>
      <td className="col-date">{formatDate(appointment_date)}</td>
      <td className="col-time">{formatTime(appointment_time)}</td>
      <td><StatusBadge status={status} /></td>
      <td className="col-date">{formatDate(created_at?.split('T')[0])}</td>
      <td>
        <div className="actions-cell">
          <button
            className="btn-action btn-confirm"
            onClick={() => onConfirm(id)}
            disabled={busy || status === 'Confirmed'}
            aria-label="Confirm appointment"
          >
            {busy ? <span className="btn-spinner" /> : 'Confirm'}
          </button>
          <button
            className="btn-action btn-cancel-appt"
            onClick={() => onCancel(id)}
            disabled={busy || status === 'Cancelled'}
            aria-label="Cancel appointment"
          >
            {busy ? <span className="btn-spinner" /> : 'Cancel'}
          </button>
          <button
            className="btn-action btn-delete"
            onClick={() => onDelete(id)}
            disabled={busy}
            aria-label="Delete appointment"
          >
            {busy ? <span className="btn-spinner" /> : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  );
}
