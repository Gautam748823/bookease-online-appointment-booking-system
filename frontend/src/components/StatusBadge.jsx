import '../styles/statusBadge.css';

const STATUS_CLASSES = {
  Pending: 'status-pending',
  Confirmed: 'status-confirmed',
  Cancelled: 'status-cancelled',
};

export default function StatusBadge({ status }) {
  const cls = STATUS_CLASSES[status] || 'status-unknown';
  return <span className={`status-badge ${cls}`}>{status || 'Unknown'}</span>;
}
