@echo off
title IIM Sambalpur Campus Navigator - Launcher
echo ========================================================
echo   IIM Sambalpur - Campus Navigator Launcher
echo   Basantpur Permanent Campus Mobility System
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting Backend Routing Server on port 8000...
start "Campus Navigator - Routing Backend (Port 8000)" cmd /k "python backend/run_api.py"

echo [2/3] Starting Frontend HTTP Server on port 3000...
start "Campus Navigator - Web Frontend (Port 3000)" cmd /k "cd frontend && python -m http.server 3000 --bind 127.0.0.1"

echo [3/3] Waiting for servers to initialize...
timeout /t 3 /nobreak >nul

echo Opening application in default browser...
start http://localhost:3000

echo.
echo ========================================================
echo   System is live!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo ========================================================
echo.
pause
