
import React from 'react';

export default function Navbar() {
  return (
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
  );
}
