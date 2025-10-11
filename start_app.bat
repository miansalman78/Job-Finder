@echo off
echo ===================================================
echo Job Listing Application - Startup Script
echo ===================================================
echo.

REM Start backend in a new window
echo Starting Backend Server...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python start.py"

REM Wait a moment for backend to initialize
timeout /t 5 /nobreak > nul

REM Start frontend in a new window
echo Starting Frontend Server...
start cmd /k "cd frontend && node start.js"

echo.
echo ===================================================
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo ===================================================
echo.
echo Press any key to exit this window (servers will continue running)
pause > nul