# Design Decision Record (Pass B)
## IIM Sambalpur — AI Campus Navigator

### 1. Visual Archetype
* **Contemporary Institutional Editorial**: Combines the discipline of Swiss modernist layout, the warmth of tactile university publications, and the functional clarity of physical wayfinding systems.
* Avoids: Cyberpunk HUDs, dark glassmorphism, floating dashboard screenshots, startup gradient blobs, and generic component-library templates.

### 2. Palette & Design Tokens
* `Paper` (`#F5F2EC`): Main canvas tone, warm off-white, tactile.
* `Paper Light` (`#FAF8F4`): Content surfaces and card backgrounds.
* `Ink` (`#171714`): Primary typography and primary button fills.
* `Graphite` (`#45443F`): Secondary typography, section headings, and labels.
* `Muted` (`#77736B`): Captions, timestamps, and metadata.
* `Rule` (`#D7D1C7`): Hairline dividers (0.5px - 1px borders).
* `Stone` (`#E8E2D8`): Quiet surface contrast and active selector backgrounds.
* `Deep Blue` (`#1B328F`): Restrained institutional accent (used strictly for institutional context).
* `Route Accent` (`#A34C32`): Warm terracotta/burnt umber for active navigation paths.

### 3. Typography System
* **Display**: `Fraunces` (Editorial Variable Serif) for main homepage headlines and major section titles.
* **Interface & Body**: `IBM Plex Sans` for navigation, controls, directions, and body copy.
* **Technical Metadata**: `IBM Plex Mono` for coordinates, route IDs, mathematical formulas, and status codes.

### 4. Grid & Composition
* Asymmetric 60/40 hero composition on desktop.
* Responsive content container with controlled horizontal margins (`max-w-7xl`).
* Generous vertical whitespace structured by thin hairline dividers (`#D7D1C7`).
* Functional 3-column workspace on Navigator page with map commanding the largest visual area.

### 5. Image & Visual Strategy
* Logo-free institutional identity: text-only `IIM Sambalpur`.
* Authentic architectural site plan of Phase-II infrastructure with verified geodetic coordinates ($21.4985^\circ\text{ N}, 84.0042^\circ\text{ E}$).
* No AI-hallucinated photorealistic buildings labeled as authentic.

### 6. Deliberately Avoided Generic Patterns
1. **No KPI strip or vanity statistics dashboard** (e.g. "47 locations", "$14M", "90 seconds").
2. **No three identical icon-feature cards** in a mechanical row.
3. **No dark navy dashboard or neon glow accents** disguised as "modern AI".
