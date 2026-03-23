
import React from 'react';

export default function CourseList({ courses, onEdit, onDelete }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3 className="empty-title">Belum ada kursus yang tersedia</h3>
        <p className="empty-subtitle">
          Mulai dengan menambahkan kursus pertamamu dan bangun koleksi belajar yang terstruktur.
        </p>
        <a href="#courses" className="button button-small">
          Tambah Kursus Pertama
        </a>
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
              <span className="course-category">{course.category}</span>
              <span className="course-meta-dot">•</span>
              <span className="course-level-pill">{course.level}</span>
            </div>
            {course.price === 0 && (
              <span className="course-badge course-badge-free">Gratis</span>
            )}
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-footer">
              <span className="course-duration">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span className={course.price === 0 ? "course-price course-price-free" : "course-price"}>
                {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="course-card-actions">
              <button
                type="button"
                className="button button-small button-secondary"
                onClick={() => onEdit(course)}
              >
                <span className="button-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="2.5"
                      width="8.5"
                      height="10.5"
                      rx="1.75"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M5.25 9.75L9.25 5.75"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="9.25"
                      cy="5.25"
                      r="0.7"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>Edit</span>
              </button>
              <button
                type="button"
                className="button button-small button-danger"
                onClick={() => onDelete(course.id)}
              >
                <span className="button-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M5.5 8H10.5"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
