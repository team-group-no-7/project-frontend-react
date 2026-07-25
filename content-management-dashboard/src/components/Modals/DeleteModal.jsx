import "./DeleteModal.css";
function DeleteModal({
  isOpen,
  title,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Delete Content</h2>
        <p>
          Are you sure you want to delete
          <strong> "{title}" </strong>
          ?
        </p>
        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;