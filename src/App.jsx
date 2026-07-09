import React, { useEffect, useState } from 'react';
import './App.css';
import { GitHubIcon, GmailIcon, PhoneIcon, LinkedInIcon, MediumIcon } from './icons.jsx';

const COMPANY_LOGOS = [
  { name: 'INDMONEY', url: '/indmoneylogo.png' },
  { name: 'Angel One', url: '/angelone.webp' },
  { name: 'Goldman Sachs', url: '/Goldman_Sachs.svg.png' },
];

function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const observer = new window.IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      }
    }, observerOptions);
    const cards = document.querySelectorAll('.service-card, .card, .featured-card, .project-card');
    for (const card of cards) {
      observer.observe(card);
    }
    return () => observer.disconnect();
  }, []);
}

function useNumberCounters() {
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      for (const counter of counters) {
        const target = Number.parseInt(counter.dataset.target);
        const increment = Math.max(target / 200, 1);
        let current = 0;
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
      }
    };
    animateCounters();
  }, []);
}

export default function App() {
  useScrollAnimations();
  useNumberCounters();
  const [activeTab, setActiveTab] = useState('about');

  // Image error handler for logos
  const handleLogoError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <>
      {/* Fixed Navigation Header with Tabs */}
      <header className="fixed-header" id="mainHeader">
        <div className="container">
          <div className="logo">SM</div>
          <nav className="tab-nav">
            <button type="button" className={activeTab === 'about' ? 'tab-active' : ''} onClick={() => setActiveTab('about')}>About</button>
            <button type="button" className={activeTab === 'experience' ? 'tab-active' : ''} onClick={() => setActiveTab('experience')}>Work Experience</button>
            <button type="button" className={activeTab === 'projects' ? 'tab-active' : ''} onClick={() => setActiveTab('projects')}>Code Projects</button>
            <button type="button" className={activeTab === 'internships' ? 'tab-active' : ''} onClick={() => setActiveTab('internships')}>Internships</button>
            <button type="button" className={activeTab === 'contact' ? 'tab-active' : ''} onClick={() => setActiveTab('contact')}>Contact</button>
          </nav>
        </div>
      </header>
      <div className="main-bg" style={{ paddingTop: '5.5rem' }}>
        {activeTab === 'about' && (
          <section id="about" className="about-section">
            <div className="section-container about-card">
              <div className="cover-photo-banner">
                <img src="/Profile.jpg" alt="Profile" className="profile-pic" />
              </div>
              <div className="about-content">
                <h2>About Me</h2>
                <p>
                  <b>Principal Software Engineer</b> with 6+ years of experience designing and building large-scale fintech and AI products that serve millions of users and drive measurable business growth. Currently leading backend engineering at INDMONEY, I specialize in high-performance distributed systems, complex financial integrations, and cloud-native architectures.
                </p>
                <p>
                  My journey spans top organizations including INDMONEY, Angel One, and Goldman Sachs, where I've delivered solutions handling billions in transactions — from optimizing high-traffic trading applications processing 100+ GB daily to building AI-powered recommendation engines driving ₹50 Cr+ in annual revenue.
                </p>
                <p>
                  <b>Key strengths:</b>
                </p>
                <ul style={{marginBottom: '1.1rem', color: '#f7f7f7', paddingLeft: '1.2rem'}}>
                  <li>Architecting scalable, high-availability distributed systems on AWS</li>
                  <li>Performance optimization, big data pipelines (PySpark, Kafka), and observability (Prometheus, Grafana)</li>
                  <li>Microservices, event-driven architecture, and Backend-for-Frontend (BFF) patterns</li>
                  <li>Machine learning applications, recommendation systems, and workflow automation</li>
                  <li>Leading cross-functional teams and mentoring engineers</li>
                </ul>
                <p>
                  My background in mathematics (Integrated MSc, NIT Rourkela) shapes my approach to complex engineering challenges, algorithmic optimization, and data-driven solutions. I'm also an active open-source contributor and builder — from production-ready Go frameworks to real-time multiplayer games.
                </p>
                <p>
                  I thrive at the intersection of technology and business impact — whether it's reducing processing times from hours to minutes, building systems that serve 20M+ users daily, or launching products that generate millions in revenue. Winner of the Goldman Sachs India Engineering Hackathon 2021.
                </p>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'experience' && (
          <section id="experience" className="experience-section">
            <div className="section-container">
              <h2>Work Experience</h2>
              <div className="experience-list">
                {/* INDMONEY */}
                <div className="experience-item">
                  <img src="/indmoneylogo.png" alt="INDMONEY" className="exp-logo" />
                  <div>
                    <h3>INDMONEY <span style={{fontWeight:400}}>- Principal Software Engineer (Sep 2024 – Present)</span></h3>
                    <ul>
                      <li>Spearheaded multiple remittance integrations for US stocks, including ICICI Bank LRS gateway, IDFC Bank, and Federal Bank (onboarding, account creation, withdrawal) — enabling seamless international transactions for millions of users.</li>
                      <li>Led the first phase of the Income Tax Return (ITR) project end-to-end, from backend development through to mobile display, enabling in-app tax filing for users.</li>
                      <li>Enhanced FD application journeys (KYC and payments), driving a 57% increase in monthly investment value (from ₹10 Cr to ₹15.7 Cr) through data-driven optimizations.</li>
                      <li>Established a PII (Personally Identifiable Information) detection framework, strengthening security and compliance posture across the platform.</li>
                      <li>Pioneered Backend-for-Frontend (BFF) methodology, enabling backend-driven native UI pages and reducing dependency on app builds/releases for rapid feature deployment.</li>
                    </ul>
                    <div style={{marginTop: '0.5rem', fontSize: '1rem'}}><b>Stack:</b> Python (Django), Golang, AWS (SNS, Lambda, EventBridge, ECS, EC2, RDS), PostgreSQL, Docker</div>
                  </div>
                </div>
                {/* Angel One */}
                <div className="experience-item">
                  <img src="/angelone.webp" alt="Angel One" className="exp-logo" />
                  <div>
                    <h3>Angel One <span style={{fontWeight:400}}>- Senior Software Engineer (SDE-2) (Feb 2022 – Sep 2024)</span></h3>
                    <ul>
                      <li>Modernized and migrated core trading and portfolio systems from legacy stacks to Golang and PySpark, significantly improving system performance, reliability, and maintainability for 20M+ users.</li>
                      <li>Developed and launched an AI-powered recommendations engine, driving ₹50 Cr+ in annual revenue and enhancing user engagement through intelligent stock discovery and personalized advisory.</li>
                      <li>Unified portfolio management by consolidating multiple financial instruments, resulting in a 45% improvement in Net Promoter Score (NPS) and a seamless user experience.</li>
                      <li>Engineered robust big data pipelines and observability infrastructure, optimizing data processing for 100+ GB daily and ensuring high system availability and monitoring.</li>
                      <li>Reduced complex algorithm calculation time from 4 hours to 30 minutes, enabling real-time portfolio aggregation and reporting for millions of users.</li>
                    </ul>
                    <div style={{marginTop: '0.5rem', fontSize: '1rem'}}><b>Stack:</b> AWS, PySpark, Golang, Python, Docker, Kafka, Redis, Grafana</div>
                  </div>
                </div>
                {/* Goldman Sachs */}
                <div className="experience-item">
                  <img src="/Goldman_Sachs.svg.png" alt="Goldman Sachs" className="exp-logo" />
                  <div>
                    <h3>Goldman Sachs <span style={{fontWeight:400}}>- Software Engineer (Jul 2020 – Feb 2022)</span></h3>
                    <ul>
                      <li>Engineered and modernized critical vendor risk management and entitlement systems, supporting global operations and improving compliance workflows.</li>
                      <li>Led cloud migration and process automation initiatives, consolidating data from multiple sources and exposing it through REST APIs and internal platforms.</li>
                      <li>Recognized for innovation by winning the Goldman Sachs India Engineering Hackathon 2021 for designing workflow automation that reduced business process timelines from months to days.</li>
                      <li>Delivered solutions impacting multiple divisions globally, collaborating with cross-functional teams to drive enterprise application modernization and efficiency.</li>
                      <li>Contributed to the development and maintenance of in-house applications for vendor risk assessment, contracting, and compliance, ensuring high standards of security and reliability.</li>
                    </ul>
                    <div style={{marginTop: '0.5rem', fontSize: '1rem'}}><b>Stack:</b> Java, Spring Boot, Python, DB2, Microservices, AWS, GitLab</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'projects' && (
          <section id="projects" className="projects-section">
            <div className="section-container">
              <h2>Code Projects</h2>
              <div className="tile-grid">
                {/* Type Strike */}
                <a href="https://github.com/CpBruceMeena/type-strike" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Type Strike</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Gamified typing arcade — 500 levels, combo engine, global leaderboards, and daily contests.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">TypeScript</span>
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">PostgreSQL</span>
                  </div>
                </a>

                {/* Sync */}
                <a href="https://github.com/CpBruceMeena/sync" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Sync</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Real-time comm platform — Go + Next.js, WebSocket, JWT auth, group chat with presence tracking.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">WebSocket</span>
                  </div>
                </a>

                {/* Go Starter */}
                <a href="https://github.com/CpBruceMeena/go-starter" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Go Starter</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Production Go template — observability, circuit breaker, AWS SQS, multi-stage Docker.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">AWS</span>
                    <span className="tech-tag">Docker</span>
                  </div>
                </a>

                {/* Center */}
                <a href="https://github.com/CpBruceMeena/center" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Center</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">API Gateway — dynamic reverse proxy, Clerk SSO, health monitoring, admin console.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Go (Gin)</span>
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">PostgreSQL</span>
                  </div>
                </a>

                {/* Interview Prep */}
                <a href="https://github.com/CpBruceMeena/interview-prep" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Interview Prep</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Staff/Principal prep — 18 LLD projects, RAG chatbots, 90+ CS questions across 8 topics.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">RAG</span>
                  </div>
                </a>

                {/* Curio */}
                <a href="https://github.com/CpBruceMeena/curio" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Curio</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Knowledge discovery app — swipeable facts, puzzles, novels, TTS, all in a dark-first feed.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Kotlin</span>
                    <span className="tech-tag">Jetpack Compose</span>
                    <span className="tech-tag">ExoPlayer</span>
                  </div>
                </a>

                {/* Playlist */}
                <a href="https://github.com/CpBruceMeena/playlist" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Playlist</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">AI-powered YouTube playlist generator — natural language queries, smart filters, Android app.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">Kotlin</span>
                    <span className="tech-tag">Jetpack Compose</span>
                    <span className="tech-tag">YouTube API</span>
                  </div>
                </a>

                {/* Yooboo */}
                <a href="https://github.com/CpBruceMeena/yooboo" target="_blank" rel="noopener noreferrer" className="tile-card">
                  <div className="tile-header">
                    <span className="tile-title">Yooboo</span>
                    <GitHubIcon />
                  </div>
                  <p className="tile-desc">Real-time multiplayer card game — stacking penalties, special cards, elimination rounds.</p>
                  <div className="tile-tech">
                    <span className="tech-tag">TypeScript</span>
                    <span className="tech-tag">Socket.IO</span>
                    <span className="tech-tag">Next.js</span>
                  </div>
                </a>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'internships' && (
          <section id="internships" className="projects-section">
            <div className="section-container">
              <h2>Internships</h2>
              <div className="experience-list">
                <div className="experience-item">
                  <img src="/ISI.svg.png" alt="ISI Kolkata" className="exp-logo" onError={handleLogoError} />
                  <div>
                    <h3>ISI Kolkata (Machine Intelligence Unit) <span style={{fontWeight:400}}>- Research Intern (May 2019 - June 2019)</span></h3>
                    <ul>
                      <li>Conducted research on "Intraday Stock Recommender System" using RNN with LSTM</li>
                      <li>Developed clustering algorithms for pattern-based stock suggestions</li>
                      <li>Published findings contributing to financial machine learning research</li>
                    </ul>
                  </div>
                </div>
                <div className="experience-item">
                  <img src="/econnect.jpeg" alt="E-Connect Solutions" className="exp-logo" onError={handleLogoError} />
                  <div>
                    <h3>E-Connect Solutions Pvt. Ltd. <span style={{fontWeight:400}}>- Software Engineer Intern (May 2018 – June 2018)</span></h3>
                    <ul>
                      <li>Designed and developed "Complaint Handling System" for automated complaint management</li>
                      <li>Created intelligent area-based complaint routing to appropriate vendors</li>
                      <li>Built comprehensive frontend web forms and robust backend architecture</li>
                      <li>Delivered end-to-end solution from requirements gathering to deployment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'contact' && (
          <section id="contact" className="contact-section">
            <div className="section-container">
              <h2>Contact</h2>
              <p>I'm passionate about solving complex engineering challenges, mentoring fellow engineers, and exploring innovative applications of technology in finance. Whether you're interested in discussing cutting-edge fintech solutions, system architecture at scale, or collaborative opportunities, I'd love to connect.</p>
              <ul className="contact-list" style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', maxWidth: 420, margin: '2rem auto 1.5rem auto' }}>
                <li className="social-icons">
                  <a href="https://www.linkedin.com/in/sandeep-mehta-733521119/" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="linkedin">
                    <LinkedInIcon />
                  </a>
                  <a href="https://github.com/CpBruceMeena" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="github">
                    <GitHubIcon />
                  </a>
                  <a href="https://medium.com/@sandeep10198" target="_blank" rel="noopener noreferrer" className="contact-icon" aria-label="medium">
                    <MediumIcon />
                  </a>
                </li>
                <li className="contact-item">
                  <span className="contact-icon" aria-label="phone">
                    <PhoneIcon />
                  </span>
                  <a href="tel:+918093589961" className="contact-value">+91-8093589961</a>
                </li>
                <li className="contact-item">
                  <span className="contact-icon" aria-label="email">
                    <GmailIcon />
                  </span>
                  <a href="mailto:sandeep10198@gmail.com" className="contact-value">sandeep10198@gmail.com</a>
                </li>
              </ul>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <a 
                  href="/Sandeep Mehta.pdf" 
                  download 
                  className="download-resume-btn"
                  style={{
                    display: 'inline-block',
                    padding: '0.8rem 1.5rem',
                    backgroundColor: 'var(--saffron)',
                    color: 'var(--charcoal)',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    transition: 'transform 0.2s, background-color 0.2s',
                    boxShadow: '0 4px 16px 0 rgba(44, 62, 80, 0.10)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.backgroundColor = '#f4a261';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.backgroundColor = 'var(--saffron)';
                  }}
                  onFocus={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.backgroundColor = '#f4a261';
                  }}
                  onBlur={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.backgroundColor = 'var(--saffron)';
                  }}
                >
                  Download Resume
                </a>
              </div>
              <div style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#e9c46a', textAlign: 'center', fontSize: '1.1rem' }}>
                "The things that are easy to do are also easy not to do, that's the difference between success and failure."
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
