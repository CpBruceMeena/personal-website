# Galaxy Saga Portfolio - Content Structure v2.1

## Site Overview
A cinematic 2D space exploration portfolio for a Software Engineer. Replaces traditional scrolling with galaxy navigation. User pilots through sectors instead of browsing pages.

## Core Sectors

### 1. [CENTRAL GALAXY HUB] - Landing
**Purpose**: Hero + Personal intro  
**Content**: 
- Title: "Welcome to the Digital Universe"
- Subtitle: "Software Engineer | Building digital universes"
- Bio: "Exploring the intersection of code and cosmos. I build scalable systems by day, pilot side projects by night."
- CTA: "Begin Navigation" → pans to Project Nebula

### 2. [PROJECT NEBULA] - Projects
**Purpose**: Showcase key work  
**Content**: 3-4 planets, each a project
- Planet 1: "Distributed Cache Engine" - Go, Redis, gRPC | GitHub | Live Demo
- Planet 2: "Real-time Trading Terminal" - React, WebSockets, D3.js | GitHub
- Planet 3: "UNO Online Multiplayer" - Node.js, Socket.io, Canvas | Play Now
- Planet 4: "AI Code Assistant" - Python, Transformers, FastAPI | GitHub
**Interaction**: Click planet → modal expands with details, tech stack, screenshots

### 3. [EXPERIENCE CONSTELLATION] - Work History
**Purpose**: Timeline as star route  
**Content**: Connected stars for each role
- Star: "Senior SE @ SpaceTech" 2024-Present - Led microservices migration, -40% latency
- Star: "Software Intern @ Google" Summer 2023 - Built internal tooling, +15% dev velocity  
- Star: "Research Intern @ IIT-D" 2022 - Published paper on distributed systems
**Interaction**: Traveling between stars draws constellation lines

### 4. [GAME STATION ALPHA] - Upcoming Games
**Purpose**: Interactive projects section  
**Content**: 
- Card: "UNO Online" - Live | Players: 1,204 online
- Card: "Orbit Defender" - Coming Q3 2026 | Wishlist
- Card: "Galaxy Trader Sim" - Prototype | Play Demo

### 5. [FINANCE COMMAND] - Stock/Finance Tools
**Purpose**: Fintech projects  
**Content**: Holographic displays
- "Portfolio Tracker" - Real-time P&L, React + Python
- "Options Chain Visualizer" - D3.js heatmaps
- "Market Sentiment AI" - NLP on news feeds
**Status**: Beta access, coming soon

### 6. [RESEARCH OUTPOST] - AI/ML Work
**Purpose**: Experiments + papers  
**Content**: Floating data pods
- "Efficient Transformer Inference" - Blog post
- "RL for Game AI" - GitHub repo
- "Vector DB Benchmarks" - Interactive charts

### 7. [MISSION LOG] - Devlog/Blog
**Purpose**: Writing + updates  
**Content**: Transmission logs
- Log #042: "Building a 2D Galaxy in CSS" - May 2026
- Log #041: "Why I Chose Go for My Cache" - Apr 2026

### 8. [COMMS RELAY] - Contact
**Purpose**: Get in touch  
**Content**: "Send Transmission" form
- Fields: Name, Email, Message
- On submit: "Transmission sent. Awaiting response from sector..." 
- Links: GitHub, LinkedIn, Twitter, Email

## Galactic Details Added
- **Rockets**: Randomly launch across screen every 30s on parabola paths
- **Spacecraft**: Small satellites orbit major sectors
- **Asteroid Belt**: CSS divider between Experience and Games
- **Warp Gates**: Animated rings during sector transitions  
- **Comet Trails**: Appear on fast camera pans > 800px/s
- **Minimap**: Top-right HUD shows your location in galaxy
- **Pilot Avatar**: Your 2D sprite in bottom-left HUD

## Navigation System
- **Controls**: WASD / Arrow Keys / Click + Drag to pan
- **Camera**: Smooth inertia, zoom on sector entry
- **Cursor**: Glow trail + magnetic hover on sectors
- **Transitions**: Stars streak, viewport zooms, no page reloads

## Motion Philosophy
Slow, elegant, deliberate. Inspired by sci-fi movie title sequences. No hyperactive gaming spam. Ambient nebula drift, orbit rings, constellation lines.

## Tech Stack
Pure HTML/CSS/JS. No frameworks. CSS variables for theming. Transform-based camera. Canvas for starfield. SVG for planets/rockets.

## Future Sectors
- [DATA NEBULA] - Open source contributions
- [ACHIEVEMENT CRYSTALS] - Certs, awards
- [COLLAB STATION] - Testimonials, team projects

---
**Last Updated**: May 24, 2026  
**Version**: 2.1 - SE Content + Bug Fixes
