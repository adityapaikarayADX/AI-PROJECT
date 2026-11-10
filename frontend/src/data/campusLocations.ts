import { CampusLocation } from "../types/navigation";

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: "main_gate",
    name: "Main Entrance Gate",
    type: "gate",
    lat: 21.4948,
    lon: 84.0025,
    is_landmark: true,
    description: "Primary campus security checkpoint, visitor registration, and arterial road entrance."
  },
  {
    id: "academic_block",
    name: "Academic Block",
    type: "academic",
    lat: 21.5022,
    lon: 84.0055,
    is_landmark: true,
    description: "Main academic hub featuring lecture halls, faculty offices, case rooms, and library."
  },
  {
    id: "convocation_ground",
    name: "Convocation Pavilion & Ground",
    type: "academic",
    lat: 21.4995,
    lon: 84.0045,
    is_landmark: true,
    description: "Large arched steel tensile canopy for annual convocations and outdoor ceremonies."
  },
  {
    id: "cricket_ground",
    name: "Cricket & Sports Oval",
    type: "sports",
    lat: 21.4988,
    lon: 84.0038,
    is_landmark: true,
    description: "Full-size cricket oval with 400m running track perimeter."
  },
  {
    id: "recreational_block",
    name: "Recreational Block & Gymnasium",
    type: "sports",
    lat: 21.4975,
    lon: 84.0018,
    is_landmark: true,
    description: "Indoor sports complex, squash courts, badminton, table tennis, and yoga hall."
  },
  {
    id: "swimming_pool_facility",
    name: "Swimming Pool Facility Building",
    type: "sports",
    lat: 21.4972,
    lon: 84.0012,
    is_landmark: true,
    description: "Olympic-dimension outdoor swimming pool with changing rooms and filtration plant."
  },
  {
    id: "food_court",
    name: "Central Food Court & Dining Hall",
    type: "dining",
    lat: 21.5008,
    lon: 84.0068,
    is_landmark: true,
    description: "Multi-cuisine student and faculty dining center with open outdoor seating plaza."
  },
  {
    id: "single_occupancy_hostel",
    name: "Single Occupancy Hostel (MDP & Senior)",
    type: "hostel",
    lat: 21.5035,
    lon: 84.0028,
    is_landmark: true,
    description: "5-storey residential block for executive students and research scholars."
  },
  {
    id: "double_occupancy_boys_hostel",
    name: "Double Occupancy Hostel (Boys)",
    type: "hostel",
    lat: 21.5042,
    lon: 84.0035,
    is_landmark: true,
    description: "4-storey modern student hostel with Sambalpuri Ikat brick ornamentation."
  },
  {
    id: "double_occupancy_girls_hostel",
    name: "Double Occupancy Hostel (Girls)",
    type: "hostel",
    lat: 21.5048,
    lon: 84.0045,
    is_landmark: true,
    description: "Dedicated secure female student hostel with courtyard garden."
  },
  {
    id: "central_store_block",
    name: "Central Store & Logistics Block",
    type: "administrative",
    lat: 21.4962,
    lon: 84.0062,
    is_landmark: true,
    description: "Inventory management, campus supplies, asset warehouse, and receiving dock."
  },
  {
    id: "staff_residence",
    name: "Faculty & Staff Residences",
    type: "residential",
    lat: 21.4960,
    lon: 84.0030,
    is_landmark: true,
    description: "Multi-storey residential towers for permanent faculty and administrative officers."
  },
  {
    id: "commercial_laundry_block",
    name: "Commercial Laundry Block",
    type: "hostel",
    lat: 21.5045,
    lon: 84.0018,
    is_landmark: false,
    description: "Automated centralized laundry and dry-cleaning service block for campus residents."
  },
  {
    id: "parking_main_gate",
    name: "South Visitor Parking (P1)",
    type: "gate",
    lat: 21.4952,
    lon: 84.0030,
    is_landmark: false,
    description: "Visitor and delivery vehicle parking lot with 120 vehicle capacity."
  },
  {
    id: "parking_academic",
    name: "Academic Block Parking (P2)",
    type: "gate",
    lat: 21.5020,
    lon: 84.0062,
    is_landmark: false,
    description: "Faculty and staff reserved shaded parking lot with EV charging spots."
  },
  {
    id: "parking_hostels",
    name: "Hostel Two-Wheeler Shed (P3)",
    type: "gate",
    lat: 21.5038,
    lon: 84.0040,
    is_landmark: false,
    description: "Designated cycle and motorized two-wheeler shed for student residents."
  }
];
