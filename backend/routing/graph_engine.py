import math
import heapq
from typing import Dict, List, Tuple, Any, Optional

EARTH_RADIUS_METERS = 6371000.0  # WGS-84 Mean Earth Radius

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Computes great-circle distance between two GPS coordinates using the Haversine formula.
    
    Formula:
        a = sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)
        c = 2 * atan2(√a, √(1-a))
        d = R * c
    """
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2.0) ** 2 +
         math.cos(phi1) * math.cos(phi2) * (math.sin(delta_lambda / 2.0) ** 2))
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return EARTH_RADIUS_METERS * c

def calculate_bearing(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates compass initial bearing from point 1 to point 2 in degrees [0, 360).
    """
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_lambda = math.radians(lon2 - lon1)

    y = math.sin(delta_lambda) * math.cos(phi2)
    x = (math.cos(phi1) * math.sin(phi2) -
         math.sin(phi1) * math.cos(phi2) * math.cos(delta_lambda))
    bearing = math.degrees(math.atan2(y, x))
    return (bearing + 360.0) % 360.0

def determine_turn_direction(bearing_prev: float, bearing_next: float) -> str:
    """
    Determines relative turn instruction given two sequential segment bearings.
    """
    diff = (bearing_next - bearing_prev + 180.0) % 360.0 - 180.0
    if -15.0 <= diff <= 15.0:
        return "Continue straight"
    elif 15.0 < diff <= 45.0:
        return "Bear slightly right"
    elif 45.0 < diff <= 120.0:
        return "Turn right"
    elif 120.0 < diff <= 165.0:
        return "Sharp right turn"
    elif -45.0 <= diff < -15.0:
        return "Bear slightly left"
    elif -120.0 <= diff < -45.0:
        return "Turn left"
    elif -165.0 <= diff < -120.0:
        return "Sharp left turn"
    else:
        return "Make a U-turn"

