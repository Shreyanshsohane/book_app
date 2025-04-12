import React from "react";
import "./DeleteModal.css";
import { deleteBook } from "../services/api/books";

interface DeleteModalProps {
  onClose: () => void;
  itemName: string;
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  itemName = "this item",
  id,
}) => {
  const handleDelete = async () => {
    try {
      await deleteBook(id);
      alert(`${itemName} deleted successfully.`);
      onClose(); // Close modal after successful deletion
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete {itemName}?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
