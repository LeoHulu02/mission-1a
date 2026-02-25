import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse as deleteCourseApi
} from "./services/api/courseService";
import {
  setCourses,
  addCourse,
  updateCourse as updateCourseAction,
  deleteCourse as deleteCourseAction,
  setLoading,
  setError
} from "./store/redux/courseSlice";

function App() {
  const dispatch = useDispatch();
  const { data: courses, status, error } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    thumbnail: "",
    description: "",
    duration: "",
    price: ""
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      if (status === 'idle') {
        try {
          dispatch(setLoading());
          const data = await getCourses();
          const sanitizedCourses = Array.isArray(data)
            ? data.filter((course) => course && course.id)
            : [];
          dispatch(setCourses(sanitizedCourses));
        } catch (err) {
          dispatch(setError(err.message || "Unknown error"));
        }
      }
    }
    loadCourses();
  }, [status, dispatch]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const priceValue = Number(formData.price);
    const payload = {
      title: formData.title,
      category: formData.category,
      level: formData.level,
      thumbnail: formData.thumbnail,
      description: formData.description,
      duration: formData.duration,
      price: Number.isNaN(priceValue) ? 0 : priceValue
    };

    try {
      const newCourse = await createCourse(payload);
      dispatch(addCourse(newCourse));
      resetForm();
    } catch (err) {
      dispatch(setError(err.message || "Unknown error"));
      alert("Gagal menambahkan kursus: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  function openEditDialog(course) {
    setEditingCourse({
      id: course.id,
      title: course.title || "",
      category: course.category || "",
      level: course.level || "",
      thumbnail: course.thumbnail || "",
      description: course.description || "",
      duration: course.duration || "",
      price: course.price ?? ""
    });
    setIsEditDialogOpen(true);
  }

  function closeEditDialog() {
    setIsEditDialogOpen(false);
    setEditingCourse(null);
  }

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditingCourse((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleEditSubmit(event) {
    event.preventDefault();
    if (!editingCourse || submitting) {
      return;
    }
    setSubmitting(true);
    const priceValue = Number(editingCourse.price);
    const payload = {
      title: editingCourse.title,
      category: editingCourse.category,
      level: editingCourse.level,
      thumbnail: editingCourse.thumbnail,
      description: editingCourse.description,
      duration: editingCourse.duration,
      price: Number.isNaN(priceValue) ? 0 : priceValue
    };

    try {
      const updatedCourse = await updateCourse(editingCourse.id, payload);
      dispatch(updateCourseAction(updatedCourse));
      closeEditDialog();
    } catch (err) {
      dispatch(setError(err.message || "Unknown error"));
      alert("Gagal mengupdate kursus: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Yakin ingin menghapus kursus ini?");
    if (!confirmed) {
      return;
    }
    try {
      setSubmitting(true);
      await deleteCourseApi(id);
      dispatch(deleteCourseAction(id));
    } catch (err) {
      dispatch(setError(err.message || "Unknown error"));
      alert("Gagal menghapus kursus: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="page">
        <header className="navbar">
          <div className="container navbar-container">
            <div className="navbar-logo">VideoBelajar</div>
            <nav className="navbar-links">
              <button type="button" className="button button-small">
                Masuk
              </button>
            </nav>
          </div>
        </header>
        <main className="content container section">
          <div className="section-header">
            <h1 className="section-title">Memuat data...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="page">
        <header className="navbar">
          <div className="container navbar-container">
            <div className="navbar-logo">VideoBelajar</div>
            <nav className="navbar-links">
              <button type="button" className="button button-small">
                Masuk
              </button>
            </nav>
          </div>
        </header>
        <main className="content container section">
          <div className="section-header">
            <h1 className="section-title">Terjadi Kesalahan</h1>
            <p className="section-subtitle">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="navbar">
        <div className="container navbar-container">
          <a href="#" className="navbar-logo">VideoBelajar</a>
          <nav className="navbar-links">
            <a href="#courses" className="navbar-link">
              Kursus
            </a>
            <a href="#about" className="navbar-link">
              Tentang
            </a>
            <button type="button" className="button button-small">
              Masuk
            </button>
          </nav>
        </div>
      </header>
      
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <p className="hero-kicker">Video Learning Platform</p>
            <h1 className="hero-title">Tingkatkan Skillmu dengan VideoBelajar</h1>
            <p className="hero-description">
              Platform pembelajaran video berbasis web yang
              memberi akses ke beragam kursus dan tutorial. 
              Belajar dengan kecepatan dan jadwalmu sendiri.
            </p>
            <a href="#courses" className="button">Mulai Belajar Sekarang</a>
          </div>
          <div className="hero-phone">
            <div className="phone-frame">
              <div className="phone-screen">
                <p className="phone-title">Kursus Unggulan</p>
                <p className="phone-subtitle">
                  Teknologi, Bisnis, & Pengembangan Diri
                </p>
                <div style={{ marginTop: '2rem', fontSize: '3rem' }}>🚀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        <section id="courses" className="section">
          <div className="section-header">
            <h2 className="section-title">Koleksi Kursus Terbaru</h2>
            <p className="section-subtitle">
              Pilih kursus yang sesuai dengan kebutuhan dan minat belajar kamu.
            </p>
          </div>

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
                  disabled={submitting}
                >
                  Reset
                </button>
                <button className="button" type="submit" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : 'Tambah Kursus'}
                </button>
              </div>
            </form>
          </div>

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
                      onClick={() => openEditDialog(course)}
                      disabled={submitting}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button button-small button-danger"
                      onClick={() => handleDelete(course.id)}
                      disabled={submitting}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        
        <section id="about" className="section">
          <div className="about-inner">
            <div className="about-text">
              <h2 className="section-title">Belajar Fleksibel dan Terarah</h2>
              <p className="section-subtitle">
                Akses beragam kursus video yang dirancang untuk membantu kamu
                meningkatkan skill secara bertahap, kapan saja dan di mana
                saja. Platform kami didesain untuk kenyamanan belajar maksimal.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <a href="#courses" className="button">Lihat Semua Kursus</a>
              </div>
            </div>
            <div className="about-image">
              <img
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg"
                alt="Belajar online"
              />
            </div>
          </div>
        </section>
      </main>

      {isEditDialogOpen && editingCourse && (
        <div className="dialog-backdrop" onClick={closeEditDialog}>
          <div
            className="dialog"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h3 className="dialog-title">Edit Kursus</h3>
            <form className="dialog-form" onSubmit={handleEditSubmit}>
              <div className="course-form-field">
                <label htmlFor="edit-title">Judul Kursus</label>
                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  value={editingCourse.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="course-form-field">
                <label htmlFor="edit-category">Kategori</label>
                <input
                  id="edit-category"
                  name="category"
                  type="text"
                  value={editingCourse.category}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="course-form-field">
                <label htmlFor="edit-level">Level</label>
                <input
                  id="edit-level"
                  name="level"
                  type="text"
                  value={editingCourse.level}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="course-form-field">
                <label htmlFor="edit-thumbnail">URL Thumbnail</label>
                <input
                  id="edit-thumbnail"
                  name="thumbnail"
                  type="text"
                  value={editingCourse.thumbnail}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="course-form-field course-form-field-full">
                <label htmlFor="edit-description">Deskripsi</label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows="3"
                  value={editingCourse.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="course-form-field">
                <label htmlFor="edit-duration">Durasi</label>
                <input
                  id="edit-duration"
                  name="duration"
                  type="text"
                  value={editingCourse.duration}
                  onChange={handleEditChange}
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
                  value={editingCourse.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="dialog-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={closeEditDialog}
                  disabled={submitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={submitting}
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
