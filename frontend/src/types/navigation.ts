export type TransportMode = "walk" | "bike" | "two_wheeler" | "car";

export type TimeOfDay = "morning_peak" | "afternoon" | "evening_peak" | "night" | "off_peak";

export type WeatherCondition = "clear" | "sunny_hot" | "rainy";

export interface CampusLocation {
  id: string;
  name: string;
  type: "academic" | "hostel" | "dining" | "sports" | "gate" | "residential" | "administrative";
  lat: number;
  lon: number;
  is_landmark: boolean;
  description: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  distance_m: number;
  path_type: string;
  modes: {
    walk: boolean;
    bike: boolean;
    two_wheeler: boolean;
    car: boolean;
  };
  wheelchair_accessible: boolean;
  slope_percent: number;
  base_congestion: number;
  description: string;
}

export interface TurnInstruction {
  step: number;
  instruction: string;
  path_type: string;
  distance_m: number;
  bearing_deg: number;
  landmark_cue: string;
}

export interface NavigationMetrics {
  straight_line_distance_m: number;
  navigable_distance_m: number;
  network_detour_ratio: number;
  predicted_eta_minutes: number;
  number_of_turns: number;
  average_congestion_index: number;
  algorithm_nodes_explored?: {
    dijkstra: number;
    a_star: number | null;
  };
}

export interface NavigationResponse {
  source: CampusLocation;
  destination: CampusLocation;
  mode: TransportMode;
  wheelchair_accessible: boolean;
  metrics: NavigationMetrics;
  route_coordinates: [number, number][];
  route_node_ids: string[];
  landmarks_encountered: string[];
  offline_landmark_guide: string;
  turn_by_turn_directions: TurnInstruction[];
}