class CampusGraph:
    def __init__(self, graph_data: Dict[str, Any]):
        self.raw_data = graph_data
        self.nodes: Dict[str, Dict[str, Any]] = {
            node["id"]: node for node in graph_data.get("nodes", [])
        }
        # Adjacency list: node_id -> list of edge dicts
        self.adjacency: Dict[str, List[Dict[str, Any]]] = {
            node_id: [] for node_id in self.nodes
        }
        self._build_graph(graph_data.get("edges", []))

    def _build_graph(self, edges: List[Dict[str, Any]]):
        for edge in edges:
            u = edge["source"]
            v = edge["target"]
            if u in self.nodes and v in self.nodes:
                # Undirected bidirectional campus graph
                edge_uv = dict(edge)
                edge_uv["neighbor"] = v
                self.adjacency[u].append(edge_uv)

                edge_vu = dict(edge)
                edge_vu["neighbor"] = u
                self.adjacency[v].append(edge_vu)

    def is_edge_accessible(self, edge: Dict[str, Any], mode: str, wheelchair: bool = False) -> bool:
        modes = edge.get("modes", {})
        if not modes.get(mode, False):
            return False
        if wheelchair:
            if not edge.get("wheelchair_accessible", True):
                return False
            # Max 5% gradient recommendation for independent wheelchair travel
            if edge.get("slope_percent", 0.0) > 5.0:
                return False
        return True

    def dijkstra(self, start_id: str, goal_id: str, mode: str = "walk", wheelchair: bool = False) -> Optional[Dict[str, Any]]:
        """
        Classic Dijkstra algorithm for minimum physical distance path.
        """
        if start_id not in self.nodes or goal_id not in self.nodes:
            return None

        distances = {node: float("inf") for node in self.nodes}
        previous = {node: None for node in self.nodes}
        edge_used = {node: None for node in self.nodes}
        distances[start_id] = 0.0

        pq = [(0.0, start_id)]
        visited_count = 0

        while pq:
            current_dist, u = heapq.heappop(pq)
            visited_count += 1

            if u == goal_id:
                break
            if current_dist > distances[u]:
                continue

            for edge in self.adjacency[u]:
                if not self.is_edge_accessible(edge, mode, wheelchair):
                    continue

                v = edge["neighbor"]
                weight = float(edge["distance_m"])
                new_dist = current_dist + weight

                if new_dist < distances[v]:
                    distances[v] = new_dist
                    previous[v] = u
                    edge_used[v] = edge
                    heapq.heappush(pq, (new_dist, v))

        if distances[goal_id] == float("inf"):
            return None

        # Reconstruct path
        path_nodes = []
        path_edges = []
        curr = goal_id
        while curr:
            path_nodes.append(curr)
            if edge_used[curr]:
                path_edges.append(edge_used[curr])
            curr = previous[curr]
        path_nodes.reverse()
        path_edges.reverse()

        return {
            "algorithm": "Dijkstra",
            "path_nodes": path_nodes,
            "path_edges": path_edges,
            "total_distance_m": round(distances[goal_id], 1),
            "nodes_explored": visited_count
        }

    def a_star(self, start_id: str, goal_id: str, mode: str = "walk", wheelchair: bool = False) -> Optional[Dict[str, Any]]:
        """
        A* Search algorithm using Haversine straight-line distance as admissible heuristic.
        Admissibility proof: Haversine(u, goal) <= RoadDistance(u, goal), guaranteeing optimal cost.
        """
        if start_id not in self.nodes or goal_id not in self.nodes:
            return None

        goal_node = self.nodes[goal_id]
        goal_lat, goal_lon = goal_node["lat"], goal_node["lon"]

        def heuristic(node_id: str) -> float:
            n = self.nodes[node_id]
            return haversine_distance(n["lat"], n["lon"], goal_lat, goal_lon)

        g_score = {node: float("inf") for node in self.nodes}
        f_score = {node: float("inf") for node in self.nodes}
        previous = {node: None for node in self.nodes}
        edge_used = {node: None for node in self.nodes}

        g_score[start_id] = 0.0
        f_score[start_id] = heuristic(start_id)

        pq = [(f_score[start_id], 0.0, start_id)]
        visited_count = 0

        while pq:
            curr_f, curr_g, u = heapq.heappop(pq)
            visited_count += 1

            if u == goal_id:
                break
            if curr_g > g_score[u]:
                continue

            for edge in self.adjacency[u]:
                if not self.is_edge_accessible(edge, mode, wheelchair):
                    continue

                v = edge["neighbor"]
                edge_cost = float(edge["distance_m"])
                tentative_g = g_score[u] + edge_cost

                if tentative_g < g_score[v]:
                    previous[v] = u
                    edge_used[v] = edge
                    g_score[v] = tentative_g
                    f_score[v] = tentative_g + heuristic(v)
                    heapq.heappush(pq, (f_score[v], tentative_g, v))

        if g_score[goal_id] == float("inf"):
            return None

        path_nodes = []
        path_edges = []
        curr = goal_id
        while curr:
            path_nodes.append(curr)
            if edge_used[curr]:
                path_edges.append(edge_used[curr])
            curr = previous[curr]
        path_nodes.reverse()
        path_edges.reverse()

        return {
            "algorithm": "A*",
            "path_nodes": path_nodes,
            "path_edges": path_edges,
            "total_distance_m": round(g_score[goal_id], 1),
            "nodes_explored": visited_count
        }

    def generate_turn_by_turn(self, path_nodes: List[str], path_edges: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Generates human-readable turn-by-turn navigation instructions with compass directions,
        distances, upcoming landmarks, and offline landmark cues.
        """
        if len(path_nodes) < 2:
            return []

        instructions = []
        bearings = []

        # Calculate bearings between sequential nodes
        for i in range(len(path_nodes) - 1):
            n1 = self.nodes[path_nodes[i]]
            n2 = self.nodes[path_nodes[i + 1]]
            b = calculate_bearing(n1["lat"], n1["lon"], n2["lat"], n2["lon"])
            bearings.append(b)

        # Initial departure instruction
        first_node = self.nodes[path_nodes[0]]
        second_node = self.nodes[path_nodes[1]]
        first_edge = path_edges[0] if path_edges else {}
        instructions.append({
            "step": 1,
            "instruction": f"Depart from {first_node['name']} heading towards {second_node['name']}.",
            "path_type": first_edge.get("path_type", "Campus Road"),
            "distance_m": round(first_edge.get("distance_m", 0), 1),
            "bearing_deg": round(bearings[0], 1),
            "landmark_cue": f"Near {first_node['name']} ({first_node.get('description', '')})"
        })

        # Intermediate turns
        for i in range(1, len(path_nodes) - 1):
            curr_node = self.nodes[path_nodes[i]]
            next_node = self.nodes[path_nodes[i + 1]]
            edge = path_edges[i] if i < len(path_edges) else {}
            turn = determine_turn_direction(bearings[i - 1], bearings[i])

            landmark_mention = ""
            if curr_node.get("is_landmark"):
                landmark_mention = f" (Pass landmark: {curr_node['name']})"

            instructions.append({
                "step": i + 1,
                "instruction": f"At {curr_node['name']}{landmark_mention}, {turn.lower()} onto {edge.get('path_type', 'path')} towards {next_node['name']}.",
                "path_type": edge.get("path_type", "Campus Road"),
                "distance_m": round(edge.get("distance_m", 0), 1),
                "bearing_deg": round(bearings[i], 1),
                "landmark_cue": f"Look for {curr_node['name']} on your route."
            })

        # Final arrival
        dest_node = self.nodes[path_nodes[-1]]
        instructions.append({
            "step": len(path_nodes),
            "instruction": f"Arrive at destination: {dest_node['name']}.",
            "path_type": "Destination Arrival",
            "distance_m": 0,
            "bearing_deg": round(bearings[-1], 1),
            "landmark_cue": f"Destination reached: {dest_node['description']}"
        })

        return instructions
