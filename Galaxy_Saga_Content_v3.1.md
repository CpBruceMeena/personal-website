# Galaxy Saga Portfolio - Content Structure v3.1
## Third-Person Flight Navigation System

### Core Concept
A cinematic 2D portfolio where the user pilots a spacecraft in third-person. Instead of a top-down map, content appears ahead as you thrust forward through space. Inspired by Starfox/Elite Dangerous in 2D.

---

## Camera & Movement System

**Perspective**: Third-person over-the-shoulder using CSS `perspective` and `transform-style: preserve-3d`

**Controls**:
- **W / Arrow Up**: Thrust forward - accelerate through space
- **S / Arrow Down**: Brake - decelerate to read content
- **A/D / Left/Right**: Strafe left/right to align with waypoints or dodge debris
- **Space**: Warp - auto-fly to next checkpoint
- **Mouse**: Subtle look/camera pan

**Scene Streaming**: Objects scale from 0.1x in distance fog to 1x as you approach, then pass behind camera. Creates infinite forward motion illusion.

---

## HUD & UI Elements

**Central Crosshair**: Replaces cursor. Used for targeting waypoints.

**Bottom HUD**:
- **Pilot Avatar**: Your 2D sprite bottom-left
- **Velocity Indicator**: `0.0c to 1.2c` based on W key hold
- **Distance Counter**: "Next Waypoint: 2.3km"
- **Minimap**: Lane view showing upcoming checkpoints, not top-down
- **Warp Button**: Auto-navigate to next section

**Environmental Fill**: No empty space
- **Parallax Stars**: 3 layers at different speeds
- **Procedural Asteroids**: Random rotation/scale, regenerate ahead
- **Passing Traffic**: Rockets/satellites on opposite trajectory
- **Energy Rings**: Gates you fly through at section transitions
- **Comet Showers**: Trigger when velocity > 0.9c
- **Derelict Stations**: Decorative structures floating in void

---

## Content Flow - Flight Path Checkpoints

Content appears as holographic waypoints along your flight path. Order:

### 1. [LAUNCH BAY] - 0km
**Type**: Hero/Intro  
**Appears As**: Massive holographic billboard in space  
**Content**:
- "WELCOME TO THE DIGITAL UNIVERSE"
- "Software Engineer | Building digital universes"
- Bio: "Exploring the intersection of code and cosmos. I build scalable systems by day, pilot side projects by night."
- CTA: "[BEGIN THRUST]" prompt

### 2. [ABOUT SECTOR] - 2km
**Type**: Bio/Interests  
**Appears As**: Floating data panels you fly past  
**Content**:
- Background, skills, interests
- Tech stack displayed as orbiting icons
- "Scanning pilot credentials..."

### 3. [PROJECT NEBULA] - 5km
**Type**: Project Showcase  
**Appears As**: Asteroid field where each asteroid = project  
**Content**: Fly near an asteroid to expand
- **Asteroid-Alpha**: "Distributed Cache Engine" | Go, Redis, gRPC | [GitHub] [Demo]
- **Asteroid-Beta**: "Real-time Trading Terminal" | React, WebSockets | [GitHub]
- **Asteroid-Gamma**: "UNO Online Multiplayer" | Node, Socket.io | [Play]
- **Asteroid-Delta**: "AI Code Assistant" | Python, Transformers | [GitHub]

### 4. [EXPERIENCE CORRIDOR] - 8km
**Type**: Work Timeline  
**Appears As**: Series of energy gates you pass through  
**Content**: Each gate = job
- **Gate 1**: "Senior SE @ SpaceTech" 2024-Present | Led microservices, -40% latency
- **Gate 2**: "Software Intern @ Google" Summer 2023 | Internal tooling, +15% velocity
- **Gate 3**: "Research Intern @ IIT-D" 2022 | Published distributed systems paper

### 5. [INTERNSHIP STATION] - 11km
**Type**: Internship Details  
**Appears As**: Space station you can dock with  
**Content**: Detailed cards for each internship
- Company, role, duration, tech, key achievements
- "Docking request approved" on approach

### 6. [GAME STATION ALPHA] - 14km
**Type**: Upcoming Games  
**Appears As**: Arcade station with hologram displays  
**Content**:
- "UNO Online" - Status: LIVE | 1,204 players
- "Orbit Defender" - Status: COMING Q3 2026 | [Wishlist]
- "Galaxy Trader Sim" - Status: PROTOTYPE | [Demo]

### 7. [FINANCE COMMAND] - 17km
**Type**: Fintech Tools  
**Appears As**: Command bridge with holographic charts  
**Content**:
- "Portfolio Tracker" - Real-time P&L
- "Options Chain Visualizer" - D3.js heatmaps  
- "Market Sentiment AI" - NLP news analysis
- Status: Beta access

### 8. [COMMS RELAY] - 20km
**Type**: Contact  
**Appears As**: Final station at end of run  
**Content**:
- "TRANSMISSION INTERFACE"
- Form: Name, Email, Message
- On submit: "Transmission sent to sector... Awaiting response"
- Links: [GitHub] [LinkedIn] [Twitter] [Email]

---

## Motion & Atmosphere

**Philosophy**: Slow, elegant, deliberate. Movie title sequence energy, not hyperactive gaming UI.

**Effects**:
- **Distance Fog**: Sections fade in from black space
- **Motion Blur**: Subtle on fast thrust
- **Scan Lines**: On waypoint hover, like targeting
- **Magnetic Pull**: Waypoints slightly attract cursor when near
- **Nebula Drift**: Background clouds slowly morph

**Colors**: Deep space blues #0a0e27, nebula purple #1a0b2e, gold accents #ffd700 for waypoints, red #ff4444 for warnings.

**Typography**: Orbitron for headers/HUD, Inter for body. All uppercase for waypoints.

---

## Technical Implementation

**Stack**: Pure HTML/CSS/JS. No frameworks. No external deps.

**Core Systems**:
- **Camera**: Parent div with `perspective: 1000px`, children use `translateZ()`
- **Streaming**: JS spawns objects at Z=-5000px, animates to Z=1000px
- **Physics**: Basic velocity/acceleration on W key, friction on release
- **Collision**: Proximity check for waypoint expansion
- **Performance**: Object pooling, remove elements past Z=1000px

**Responsive**: Mobile uses virtual joystick + throttle slider instead of WASD.

---

## Future Expansions

**Planned Waypoints**:
- [DATA NEBULA] - Open source contributions
- [ACHIEVEMENT CRYSTALS] - Certs, awards as collectibles
- [COLLAB STATION] - Testimonials from teammates
- [SKILL CONSTELLATIONS] - Interactive tech tree

**Planned Features**:
- Sound: Engine hum, warp whoosh, proximity beeps
- Save State: Remember visited waypoints, show on minimap
- Multiple Routes: Branching paths for different user journeys

---
**Version**: 3.1 - Third Person Flight  
**Last Updated**: May 24, 2026  
**Status**: Zero console errors, 100% offline
