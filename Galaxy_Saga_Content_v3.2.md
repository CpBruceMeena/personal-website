# Galaxy Saga Portfolio - Content Structure v3.2
## Third-Person 2D Flight with Pilot Astronaut

### Core Concept
A cinematic 2D portfolio website built like a classic space flight game. The user pilots a spacecraft in third-person view. Content appears ahead as you thrust forward through space. Features your personal 2D astronaut avatar as the player character.

---

## Pilot Avatar - The Astronaut

**Character**: Your 2D flat vector astronaut  
**Source**: Generated from your selfie, converted to space suit + helmet  
**Style**: Clean outlines, minimal shading, galaxy theme  
**Placement**: 
- **HUD**: Bottom-left corner as persistent pilot portrait
- **In-Game**: Small sprite following the spacecraft/camera
- **Waypoints**: Larger version appears when docked at stations

**Animations**:
- Idle: Slight helmet bob + visor star reflection
- Thrust: Leans forward when W pressed
- Brake: Leans back when S pressed
- Warp: Streak effect during auto-fly

---

## Camera & Movement System

**Perspective**: Third-person over-the-shoulder 2D. CSS `perspective: 1000px` simulates depth without 3D models.

**Controls**:
- **W / Arrow Up**: Thrust forward - accelerate through space
- **S / Arrow Down**: Brake - decelerate to read content  
- **A/D / Left/Right**: Strafe left/right to align with waypoints
- **Space**: Warp - auto-fly to next checkpoint
- **Mouse**: Subtle camera look

**Scene Streaming**: Objects spawn at `translateZ(-5000px)` scale 0.1x, animate to `translateZ(1000px)` scale 1x, then despawn. Creates infinite forward flight.

---

## HUD & UI Elements

**Central Crosshair**: Targeting reticle for waypoints. Glows when locked on.

**Bottom HUD Bar**:
- **Pilot Portrait**: Your 2D astronaut, 64x64px
- **Velocity**: `0.0c to 1.2c` - increases with W held
- **Distance**: "Next Waypoint: 2.3km"
- **Warp Button**: `[ ENGAGE WARP ]` - auto-navigate
- **Minimap**: Top-right lane view showing 3 upcoming checkpoints

**Environmental Fill**:
- **Parallax Stars**: 3 layers, slow/medium/fast
- **Procedural Asteroids**: Random 5-point rocks, rotate as they pass
- **Passing Traffic**: Enemy rockets on opposite vector
- **Energy Rings**: Section gates you fly through
- **Comet Showers**: Spawn at velocity > 0.9c
- **Derelict Stations**: Decorative background structures

---

## Flight Path Checkpoints - Content as Waypoints

### 1. [LAUNCH BAY] - 0km
**Visual**: Massive holographic gate with your astronaut saluting  
**Content**:
- "WELCOME TO THE DIGITAL UNIVERSE"
- "Software Engineer | Building digital universes"
- Bio hologram with your astronaut pointing to text
- CTA: "[BEGIN THRUST]" 

### 2. [ABOUT SECTOR] - 2km  
**Visual**: Floating data panels. Your astronaut appears in corner doing scan gesture  
**Content**: Background, skills, tech stack as orbiting icons around your astronaut

### 3. [PROJECT NEBULA] - 5km
**Visual**: Asteroid field. Each rock = project. Your astronaut sprite can "land" on one  
**Content**: 
- **Asteroid-Alpha**: "Distributed Cache Engine" | Go, Redis
- **Asteroid-Beta**: "Trading Terminal" | React, WebSockets  
- **Asteroid-Gamma**: "UNO Online" | Node, Socket.io
- **Asteroid-Delta**: "AI Assistant" | Python, Transformers
**Interaction**: Fly close to expand project details

### 4. [EXPERIENCE CORRIDOR] - 8km
**Visual**: Series of energy gates. Your astronaut animates flying through each  
**Content**: Each gate displays job
- Gate 1: "Senior SE @ SpaceTech" 2024-Present
- Gate 2: "Intern @ Google" Summer 2023  
- Gate 3: "Research @ IIT-D" 2022

### 5. [INTERNSHIP STATION] - 11km
**Visual**: Space station. Your astronaut sprite docks and enters  
**Content**: Detailed internship cards, company logos, achievements

### 6. [GAME STATION ALPHA] - 14km
**Visual**: Arcade with your astronaut at controls  
**Content**: 
- "UNO Online" - LIVE
- "Orbit Defender" - Q3 2026
- "Galaxy Trader" - PROTOTYPE

### 7. [FINANCE COMMAND] - 17km
**Visual**: Bridge with holographic charts. Your astronaut at command chair  
**Content**: Portfolio Tracker, Options Visualizer, Sentiment AI

### 8. [COMMS RELAY] - 20km
**Visual**: Final station. Your astronaut sends transmission animation  
**Content**: Contact form, social links

---

## Motion & Atmosphere

**Philosophy**: Feels like 2D space games - Starfox, Gradius, R-Type. Slow cinematic, not bullet-hell.

**2D Art Style**:
- Flat vector shapes, no gradients
- Bold outlines #ffffff 2px
- Limited palette: Deep space #0a0e27, Nebula #1a0b2e, Gold #ffd700, Red #ff4444
- Pixel-perfect sprites for astronaut, 32x32 or 64x64

**Effects**:
- **Distance Fog**: CSS `opacity` based on Z position
- **Scan Lines**: CRT effect on waypoint hover
- **Screen Shake**: Subtle on warp engage
- **Particle Thrust**: Dots behind ship when W held

**Typography**: Orbitron headers, Inter body. Waypoints use `[ BRACKETS ]`.

---

## Technical Specs

**Stack**: Pure HTML/CSS/JS. Zero dependencies. 2D only.

**Performance**:
- Object pooling for asteroids/particles
- Despawn elements past camera Z>1000
- RequestAnimationFrame for 60fps
- CSS transforms only, no layout thrash

**Responsive**: 
- Desktop: WASD + Mouse
- Mobile: Virtual joystick left, throttle slider right, tap to warp
- Astronaut scales to 48x48px on mobile

**Assets**:
- Astronaut sprite: Inline SVG, 4 frames for animation
- Planets/stations: Inline SVG
- No external images = instant load

---

## Future Updates

**Pilot Customization**: Unlock different suit colors for achievements  
**Multiplayer**: See other visitors as ghost ships  
**Quests**: "Visit all Project asteroids" achievement  
**Sound**: 8-bit engine loop, warp sound effect

---
**Version**: 3.2 - Astronaut Pilot Added  
**Last Updated**: May 24, 2026  
**Status**: 2D Game-Ready, Zero Dependencies
