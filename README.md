<div align="center">

# ✈️ FlightScope

**Interactive Aviation & Geospatial Tracking Platform**

A high-performance web platform for real-time airspace visualization, fleet monitoring, and interactive geospatial analysis.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://flight-scope-nu.vercel.app/)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=flat-square&logo=typescript&logoColor=white)
![deck.gl](https://img.shields.io/badge/deck.gl_9-29323C?style=flat-square)
![Mapbox GL](https://img.shields.io/badge/Mapbox_GL-000000?style=flat-square&logo=mapbox&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI_v7-007FFF?style=flat-square&logo=mui&logoColor=white)

</div>

---

## 📌 Overview

**FlightScope** is a specialized aviation radar and map workspace. It visualizes simulated live airspace traffic, regional airports, and navigational antennas over dynamic base maps with client-side flight telemetry and an integrated geospatial toolset.

- 🌐 **Live Demo:** [flight-scope-nu.vercel.app](https://flight-scope-nu.vercel.app/)

---

## ✨ Key Features

- **Dynamic Airspace Visualization:**
  - Render aircraft with heading rotation, live telemetry, and dynamic flight tracks using high-performance `deck.gl` layers (`IconLayer`, `PathLayer`, `ScatterplotLayer`).
  - Viewport-aware entity count and live filtering.
- **Geospatial & Drawing Suite:**
  - Full vector drawing tools (Markers, Polylines, Freehand, Polygons, Circles, and Auto-intersections).
  - Measurement tools (Multi-segment distance ruler, Lat/Lon & UTM coordinates, map snapshot export).
- **Multi-Source Basemaps:** Seamless switching between Balad (tokenless), Mapbox Streets, Dark Mode, and Satellite imagery with preserved viewport state.
- **Fleet & Infrastructure Management:**
  - Categorized layers for airports, radar stations, and ADS-B / VOR-DME antennas.
  - Dedicated fleet directory (`/airplane`) and aircraft telemetry inspection (`/airplane/:id`).

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Geospatial & Rendering:** Mapbox GL JS, react-map-gl, deck.gl 9
- **State & Routing:** Redux Toolkit, React Context, React Router
- **UI & Design:** Material UI (MUI), Emotion, Lucide Icons, Sonner

---

## 🏗️ Architecture Highlights

- **Single Canvas Instance:** The Mapbox/deck.gl instance is mounted once inside `AppShell` and persisted across client-side route transitions to prevent costly WebGL context re-initializations.
- **State-Driven Tooling:** `MapToolContext` manages exclusive active tool states, preventing interaction conflicts between drawing, measuring, and entity picking.
- **High-Frequency Simulation:** Smooth aircraft movement along waypoints calculated via client-side Haversine kinematics in a `requestAnimationFrame` loop.

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flight-scope
yarn install # or npm install

### 2. Environment Setup (Optional)
bash
cp .env.example .env
Add your Mapbox token if you want to enable Streets/Dark/Satellite layers:
env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
*(Default Balad map works out-of-the-box without an API key).*

### 3. Run Development Server
bash
yarn dev # or npm run dev

---

## 📁 Key Directories

text
src/
├── components/map/        # Mapbox wrapper, deck.gl layers & spatial tools
├── pages/
│   ├── Home/              # Primary radar map & floating widgets
│   ├── Aircraft/          # Fleet tables and detail inspection
│   └── Settings/          # Layer styles & visualization controls
└── store/                 # Redux state slices & app config

---

## 📄 License

This project is proprietary / private for portfolio demonstration.

```
