import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';
import { GitHubIcon, GmailIcon, PhoneIcon, LinkedInIcon, MediumIcon } from './icons.jsx';
import { PERSONAL_INFO, EXPERIENCE, INTERNSHIPS, PROJECTS, GAMES } from './content.js';
import BoyMonkLogo from './components/BoyMonkLogo.jsx';

// --- Section IDs in order for waypoint navigation ---
const SECTION_IDS = ['hero', 'projects', 'games', 'experience', 'internships', 'about', 'contact'];

// ========== PILOT ASTRONAUT AVATAR (SVG) ==========
const PilotAstronaut = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Helmet visor */}
    <circle cx="32" cy="24" r="14" fill="var(--cosmic-cyan)" opacity="0.15" />
    <circle cx="32" cy="24" r="12" stroke="var(--cosmic-cyan)" strokeWidth="1.5" opacity="0.6" />
    {/* Face inside */}
    <circle cx="32" cy="24" r="8" fill="var(--primary-text)" opacity="0.9" />
    {/* Eyes */}
    <circle cx="29" cy="22" r="1.5" fill="var(--background)" />
    <circle cx="35" cy="22" r="1.5" fill="var(--background)" />
    {/* Smile */}
    <path d="M29 27 Q32 30 35 27" stroke="var(--background)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Helmet outline */}
    <path d="M18 28 Q18 16 32 14 Q46 16 46 28" stroke="var(--cosmic-cyan)" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Body suit */}
    <path d="M22 38 Q32 42 42 38 L46 56 Q32 60 18 56 Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
    {/* Star reflection on visor */}
    <circle cx="26" cy="20" r="2" fill="var(--starlight-gold)" opacity="0.8" />
    <circle cx="24" cy="18" r="1" fill="#fff" opacity="0.6" />
  </svg>
);

