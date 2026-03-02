# SentraERP - Troubleshooting Guide

## 🔴 Blank White Screen Fix

### Issue: Application shows blank white screen

This typically happens due to one of these reasons:

### Quick Fix Steps:

#### 1. **Enable Development Mode** (Recommended for Testing)

Create or update `.env.local` file in the project root:

```bash
# .env.local
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_DEV_TOOLS=true
```

Then restart the dev server:
```bash
npm run dev
```

#### 2. **Check Console for Errors**

Open browser DevTools (F12) and check:
- Console tab for JavaScript errors
- Network tab for failed requests
- Application tab for localStorage issues

Common errors:
- `Cannot read property 'role' of null` → Authentication issue
- `Failed to fetch` → API connection issue
- `Unexpected token` → Build/transpilation issue

#### 3. **Clear Browser Storage**

Sometimes cached auth state causes issues:

```javascript
// Run in browser console:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

#### 4. **Verify Dependencies**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Start dev server
npm run dev
```

---

## 🚀 Development Mode Features

When `VITE_DEV_MODE=true` is set:

### ✅ Automatic Login Bypass
- **No authentication required**
- Auto-logged in as Admin User
- Full access to all modules
- Perfect for frontend development

### ✅ Visual Indicators
- Green "DEV MODE" badge in bottom-right corner
- User info displayed (Admin User - ADMIN)
- Login page shows dev mode banner
- Console logs dev mode status

### ✅ Mock User Details
```typescript
Username: admin
Email: admin@sentracore.com
First Name: Admin
Last Name: User
Role: ADMIN
Permissions: ['*'] (all permissions)
```

---

## 🔧 Common Issues & Solutions

### Issue 1: Still Redirecting to Login

**Cause**: Dev mode not properly enabled

**Solution**:
1. Check `.env.local` exists in project root
2. Verify `VITE_DEV_MODE=true` is set
3. Restart dev server completely (Ctrl+C, then `npm run dev`)
4. Clear browser cache and reload

### Issue 2: Components Not Rendering

**Cause**: JavaScript errors in components

**Solution**:
1. Check browser console for errors
2. Look for missing imports
3. Verify all route components exist
4. Check for TypeScript errors

### Issue 3: API Errors in Console

**Cause**: Backend not running or incorrect URL

**Solution**:
1. Ignore API errors in dev mode (mocked user is used)
2. Or update `VITE_API_BASE_URL` to your backend URL
3. Backend not required for frontend development in dev mode

### Issue 4: Routing 404 Errors

**Cause**: Route misconfiguration

**Solution**:
1. All routes have error boundaries now
2. 404 page will show if route doesn't exist
3. Check `src/router.tsx` for route definitions

---

## 📱 Testing Different User Roles

To test different roles, modify `src/store/authStore.ts`:

```typescript
const mockDevUser: AuthUser = {
  id: 1,
  username: 'admin',
  email: 'admin@sentracore.com',
  firstName: 'Admin',
  lastName: 'User',
  role: UserRole.ADMIN, // Change this
  permissions: ['*'],
};
```

Available roles:
- `UserRole.ADMIN` - Full access
- `UserRole.FINANCE` - Finance module only
- `UserRole.HR` - Human Capital module only
- `UserRole.OPERATIONS` - Operations & Projects
- `UserRole.COMPLIANCE` - Compliance & Risk
- `UserRole.SOC_ANALYST` - SOC dashboard
- `UserRole.CONSULTANT` - Client services
- `UserRole.ACCOUNT_MANAGER` - Client management

---

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```
Opens on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npm run type-check
```

---

## 🔍 Debugging Tips

### Enable Verbose Logging

In `src/store/authStore.ts`, add:
```typescript
console.log('Auth State:', { user, isAuthenticated, DEV_MODE });
```

### Check Router State

In browser console:
```javascript
// Check current route
window.location.pathname

// Check router state
window.__REACT_ROUTER_CONTEXT__
```

### React DevTools

Install React DevTools browser extension:
- Chrome: React Developer Tools
- Firefox: React DevTools

Features:
- Inspect component props/state
- View component tree
- Check Zustand store state

---

## 🚨 Production Checklist

**Before deploying to production:**

- [ ] Remove or disable `VITE_DEV_MODE`
- [ ] Update `VITE_API_BASE_URL` to production API
- [ ] Remove dev mode logs from code
- [ ] Test authentication flow
- [ ] Verify all API endpoints work
- [ ] Check error handling
- [ ] Test on multiple browsers
- [ ] Verify mobile responsiveness

---

## 📞 Getting Help

### Check These First:
1. Browser console (F12) for errors
2. Network tab for failed requests
3. This troubleshooting guide
4. README.md for setup instructions

### Common Error Messages:

**"404 Not Found"**
→ Route doesn't exist. Check sidebar navigation or URL.

**"Unexpected Application Error"**
→ Component error. Check error boundary page for details.

**"Cannot read property of undefined"**
→ Data structure mismatch. Check API response format.

---

## ✅ Verification Checklist

After following this guide, verify:

- [ ] Dev server starts without errors
- [ ] Login page loads (shows dev mode banner)
- [ ] Dashboard loads automatically
- [ ] Sidebar navigation works
- [ ] All modules are accessible
- [ ] Dev mode badge shows in bottom-right
- [ ] No console errors

---

## 🎯 Quick Start for New Developers

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Create `.env.local`**:
   ```
   VITE_DEV_MODE=true
   ```
4. **Start dev server**: `npm run dev`
5. **Open browser**: `http://localhost:5173`
6. **Should auto-login** → Navigate to dashboard

That's it! No backend required for frontend development.

---

**Last Updated**: January 2026  
**Version**: 2.1
