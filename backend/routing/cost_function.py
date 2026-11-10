from typing import Dict, Any, List

def calculate_route_cost(
    distance_m: float,
    predicted_time_min: float,
    num_turns: int,
    avg_congestion: float,
    weights: Dict[str, float] = None
) -> Dict[str, Any]:
    """
    Computes multi-objective route cost using normalized criteria:
      Cost = w1 * Norm(Distance) + w2 * Norm(Time) + w3 * Norm(Turns) + w4 * Norm(Congestion)
    
    Standard normalization bases for IIM Sambalpur Campus:
      - Max Campus Diameter Distance ~ 1200 meters
      - Max Walk Time ~ 20 minutes
      - Max Turns in Typical Route ~ 10 turns
      - Congestion Index Scale: [0.0 (empty) to 1.0 (peak crowd)]
    """
    if weights is None:
        weights = {
            "w_distance": 0.35,
            "w_time": 0.35,
            "w_turns": 0.15,
            "w_congestion": 0.15
        }

    # Normalize weights so sum equals 1.0
    w_sum = sum(weights.values()) or 1.0
    w_dist = weights.get("w_distance", 0.35) / w_sum
    w_time = weights.get("w_time", 0.35) / w_sum
    w_turns = weights.get("w_turns", 0.15) / w_sum
    w_cong = weights.get("w_congestion", 0.15) / w_sum

    # Normalized component scores [0.0, 1.0]
    norm_dist = min(distance_m / 1200.0, 1.5)
    norm_time = min(predicted_time_min / 20.0, 1.5)
    norm_turns = min(num_turns / 8.0, 1.5)
    norm_cong = min(max(avg_congestion, 0.0), 1.0)

    total_cost = (
        w_dist * norm_dist +
        w_time * norm_time +
        w_turns * norm_turns +
        w_cong * norm_cong
    )

    return {
        "total_cost": round(total_cost, 4),
        "normalized_breakdown": {
            "distance_score": round(norm_dist, 3),
            "time_score": round(norm_time, 3),
            "turns_score": round(norm_turns, 3),
            "congestion_score": round(norm_cong, 3)
        },
        "applied_weights": {
            "w_distance": round(w_dist, 3),
            "w_time": round(w_time, 3),
            "w_turns": round(w_turns, 3),
            "w_congestion": round(w_cong, 3)
        }
    }
