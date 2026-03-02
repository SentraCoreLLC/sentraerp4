# 🚀 Development Mode - Quick Start

## Fixing Blank Screen & Bypassing Login

### The Problem
Your app shows a blank white screen because authentication is required but no backend is available.

### The Solution: Development Mode ✅

Development mode automatically logs you in as an Admin user, allowing you to develop and test the frontend without a backend.

---

## Quick Setup (2 minutes)

### Step 1: Create `.env.local`

In the project root folder, create a file named `.env.local`:

```bash
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:8000/api
```

### Step 2: Start the server

```bash
npm run dev
```

### Step 3: Open browser

Navigate to: `http://localhost:5173`

**✅ You should now see the dashboard!**

---

## What Development Mode Does

### 🎯 Auto-Login
- **Instantly logged in** as Admin User
- **No password required**
- **Full access** to all modules
- **Perfect for development**

### 👤 Mock User Details
```
Name: Admin User
Email: admin@sentracore.com
Role: ADMIN
Permissions: Full Access
```

### 🎨 Visual Indicators
1. **Green badge** in bottom-right corner showing "DEV MODE"
2. **User info** displayed below the badge
3. **Console message**: "🚀 DEV MODE: Auto-login as Admin"
4. **Login page banner** with quick access button

---

## Accessing Different Modules

With dev mode enabled, you have access to:

### ✅ Core Modules
- **Dashboard** - Main overview
- **Clients** - Client management
- **SOC** - Security operations center
- **Engagements** - Service delivery tracking
- **Training** - AI literacy & security training

### ✅ Operations
- **Projects** - Project management
- **Human Capital** - Employee management
- **Finance** - Invoice & payment tracking

### ✅ Governance
- **Compliance & Risk** - Framework management
- **Analytics** - BI dashboard

### ✅ Administration
- **Users** - User management (Admin only)

---

## Navigation Tips

### Sidebar Groups
The sidebar is organized into collapsible groups:

1. **Client Services** ▼
   - Clients
   - SOC
   - Engagements

2. **Operations** ▼
   - Projects
   - Human Capital
   - Training

3. **Governance** ▼
   - Compliance & Risk

Click the arrows to expand/collapse groups.

### Mobile Access
- Click the **hamburger menu** (☰) in top-left
- Sidebar slides in from left
- Touch-optimized for tablets and phones

---

## Testing Different Roles

Want to test as a different user role? Edit `src/store/authStore.ts`:

```typescript
// Line ~15
const mockDevUser: AuthUser = {
  id: 1,
  username: 'admin',
  email: 'admin@sentracore.com',
  firstName: 'Admin',
  lastName: 'User',
  role: UserRole.ADMIN, // ← Change this
  permissions: ['*'],
};
```

### Available Roles:
```typescript
UserRole.ADMIN          // Full access
UserRole.FINANCE        // Finance only
UserRole.HR             // Human Capital only
UserRole.OPERATIONS     // Operations & Projects
UserRole.COMPLIANCE     // Compliance & Risk
UserRole.SOC_ANALYST    // SOC Dashboard
UserRole.CONSULTANT     // Client services
UserRole.ACCOUNT_MANAGER // Client management
UserRole.TRAINER        // Training modules
```

After changing, restart the dev server.

---

## Troubleshooting

### Still seeing blank screen?

**1. Check `.env.local` exists**
```bash
ls -la .env.local
```
Should show the file exists in project root.

**2. Verify content**
```bash
cat .env.local
```
Should show: `VITE_DEV_MODE=true`

**3. Restart dev server**
```bash
# Stop server (Ctrl+C)
# Clear and reinstall
rm -rf node_modules .vite
npm install
npm run dev
```

**4. Clear browser cache**
- Open DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"

### API Errors in Console?

**Don't worry!** In dev mode, API calls will fail but the app still works because:
- Mock user is used instead of real authentication
- Frontend is fully functional
- Backend not required for development

### Still having issues?

Check the full troubleshooting guide:
```bash
cat TROUBLESHOOTING.md
```

Or open browser console (F12) and share the error messages.

---

## Disabling Development Mode

### For Production Deployment:

**Option 1**: Remove `.env.local` file
```bash
rm .env.local
```

**Option 2**: Change to false
```bash
# .env.local
VITE_DEV_MODE=false
```

**Option 3**: Use production environment variables
```bash
# .env.production
VITE_DEV_MODE=false
VITE_API_BASE_URL=https://your-api-domain.com/api
```

---

## Development Workflow

### Typical Day of Development:

1. **Morning**: Start dev server
   ```bash
   npm run dev
   ```

2. **Work**: Make changes to components
   - Files auto-reload on save
   - Check browser for updates
   - Use DevTools to inspect

3. **Testing**: Test different scenarios
   - Change user roles
   - Test responsive design
   - Check error handling

4. **Evening**: Commit changes
   ```bash
   git add .
   git commit -m "feat: added new feature"
   ```

### No Backend Needed! 🎉

You can develop the entire frontend without:
- ❌ Running Django backend
- ❌ Setting up databases
- ❌ Configuring authentication
- ❌ Mock API responses

Just pure frontend development!

---

## Keyboard Shortcuts

- **F12** - Open DevTools
- **Ctrl+Shift+R** - Hard reload (clear cache)
- **Ctrl+K** - Clear console
- **Esc** - Close dev mode banner (hover first)

---

## Next Steps

### After Getting It Running:

1. **Explore modules** - Click through all sidebar items
2. **Test responsive** - Resize browser window
3. **Check mobile** - Use DevTools device toolbar
4. **Read code** - Understand component structure
5. **Make changes** - Start building features!

### When Backend is Ready:

1. Update `VITE_API_BASE_URL` in `.env.local`
2. Set `VITE_DEV_MODE=false`
3. Test real authentication flow
4. Verify API integration

---

## 🎉 Success Indicators

You know it's working when you see:

✅ Dashboard loads immediately  
✅ No login prompt  
✅ Green "DEV MODE" badge in corner  
✅ All sidebar items accessible  
✅ No red errors in console  
✅ Smooth navigation between pages  

---

## Quick Commands Reference

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

**🚀 Happy Developing!**

For more details, see:
- `README.md` - Project overview
- `TROUBLESHOOTING.md` - Detailed fixes
- `FIXES_APPLIED.md` - Recent updates

---

**Last Updated**: January 2026  
**Status**: ✅ Fully Functional
