# MongoDB Setup Guide for Shield AI

## Quick Start (Choose One Option)

### Option 1: MongoDB Atlas Cloud (Recommended - No Installation Needed)

**Easiest & Fastest way to get started**

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Sign in" or "Create account"

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Select "Free" tier (M0)
   - Choose region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" tab
   - Click "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Generate strong password (save it!)
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" tab
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" tab
   - Click "Connect"
   - Choose "Drivers" tab
   - Select "Node.js" driver
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<password>` with your credentials

6. **Update .env File**
   ```
   MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.abc123.mongodb.net/shield-ai?retryWrites=true&w=majority
   ```

7. **Done!** Your app will now connect to MongoDB Atlas

---

### Option 2: Local MongoDB Installation (Windows)

**Install MongoDB on your computer**

#### Step 1: Download MongoDB Community Edition
- Visit: https://www.mongodb.com/try/download/community
- Choose:
  - **Version**: Latest (or 7.0)
  - **OS**: Windows 64-bit MSI
  - Click "Download"

#### Step 2: Run the Installer
- Double-click the downloaded `.msi` file
- Follow the installer wizard
- Click "Next" through the screens
- When asked about "MongoDB Compass", leave it checked
- Click "Install"
- Wait for installation to complete

#### Step 3: Verify Installation
```powershell
# Open PowerShell and check MongoDB version
mongod --version

# Should output something like:
# db version v7.0.0
# Build Info: ...
```

#### Step 4: Start MongoDB Service

**Option A: Using Windows Services (Automatic)**
```powershell
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Check service status
Get-Service MongoDB
```

**Option B: Manual Start (Command Line)**
```powershell
# Navigate to MongoDB bin directory
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
./mongod.exe --dbpath "C:\data\db"

# The server will start and display connection info
```

#### Step 5: Verify MongoDB is Running
```powershell
# In a new PowerShell window, connect to MongoDB
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.x.x
# test>

# Type 'exit' to close
exit
```

#### Step 6: Update .env File
```
MONGODB_URI=mongodb://localhost:27017/shield-ai
```

---

### Option 3: MongoDB Docker Container (Advanced)

**Use Docker to run MongoDB in a container**

#### Step 1: Install Docker
- Download: https://www.docker.com/products/docker-desktop
- Install and start Docker Desktop

#### Step 2: Run MongoDB Container
```powershell
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name shield-ai-db mongo:latest

# Verify it's running
docker ps
```

#### Step 3: Update .env File
```
MONGODB_URI=mongodb://localhost:27017/shield-ai
```

#### Step 4: Stop MongoDB Container
```powershell
docker stop shield-ai-db
docker rm shield-ai-db
```

---

## Troubleshooting

### Problem: "connect ECONNREFUSED ::1:27017"

**This means MongoDB is not running**

**Solutions:**
```powershell
# 1. Check if MongoDB service is running
Get-Service MongoDB | Select-Object Status

# 2. Start MongoDB service
net start MongoDB

# 3. Verify MongoDB is listening
netstat -ano | findstr :27017

# 4. If still not working, check installation
Test-Path "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

# 5. Start MongoDB manually
cd "C:\Program Files\MongoDB\Server\7.0\bin"
./mongod.exe
```

### Problem: "Port 27017 already in use"

```powershell
# Find what's using the port
netstat -ano | findstr :27017

# Kill the process (replace PID with the number shown)
taskkill /PID 12345 /F

# Or use a different port in .env
MONGODB_URI=mongodb://localhost:27018/shield-ai
```

### Problem: "Authentication failed"

```powershell
# Make sure credentials in connection string are correct
# Format: mongodb://username:password@host:port/database

# Test connection with mongosh
mongosh "mongodb://username:password@localhost:27017/shield-ai"
```

### Problem: MongoDB Atlas Connection Error

1. Check username and password are correct
2. Ensure database user exists in "Database Access"
3. Verify IP address is whitelisted in "Network Access"
4. Try adding `?authSource=admin` to connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shield-ai?authSource=admin&retryWrites=true&w=majority
   ```

---

## Testing MongoDB Connection

### Test 1: Using MongoDB Compass (GUI)
```
1. Open MongoDB Compass
2. Paste connection string in "URI" field
3. Click "Connect"
4. You should see "shield-ai" database listed
```

### Test 2: Using mongosh (Command Line)
```powershell
# Connect to MongoDB
mongosh "mongodb://localhost:27017/shield-ai"

# List databases
show dbs

# Show current database
db

# Exit
exit
```

### Test 3: Using Shield AI Server
```powershell
# Start the server
cd "c:\Users\cheta\OneDrive\Desktop\Buildathon\shield-ai"
npm run server

# Should show:
# ✅ Connecting to MongoDB: mongodb://localhost:27017/shield-ai
# ✅ Connected to MongoDB successfully
# ✅ Server running on port 5000
# 📦 Database connected and ready
```

---

## Quick Reference

### Check MongoDB Status
```powershell
# Windows Service
Get-Service MongoDB

# Process
Get-Process mongod

# Port 27017
netstat -ano | findstr :27017
```

### Start/Stop MongoDB
```powershell
# Start
net start MongoDB

# Stop
net stop MongoDB

# Restart
Restart-Service MongoDB
```

### Common Connection Strings

| Scenario | Connection String |
|----------|------------------|
| Local development | `mongodb://localhost:27017/shield-ai` |
| Local with auth | `mongodb://user:pass@localhost:27017/shield-ai` |
| MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/shield-ai?retryWrites=true&w=majority` |
| Docker | `mongodb://localhost:27017/shield-ai` |
| Remote server | `mongodb://username:password@ip:27017/shield-ai` |

---

## Next Steps

1. **Choose an option** (Atlas recommended for simplicity)
2. **Update .env** with correct `MONGODB_URI`
3. **Test connection** using one of the test methods
4. **Run the server**: `npm run server`
5. **Verify it shows**: "✅ Connected to MongoDB successfully"

---

## Need Help?

- **MongoDB Documentation**: https://docs.mongodb.com/
- **MongoDB Atlas Support**: https://support.mongodb.com/
- **Connection String Help**: https://docs.mongodb.com/manual/reference/connection-string/

**Quick Decision Guide:**
- ✅ **Just want to test?** → Use MongoDB Atlas (free tier, no installation)
- ✅ **Want local development?** → Install MongoDB Community Edition locally
- ✅ **Using Docker/containers?** → Use MongoDB Docker container
