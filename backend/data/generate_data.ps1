$modes = @("walk", "bike", "two_wheeler", "car")
$times = @("morning_peak", "afternoon", "evening_peak", "night", "off_peak")
$weathers = @("clear", "sunny_hot", "rainy")
$locations = @("Main Gate", "Academic Block", "Convocation Ground", "Cricket Ground", "Recreational Block", "Swimming Pool Facility", "Food Court", "Single Occupancy Hostel", "Double Occupancy Boys Hostel", "Double Occupancy Girls Hostel", "Central Store Block", "Faculty Residences")

$speeds = @{ "walk"=75.0; "bike"=200.0; "two_wheeler"=330.0; "car"=300.0 }
$overheads = @{ "walk"=0.2; "bike"=0.5; "two_wheeler"=1.0; "car"=1.8 }

$csvLines = @()
$csvLines += "trip_id,source,destination,mode,distance_m,time_of_day,weather,num_turns,num_stops,congestion_level,travel_time_min"

$rand = New-Object System.Random(42)

for ($i = 1; $i -le 1500; $i++) {
    $src = $locations[$rand.Next($locations.Length)]
    $dst = $locations[$rand.Next($locations.Length)]
    while ($dst -eq $src) {
        $dst = $locations[$rand.Next($locations.Length)]
    }
    $mode = $modes[$rand.Next($modes.Length)]
    $time_of_day = $times[$rand.Next($times.Length)]
    $weather = $weathers[$rand.Next($weathers.Length)]
    $dist = [Math]::Round(($rand.NextDouble() * (1150.0 - 70.0) + 70.0), 1)
    $turns = $rand.Next(1, 7)
    $stops = $rand.Next(0, 3)

    $cong = [Math]::Round(($rand.NextDouble() * 0.7 + 0.1), 3)
    if ($time_of_day -eq "morning_peak" -or $time_of_day -eq "afternoon") {
        $cong = [Math]::Round(($rand.NextDouble() * 0.45 + 0.4), 3)
    }

    $weather_f = 1.0
    if ($weather -eq "rainy") {
        if ($mode -eq "walk") { $weather_f = 1.25 }
        elseif ($mode -eq "bike") { $weather_f = 1.35 }
        else { $weather_f = 1.15 }
    } elseif ($weather -eq "sunny_hot" -and ($mode -eq "walk" -or $mode -eq "bike")) {
        $weather_f = 1.10
    }

    $tod_f = 1.0
    if ($time_of_day -eq "morning_peak" -or $time_of_day -eq "afternoon") {
        $tod_f = 1.15
    }

    $speed = $speeds[$mode]
    $overhead = $overheads[$mode]
    $turn_delay = $turns * $(if ($mode -eq "car" -or $mode -eq "two_wheeler") { 0.12 } else { 0.05 })
    $stop_delay = $stops * 0.45

    $motion_time = ($dist / $speed) * $weather_f * $tod_f * (1.0 + 0.25 * $cong)
    $noise = ($rand.NextDouble() - 0.5) * 0.3 * ($motion_time + 1.0)
    $total_time = [Math]::Max(0.5, [Math]::Round(($motion_time + $turn_delay + $stop_delay + $overhead + $noise), 2))

    $id = "TRIP_" + $i.ToString("D5")
    $csvLines += "$id,$src,$dst,$mode,$dist,$time_of_day,$weather,$turns,$stops,$cong,$total_time"
}

$csvPath = "C:\Users\harsh\.gemini\antigravity\scratch\iim_sambalpur_nav\backend\data\movement_dataset.csv"
$csvLines | Out-File -FilePath $csvPath -Encoding utf8
Write-Host "Generated $($csvLines.Length - 1) synthetic movement rows."
