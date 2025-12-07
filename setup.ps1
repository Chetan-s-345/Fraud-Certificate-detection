#!/usr/bin/env pwsh

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Shield AI - Authentication Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose an option:" -ForegroundColor Yellow
Write-Host "1. Install dependencies and start backend"
Write-Host "2. Start frontend only (backend must be running)"
Write-Host "3. Start both frontend and backend"
Write-Host "4. Show MongoDB setup instructions"
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Installing dependencies..." -ForegroundColor Green
        npm install
        Write-Host ""
        Write-Host "Starting backend server..." -ForegroundColor Green
        node server/server.js
    }
    "2" {
        Write-Host ""
        Write-Host "Starting frontend..." -ForegroundColor Green
        npm run dev
    }
    "3" {
        Write-Host ""
        Write-Host "Starting backend in separate window..." -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server/server.js"
        
        Write-Host ""
        Write-Host "Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
        
        Write-Host "Starting frontend..." -ForegroundColor Green
        npm run dev
    }
    "4" {
        Write-Host ""
        Write-Host "MongoDB Setup Instructions:" -ForegroundColor Green
        Write-Host ""
        Write-Host "Option A: MongoDB Community (Local)"
        Write-Host "  1. Download: https://www.mongodb.com/try/download/community"
        Write-Host "  2. Install and run MongoDB service"
        Write-Host "  3. Connection string: mongodb://localhost:27017/shield-ai"
        Write-Host ""
        Write-Host "Option B: MongoDB Atlas (Cloud - Recommended)"
        Write-Host "  1. Go to: https://www.mongodb.com/cloud/atlas"
        Write-Host "  2. Create free account and cluster"
        Write-Host "  3. Copy connection string to .env file"
        Write-Host ""
        Write-Host "After setup, update .env file with your connection string"
    }
    default {
        Write-Host "Invalid choice!" -ForegroundColor Red
    }
}
