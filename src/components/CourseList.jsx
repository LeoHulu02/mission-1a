
import React from 'react';

export default function CourseList({ courses, onEdit, onDelete }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="section-header">
        <p className="section-subtitle">Belum ada kursus yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <article key={course.id} className="course-card">
          <div className="course-thumbnail">
            <img
              src={
                typeof course.thumbnail === "string" &&
                course.thumbnail.trim().startsWith("http")
                  ? course.thumbnail.trim()
                  : "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
              }
              alt={course.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";
              }}
            />
          </div>
          <div className="course-body">
            <div className="course-meta">
              <span>{course.category}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-footer">
              <span className="course-duration">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className="course-price">
                {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="course-card-actions">
              <button
                type="button"
                className="button button-small button-secondary"
                onClick={() => onEdit(course)}
              >
                Edit
              </button>
              <button
                type="button"
                className="button button-small button-danger"
                onClick={() => onDelete(course.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
