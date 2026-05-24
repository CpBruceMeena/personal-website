import { motion } from 'framer-motion';

export default function Spaceship({ thrust = 0, size = 120 }) {
  return (
    <div className="spaceship-container" style={{ width: size, height: size }}>
      {/* Engine glow */}
      <motion.div
        className="engine-glow"
        animate={{
          opacity: 0.2 + thrust * 0.8,
          scale: 0.6 + thrust * 0.4,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main spaceship SVG - top-down / third-person view */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="spaceship-svg"
      >
        {/* Engine exhaust flame */}
        <motion.ellipse
          cx="60"
          cy="130"
          rx={12 + thrust * 8}
          ry={8 + thrust * 6}
          fill="url(#engineGradient)"
          animate={{
            opacity: 0.5 + thrust * 0.5,
            rx: 12 + thrust * 8,
            ry: 8 + thrust * 6,
          }}
          transition={{ duration: 0.15 }}
        />
        
        {/* Engine nozzle left */}
        <path d="M40 108 L35 118 L45 118 Z" fill="#444" />
        
        {/* Engine nozzle right */}
        <path d="M80 108 L75 118 L85 118 Z" fill="#444" />
        
        {/* Main fuselage - sleek arrow shape */}
        <path
          d="M60 10 L40 50 L45 55 L48 50 L52 60 L52 105 L68 105 L68 60 L72 50 L75 55 L80 50 Z"
          fill="var(--surface)"
          stroke="var(--cosmic-cyan)"
          strokeWidth="1.5"
          opacity="0.9"
        />
        
        {/* Fuselage center line */}
        <line x1="60" y1="10" x2="60" y2="105" stroke="var(--cosmic-cyan)" strokeWidth="0.8" opacity="0.4" />
        
        {/* Cockpit window */}
        <ellipse cx="60" cy="40" rx="8" ry="12" fill="var(--cosmic-cyan)" opacity="0.3" />
        <ellipse cx="60" cy="40" rx="5" ry="8" fill="var(--cosmic-cyan)" opacity="0.15" />
        
        {/* Wings */}
        <path
          d="M48 50 L20 70 L15 85 L35 80 L48 70 Z"
          fill="var(--deep-surface)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M72 50 L100 70 L105 85 L85 80 L72 70 Z"
          fill="var(--deep-surface)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        
        {/* Wing accent lines */}
        <line x1="30" y1="70" x2="40" y2="65" stroke="var(--cosmic-cyan)" strokeWidth="0.5" opacity="0.5" />
        <line x1="90" y1="70" x2="80" y2="65" stroke="var(--cosmic-cyan)" strokeWidth="0.5" opacity="0.5" />
        
        {/* Tail fin */}
        <path d="M50 95 L50 110 L60 115 L70 110 L70 95 Z" fill="var(--surface)" stroke="var(--border)" strokeWidth="0.8" />
        
        {/* Nose tip glow */}
        <circle cx="60" cy="12" r="3" fill="var(--cosmic-cyan)" opacity="0.6" />
        <circle cx="60" cy="12" r="1.5" fill="#fff" opacity="0.8" />
        
        {/* Engine definition */}
        <defs>
          <radialGradient id="engineGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cosmic-cyan)" />
            <stop offset="40%" stopColor="var(--starlight-gold)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Ship bob animation */}
      <motion.div
        className="ship-idle-anim"
        animate={{
          y: [0, -3, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
