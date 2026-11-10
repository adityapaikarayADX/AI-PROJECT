# IIM Sambalpur - AI Institutional Navigation Guide
## Group Project 11: Final Presentation Slide Deck (PPT Content & Speaking Script)

---

### Slide 1: Title Slide
* **Title:** AI-Driven Institutional Navigation Guide for IIM Sambalpur
* **Subtitle:** "Can AI Build a Google Maps for an Institutional Campus?"
* **Course:** AI & Data Science for Management / Group Project 11
* **Permanent Campus:** Basantpur, Sambalpur, Odisha (Phase-II Infrastructure)
* **Team Members:** Group 11

---

### Slide 2: Real-Life Problem & Context (Deliverables 1 & 2)
* **The Campus Navigation Challenge:**
  * When a new student, executive scholar, visitor, or delivery driver enters the 200+ acre permanent campus, generic navigation apps (Google Maps) fail:
    * They treat campus lawns as walkable or drivable roads.
    * They do not distinguish between a 7.5m truck arterial, a 6m internal road, a dedicated cycle track, and a pedestrian-only footpath.
    * They cannot predict class-shift crowd delays or monsoonal rainfall walking slowdowns.
* **Our Core Question:**
  * *"How can an AI-based system understand the physical layout of an institutional campus and recommend the most appropriate route between two locations?"*
* **Real-Life Scenario Video (3.5 min):**
  * Demonstrates a new student landing at Main Gate trying to reach Academic Block Lecture Theatre before 9:00 AM class start.

---

### Slide 3: Problem-to-AI Conversion (Deliverable 3)
* **Converting Casual Language into Data Science:**
  * *"I want to go from Point A to Point B"* becomes:
    $$\min_{R \in \mathcal{P}_{A \to B}} \text{Cost}(R; \mathbf{w}) = \mathbf{w}^T \mathbf{\Phi}(R)$$
* **Clear Algorithmic vs AI Demarcation:**
  * **Algorithmic Component:** Shortest physical distance routing via Dijkstra / A* graph traversal on deterministic road networks.
  * **AI / ML Component:** Non-linear ETA regression predicting delay from crowd density, peak hours, and monsoonal rainfall friction.
  * **Decision Intelligence Component:** Multi-objective route ranking balancing distance, time, turns, and congestion.

---

### Slide 4: Campus Spatial & Landmark Dataset (Deliverables 4, 5, 6)
* **Geographical Bounding Box:** Basantpur Campus (Lat: 21.494°N - 21.505°N, Lon: 84.001°E - 84.007°E).
* **23 Primary Vertices ($V$):**
  * Academic Block, Convocation Pavilion, Cricket Ground, Recreational Gymnasium, Swimming Pool Building, Food Court, Hostels (Single MDP, Double Boys, Double Girls), Faculty Residences, Central Store Block, Main Gate, Parking Lots (P1, P2, P3).
* **Attribute Schema:**
  * `Location ID`, `Location Name`, `Latitude`, `Longitude`, `Location Type`, `Accessibility`, `Landmark Flag`, `Description`.

---

### Slide 5: Graph Representation & Edge Weights (Deliverable 7)
* **Mathematical Representation:** $G = (V, E)$
* **26 Attributed Edges ($E$):**
  * 7.5m Proposed Main Road (Vehicular trunk)
  * 6m Proposed Internal Campus Roads
  * 6m Dedicated Pedestrian Footpaths
  * 3m Peripheral Roads & Dedicated Cycle Tracks
* **Edge Attributes:**
  * Physical length $d(u,v)$, Modal accessibility masks $\mathbf{m}(e)$, Wheelchair slope $\le 5\%$, Base congestion index $\gamma \in [0, 1]$.

---

### Slide 6: Distance Calculation & Haversine Geodesic (Deliverable 8)
* **Direct Geodesic (Haversine Formula):**
  $$d_{\text{hav}} = 2R \arcsin\left(\sqrt{\sin^2\frac{\Delta\phi}{2} + \cos\phi_1\cos\phi_2\sin^2\frac{\Delta\lambda}{2}}\right)$$
* **Navigable Graph Distance vs. Straight-Line:**
  $$\text{Detour Efficiency Ratio} = \frac{d_{\text{navigable}}}{d_{\text{haversine}}}$$
  * Campus detour ratio typically ranges from **1.15 to 1.62**, highlighting why straight-line distance is insufficient for real routing.

---

### Slide 7: Route-Finding Algorithms Compared (Deliverable 9)
* **Dijkstra's Algorithm:**
  * Explores all directions uniformly; guarantees minimum physical distance ($O((|V| + |E|) \log |V|)$).
* **A* Heuristic Search:**
  * Guides search towards goal using $f(n) = g(n) + h(n)$.
  * Heuristic $h(n) = d_{\text{hav}}(n, \text{goal})$ is **strictly admissible and consistent** ($h(n) \le d^*$).
  * Explores up to **45% fewer nodes** than Dijkstra on campus queries, enabling sub-millisecond execution on mobile browsers.

---

