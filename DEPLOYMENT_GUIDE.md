# 🚀 DEPLOYMENT GUIDE - Shield AI

## ⚡ QUICKEST OPTION: Vercel + Railway (5 minutes total)

### What You'll Get:
- **Frontend**: Live on Vercel (free)
- **Backend**: Live on Railway (free $5 credit)
- **Database**: Firebase (free tier) or MongoDB Atlas (free)
- **Custom Domain**: Optional

---

## STEP 1️⃣: Deploy Frontend to Vercel (2 minutes)

### 1. Go to Vercel
```
https://vercel.com
```

### 2. Sign Up
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub

### 3. Import Project
- Click "Add New..." → "Project"
- Find and select "Fraud-Certificate-detection"
- Click "Import"

### 4. Environment Variables
Vercel will ask for environment variables:

Leave blank for now (frontend doesn't need them):
```
VITE_API_URL=https://your-backend.railway.app
```

(We'll add this after deploying backend)

### 5. Deploy
- Click "Deploy"
- Wait 1-2 minutes
- Your frontend is live! 🎉

**Your URL will be**: `https://fraud-certificate-detection.vercel.app`

---

## STEP 2️⃣: Deploy Backend to Railway (3 minutes)

### 1. Go to Railway
```
https://railway.app
```

### 2. Sign Up
- Click "Start Project"
- Choose "GitHub"
- Authorize Railway
- Select "Fraud-Certificate-detection" repo

### 3. Create Service
- Click "Add Service" → "GitHub Repo"
- Select your repo
- Railway will auto-detect Node.js

### 4. Add Environment Variables
Railway will show a variables section. Add:

```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/shield-ai?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=production
CLIENT_URL=https://fraud-certificate-detection.vercel.app
```

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your backend is live! 🎉

**Your Backend URL**: Check Railway dashboard → Domain

---

## STEP 3️⃣: Update Frontend with Backend URL

### 1. Go to Vercel Settings
- Your project on Vercel
- Settings → Environment Variables

### 2. Add Backend URL
```
VITE_API_URL=https://your-railway-backend-url.railway.app
```

### 3. Redeploy
- Go to Deployments
- Click "Redeploy" on latest deployment

---

## STEP 4️⃣: Set Up Database (Choose One)

### Option A: Firebase (Easiest)
1. Go to https://console.firebase.google.com/
2. Create project
3. Enable Firestore + Authentication
4. Get credentials
5. Add to backend environment variables

See: FIREBASE_SETUP.md

### Option B: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account
3. Create free cluster
4. Get connection string
5. Add to Railway environment variables as `MONGODB_URI`

See: MONGODB_SETUP.md

---

## ✅ YOU'RE LIVE!

After these steps:
- ✅ Frontend: https://fraud-certificate-detection.vercel.app
- ✅ Backend: https://your-backend.railway.app
- ✅ Database: Firebase or MongoDB
- ✅ Everything connected

---

## TEST YOUR DEPLOYMENT

### Test Sign Up
```
1. Go to your Vercel URL
2. Click "Sign Up"
3. Create account with any email
4. Should work instantly!
```

### Test Login Tracking
```
1. Sign in
2. Go to /admin
3. See your login tracked in admin dashboard
```

---

## ALTERNATIVE: All-in-One with Railway

### If you prefer everything on one platform:

1. **Deploy Frontend to Railway**
   - Select your repo
   - Choose "Node.js"
   - Command: `npm run build && npm run preview`

2. **Deploy Backend to Railway**
   - Add another service
   - Command: `npm run server`
   - Port: 5000

3. **Connect Both**
   - Both services get unique Railway URLs
   - Update frontend with backend URL

---

## ADVANCED: Deploy with Docker

### Docker Deployment Steps:

1. **Create Dockerfile in root**
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 5000
   CMD ["npm", "run", "server"]
   ```

2. **Deploy to Railway**
   - Railway auto-detects Docker
   - Builds and deploys automatically

3. **Deploy to Other Platforms**
   - AWS ECS
   - Google Cloud Run
   - DigitalOcean App Platform

---

## CUSTOM DOMAIN (Optional)

### Add Custom Domain to Vercel
1. Vercel Dashboard → Project Settings
2. Domains
3. Add your domain (need to own it)
4. Update DNS records
5. Done!

---

## MONITORING & LOGS

### Vercel
- Deployments tab → View logs
- Real-time error tracking

### Railway
- Dashboard → your app → Logs
- View frontend and backend logs

---

## COMMON ISSUES & FIXES

### Issue: Frontend shows "Cannot reach backend"
**Fix:**
1. Copy your Railway backend URL
2. Go to Vercel → Environment Variables
3. Update `VITE_API_URL`
4. Redeploy frontend

### Issue: Database connection failed
**Fix:**
1. Check MongoDB connection string
2. Verify IP whitelist (MongoDB Atlas)
3. Restart Railway service

### Issue: CORS errors
**Fix:** Already configured in `server/server.js`
```javascript
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:8080" 
}));
```

### Issue: 404 on routes
**Fix:** Vercel routing for React:
1. Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

2. Commit and redeploy

---

## COMPLETE DEPLOYMENT CHECKLIST

- [ ] Frontend pushed to GitHub ✅ (Already done)
- [ ] Backend pushed to GitHub ✅ (Already done)
- [ ] Created Vercel account
- [ ] Deployed frontend to Vercel
- [ ] Got frontend URL
- [ ] Created Railway account
- [ ] Deployed backend to Railway
- [ ] Got backend URL
- [ ] Updated frontend with backend URL
- [ ] Verified frontend-backend connection
- [ ] Set up database (Firebase or MongoDB)
- [ ] Tested sign up on live site
- [ ] Tested login tracking on live site
- [ ] Added custom domain (optional)

---

## 🎉 DEPLOYMENT COMPLETE!

Your Shield AI authentication system is now live on the internet!

**Users can now:**
- Sign up from anywhere
- Login from anywhere
- Track their activities
- View admin dashboard

---

## NEXT: Production Best Practices

1. **Enable HTTPS** (Vercel & Railway do this auto)
2. **Set up monitoring** (Sentry, LogRocket)
3. **Add analytics** (Google Analytics)
4. **Configure backups** (MongoDB Atlas auto-backups)
5. **Set up alerts** (Railway notifications)
6. **Scale database** (If needed)

---

## SUPPORT & RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Firebase**: https://firebase.google.com/docs

---

**Your Shield AI is ready for the world!** 🚀
