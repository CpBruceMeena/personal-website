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
            <button type="button" className={activeTab === 'internships' ? 'tab-active' : ''} onClick={() => setActiveTab('internships')}>Internships</button>
            <button type="button" className={activeTab === 'projects' ? 'tab-active' : ''} onClick={() => setActiveTab('projects')}>Code Projects</button>
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
                  <b>Principal Software Engineer</b> with 5 years of experience designing and building large-scale fintech solutions that serve millions of users and drive measurable business growth. Currently leading engineering initiatives at INDMONEY, I specialize in high-performance backend systems, complex financial integrations, and transforming technical challenges into business value.
                </p>
                <p>
                  My journey spans top organizations including INDMONEY, Angel One, and Goldman Sachs, where I've delivered solutions handling billions in transactions, optimized critical business processes, and enhanced customer experiences at scale.
                </p>
                <p>
                  <b>Key strengths:</b>
                </p>
                <ul style={{marginBottom: '1.1rem', color: '#f7f7f7', paddingLeft: '1.2rem'}}>
                  <li>Architecting scalable, high-availability distributed systems</li>
                  <li>Performance optimization, big data processing, and observability</li>
                  <li>Machine learning, recommendation systems, and analytics</li>
                  <li>Leading cross-functional teams and mentoring engineers</li>
                </ul>
                <p>
                  My background in mathematics (Integrated MSc, NIT Rourkela) shapes my approach to complex engineering challenges, algorithmic optimization, and data-driven solutions.
                </p>
                <p>
                  I thrive at the intersection of technology and business impact—whether it's reducing processing times from hours to minutes, building systems that serve 20M+ users daily, or launching products that generate millions in revenue.
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
                      <li>Led critical banking integrations (ICICI, Axis Bank LRS), enabling seamless international remittances and lending operations for millions of users.</li>
                      <li>Managed the Fixed Deposit portfolio, driving a 78.6% increase in customer acquisition and 57% growth in investment value through data-driven optimizations and UI improvements.</li>
                      <li>Established comprehensive security and compliance frameworks, including PII detection and S3 encryption, ensuring regulatory adherence and data protection.</li>
                      <li>Pioneered Backend-for-Frontend (BFF) methodology, empowering backend-driven UI updates and reducing dependency on app releases for rapid feature deployment.</li>
                      <li>Streamlined development velocity by improving deployment processes and fostering collaboration across mobile and web engineering teams.</li>
                    </ul>
                    <div style={{marginTop: '0.5rem', fontSize: '1rem'}}><b>Stack:</b> AWS, Docker, Python (Django), Golang, Bitbucket, Jenkins</div>
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
        {activeTab === 'projects' && (
          <section id="projects" className="projects-section">
            <div className="section-container">
              <h2>Code Projects</h2>
              <div className="projects-grid">
                {/* Go-Balance */}
                <div className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      Go-Balance
                      <span className="project-status">Active</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/CpBruceMeena/Go-Balance" className="project-gh-link" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                        <GitHubIcon />
                      </a>
                    </div>
                  </div>
                  <div className="project-desc">A modern, scalable load balancer built in Go with a React.js web interface.</div>
                  <ul className="project-features">
                    <li>Multiple load balancing algorithms (Round Robin, Least Connections, Weighted, IP Hash)</li>
                    <li>Cluster management, node-level and cluster-level live monitoring</li>
                    <li>Rate limiting, health checks, SSL/TLS termination, real-time metrics</li>
                    <li>Modern React.js UI, modular routing, and comprehensive logging</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">TypeScript</span>
                    <span className="tech-tag">Docker</span>
                    <span className="tech-tag">Material-UI</span>
                  </div>
                </div>

                {/* Go-Chatsync */}
                <div className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      Go-Chatsync
                      <span className="project-status">Active</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/CpBruceMeena/Go-Chatsync" className="project-gh-link" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                        <GitHubIcon />
                      </a>
                    </div>
                  </div>
                  <div className="project-desc">A real-time chat application built with Go and React, featuring private messaging and group chat functionality.</div>
                  <ul className="project-features">
                    <li>WebSocket-based real-time messaging, private and group chat</li>
                    <li>Message history persistence, unread counts, last seen timestamps</li>
                    <li>User presence tracking, group management, and live updates</li>
                    <li>Modern Material-UI frontend, responsive design</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">WebSocket</span>
                    <span className="tech-tag">Material-UI</span>
                  </div>
                </div>

                {/* Golang NexusPoint */}
                <div className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      Golang NexusPoint
                      <span className="project-status">Active</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/CpBruceMeena/Golang-NexusPoint" className="project-gh-link" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                        <GitHubIcon />
                      </a>
                    </div>
                  </div>
                  <div className="project-desc">A microservices-based application demonstrating gRPC and HTTP communication between services.</div>
                  <ul className="project-features">
                    <li>Central service (gRPC + HTTP), client service, and simple HTTP microservice</li>
                    <li>Protocol Buffers for API definitions and code generation</li>
                    <li>API endpoints for user and product management, extensible proto structure</li>
                    <li>Great for learning Go microservices, gRPC, and service orchestration</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">gRPC</span>
                    <span className="tech-tag">Protocol Buffers</span>
                    <span className="tech-tag">HTTP</span>
                    <span className="tech-tag">Microservices</span>
                  </div>
                </div>

                {/* GoPyExpress */}
                <div className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      GoPyExpress
                      <span className="project-status">Active</span>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/CpBruceMeena/GoPyExpress" className="project-gh-link" target="_blank" rel="noopener noreferrer" title="View on GitHub">
                        <GitHubIcon />
                      </a>
                    </div>
                  </div>
                  <div className="project-desc">Efficient Go/Python communication demo, comparing REST API and shared memory.</div>
                  <ul className="project-features">
                    <li>Direct HTTP API calls and shared memory with HTTP signaling</li>
                    <li>Performance comparison, load testing with Locust, and detailed logging</li>
                    <li>Automatic resource cleanup and error handling</li>
                    <li>Great for benchmarking and learning cross-language communication</li>
                  </ul>
                  <div className="project-tech">
                    <span className="tech-tag">Go</span>
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">REST</span>
                    <span className="tech-tag">Shared Memory</span>
                    <span className="tech-tag">Locust</span>
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
