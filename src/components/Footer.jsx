
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">VideoBelajar</h3>
          <p className="footer-description">
            Platform pembelajaran video modern untuk meningkatkan skill Anda.
          </p>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Tautan</h4>
          <ul className="footer-links">
            <li><a href="#courses">Kursus</a></li>
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#">Hubungi Kami</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Syarat & Ketentuan</a></li>
            <li><a href="#">Kebijakan Privasi</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VideoBelajar. All rights reserved.</p>
      </div>
    </footer>
  );
}
