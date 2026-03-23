
import React from 'react';

export default function Hero() {
  return (
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
          <div className="hero-actions">
            <a href="#courses" className="button">Mulai Belajar Sekarang</a>
            <p className="hero-subtext">
              Akses seumur hidup ke semua materi, tanpa biaya langganan.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">120+</span>
              <span className="hero-stat-label">Kursus aktif</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">3.5k+</span>
              <span className="hero-stat-label">Pembelajar bergabung</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">4.8/5</span>
              <span className="hero-stat-label">Rating rata-rata</span>
            </div>
          </div>
        </div>
        <div className="hero-phone">
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="phone-header">
                <span className="phone-badge">Kursus Unggulan</span>
                <span className="phone-tag">Gratis</span>
              </div>
              <div>
                <p className="phone-course-title">Belajar React dari Nol</p>
                <p className="phone-course-meta">Beginner • 12 video praktis</p>
              </div>
              <div className="phone-footer">
                <span className="phone-duration">Durasi 3j 25m</span>
                <span className="phone-price">Rp 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
