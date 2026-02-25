
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
  );
}
