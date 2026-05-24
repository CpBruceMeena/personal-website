import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';
import { GitHubIcon, GmailIcon, LinkedInIcon, MediumIcon } from './icons.jsx';
import { PERSONAL_INFO, EXPERIENCE, INTERNSHIPS, PROJECTS, GAMES } from './content.js';
import BoyMonkLogo from './components/BoyMonkLogo.jsx';
import YoobooLogo from './components/YoobooLogo.jsx';
import Spaceship from './components/Spaceship.jsx';

// --- Section IDs in order for waypoint navigation ---
const SECTION_IDS = ['hero', 'projects', 'games', 'experience', 'internships', 'about', 'contact'];

// ========== HYPERSPACE LINES - forward flight (radial from center) ==========
const HYPERSPACE_LINES_STABLE = Array.from({ length: 80 }).map((_, i) => ({
  id: i,
  angle: Math.random() * 360,
  length: 80 + Math.random() * 200,
  width: 0.5 + Math.random() * 1.5,
  baseOpacity: 0.05 + Math.random() * 0.25,
  duration: 0.2 + Math.random() * 0.5,
  delay: Math.random() * 0.3,
}));

const HyperspaceLines = ({ velocity }) => {
  const visibleCount = useMemo(() => Math.min(Math.floor(velocity * 35), 50), [velocity]);

  if (velocity < 0.15) return null;

  return (
    <div className="hyperspace-container">
      {HYPERSPACE_LINES_STABLE.slice(0, visibleCount).map(line => (
        <div
          key={line.id}
          className="hyperspace-line"
          style={{
            '--angle': `${line.angle}deg`,
            '--length': `${line.length}px`,
            '--line-width': `${line.width}px`,
            '--line-opacity': line.baseOpacity * Math.min(velocity, 1),
            '--duration': `${line.duration}s`,
            '--delay': `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// ========== ASTEROID FIELD - rocks flying past (stable shapes) ==========
const ASTEROID_FIELD_STABLE = Array.from({ length: 30 }).map((_, i) => {
  const size = 3 + Math.random() * 8;
  return {
    id: i,
    angle: -30 + Math.random() * 60,
    size,
    speed: 1 + Math.random() * 2,
    delay: Math.random() * 3,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 4,
    points: Array.from({ length: 5 + Math.floor(Math.random() * 4) })
      .map(() => ({
        r: 0.4 + Math.random() * 0.6,
        a: Math.random() * 360,
      })),
  };
});

const AsteroidField = ({ velocity }) => {
  const visibleCount = useMemo(() => Math.min(Math.floor(velocity * 20), 25), [velocity]);

  if (velocity < 0.2) return null;

  return (
    <div className="asteroid-field">
      {ASTEROID_FIELD_STABLE.slice(0, visibleCount).map(rock => (
        <motion.div
          key={rock.id}
          className="asteroid"
          initial={{
            x: 0,
            y: 0,
            scale: 0.1,
            opacity: 0,
            rotate: rock.rotation,
          }}
          animate={{
            x: Math.sin(rock.angle * Math.PI / 180) * 800,
            y: Math.cos(rock.angle * Math.PI / 180) * 800,
            scale: rock.size / 10,
            opacity: [0, 0.7, 0],
            rotate: rock.rotation + rock.rotSpeed * 180,
          }}
          transition={{
            duration: rock.speed,
            delay: rock.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: rock.size,
            height: rock.size,
          }}
        >
          <svg viewBox={`0 0 ${rock.size} ${rock.size}`} width={rock.size} height={rock.size}>
            <polygon
              points={rock.points.map(p => {
                const x = rock.size / 2 + Math.cos(p.a * Math.PI / 180) * p.r * rock.size / 2;
                const y = rock.size / 2 + Math.sin(p.a * Math.PI / 180) * p.r * rock.size / 2;
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              }).join(' ')}
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ========== COMET SHOWER - streaks at high velocity (stable) ==========
const COMET_SHOWER_STABLE = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  angle: -20 + Math.random() * 40,
  length: 40 + Math.random() * 80,
  duration: 1 + Math.random() * 1.5,
  delay: Math.random() * 4,
  opacity: 0.3 + Math.random() * 0.4,
  headSize: 2 + Math.random() * 3,
}));

const CometShower = ({ velocity }) => {
  const visibleCount = useMemo(() => {
    if (velocity < 0.6) return 0;
    return Math.min(Math.floor((velocity - 0.5) * 20), 10);
  }, [velocity]);

  if (visibleCount === 0) return null;

  return (
    <div className="comet-field">
      {COMET_SHOWER_STABLE.slice(0, visibleCount).map(comet => (
        <motion.div
          key={comet.id}
          className="comet"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: comet.angle }}
          animate={{
            x: Math.sin(comet.angle * Math.PI / 180) * 700,
            y: Math.cos(comet.angle * Math.PI / 180) * 700,
            opacity: [0, comet.opacity, 0],
            scale: [0.2, 1, 0.1],
            rotate: comet.angle,
          }}
          transition={{
            duration: comet.duration,
            delay: comet.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            width: `${comet.length}px`,
            height: `${comet.headSize}px`,
          }}
        >
          <div className="comet-head" style={{ width: comet.headSize * 2, height: comet.headSize * 2 }} />
          <div className="comet-tail" />
        </motion.div>
      ))}
    </div>
  );
};

// ========== CROSSHAIR - center targeting reticle ==========
const Crosshair = () => (
  <div className="crosshair-container" aria-hidden="true">
    <div className="crosshair-ring">
      <div className="crosshair-dot" />
    </div>
    <div className="crosshair-line crosshair-top" />
    <div className="crosshair-line crosshair-bottom" />
    <div className="crosshair-line crosshair-left" />
    <div className="crosshair-line crosshair-right" />
    <div className="crosshair-corner crosshair-tl" />
    <div className="crosshair-corner crosshair-tr" />
    <div className="crosshair-corner crosshair-bl" />
    <div className="crosshair-corner crosshair-br" />
  </div>
);

// ========== PILOT ASTRONAUT AVATAR (SVG) ==========
const PilotAstronaut = ({ size = 48, thrusting = false }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    animate={{ rotate: thrusting ? -5 : 0, y: thrusting ? 2 : 0 }}
    transition={{ duration: 0.3 }}
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
    {/* Helmet bob animation */}
    <motion.circle
      cx="26" cy="20" r="2"
      fill="var(--starlight-gold)"
      opacity="0.8"
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// ========== 3-LAYER PARALLAX UNIVERSE BACKGROUND ==========
const UniverseBackground = () => {
  const { scrollY } = useScroll();

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
const HUD = ({ currentSection, onWarp, velocity }) => {
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
  const distanceKm = ((currentIdx + 1) * 2.5).toFixed(1);

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="hud-bar"
    >
      {/* Pilot Portrait */}
      <div className="hud-pilot">
        <PilotAstronaut size={40} thrusting={velocity > 0.3} />
      </div>

      {/* Velocity */}
      <div className="hud-metric">
        <span className="hud-label">VELOCITY</span>
        <span className="hud-value">{velocity.toFixed(1)}<span className="hud-unit">c</span></span>
      </div>

      {/* Distance to next waypoint */}
      <div className="hud-metric hud-waypoint">
        <span className="hud-label">NEXT WAYPOINT</span>
        <span className="hud-value hud-waypoint-name">{nextName}</span>
        <span className="hud-distance">{distanceKm} km</span>
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
    {/* Energy Ring Gate effect */}
    <div className="energy-gate" aria-hidden="true">
      <div className="energy-gate-ring" />
      <div className="energy-gate-ring energy-gate-ring-outer" />
    </div>

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
      <motion.div            initial={{ opacity: 0, y: 40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
  const yoobooWindowRef = useRef(null);

  const navigateToYooboo = useCallback(() => {
    // Use same window name 'yooboo-game' to always reuse the same tab
    if (yoobooWindowRef.current && !yoobooWindowRef.current.closed) {
      yoobooWindowRef.current.focus();
    } else {
      yoobooWindowRef.current = window.open('http://localhost:3000', 'yooboo-game');
    }
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    const launch = async () => {
      // First, check if yooboo is already running
      try {
        const checkRes = await fetch('http://localhost:4001/api/check-yooboo');
        const { running } = await checkRes.json();
        if (running) {
          setStatus('ready');
          setTimeout(navigateToYooboo, 500);
          return;
        }
      } catch (e) {
        // Server might not be up yet, continue to launch
        console.error('Pre-check failed', e);
      }

      // Launch the game server
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
              setTimeout(navigateToYooboo, 500);
            }
          } catch (e) {
            console.error("Polling error", e);
          }
        }, 2000);
      } catch (e) {
        console.error("Launch failed", e);
        setStatus('ready');
        setTimeout(navigateToYooboo, 500);
      }
    };
    launch();
  }, [navigateToYooboo]);

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
  const [shipTilt, setShipTilt] = useState(0); // A/D tilt
  const [velocity, setVelocity] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const mainRef = useRef(null);
  const keysRef = useRef({});
  const lastScrollYRef = useRef(0);
  const velocityRafRef = useRef(null);

  // Track scroll velocity using requestAnimationFrame
  useEffect(() => {
    const trackVelocity = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      // Smooth velocity
      setVelocity(prev => {
        const target = Math.min(delta * 0.08, 1.5);
        return prev + (target - prev) * 0.15;
      });
      velocityRafRef.current = requestAnimationFrame(trackVelocity);
    };
    velocityRafRef.current = requestAnimationFrame(trackVelocity);
    return () => {
      if (velocityRafRef.current) cancelAnimationFrame(velocityRafRef.current);
    };
  }, []);

  // IntersectionObserver to track current section
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

  // Keyboard navigation with continuous scroll (hold to fly)
  useEffect(() => {
    let scrollInterval = null;

    const startScroll = (direction) => {
      if (scrollInterval) clearInterval(scrollInterval);
      scrollInterval = setInterval(() => {
        const amount = direction === 'forward' ? 30 : -30;
        window.scrollBy(0, amount);
      }, 30);
    };

    const stopScroll = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    };

    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key;

      if (key === 'w' || key === 'W' || key === 'ArrowUp') {
        e.preventDefault();
        keysRef.current['up'] = true;
        startScroll('forward');
      }
      if (key === 's' || key === 'S' || key === 'ArrowDown') {
        e.preventDefault();
        keysRef.current['down'] = true;
        startScroll('backward');
      }
      if (key === 'a' || key === 'A' || key === 'ArrowLeft') {
        e.preventDefault();
        setShipTilt(-8);
      }
      if (key === 'd' || key === 'D' || key === 'ArrowRight') {
        e.preventDefault();
        setShipTilt(8);
      }
      // Space = warp to next section
      if (key === ' ') {
        e.preventDefault();
        const currentIdx = SECTION_IDS.indexOf(currentSection);
        if (currentIdx < SECTION_IDS.length - 1) {
          const nextId = SECTION_IDS[currentIdx + 1];
          document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key;
      if (key === 'w' || key === 'W' || key === 'ArrowUp') {
        keysRef.current['up'] = false;
      }
      if (key === 's' || key === 'S' || key === 'ArrowDown') {
        keysRef.current['down'] = false;
      }
      if (key === 'a' || key === 'A' || key === 'ArrowLeft' || key === 'd' || key === 'D' || key === 'ArrowRight') {
        setShipTilt(0);
      }
      if (!keysRef.current['up'] && !keysRef.current['down']) {
        stopScroll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopScroll();
    };
  }, [currentSection, velocity]);

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

  const isThrusting = velocity > 0.3;

  return (
    <>
      <UniverseBackground />

      {/* Hyperspace Lines - react to velocity (forward flight effect) */}
      <HyperspaceLines velocity={velocity} />

      {/* Asteroid Field - rocks flying past */}
      <AsteroidField velocity={velocity} />

      {/* Comet Shower - streaks at high velocity */}
      <CometShower velocity={velocity} />

      {/* Crosshair - center reticle */}
      <Crosshair />

      {/* Spaceship - third-person fixed overlay */}
      <motion.div
        className="spaceship-overlay"
        animate={{
          rotate: shipTilt,
          x: shipTilt * 2,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Spaceship thrust={isThrusting ? 0.7 : 0.1} size={100} />
      </motion.div>

      {/* Engine thrust particles */}
      {isThrusting && (
        <div className="thrust-particles" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="thrust-particle"
              initial={{ opacity: 0.6, y: 0, x: (i - 3) * 3 }}
              animate={{
                opacity: 0,
                y: 40 + Math.random() * 30,
                x: (i - 3) * 4 + (Math.random() - 0.5) * 10,
              }}
              transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: Math.random() * 0.3 }}
            />
          ))}
        </div>
      )}

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
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
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
              <span className="mono-font">[ W / S ] Fly · [ A / D ] Strafe · [ SPACE ] Warp</span>
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
              <div className="game-logo-display yooboo-logo-wrapper">
                <YoobooLogo size={72} />
              </div>
              <span className="mono-font" style={{ color: 'var(--starlight-gold)', fontSize: '0.8rem' }}>YOOBOO</span>
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
              {/* Use monk logo instead of profile image */}
              <div className="about-monk-avatar">
                <BoyMonkLogo size={160} />
              </div>
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
        velocity={velocity}
      />

      {/* Keyboard hint tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="hud-keyboard-hint"
      >
        <span className="mono-font">W ↑ Fly · S ↓ Brake · SPACE Warp</span>
      </motion.div>

      {/* Game Launch Overlay */}
      <AnimatePresence>
        {isGameLaunching && <YoobooLaunchSequence onCancel={() => setIsGameLaunching(false)} />}
      </AnimatePresence>
    </>
  );
}
