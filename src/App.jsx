import React, { useEffect, useState } from 'react';
import './App.css';
import { GitHubIcon, GmailIcon, PhoneIcon, LinkedInIcon, MediumIcon } from './icons.jsx';

const COMPANY_LOGOS = [
  { name: 'INDMONEY', url: '/indmoneylogo.png' },
  { name: 'Angel One', url: '/angelone.webp' },
  { name: 'Goldman Sachs', url: '/Goldman_Sachs.svg.png' },
];

const quickStats = [
  { label: 'Years Experience', value: 4 },
  { label: 'Billions in Transactions', value: 2 },
  { label: 'Users Served', value: 20 },
  { label: 'Major Fintech Companies', value: 3 },
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
    img: '/indmoney-dashboard.png',
    title: 'INDMONEY Integration',
    desc: 'Banking platform serving 2M+ active users',
    metrics: [
      '📈 200% user growth',
      '⚡ 99.9% uptime',
    ],
    tech: 'Java • Spring Boot • AWS',
    cta: 'View Details',
    link: '#',
  },
  {
    img: '/angelone-dashboard.png',
    title: 'Angel One Optimization',
    desc: 'Reduced trade execution time by 60%',
    metrics: [
      '⏱️ 60% faster execution',
      '🔒 Improved reliability',
    ],
    tech: 'Node.js • React • Kubernetes',
    cta: 'See Results',
    link: '#',
  },
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
            <button type="button" className={activeTab === 'experience' ? 'tab-active' : ''} onClick={() => setActiveTab('experience')}>Past Experience</button>
            <button type="button" className={activeTab === 'internships' ? 'tab-active' : ''} onClick={() => setActiveTab('internships')}>Internships</button>
            <button type="button" className={activeTab === 'projects' ? 'tab-active' : ''} onClick={() => setActiveTab('projects')}>Personal Projects</button>
            <button type="button" className={activeTab === 'contact' ? 'tab-active' : ''} onClick={() => setActiveTab('contact')}>Contact</button>
          </nav>
        </div>
      </header>
      <div className="main-bg" style={{ paddingTop: '5.5rem' }}>
        {activeTab === 'about' && (
          <section id="about" className="about-section">
            <div className="container">
              <img src="/Profile.jpg" alt="Profile" className="profile-pic" />
              <h2>About Me</h2>
              <p><b>Professional Summary:</b> I am a Principal Software Engineer with 4+ years of experience architecting and developing large-scale fintech solutions that serve millions of users and drive significant business growth. Currently leading engineering initiatives at INDMONEY, I specialize in building high-performance backend systems, implementing complex financial integrations, and transforming technical challenges into measurable business outcomes.</p>
              <p>My journey spans across prestigious organizations including INDMONEY, Angel One, and Goldman Sachs, where I've consistently delivered solutions that handle billions in financial transactions, optimize critical business processes, and enhance customer experiences at scale.</p>
              <p><b>Background:</b> My passion for technology began during my Integrated Master of Science in Mathematics at NIT Rourkela (2015-2020), where I developed a strong analytical foundation that continues to shape my approach to complex software engineering challenges. This mathematical background has been instrumental in my success with algorithmic optimization, data processing, and machine learning applications.</p>
              <p>I thrive at the intersection of cutting-edge technology and real-world business impact. Whether it's reducing calculation times from hours to minutes, building recommendation systems that generate millions in revenue, or architecting systems that serve 20+ million users daily, I'm driven by the opportunity to solve problems that matter.</p>
              <p><b>Current Focus:</b> Advanced banking integrations, AI-driven personalization, regulatory compliance, scalable architecture, and emerging technologies like blockchain and real-time analytics.</p>
            </div>
          </section>
        )}
        {activeTab === 'experience' && (
          <section id="experience" className="experience-section">
            <div className="container">
              <h2>Past Experience</h2>
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
                    <h3>Angel One <span style={{fontWeight:400}}>- Senior Software Engineer (SDE-2) & Software Engineer (SDE-1) (Feb 2022 – Sep 2024)</span></h3>
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
            <div className="container">
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
            <div className="container">
              <h2>Personal Projects</h2>
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
            <div className="container">
              <h2>Contact</h2>
              <p>I'm passionate about solving complex engineering challenges, mentoring fellow engineers, and exploring innovative applications of technology in finance. Whether you're interested in discussing cutting-edge fintech solutions, system architecture at scale, or collaborative opportunities, I'd love to connect.</p>
              <ul className="contact-list" style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem', maxWidth: 420, margin: '2rem auto 1.5rem auto' }}>
                <li>
                  <span className="contact-icon" aria-label="email">
                    <GmailIcon />
                  </span>
                  <b>Email:</b> <a href="mailto:sandeep10198@gmail.com">sandeep10198@gmail.com</a>
                </li>
                <li>
                  <span className="contact-icon" aria-label="phone">
                    <PhoneIcon />
                  </span>
                  <b>Phone:</b> <a href="tel:+918093589961">+91-8093589961</a>
                </li>
                <li>
                  <span className="contact-icon" aria-label="linkedin">
                    <LinkedInIcon />
                  </span>
                  <b>LinkedIn:</b> <a href="https://linkedin.com/in/sandeep-mehta" target="_blank" rel="noopener noreferrer">linkedin.com/in/sandeep-mehta</a>
                </li>
                <li>
                  <span className="contact-icon" aria-label="github">
                    <GitHubIcon />
                  </span>
                  <b>GitHub:</b> <a href="https://github.com/sandeep-mehta" target="_blank" rel="noopener noreferrer">github.com/sandeep-mehta</a>
                </li>
                <li>
                  <span className="contact-icon" aria-label="medium">
                    <MediumIcon />
                  </span>
                  <b>Medium:</b> <a href="https://medium.com/@sandeep-mehta" target="_blank" rel="noopener noreferrer">medium.com/@sandeep-mehta</a>
                </li>
              </ul>
              <div style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#e9c46a', textAlign: 'center' }}>
                "Building scalable systems that drive meaningful business impact while pushing the boundaries of what's possible with modern technology."
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
