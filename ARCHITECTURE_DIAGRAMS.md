# Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                           │
│                  (React + TypeScript)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Pages:                                             │   │
│  │  - Home                   ────────────────┐         │   │
│  │  - SignIn                 ────────────────┼──┐      │   │
│  │  - SignUp                 ────────────────┤  │      │   │
│  │  - Certificates           ────────────────┤  │      │   │
│  │  - NotFound                                │  │      │   │
│  │                                            │  │      │   │
│  │  Components:                               │  │      │   │
│  │  - Navbar (updated)       ◄─────┐         │  │      │   │
│  │  - All UI Components      ◄─────┼────┐   │  │      │   │
│  │                                   │    │   │  │      │   │
│  │  AuthContext          ────────────┼────┼───┤  │      │   │
│  │  └─ useAuth()         ────────────┘    │   │  │      │   │
│  │                                        │   │  │      │   │
│  └────────────────────────────────────────┼───┼──┘      │   │
│                                            │   │          │   │
│  HTTP Requests / JWT Tokens ───────────────┼───┘          │   │
│                                            │               │   │
└────────────────────────────────────────────┼───────────────┘   │
                                             │
                          ┌──────────────────┼──────────────────┐
                          │                  │                  │
                          ▼                  ▼                  ▼
                   ┌─────────────┐   ┌──────────────┐   ┌────────────────┐
                   │  FRONTEND   │   │  BACKEND     │   │  DATABASE      │
                   │  API CLIENT │───│  EXPRESS.JS  │───│  MONGODB       │
                   │  (Axios)    │   │  SERVER      │   │  (Local/Atlas) │
                   └─────────────┘   └──────────────┘   └────────────────┘
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                         ┌──────────▼──────────┐      │
                         │  Routes:            │      │
                         │  - /api/auth/signup │      │
                         │  - /api/auth/signin │      │
                         │  - /api/auth/me     │      │
                         │  - /api/auth/certs  │      │
                         └─────────────────────┘      │
                                                       │
                         ┌─────────────────────┐      │
                         │  Middleware:        │      │
                         │  - CORS             │      │
                         │  - JWT Verify       │      │
                         │  - Error Handler    │      │
                         └─────────────────────┘      │
                                                       │
                         ┌──────────────────────────┐ │
                         │  Models:                 │ │
                         │  - User (DB operations) ◄─┘
                         │  - Password hashing     │
                         │  - Token generation     │
                         └──────────────────────────┘
