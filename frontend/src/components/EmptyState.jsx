export default function EmptyState({ filtered }) {
  return (
    <div className="state-container">
      <div className="empty-icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="44" rx="4" stroke="#D1D5DB" strokeWidth="2.5" fill="#F9FAFB" />
          <rect x="16" y="8" width="4" height="8" rx="2" fill="#9CA3AF" />
          <rect x="44" y="8" width="4" height="8" rx="2" fill="#9CA3AF" />
          <line x1="8" y1="24" x2="56" y2="24" stroke="#E5E7EB" strokeWidth="2" />
          <circle cx="32" cy="40" r="8" stroke="#D1D5DB" strokeWidth="2" fill="none" />
          <line x1="32" y1="36" x2="32" y2="41" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="43.5" r="1" fill="#9CA3AF" />
        </svg>
      </div>
      <p className="empty-title">No Appointments Found</p>
      <p className="empty-subtitle">
        {filtered ? 'No results match your search or filter.' : 'Bookings will appear here once created.'}
      </p>
    </div>
  );
}