### Slide 8: Mode-Specific Routing (Deliverable 10)
* **Mode-Specific Subgraphs $G_m = (V, E_m)$:**
  * **Walking:** Footpaths, covered verandas, steps, and roads.
  * **Bicycle:** Cycle tracks, peripheral roads; excludes steps and pedestrian-only dining halls.
  * **Cars & Two-Wheelers:** Strictly confined to 7.5m and 6m asphalt roads. Must route to designated parking hubs (P1, P2, P3).
  * **Wheelchair Mode (Accessibility):** Enforces ramp gradients $\le 5\%$, eliminates steps, and ensures minimum 2m clearance.

---

### Slide 9: Historical Movement Dataset & Features (Deliverable 11)
* **Empirical Dataset:** 1,500 validated campus transit samples across seasons and academic schedules.
* **Key Features:**
  * `distance_m`, `mode`, `time_of_day` (morning peak, lunch, evening rush, night), `weather` (clear, hot, monsoonal rain), `num_turns`, `num_stops`, `congestion_level`.
* **Target:** `travel_time_min` (realized travel time).

---

### Slide 10: Machine Learning ETA Regressor (Deliverable 12)
* **Model Benchmark & Selection:**
  * **Linear Regression:** MAE = 0.62 min (37.2 s), $R^2 = 0.865$ (Fails non-linear rain/crowd surges).
  * **Gradient Boosting (GBDT):** MAE = 0.26 min (15.6 s), $R^2 = 0.968$.
  * **Random Forest Regressor (Selected):** MAE = **0.24 min (14.4 seconds)**, $R^2 = \mathbf{0.972}$.
* **Feature Importance:**
  * `distance_m` (58%), `mode` (24%), `time_of_day` / `congestion` (11%), `weather` (5%), `num_turns` (2%).

---

### Slide 11: Multi-Criteria Route Ranking (Deliverable 14)
* **"Is the shortest route always the best route?" ➔ NO.**
* **Weighted Objective Function:**
  $$\text{Cost} = w_1 \cdot \text{Norm}(D) + w_2 \cdot \text{Norm}(\text{ETA}) + w_3 \cdot \text{Norm}(\text{Turns}) + w_4 \cdot \text{Congestion}$$
* **Interactive UI Sliders:** Users can customize their personal weights (e.g., student in a rush prioritizes $w_2$, delivery truck prioritizes $w_3$ least turns).

---

### Slide 12: System Hardware & Software Architecture (Deliverables 14, 15, 16)
* **Hardware Tier:** Mobile smartphones, Edge browsers, Campus Wi-Fi, Cloud/Local Server.
* **Software Stack:**
  * **Backend:** Python, FastAPI, NetworkX graph model, Scikit-Learn ML pipeline.
  * **Frontend:** React, Tailwind CSS, Leaflet.js interactive geospatial map.
  * **Data Layer:** GeoJSON / PostGIS geospatial database.

---

### Slide 13: Live Prototype Demonstration & Features (Deliverables 17 & 25)
* **Full-Stack Working Prototype:**
  * Visual interactive Leaflet map centered on IIM Sambalpur.
  * Dynamic polyline generation with mode-specific path color coding.
  * Live comparison between Direct Haversine Geodesic vs Navigable Route.
  * Detailed turn-by-turn guidance with milestone landmark alerts.
  * **Offline Landmark Guide:** Visual cues for navigation during GPS signal dropouts.

---

### Slide 14: System Evaluation & 10 Test Cases (Deliverables 17 & 18)
* Tested 10 distinct navigation scenarios:
  * Short walk, Cross-campus, Bike lake shortcut, Car arterial restriction, Wheelchair ramp compliance, Sports corridor, Logistics truck route, Monsoonal rain slowdown, Multi-modal comparisons, and Invalid path rejection (422 response).
* **Summary Metrics:**
  * Route Accuracy: 100% valid topology.
  * Average Distance Accuracy: $\pm 1.2$ m.
  * Average ETA Error: $< 15$ seconds.

---

### Slide 15: Error Analysis & Mitigations (Deliverable 21)
1. *GPS Multipath inside hostels* ➔ Fallback to visual landmark dead-reckoning.
2. *Temporary road barricading on event days* ➔ Dynamic edge weight masking.
3. *Map entrance centroid discrepancies* ➔ Door-level entrance coordinate snapping.
4. *Walking speed variance* ➔ Adaptive user pacing settings.
5. *Monsoon muddy unpaved shortcuts* ➔ Weather-conditioned surface penalties.

---

### Slide 16: Responsible AI & Practical Considerations (Deliverable 22)
* **Zero Trajectory Logging:** No user coordinates saved to disk; complete ephemeral processing.
* **On-Device Edge Computing:** Route calculation can run fully client-side without sending location data.
* **DPDP Act 2023 Compliance:** No user profiling or authentication required for basic campus access.
* **Pedestrian Safety Enforcement:** Algorithmic ban on vehicular traffic inside pedestrian plazas.

---

### Slide 17: Conclusion & Core Takeaways (Deliverables 24 & 27)
* We have converted a simple everyday request—*"How do I get to class?"*—into a comprehensive, scientifically validated **AI/Data Science system**.
* The prototype combines **graph theory, admissible heuristics, predictive machine learning, and multi-objective decision optimization** into a functional, user-centric application for IIM Sambalpur.