```

---

## Sign Up Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                          User                                    │
│                                                                  │
│     Visits /signup                                               │
│            │                                                     │
│            ▼                                                     │
│     ┌─────────────────┐                                          │
│     │  SignUp Form    │                                          │
│     │  - Name         │                                          │
│     │  - Email        │◄─── Frontend Validation                  │
│     │  - Password     │     (Type, Length, Match)               │
│     │  - Confirm Pwd  │                                          │
│     └────────┬────────┘                                          │
│              │ Click "Create Account"                            │
│              ▼                                                     │
│     ┌─────────────────────────────────────────┐                  │
│     │  POST /api/auth/signup                  │                  │
│     │  {                                      │                  │
│     │    name, email, password                │                  │
│     │  }                                      │                  │
│     └────────┬────────────────────────────────┘                  │
│              │                                                    │
│              ├─────────────────────────────────┐                  │
│              ▼                                 ▼                  │
│        Backend Processing            Database (MongoDB)           │
│        - Validate input              - Check email exists?        │
│        - Hash password               - Create user doc            │
│        - User creation request       - Store hashed password      │
│                                      - Store name, email          │
│              ◄────────────────────────────┘                       │
│              │                                                    │
│              ▼                                                    │
│     Response: 201 Created                                         │
│     "User created. Please sign in"                                │
│              │                                                    │
│              ▼                                                    │
│     ┌─────────────────┐                                           │
│     │ Redirect to     │                                           │
│     │ /signin         │                                           │
│     └─────────────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Sign In & Certificate Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        User                                       │
│                                                                   │
│  1. Sign In                                                       │
│     │                                                             │
│     ▼                                                             │
│  ┌──────────────┐         ┌──────────────────┐                   │
│  │ SignIn Form  │────────▶│ Validate & POST  │                   │
│  │ Email/Pwd    │         │ /api/auth/signin │                   │
│  └──────────────┘         └────────┬─────────┘                   │
│                                    │                             │
│                    ┌───────────────┼───────────────┐             │
│                    ▼               ▼               ▼             │
│            Backend checks:   Encrypt check:   Database:         │
│            - User exists?    - Password       - Find by email    │
│            - Valid creds?      match?         - Compare hash     │
│                                               - SUCCESS          │
│                    │               │               │             │
│                    └───────────────┼───────────────┘             │
│                                    ▼                             │
│                     ┌─────────────────────────┐                  │
│                     │ Generate JWT Token      │                  │
│                     │ (expires in 7 days)     │                  │
│                     └────────────┬────────────┘                  │
│                                  │                              │
│                                  ▼                              │
│               Response: 200 OK                                   │
│               {                                                  │
│                 token: "eyJhbGc...",                             │
│                 user: {...}                                     │
│               }                                                  │
│                    │                                             │
│                    ▼                                             │
│         localStorage.setItem('token', token)                     │
│         AuthContext.user = userData                              │
│         Navbar shows: [User Name] [Logout]                       │
│                                                                  │
│  2. View Certificates                                            │
│     │                                                            │
│     ▼                                                            │
│  ┌─────────────────────┐                                        │
│  │ Click "My Certs"    │                                        │
│  │ in User Menu        │                                        │
│  └──────────┬──────────┘                                        │
│             │                                                   │
│             ▼                                                   │
│  ┌──────────────────────────────┐                               │
│  │ Certificates Page             │                               │
│  │ Upload Form:                  │                               │
│  │ - Certificate Name            │                               │
│  │ - File Picker (PDF/JPG/PNG)   │                               │
│  └──────────┬───────────────────┘                               │
│             │                                                   │
│             ▼                                                   │
│  POST /api/auth/certificates                                    │
│  Header: Authorization: Bearer <token>                          │
│  Body: {                                                        │
│    certificateName: "AWS Solutions",                            │
│    certificateDetails: {                                        │
│      fileName: "cert.pdf",                                      │
│      fileSize: 102400,                                          │
│      mimeType: "application/pdf"                                │
│    }                                                            │
│  }                                                              │
│             │                                                   │
│             ▼                                                   │
│  ┌─────────────────────────┐                                    │
│  │ Backend: Verify Token   │                                    │
│  │ Extract userId from JWT │                                    │
│  └────────────┬────────────┘                                    │
│               │                                                 │
│               ▼                                                 │
│  ┌──────────────────────────────┐                               │
│  │ MongoDB: Update User Doc      │                               │
│  │ - Push to certificates array  │                               │
│  │ - Add verifiedAt timestamp    │                               │
│  │ - Save to database            │                               │
│  └────────────┬─────────────────┘                               │
│               │                                                 │
│               ▼                                                 │
│  Response: 201 Created                                          │
│  "Certificate verified & stored"                                │
│               │                                                 │
│               ▼                                                 │
│  ┌─────────────────────────┐                                    │
│  │ Show in Certificates    │                                    │
│  │ List with timestamp     │                                    │
│  └─────────────────────────┘                                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Logout Flow

```
┌─────────────────────────────────────────────────────┐
│              User Clicks Logout                     │
│                                                    │
│     ┌─────────────────────────────────┐            │
│     │ Logout Button in User Menu      │            │
│     └────────────┬────────────────────┘            │
│                  │                                 │
│                  ▼                                 │
│     ┌──────────────────────────┐                   │
│     │ useAuth().logout()       │                   │
│     │ - Clear token            │                   │
│     │ - Clear user state       │                   │
│     │ - localStorage.remove()  │                   │
│     └────────────┬─────────────┘                   │
│                  │                                 │
│                  ▼                                 │
│     ┌──────────────────────────┐                   │
│     │ Navbar Re-renders:       │                   │
│     │ - Shows "Sign In" button │                   │
│     │ - Shows "Sign Up" button │                   │
│     │ - Hides user menu        │                   │
│     └────────────┬─────────────┘                   │
│                  │                                 │
│                  ▼                                 │
│     ┌──────────────────────────┐                   │
│     │ Navigate to Home (/)     │                   │
│     └──────────────────────────┘                   │
│                                                    │
│  ✅ Logout complete                                │
│     User is now anonymous                         │
│                                                    │
└─────────────────────────────────────────────────────┘
```

---

## Data Flow: AuthContext

```
┌─────────────────────────────────────────────┐
│            React Components                  │
│  (SignIn, SignUp, Navbar, Certificates)    │
│            │              │                 │
└────────────┼──────────────┼─────────────────┘
             │              │
             ▼              ▼
         useAuth()    useAuth()
             │              │
             └──────┬───────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │   AuthContext Provider  │
        │                         │
        │  State:                 │
        │  - user                 │
        │  - token                │
        │  - loading              │
        │  - error                │
        │                         │
        │  Methods:               │
        │  - signup()   ┐         │
        │  - signin()   ├─ API calls
        │  - logout()   │   to backend
        │  - verify...  │         │
        │               ┘         │
        │                         │
        └────────────┬────────────┘
                     │
                     ▼
            ┌────────────────┐
            │ localStorage   │
            │ (JWT Token)    │
            └────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │ Axios API      │
            │ Requests to    │
            │ Backend        │
            └────────────────┘
