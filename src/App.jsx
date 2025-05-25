import React from 'react';
import './App.css';

const COMPANY_LOGOS = [
  { name: 'INDMONEY', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/INDmoney_logo.png' },
  { name: 'Angel One', url: 'https://assets.angelone.in/app-icons/angelone-logo.svg' },
  { name: 'Goldman Sachs', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Goldman_Sachs.svg' },
];

const quickStats = [
  '4+ Years Experience',
  'Billions in Transactions',
  '20M+ Users Served',
  '3 Major Fintech Companies',
];

const whatIDo = [
  {
    icon: '🏗️',
    title: 'System Architecture',
    desc: 'Design scalable systems that serve millions',
    cta: 'Learn More',
    link: '#',
  },
  {
    icon: '💰',
    title: 'Fintech Solutions',
    desc: 'Build trading & banking platforms that handle billions in volume',
    cta: 'See Projects',
    link: '#',
  },
  {
    icon: '🚀',
    title: 'Performance Optimization',
    desc: 'Reduce processing times from hours to minutes',
    cta: 'View Impact',
    link: '#',
  },
];

const featuredWork = [
  {
    img: 'https://dummyimage.com/400x200/2563eb/fff&text=INDMONEY+Integration',
    title: 'INDMONEY Integration',
    desc: 'Banking platform serving 2M+ active users',
    cta: 'View Details',
    link: '#',
  },
  {
    img: 'https://dummyimage.com/400x200/0ea5e9/fff&text=Angel+One+Optimization',
    title: 'Angel One Optimization',
    desc: 'Reduced trade execution time by 60%',
    cta: 'See Results',
    link: '#',
  },
];

export default function App() {
  return (
    <div className="main-bg">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-card">
          <img src="/Profile.jpg" alt="Profile" className="profile-pic" />
          <h1 className="hero-title">Sandeep Mehta</h1>
          <div className="hero-subtitle" style={{ fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.5rem' }}>
            Principal Software Engineer
          </div>
          <div className="hero-desc">
            Building scalable fintech solutions that handle billions in transactions. <br />
            Currently architecting the future of finance at <b>INDMONEY</b>.
          </div>
          <div className="hero-links cta-buttons">
            <a href="#featured-work" className="cta-btn">View My Work</a>
            <a href="/Resume.pdf" className="cta-btn" download>Download Resume</a>
            <a href="#contact" className="cta-btn">Let's Connect</a>
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <div className="quick-stats">
        {quickStats.map(stat => <span key={stat}>{stat}</span>)}
      </div>

      {/* What I Do Section */}
      <section className="what-i-do" id="what-i-do">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>What I Do</h2>
          <div className="cards-grid">
            {whatIDo.map(card => (
              <div className="card" key={card.title}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <a href={card.link} className="card-cta">{card.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="featured-work" id="featured-work">
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Featured Work</h2>
          <div className="featured-grid">
            {featuredWork.map(work => (
              <div className="featured-card" key={work.title}>
                <img src={work.img} alt={work.title} className="featured-img" />
                <h3>{work.title}</h3>
                <p>{work.desc}</p>
                <a href={work.link} className="card-cta">{work.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <div className="trust-bar">
        <span>Trusted by leading fintech companies:</span>
        {COMPANY_LOGOS.map(logo => (
          <img src={logo.url} alt={logo.name} className="trust-logo" key={logo.name} />
        ))}
        <span style={{ fontStyle: 'italic', marginLeft: '1.5rem' }}>
          "Sandeep delivered exceptional results..." - Former Colleague
        </span>
      </div>

      {/* CTA Footer */}
      <footer className="cta-footer">
        <div>Ready to discuss your next fintech challenge?</div>
        <a href="#contact" className="cta-btn">Get In Touch</a>
        <a href="/Resume.pdf" className="cta-btn" download>View Full Resume</a>
        <div style={{ marginTop: '1.5rem', fontSize: '1rem', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Sandeep Mehta. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
