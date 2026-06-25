export default function LoadingSpinner() {
  return (
    <div className="state-container" role="status" aria-label="Loading appointments">
      <div className="spinner" aria-hidden="true"></div>
      <p>Loading appointments...</p>
    </div>
  );
}
