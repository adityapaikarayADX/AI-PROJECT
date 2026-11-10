import React, { useState } from "react";
import { CAMPUS_LOCATIONS } from "./data/campusLocations";
import { fetchNavigationRoute } from "./services/routingService";

export default function CampusNavigator() {
  const [source, setSource] = useState("main_gate");
  const [destination, setDestination] = useState("academic_block");
  const [mode, setMode] = useState("walk");
  const [timeOfDay, setTimeOfDay] = useState("morning_peak");
  const [weather, setWeather] = useState("clear");
  const [stepFree, setStepFree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);

  const handleComputeRoute = async () => {
    if (source === destination) {
      setErrorMsg("Origin and destination cannot be identical.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const data = await fetchNavigationRoute({
        source,
        destination,
        mode,
        timeOfDay,
        weather,
        wheelchairAccessible: stepFree
      });
      setResult(data);
    } catch (err) {
      console.warn("Route computation notice:", err.message);
      setErrorMsg(err.message || "Unable to compute route.");
    } finally {
      setLoading(false);
    }
  };

  const swapLocations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#1a1917] font-sans antialiased selection:bg-[#d9d3cb]">
      {/* Editorial Header (Logo-Free, Text-Only) */}
      <header className="sticky top-0 z-50 bg-[#f7f3ee]/95 backdrop-blur-md border-b border-[#d9d3cb]">
        <div className="max-w-[1480px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-baseline space-x-2.5">
            <span className="font-serif font-bold text-base tracking-tight text-[#1a1917]">
              IIM Sambalpur
            </span>
            <span className="text-[#d9d3cb]">|</span>
            <span className="text-xs font-medium text-[#6f6b66]">
              Campus Navigator
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#6f6b66]">
            Basantpur Campus &bull; Phase-II Master Plan
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1480px] mx-auto px-6 py-8 space-y-10">
        
        {/* Editorial Subhead */}
        <div className="border-b border-[#d9d3cb] pb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#6f6b66]">CAMPUS ROUTING</div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1917] mt-0.5">
              Campus Navigation Workspace
            </h1>
          </div>
          <div className="font-mono text-[11px] text-[#6f6b66]">
            Basantpur, Sambalpur &bull; 200 Acres
          </div>
        </div>

        {/* 3-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Route Planner Controls */}
          <div className="lg:col-span-4 bg-[#fffcf8] border border-[#d9d3cb] rounded-xl p-5 space-y-5 shadow-sm">
            <div className="border-b border-[#d9d3cb] pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1917]">
                Plan Your Journey
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#1a1917] mb-1">Starting Location (Origin)</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg px-3 py-2 text-xs text-[#1a1917] focus:outline-none focus:border-[#1a1917]"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>{loc.name} {loc.is_landmark ? "★" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center -my-1">
                <button
                  type="button"
                  onClick={swapLocations}
                  className="p-1 border border-[#d9d3cb] bg-[#fffcf8] hover:bg-[#d9d3cb]/40 rounded-full text-[#6f6b66] hover:text-[#1a1917] text-xs transition-colors"
                  title="Swap locations"
                >
                  ⇅ Swap
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1a1917] mb-1">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg px-3 py-2 text-xs text-[#1a1917] focus:outline-none focus:border-[#1a1917]"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>{loc.name} {loc.is_landmark ? "★" : ""}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mode Selectors */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#1a1917]">Mode of Transport</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "walk", label: "Walk", icon: "🚶" },
                  { id: "bike", label: "Bicycle", icon: "🚲" },
                  { id: "two_wheeler", label: "Two-wheeler", icon: "🛵" },
                  { id: "car", label: "Car/Van", icon: "🚗" }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-xs font-medium transition-colors ${
                      mode === m.id
                        ? "border-[#1a1917] bg-[#1a1917] text-[#fffcf8]"
                        : "border-[#d9d3cb] bg-[#f7f3ee] text-[#6f6b66] hover:text-[#1a1917]"
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span className="text-[10px] mt-0.5">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Context Factors */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#d9d3cb]">
              <div>
                <label className="block text-[10px] font-semibold text-[#1a1917] mb-1">Time of Day</label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg px-2 py-1.5 text-xs text-[#1a1917]"
                >
                  <option value="morning_peak">Morning (8-10 AM)</option>
                  <option value="afternoon">Lunch (12-2 PM)</option>
                  <option value="evening_peak">Evening (5-7 PM)</option>
                  <option value="night">Night (8-11 PM)</option>
                  <option value="off_peak">Off-Peak</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#1a1917] mb-1">Weather</label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg px-2 py-1.5 text-xs text-[#1a1917]"
                >
                  <option value="clear">Clear &amp; Dry</option>
                  <option value="sunny_hot">Hot Afternoon</option>
                  <option value="rainy">Monsoon Rain</option>
                </select>
              </div>
            </div>

            {/* Step-Free Accessible Route Option */}
            <div className="border-t border-[#d9d3cb] pt-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stepFree}
                  onChange={(e) => setStepFree(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#1a1917]"
                />
                <div>
                  <span className="text-xs font-semibold text-[#1a1917] block">Step-free routes</span>
                  <span className="text-[10px] text-[#6f6b66] block leading-tight">
                    Accessible paths avoiding staircases and steep terrain.
                  </span>
                </div>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="button"
              onClick={handleComputeRoute}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#1a1917] hover:bg-neutral-800 text-[#fffcf8] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              {loading ? "Finding route..." : "Find route"}
            </button>

            {errorMsg && (
              <div className="p-3 bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg text-xs text-[#1a1917]">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Center Column: Map Frame */}
          <div className="lg:col-span-5 bg-[#fffcf8] border border-[#d9d3cb] rounded-xl flex flex-col h-[560px] overflow-hidden shadow-sm">
            <div className="h-10 px-4 border-b border-[#d9d3cb] flex items-center justify-between text-xs text-[#6f6b66] bg-[#f7f3ee]/60">
              <span className="font-mono text-[#1a1917]">IIM Sambalpur Geographic View</span>
              <span className="font-mono text-[10px]">21.4985° N, 84.0042° E</span>
            </div>
            <div className="flex-1 bg-[#f7f3ee] flex items-center justify-center p-6 text-center text-xs text-[#6f6b66]">
              <div className="max-w-xs space-y-2">
                <p className="font-semibold text-[#1a1917]">Muted CartoDB Positron Frame</p>
                <p className="text-[11px] leading-relaxed">
                  Real campus network with 23 facilities, arterial roads, pedestrian pathways, and active route polyline.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Route Details */}
          <div className="lg:col-span-3 bg-[#fffcf8] border border-[#d9d3cb] rounded-xl p-5 space-y-4 h-[560px] overflow-y-auto shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a1917] border-b border-[#d9d3cb] pb-2">
              Route Details
            </h2>

            {result ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg">
                    <div className="text-[9px] font-mono uppercase text-[#6f6b66]">Distance</div>
                    <div className="text-base font-bold font-mono text-[#1a1917]">{result.metrics.navigable_distance_m} m</div>
                  </div>
                  <div className="p-3 bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg">
                    <div className="text-[9px] font-mono uppercase text-[#6f6b66]">Estimated Time</div>
                    <div className="text-base font-bold font-mono text-[#1a1917]">{result.metrics.predicted_eta_minutes} min</div>
                  </div>
                </div>

                <div className="p-3 bg-[#f7f3ee] border border-[#d9d3cb] rounded-lg space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#6f6b66]">Milestone Cue</div>
                  <p className="text-[11px] text-[#6f6b66] leading-relaxed">
                    {result.offline_landmark_guide}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#6f6b66]">Turn-by-Turn Steps</div>
                  <ol className="space-y-2 text-[11px] text-[#6f6b66]">
                    {result.turn_by_turn_directions.map((step) => (
                      <li key={step.step} className="border-b border-[#d9d3cb] pb-1.5">
                        <span className="font-semibold text-[#1a1917]">{step.step}. </span>
                        {step.instruction} ({step.distance_m}m)
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#6f6b66] italic pt-4">
                Configure origin and destination, then click Find route to view path distance, travel times, and landmark directions.
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
