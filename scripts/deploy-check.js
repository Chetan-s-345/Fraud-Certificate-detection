#!/usr/bin/env node

/**
 * Shield AI - Deployment Helper Script
 * This script helps verify your deployment setup and guides you through deployment
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║          🚀 SHIELD AI - DEPLOYMENT VERIFICATION 🚀            ║
╚════════════════════════════════════════════════════════════════╝
`);

// Check prerequisites
console.log('📋 Checking deployment prerequisites...\n');

const checks = [
  {
    name: 'Git Repository',
    check: () => fs.existsSync('.git'),
    message: '✅ Git initialized'
  },
  {
    name: 'Package.json',
    check: () => fs.existsSync('package.json'),
    message: '✅ package.json found'
  },
  {
    name: 'Frontend src folder',
    check: () => fs.existsSync('src'),
    message: '✅ Frontend source code present'
  },
  {
    name: 'Backend server folder',
    check: () => fs.existsSync('server'),
    message: '✅ Backend source code present'
  },
  {
    name: 'Environment variables',
    check: () => fs.existsSync('.env') || fs.existsSync('.env.example'),
    message: '✅ Environment configuration found'
  },
  {
    name: 'Vercel config',
    check: () => fs.existsSync('vercel.json'),
    message: '✅ Vercel configuration found'
  },
  {
    name: 'TypeScript config',
    check: () => fs.existsSync('tsconfig.json'),
    message: '✅ TypeScript configured'
  }
];

let allPassed = true;
checks.forEach(({ name, check, message }) => {
  if (check()) {
    console.log(message);
  } else {
    console.log(`❌ ${name} - NOT FOUND`);
    allPassed = false;
  }
});

console.log('\n');

if (allPassed) {
  console.log('✅ ALL CHECKS PASSED! Ready for deployment\n');
} else {
  console.log('⚠️  Some checks failed. See above.\n');
}

// Deployment options
console.log(`
╔════════════════════════════════════════════════════════════════╗
║                   DEPLOYMENT OPTIONS                          ║
╚════════════════════════════════════════════════════════════════╝

1️⃣  VERCEL (Frontend Only)
   └─ Time: 2 minutes
   └─ Cost: Free
   └─ Best for: Quick React deployment
   └─ URL: https://vercel.com

2️⃣  RAILWAY (Full Stack)
   └─ Time: 5 minutes
   └─ Cost: $5 credit/month (free)
   └─ Best for: Frontend + Backend together
   └─ URL: https://railway.app

3️⃣  NETLIFY (Frontend + Functions)
   └─ Time: 3 minutes
   └─ Cost: Free
   └─ Best for: Frontend with serverless backend
   └─ URL: https://netlify.com

4️⃣  HEROKU (Backend Only)
   └─ Time: 5 minutes
   └─ Cost: $5/month (paid)
   └─ Best for: Dedicated backend hosting
   └─ URL: https://heroku.com

📚 FOR DETAILED STEPS, READ: DEPLOYMENT_GUIDE.md
⚡ FOR QUICK START, READ: QUICK_DEPLOY.md
`);

// Quick commands
console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    USEFUL COMMANDS                            ║
╚════════════════════════════════════════════════════════════════╝

📦 Development:
   npm run dev              - Start frontend dev server
   npm run server          - Start backend server
   npm run dev:all         - Start both in parallel

🔨 Build:
   npm run build           - Build for production

🚀 Deployment:
   npm run build           - Build frontend
   git push origin main    - Push changes to GitHub
   
✅ Testing:
   npm test               - Run tests (if configured)

📝 Logs:
   Check DEPLOYMENT_GUIDE.md for monitoring setup
`);

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                   NEXT STEPS                                  ║
╚════════════════════════════════════════════════════════════════╝

1. Choose deployment platform (see options above)
2. Create account on chosen platform
3. Connect your GitHub repository
4. Set environment variables
5. Deploy!

📖 Follow QUICK_DEPLOY.md for step-by-step instructions
🆘 Need help? See DEPLOYMENT_GUIDE.md for detailed guide

💡 RECOMMENDED: Use Railway for full-stack deployment
   (Frontend + Backend on one platform)
`);
