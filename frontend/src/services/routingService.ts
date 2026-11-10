import { NavigationResponse, TransportMode, TimeOfDay, WeatherCondition } from "../types/navigation";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export interface NavigateParams {
  source: string;
  destination: string;
  mode: TransportMode;
  timeOfDay?: TimeOfDay;
  weather?: WeatherCondition;
  wheelchairAccessible?: boolean;
  weights?: {
    w_distance: number;
    w_time: number;
    w_turns: number;
    w_congestion: number;
  };
}

export async function fetchNavigationRoute(params: NavigateParams): Promise<NavigationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/navigate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: params.source,
      destination: params.destination,
      mode: params.mode,
      time_of_day: params.timeOfDay || "off_peak",
      weather: params.weather || "clear",
      wheelchair_accessible: params.wheelchairAccessible || false,
      weights: params.weights
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server returned error ${response.status}`);
  }

  return response.json();
}