```

---

## Database Schema

```
MongoDB: shield-ai
└── Collection: users
    └── Document:
        {
          _id: ObjectId("..."),
          name: "John Doe",
          email: "john@example.com",
          password: "$2a$10$...",  // bcrypt hash
          createdAt: ISODate("2024-01-15T10:30:00Z"),
          certificates: [
            {
              name: "AWS Solutions Architect",
              details: {
                fileName: "aws-cert.pdf",
                fileSize: 1024000,
                mimeType: "application/pdf"
              },
              verifiedAt: ISODate("2024-01-16T14:20:00Z")
            },
            {
              name: "Google Cloud Engineer",
              details: {
                fileName: "gcp-cert.png",
                fileSize: 512000,
                mimeType: "image/png"
              },
              verifiedAt: ISODate("2024-01-17T09:15:00Z")
            }
          ]
        }
```

---

## Security Flow: Token Management

```
┌──────────────────────────────────────────────────────────┐
│                    Login                                 │
│                                                          │
│  Credentials Valid?                                      │
│        │                                                 │
│        ▼                                                 │
│  ┌──────────────────────────────┐                        │
│  │ Generate JWT Token           │                        │
│  │ - Header: {alg, typ}         │                        │
│  │ - Payload: {id, email, iat}  │                        │
│  │ - Signature: HMACSHA256(...)│                        │
│  └────────────┬─────────────────┘                        │
│               │                                          │
│               ▼                                          │
│  ┌──────────────────────────────┐                        │
│  │ Send to Frontend             │                        │
│  │ {token: "eyJhbGc..."}        │                        │
│  └────────────┬─────────────────┘                        │
│               │                                          │
│               ▼                                          │
│  ┌──────────────────────────────┐                        │
│  │ Store in localStorage        │                        │
│  │ localStorage.token           │                        │
│  └────────────┬─────────────────┘                        │
│               │                                          │
│  Subsequent API Requests:                                │
│               │                                          │
│               ▼                                          │
│  ┌──────────────────────────────┐                        │
│  │ Send Token in Header         │                        │
│  │ Authorization: Bearer <token>│                        │
│  └────────────┬─────────────────┘                        │
│               │                                          │
│               ▼                                          │
│  ┌──────────────────────────────┐                        │
│  │ Backend verifies:            │                        │
│  │ - Token exists?              │                        │
│  │ - Not expired?               │                        │
│  │ - Signature valid?           │                        │
│  └────────────┬─────────────────┘                        │
│               │                                          │
│       ┌───────┴────────┐                                 │
│       │                │                                 │
│  ✅ Valid         ❌ Invalid                              │
│       │                │                                 │
│       ▼                ▼                                 │
│  Allow Access     Reject (401)                           │
│  Extract userId   Return error                           │
│  Process request  Client re-login                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.tsx
├── AuthProvider
│   ├── TooltipProvider
│   ├── BrowserRouter
│   │   ├── Route: / 
│   │   │   └── Index.tsx
│   │   │       ├── Navbar.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── HowItWorksSection.tsx
│   │   │       ├── FeaturesSection.tsx
│   │   │       ├── DemoSection.tsx
│   │   │       ├── ResultsSection.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── UploadSection.tsx
│   │   │       └── Footer.tsx
│   │   ├── Route: /signin
│   │   │   └── SignIn.tsx (uses useAuth)
│   │   ├── Route: /signup
│   │   │   └── SignUp.tsx (uses useAuth)
│   │   ├── Route: /certificates
│   │   │   ├── Navbar.tsx
│   │   │   └── Certificates.tsx (uses useAuth)
│   │   └── Route: *
│   │       └── NotFound.tsx
│   ├── Toaster
│   └── Sonner
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Secure authentication flow
- ✅ Persistent session management
- ✅ Easy certificate storage
- ✅ Scalable API design
