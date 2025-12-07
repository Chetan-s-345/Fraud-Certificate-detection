@echo off
echo =====================================
echo Shield AI - Authentication Setup
echo =====================================
echo.
echo This script will help you get started.
echo.
echo Choose an option:
echo 1. Install dependencies and start backend
echo 2. Start frontend only (backend must be running)
echo 3. Start both frontend and backend (requires 2 terminals)
echo 4. Install MongoDB (if not already installed)
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Installing dependencies...
    call npm install
    echo.
    echo Starting backend server...
    call node server/server.js
) else if "%choice%"=="2" (
    echo.
    echo Starting frontend...
    call npm run dev
) else if "%choice%"=="3" (
    echo.
    echo Backend will start in a new window...
    start cmd /k "node server/server.js"
    echo.
    timeout /t 3
    echo Frontend starting...
    call npm run dev
) else if "%choice%"=="4" (
    echo.
    echo Opening MongoDB download page...
    start https://www.mongodb.com/try/download/community
    echo.
    echo You can also use MongoDB Atlas (cloud):
    echo https://www.mongodb.com/cloud/atlas
) else (
    echo Invalid choice!
)
