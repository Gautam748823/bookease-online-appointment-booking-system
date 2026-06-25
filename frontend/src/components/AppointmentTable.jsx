import AppointmentRow from './AppointmentRow';
import EmptyState from './EmptyState';
import '../styles/appointmentTable.css';

const COLUMNS = ['Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Created At', 'Actions'];

export default function AppointmentTable({ appointments, onConfirm, onCancel, onDelete, busyId, filtered }) {
  if (appointments.length === 0) {
    return <EmptyState filtered={filtered} />;
  }

  return (
    <div className="table-scroll">
      <table className="appointments-table" aria-label="Appointments list">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <AppointmentRow
              key={appt.id}
              appointment={appt}
              onConfirm={onConfirm}
              onCancel={onCancel}
              onDelete={onDelete}
              busy={busyId === appt.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
