
import React, { useState } from 'react';

export default function CourseForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    thumbnail: "",
    description: "",
    duration: "",
    price: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function resetForm() {
    setFormData({
      title: "",
      category: "",
      level: "",
      thumbnail: "",
      description: "",
      duration: "",
      price: ""
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData, resetForm);
  }

  return (
    <div className="course-form-container">
      <h3 className="course-form-title">Tambah Kursus Baru</h3>
      <form className="course-form" onSubmit={handleSubmit}>
        <div className="course-form-grid">
          <div className="course-form-field">
            <label htmlFor="title">Judul Kursus</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Belajar React dari Nol"
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="category">Kategori</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Contoh: Frontend"
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="level">Level</label>
            <input
              id="level"
              name="level"
              type="text"
              value={formData.level}
              onChange={handleChange}
              placeholder="Contoh: Beginner"
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="thumbnail">URL Thumbnail</label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="text"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>
          <div className="course-form-field course-form-field-full">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Jelaskan secara singkat tentang kursus ini"
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="duration">Durasi</label>
            <input
              id="duration"
              name="duration"
              type="text"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Contoh: 3h 25m"
              required
            />
          </div>
          <div className="course-form-field">
            <label htmlFor="price">Harga (Rp)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0 untuk Gratis"
              required
            />
          </div>
        </div>
        <div className="course-form-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Tambah Kursus'}
          </button>
        </div>
      </form>
    </div>
  );
}