// ========== 3-LAYER PARALLAX UNIVERSE BACKGROUND ==========
const UniverseBackground = () => {
  const { scrollY } = useScroll();
  
  // 3 parallax layers at different scroll speeds
  const starLayers = useMemo(() => ({
    far: Array.from({ length: 80 }).map((_, i) => ({
      id: `far-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 0.5 + Math.random() * 0.5,
      opacity: 0.15 + Math.random() * 0.2,
      twinkle: Math.random() > 0.6,
    })),
    mid: Array.from({ length: 50 }).map((_, i) => ({
      id: `mid-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.3,
      twinkle: Math.random() > 0.5,
      glow: Math.random() > 0.8,
    })),
    near: Array.from({ length: 20 }).map((_, i) => ({
      id: `near-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.4,
      twinkle: true,
      glow: true,
    })),
  }), []);

  const farY = useTransform(scrollY, [0, 1000], [0, 50]);
  const midY = useTransform(scrollY, [0, 1000], [0, 120]);
  const nearY = useTransform(scrollY, [0, 1000], [0, 250]);

  const renderLayer = (stars, style) => (
    <motion.div className="parallax-layer" style={style}>
      {stars.map(star => (
        <div
          key={star.id}
          className={`star ${star.twinkle ? 'twinkle' : ''} ${star.glow ? 'star-glow' : ''}`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            '--duration': `${2 + Math.random() * 4}s`,
            '--delay': `${Math.random() * 3}s`,
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <div className="universe-bg">
      {renderLayer(starLayers.far, { y: farY })}
      {renderLayer(starLayers.mid, { y: midY })}
      {renderLayer(starLayers.near, { y: nearY })}
      
      {/* Ambient nebula clouds */}
      <motion.div className="nebula-cloud" style={{ top: '5%', left: '-8%', width: '700px', height: '500px', background: 'var(--nebula-blue)', y: useTransform(scrollY, [0, 1500], [0, -80]) }} />
      <motion.div className="nebula-cloud" style={{ bottom: '10%', right: '-5%', width: '550px', height: '600px', background: 'var(--aurora-violet)', y: useTransform(scrollY, [0, 1500], [0, 100]) }} />
      <motion.div className="nebula-cloud" style={{ top: '50%', left: '30%', width: '400px', height: '400px', background: 'var(--signal-magenta)', y: useTransform(scrollY, [0, 1500], [0, -40]) }} />
    </div>
  );
};

// ========== HUD - SPACE FLIGHT HEADS UP DISPLAY ==========
const HUD = ({ currentSection, onWarp }) => {
  const { scrollY } = useScroll();
  const velocity = useTransform(scrollY, [0, 500, 2000], [0, 0.5, 1.2]);
  const [velocityDisplay, setVelocityDisplay] = useState('0.0');

  useEffect(() => {
    const unsub = velocity.on('change', (v) => {
      setVelocityDisplay(v.toFixed(1));
    });
    return unsub;
  }, [velocity]);

  const sectionNames = {
    hero: 'LAUNCH BAY',
    projects: 'PROJECT NEBULA',
    games: 'GAME STATION',
    experience: 'EXPERIENCE CORRIDOR',
    internships: 'INTERNSHIP STATION',
    about: 'ABOUT SECTOR',
    contact: 'COMMS RELAY',
  };

  const currentWaypoint = sectionNames[currentSection] || 'LAUNCH BAY';
  const currentIdx = SECTION_IDS.indexOf(currentSection);
  const nextSection = currentIdx < SECTION_IDS.length - 1 ? SECTION_IDS[currentIdx + 1] : null;
  const nextName = nextSection ? sectionNames[nextSection] : '— END OF ROUTE —';

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="hud-bar"
    >
      {/* Pilot Portrait */}
      <div className="hud-pilot">
        <PilotAstronaut size={40} />
      </div>

      {/* Velocity */}
      <div className="hud-metric">
        <span className="hud-label">VELOCITY</span>
        <span className="hud-value">{velocityDisplay}<span className="hud-unit">c</span></span>
      </div>

      {/* Waypoint Distance */}
      <div className="hud-metric hud-waypoint">
        <span className="hud-label">NEXT WAYPOINT</span>
        <span className="hud-value hud-waypoint-name">{currentWaypoint}</span>
      </div>

      {/* Section Progress / Minimap */}
      <div className="hud-minimap">
        <div className="minimap-track">
          {SECTION_IDS.map((id, i) => (
            <div
              key={id}
              className={`minimap-dot ${i <= currentIdx ? 'visited' : ''} ${i === currentIdx ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Warp Button */}
      <button onClick={onWarp} className="hud-warp-btn">
        ENGAGE WARP
      </button>
    </motion.div>
  );
};

// ========== DECORATIVE COMPONENTS ==========

const WaypointTransition = ({ children, id, tag, title, subtitle }) => (
  <section id={id} className="section waypoint-section">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Section gate/header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="section-gate"
      >
        <span className="section-gate-line" />
        <div className="section-header">
          <span className="section-tag">{tag}</span>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <span className="section-gate-line" />
      </motion.div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  </section>
);

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="glass-panel project-card"
  >
    <h3 className="project-title">{project.title}</h3>
    <p className="project-description">{project.description}</p>
    <ul className="achievement-list" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
      {project.features.map((f, i) => (
        <li key={i} className="achievement-item">{f}</li>
      ))}
    </ul>
    <div className="tech-tags">
      {project.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
    </div>
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
        <GitHubIcon /> GitHub Source
      </a>
    )}
  </motion.div>
);

const TimelineItem = ({ exp }) => (
  <div className="timeline-item">
    <div className="timeline-dot" />
    <div className="timeline-header">
      <div className="company-info">
        <img src={exp.logo} alt={exp.company} className="company-logo" onError={(e) => e.target.style.display = 'none'} />
        <div>
          <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{exp.company}</h3>
          <div style={{ color: 'var(--cosmic-cyan)', fontWeight: 500 }}>{exp.role}</div>
        </div>
      </div>
      <div className="experience-period">{exp.period}</div>
    </div>
    <ul className="achievement-list">
      {exp.achievements.map((a, i) => (
        <li key={i} className="achievement-item">{a}</li>
      ))}
    </ul>
    <div className="tech-tags">
      {exp.stack.map(s => <span key={s} className="tech-tag">{s}</span>)}
    </div>
  </div>
);

// ========== GAME LAUNCH OVERLAY ==========

const YoobooLaunchSequence = ({ onCancel }) => {
  const [status, setStatus] = useState('initializing');

  useEffect(() => {
    const launch = async () => {
      try {
        await fetch('http://localhost:4001/api/launch-yooboo', { method: 'POST' });
        setStatus('warping');

        let attempts = 0;
        const poll = setInterval(async () => {
          attempts++;
          try {
            const res = await fetch('http://localhost:4001/api/check-yooboo');
            const { running } = await res.json();
            if (running || attempts > 20) {
              clearInterval(poll);
              setStatus('ready');
              setTimeout(() => {
                window.open('http://localhost:3000', '_blank');
                onCancel();
              }, 1500);
            }
          } catch (e) {
            console.error("Polling error", e);
          }
        }, 2000);
      } catch (e) {
        console.error("Launch failed", e);
        setStatus('ready');
      }
    };
    launch();
  }, [onCancel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game-launch-overlay"
    >
      {/* Particle warp effect */}
      <div className="warp-particles" />
      
      <div className="launch-status">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="launch-symbol"
        >
          <BoyMonkLogo size={80} />
        </motion.div>
        <h2 className="display-font launch-title">
          {status === 'initializing' ? 'CALCULATING JUMP' : status === 'warping' ? 'WARP SPEED' : 'DOCKING COMPLETE'}
        </h2>
        <p className="mono-font" style={{ color: 'var(--faint-text)' }}>
          {status === 'ready' ? 'REDIRECTING TO YOOBOO...' : 'TRAVELING TO GAME STATION...'}
        </p>
        <div className="progress-bar-container">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: status === 'ready' ? '100%' : '80%' }}
            transition={{ duration: status === 'ready' ? 0.5 : 15 }}
            className="progress-bar-fill"
          />
        </div>
        <button onClick={onCancel} className="btn-secondary launch-abort" style={{ marginTop: '3rem', fontSize: '0.8rem' }}>
          ABORT MISSION
        </button>
      </div>
    </motion.div>
  );
};

// ========== MAIN APPLICATION ==========

export default function App() {
  const [isGameLaunching, setIsGameLaunching] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const { scrollY, scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const mainRef = useRef(null);

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const observerOptions = {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(id);
        }
      }, observerOptions);

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Keyboard navigation: W/S or Arrow Up/Down to scroll between sections
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIdx = SECTION_IDS.indexOf(currentSection);
        if (currentIdx > 0) {
          const prevId = SECTION_IDS[currentIdx - 1];
          document.getElementById(prevId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIdx = SECTION_IDS.indexOf(currentSection);
        if (currentIdx < SECTION_IDS.length - 1) {
          const nextId = SECTION_IDS[currentIdx + 1];
          document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleWarp = useCallback(() => {
    const currentIdx = SECTION_IDS.indexOf(currentSection);
    if (currentIdx < SECTION_IDS.length - 1) {
      const nextId = SECTION_IDS[currentIdx + 1];
      document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSection]);

  return (
    <>
      <UniverseBackground />

      {/* Navigation Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="nav-header"
      >
        <div className="logo">
          <BoyMonkLogo size={32} />
          <span className="logo-text">SMonk</span>
        </div>
        <nav className="nav-links">
          {SECTION_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link ${currentSection === id ? 'active' : ''}`}
            >
              {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
      </motion.header>

      <main ref={mainRef}>
        {/* === [1] LAUNCH BAY - Hero Section === */}
        <section id="hero" className="hero-section waypoint-section">
          <motion.div style={{ opacity: heroOpacity }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="section-tag"
            >
              System Online // LAUNCH BAY
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-name"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hero-role"
            >
              {PERSONAL_INFO.role}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="hero-summary"
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="cta-group"
            >
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                Explore Projects
              </button>
              <button onClick={() => setIsGameLaunching(true)} className="btn-secondary">
                Play Yooboo
              </button>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="keyboard-hint"
            >
              <span className="mono-font">[ W / S ] Navigate &nbsp;·&nbsp; [ WARP ] Jump to next</span>
            </motion.div>
          </motion.div>
        </section>

        {/* === [2] PROJECT NEBULA - Projects === */}
        <WaypointTransition id="projects" tag="Celestial Bodies" title="Featured Projects" subtitle="← fly through to explore →">
          <div className="project-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </WaypointTransition>

        {/* === [3] GAME STATION - Games === */}
        <WaypointTransition id="games" tag="Entertainment Systems" title="Games in Dev">
          <div className="glass-panel" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ color: 'var(--starlight-gold)', fontSize: '1.8rem', margin: '0 0 1rem 0' }}>{GAMES[0].title}</h3>
              <p className="hero-summary" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>"{GAMES[0].pitch}"</p>
              <div className="tech-tags">
                <span className="tech-tag" style={{ borderColor: 'var(--starlight-gold)', color: 'var(--starlight-gold)' }}>FEATURED</span>
                {GAMES[0].mechanics.map(m => <span key={m} className="tech-tag">{m}</span>)}
              </div>
              <button onClick={() => setIsGameLaunching(true)} className="btn-primary" style={{ marginTop: '2rem' }}>
                Launch Mission
              </button>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div className="game-logo-display">
                <BoyMonkLogo size={64} />
              </div>
              <span className="mono-font" style={{ color: 'var(--faint-text)', fontSize: '0.8rem' }}>YOOBOO</span>
            </div>
          </div>
        </WaypointTransition>

        {/* === [4] EXPERIENCE CORRIDOR - Work History === */}
        <WaypointTransition id="experience" tag="Career Constellation" title="Work History">
          <div className="timeline">
            {EXPERIENCE.map((exp, i) => <TimelineItem key={i} exp={exp} />)}
          </div>
        </WaypointTransition>

        {/* === [5] INTERNSHIP STATION === */}
        <WaypointTransition id="internships" tag="Early Signals" title="Internships">
          <div className="project-grid">
            {INTERNSHIPS.map((intern, i) => (
              <div key={i} className="glass-panel">
                <div className="company-info" style={{ marginBottom: '1.5rem' }}>
                  <img src={intern.logo} alt={intern.company} className="company-logo" onError={(e) => e.target.style.display = 'none'} />
                  <h3 style={{ margin: 0 }}>{intern.company}</h3>
                </div>
                <div className="experience-period" style={{ marginBottom: '1rem' }}>{intern.period}</div>
                <div style={{ color: 'var(--cosmic-cyan)', marginBottom: '1rem', fontWeight: 600 }}>{intern.role}</div>
                <ul className="achievement-list">
                  {intern.summary.map((s, j) => <li key={j} className="achievement-item">{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </WaypointTransition>

        {/* === [6] ABOUT SECTOR === */}
        <WaypointTransition id="about" tag="Signal Origin" title="About the Builder">
          <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src="/Profile.jpg"
                alt="Profile"
                style={{ width: '100%', maxWidth: '250px', borderRadius: '1.5rem', border: '2px solid var(--border)' }}
              />
              <div className="tech-tags" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                <span className="tech-tag">NIT Rourkela</span>
                <span className="tech-tag">Mathematics</span>
              </div>
            </div>
            <div>
              {PERSONAL_INFO.about.map((p, i) => <p key={i} style={{ lineHeight: 1.8, color: 'var(--secondary-text)', marginBottom: '1.2rem' }}>{p}</p>)}
              <h4 style={{ color: 'var(--cosmic-cyan)', marginTop: '2rem' }}>Core Strengths</h4>
              <div className="tech-tags">
                {PERSONAL_INFO.strengths.map(s => <span key={s} className="tech-tag">{s}</span>)}
              </div>
            </div>
          </div>
        </WaypointTransition>

        {/* === [7] COMMS RELAY - Contact === */}
        <WaypointTransition id="contact" tag="Open Channel" title="Get in Touch">
          <div className="glass-panel" style={{ textAlign: 'center' }}>
            <p className="hero-summary" style={{ margin: '0 auto 3rem auto' }}>
              Passionate about solving complex engineering challenges and exploring tech frontiers.
              Let's connect and build something cosmic.
            </p>
            <div className="contact-grid">
              <a href={PERSONAL_INFO.contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-button">
                <div className="social-icon-wrapper"><LinkedInIcon /></div>
                <span className="social-label">LinkedIn</span>
              </a>
              <a href={PERSONAL_INFO.contact.github} target="_blank" rel="noopener noreferrer" className="social-button">
                <div className="social-icon-wrapper"><GitHubIcon /></div>
                <span className="social-label">GitHub</span>
              </a>
              <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="social-button">
                <div className="social-icon-wrapper"><GmailIcon /></div>
                <span className="social-label">Email</span>
              </a>
              <a href={PERSONAL_INFO.contact.medium} target="_blank" rel="noopener noreferrer" className="social-button">
                <div className="social-icon-wrapper"><MediumIcon /></div>
                <span className="social-label">Medium</span>
              </a>
            </div>
            <div style={{ marginTop: '4rem' }}>
              <a href="/Sandeep Mehta.pdf" download className="btn-primary">Download Transmission (Resume)</a>
            </div>
          </div>
        </WaypointTransition>

        <footer style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid var(--divider)' }}>
          <p className="mono-font" style={{ color: 'var(--faint-text)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} SANDEEP MEHTA // GALAXY ATLAS V3.2
          </p>
        </footer>
      </main>

      {/* HUD - Fixed Bottom Bar */}
      <HUD
        currentSection={currentSection}
        onWarp={handleWarp}
      />

      {/* Keyboard hint tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="hud-keyboard-hint"
      >
        <span className="mono-font">W ↑ &nbsp;·&nbsp; S ↓ &nbsp;·&nbsp; WARP →</span>
      </motion.div>

      {/* Game Launch Overlay */}
      <AnimatePresence>
        {isGameLaunching && <YoobooLaunchSequence onCancel={() => setIsGameLaunching(false)} />}
      </AnimatePresence>
    </>
  );
}
