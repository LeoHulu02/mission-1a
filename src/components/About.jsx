
import React from 'react';

export default function About() {
  return (
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
  );
}
