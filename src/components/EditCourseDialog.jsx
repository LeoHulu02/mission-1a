
import React, { useState, useEffect } from 'react';

export default function EditCourseDialog({ isOpen, initialData, onClose, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    thumbnail: "",
    description: "",
    duration: "",
    price: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        level: initialData.level || "",
        thumbnail: initialData.thumbnail || "",
        description: initialData.description || "",
        duration: initialData.duration || "",
        price: initialData.price ?? ""
      });
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  if (!isOpen || !initialData) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h3 className="dialog-title">Edit Kursus</h3>
        <form className="dialog-form" onSubmit={handleSubmit}>
          <div className="course-form-field">
            <label htmlFor="edit-title">Judul Kursus</label>
            <input
              id="edit-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="edit-category">Kategori</label>
            <input
              id="edit-category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="edit-level">Level</label>
            <input
              id="edit-level"
              name="level"
              type="text"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="edit-thumbnail">URL Thumbnail</label>
            <input
              id="edit-thumbnail"
              name="thumbnail"
              type="text"
              value={formData.thumbnail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field course-form-field-full">
            <label htmlFor="edit-description">Deskripsi</label>
            <textarea
              id="edit-description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="edit-duration">Durasi</label>
            <input
              id="edit-duration"
              name="duration"
              type="text"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="edit-price">Harga (Rp)</label>
            <input
              id="edit-price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="dialog-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
