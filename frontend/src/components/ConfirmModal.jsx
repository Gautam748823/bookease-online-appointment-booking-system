import '../styles/adminDashboard.css';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm action">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
