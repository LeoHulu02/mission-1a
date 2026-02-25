
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseList from "./components/CourseList";
import CourseForm from "./components/CourseForm";
import EditCourseDialog from "./components/EditCourseDialog";
import About from "./components/About";
import Footer from "./components/Footer";

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

  const [editingCourse, setEditingCourse] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Toast Notification State
  const [toast, setToast] = useState(null);

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

  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  function closeToast() {
    setToast(null);
  }

  async function handleCreateCourse(formData, resetForm) {
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
      showToast("Kursus berhasil ditambahkan!", "success");
    } catch (err) {
      showToast("Gagal menambahkan kursus: " + (err.message || "Unknown error"), "error");
    } finally {
      setSubmitting(false);
    }
  }

  function openEditDialog(course) {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
  }

  function closeEditDialog() {
    setIsEditDialogOpen(false);
    setEditingCourse(null);
  }

  async function handleUpdateCourse(updatedData) {
    if (!editingCourse || submitting) {
      return;
    }
    setSubmitting(true);
    const priceValue = Number(updatedData.price);
    const payload = {
      title: updatedData.title,
      category: updatedData.category,
      level: updatedData.level,
      thumbnail: updatedData.thumbnail,
      description: updatedData.description,
      duration: updatedData.duration,
      price: Number.isNaN(priceValue) ? 0 : priceValue
    };

    try {
      const updatedCourse = await updateCourse(editingCourse.id, payload);
      dispatch(updateCourseAction(updatedCourse));
      closeEditDialog();
      showToast("Kursus berhasil diperbarui!", "success");
    } catch (err) {
      showToast("Gagal mengupdate kursus: " + (err.message || "Unknown error"), "error");
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
      showToast("Kursus berhasil dihapus!", "success");
    } catch (err) {
      showToast("Gagal menghapus kursus: " + (err.message || "Unknown error"), "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="page">
        <Navbar />
        <main className="content container section">
          <div className="section-header">
            <h1 className="section-title">Memuat data...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="page">
        <Navbar />
        <main className="content container section">
          <div className="section-header">
            <h1 className="section-title">Terjadi Kesalahan</h1>
            <p className="section-subtitle">{error}</p>
            <button 
              className="button" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '1rem' }}
            >
              Coba Lagi
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      
      <Hero />

      <main className="container">
        <section id="courses" className="section">
          <div className="section-header">
            <h2 className="section-title">Koleksi Kursus Terbaru</h2>
            <p className="section-subtitle">
              Pilih kursus yang sesuai dengan kebutuhan dan minat belajar kamu.
            </p>
          </div>

          <CourseForm onSubmit={handleCreateCourse} isSubmitting={submitting} />

          <CourseList 
            courses={courses} 
            onEdit={openEditDialog} 
            onDelete={handleDelete} 
          />
        </section>
        
        <About />
      </main>

      <Footer />

      <EditCourseDialog
        isOpen={isEditDialogOpen}
        initialData={editingCourse}
        onClose={closeEditDialog}
        onSubmit={handleUpdateCourse}
        isSubmitting={submitting}
      />

      {toast && (
        <div className="toast-container">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        </div>
      )}
    </div>
  );
}

export default App;
