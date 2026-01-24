# Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
# Copy the example env file
copy .env.example .env

# Edit .env file and set your MongoDB URI
# Minimum required: MONGODB_URI and JWT_SECRET
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Start the Application

**Option 1: Run in separate terminals**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

**Option 2: Use the provided scripts (Windows)**

Run both servers at once (requires installing `concurrently`):
```bash
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

## 📋 Default Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🧪 Test Accounts

Create test accounts:

**Customer Account:**
1. Go to http://localhost:3000/signup/customer
2. Fill in the form
3. Login and access customer dashboard

**Seller Account:**
1. Go to http://localhost:3000/signup/seller
2. Fill in the form (don't forget to check the policy agreement)
3. Login and access seller dashboard

## 🎯 Quick Test Flow

1. **Start Both Servers**
2. **Open** http://localhost:3000 (redirects to login)
3. **Click** "Sign up as Customer" or "Sign up as Seller"
4. **Fill** the registration form
5. **Submit** and you'll be auto-logged in
6. **View** your dashboard

## ⚡ Common Issues

**Port already in use:**
```bash
# Change PORT in backend/.env
# Or kill the process using the port
```

**MongoDB connection error:**
```bash
# Make sure MongoDB is running
# Or update MONGODB_URI in .env
```

**Module not found:**
```bash
# Re-install dependencies
cd backend && npm install
cd ../frontend && npm install
```

## 📚 Full Documentation

See `SETUP_GUIDE.md` for complete documentation including:
- Detailed API endpoints
- Security features
- File structure
- Troubleshooting guide
- Next steps for extending the app
