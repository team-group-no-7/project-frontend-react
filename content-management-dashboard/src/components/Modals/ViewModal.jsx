import "./ViewModal.css";

function ViewModal({
  isOpen,
  content,
  onClose,
}) {

  if (!isOpen) return null;

  return (

    <div className="modal-overlay">

      <div className="view-modal">

        <h2>Content Details</h2>

        <div className="detail-row">

          <span>Thumbnail</span>

          <span>{content.thumbnail}</span>

        </div>

        <div className="detail-row">

          <span>Title</span>

          <span>{content.title}</span>

        </div>

        <div className="detail-row">

          <span>Category</span>

          <span>{content.category}</span>

        </div>

        <div className="detail-row">

          <span>Price</span>

          <span>₹{content.price}</span>

        </div>

        <div className="detail-row">

          <span>Status</span>

          <span>{content.status}</span>

        </div>

        <div className="detail-row">

          <span>Date</span>

          <span>{content.date}</span>

        </div>

        <div className="detail-row">

          <span>Description</span>

          <span>{content.description}</span>

        </div>

        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>

  );

}

export default ViewModal;