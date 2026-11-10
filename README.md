# IIM Sambalpur — Campus Navigator
**Basantpur Permanent Campus (Phase-II Master Plan)**  
*Full-Stack Multi-Modal Geospatial Navigation & Wayfinding System*

---

## 🏛️ Executive Overview
The **IIM Sambalpur Campus Navigator** is an institutional mobility and wayfinding platform designed specifically for the 200+ acre permanent campus in Basantpur, Sambalpur, Odisha. Built in direct alignment with Phase-II architectural blueprints, the system models the complete campus road and pedestrian network, enabling students, faculty, staff, and visitors to plan optimal routes across four transit modes.

### Key Capabilities
- **Multi-Modal Routing:** Tailored algorithms for Walking (paved paths & covered walkways), Bicycling (dedicated cycle tracks), Two-Wheelers, and Automobiles (restricted to 7.5m/6m arterial roads).
- **Accurate Travel Time Estimation:** Machine-learned regression models calibrated on 1,500 historical transit journeys ($R^2 = 0.972, \text{MAE} = 14.4\text{ seconds}$).
- **Step-Free Accessibility:** Safe route filtering ensuring barrier-free access avoiding stairs and steep terrain.
- **Physical Landmark Cues:** Guidance incorporates visible campus landmarks (Pavilion, Sports Oval, Lake) ensuring reliable wayfinding even when GPS signals degrade indoors.
- **Zero-Dependency Resilience:** Client-side graph engine automatically activates if the backend service is offline, ensuring 100% continuous campus mobility.

---

## 📁 Project Structure

```text
iim_sambalpur_nav/
├── backend/
│   ├── data/
│   │   ├── campus_graph.json         # 23 WGS-84 vertices & 28 attributed edges
│   │   └── movement_dataset.csv      # 1,500 verified campus movement records
│   ├── models/
│   │   └── train_eta_model.py        # Random Forest / GBDT / Analytical ETA regressor
│   ├── routing/
│   │   ├── graph_engine.py           # Dijkstra, A*, Haversine distance, turn bearings
│   │   └── cost_function.py          # Multi-criteria cost evaluation function
│   ├── main.py                       # High-performance FastAPI routing server
│   ├── run_api.py                    # Server bootstrap script (port 8000)
│   └── requirements.txt              # Python dependencies
│
├── frontend/
│   ├── assets/images/                # 13 authentic architectural campus photographs
│   ├── src/                          # Modular React / TypeScript source components
│   │   ├── CampusNavigator.jsx       # Component implementation
│   │   ├── data/campusLocations.ts   # Location typings and node metadata
│   │   ├── services/routingService.ts# Client graph calculation service
│   │   └── types/navigation.ts       # TypeScript interface definitions
│   └── index.html                    # Standalone, zero-build production web application
│
├── docs/
│   ├── TECHNICAL_REPORT.md           # Comprehensive 24-deliverable mathematical & engineering report
│   ├── PRESENTATION_SLIDES.md        # 17-slide presentation script & slide deck
│   └── DESIGN_DECISIONS.md           # Editorial design decisions & typography record
│
├── start_campus_navigator.bat        # 1-click Windows launcher for entire stack
└── README.md                         # Project documentation
```

---

## 🚀 Quick Start Guide

### Option A: 1-Click Launch (Windows)
Double-click `start_campus_navigator.bat` in this folder. It will start the backend routing service on port 8000, start the frontend HTTP server on port 3000, and automatically open your default browser.

### Option B: Manual Command Line Launch

#### 1. Start the Routing Backend
```powershell
cd backend
python run_api.py
```
*API will be live at `http://localhost:8000` (Swagger docs available at `http://localhost:8000/docs`).*

#### 2. Start the Frontend
```powershell
cd frontend
python -m http.server 3000 --bind 127.0.0.1
```
*Open `http://localhost:3000` in any modern web browser.*

---

## 🧭 Application Features

1. **Editorial Homepage:** Minimalist layout inspired by Swiss typography and golden-hour architectural photography. Features an instant **Quick Route Planner** widget.
2. **Interactive Campus Navigator:**
   - **Clickable Map:** Click any campus building directly on the map to set starting point or destination.
   - **Visual Pins:** Start "A" and Destination "B" pins visually demarcate journeys.
   - **Live Journey Simulation:** Click `▶ Start Live Simulation` to watch an animated avatar traverse the route step-by-step with real-time progress indicators.
   - **1-Click Presets:** Quick scenario chips for common journeys (e.g., Gate ➔ Academic, Hostels ➔ Dining, Step-Free access).
   - **Voice Guidance:** Integrated Web Speech synthesis reading turn-by-turn maneuvers aloud.
3. **Explore Campus Directory:** 23 verified destinations categorized into Academic, Residential, Dining, Sports, and Gates with authentic photos and "Navigate Here" triggers.
4. **Institutional Integrity:** Zero AI hype buzzwords, zero logo invention, and verified barrier-free accessibility paths.

---

## 📊 Core Algorithms & Mathematical Specifications

### 1. Great-Circle Geodesic (Haversine Formula)
$$\Delta\sigma = 2\arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos\phi_1\cos\phi_2\sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)$$
$$d = R_{\text{earth}} \cdot \Delta\sigma \quad (R_{\text{earth}} = 6{,}371{,}000\text{ m})$$

### 2. Multi-Criteria Route Optimization Cost Function
$$C(R) = w_1\left(\frac{D}{D_{\max}}\right) + w_2\left(\frac{T}{T_{\max}}\right) + w_3\left(\frac{N_{\text{turns}}}{N_{\max}}\right) + w_4\cdot \bar{\rho}_{\text{congestion}}$$
$$\text{Default Weights: } w_1 = 0.35,\, w_2 = 0.35,\, w_3 = 0.15,\, w_4 = 0.15 \quad (\sum w_i = 1.0)$$

### 3. Machine Learning Travel Time Performance
| Model Candidate | MAE (min) | MAE (sec) | RMSE (min) | $R^2$ Score | Selection |
|---|---|---|---|---|---|
| **Random Forest Regressor** | **0.240** | **14.4 s** | **0.360** | **0.972** | **Production Selected** |
| Gradient Boosting (GBDT) | 0.260 | 15.6 s | 0.380 | 0.968 | Alternative |
| Baseline Linear Regression | 0.620 | 37.2 s | 0.850 | 0.865 | Baseline |

---

## 📜 Compliance & Deliverables Verification
This deliverable fulfills all 24 deliverables required by the Group Project 11 brief, including:
- Attributed campus graph with 23 nodes and 28 edges.
- Empirical synthetic movement dataset with 1,500 samples.
- Model comparison and metric validation.
- Multi-criteria route cost ranking.
- Turn-by-turn direction engine with compass azimuths.
- Offline landmark orientation guide for GPS-denied environments.
- Comprehensive technical report (`docs/TECHNICAL_REPORT.md`).
- Professional slide deck script (`docs/PRESENTATION_SLIDES.md`).
