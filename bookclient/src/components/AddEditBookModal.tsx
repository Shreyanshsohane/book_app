import React, { useState } from "react";
import "./AddEditBookModal.css";

interface Props {
  onClose: () => void;
}

const AddEditBookModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [img, setImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImg(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!img) {
      alert("Please select an image.");
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y5NDU5ZmYxY2IxMTk1ODAzMmFkYmQiLCJyb2xlIjoib3duZXIiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDQ0MDA3NjAsImV4cCI6MTc0NDc0NjM2MH0.3svBcnTbtTTU-wYRRznGhbewXgFT5T11A0MSPaHOP_o"
    );

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("author", author);
    formdata.append("genre", genre);
    formdata.append("city", city);
    formdata.append("contact", contact);
    formdata.append("isAvailable", isAvailable.toString());
    formdata.append("img", img);

    try {
      const response = await fetch(
        "https://book-app-zqso.onrender.com/api/book/add",
        {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow" as RequestRedirect,
        }
      );

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const result = await response.text();
      console.log(result);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Book</h2>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Book Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                placeholder="Author name"
              />
            </div>

            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                placeholder="Fiction, Mystery, etc."
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Your location"
              />
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                placeholder="Phone or email"
              />
            </div>

            <div className="form-group checkbox-group full-width">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                />
                <span>Available for borrowing</span>
              </label>
            </div>

            <div className="form-group full-width">
              <label>Book Cover</label>
              <div className="image-upload-container">
                {imagePreview ? (
                  <div className="image-preview-wrapper">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImg(null);
                        setImagePreview(null);
                      }}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <svg className="upload-icon" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                    </svg>
                    <p className="upload-text">Select an image file</p>
                  </div>
                )}
                <div className="file-input-wrapper">
                  <label htmlFor="file-upload" className="file-input-label">
                    {imagePreview ? "Change image" : "Upload file"}
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!img}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <span className="loader-container">
                  <span className="loader"></span>
                  <span>Saving...</span>
                </span>
              ) : (
                "Add Book"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookModal;
