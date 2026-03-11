# Admin Dashboard Access

## How to View Your Visitor Analytics

I've created an admin dashboard component for you to view visitor statistics directly in your portfolio.

### Option 1: Add a Secret Route (Recommended)

1. Install React Router (if not already installed):
   ```bash
   npm install react-router-dom
   ```

2. Update `src/main.jsx`:
   ```jsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom'
   import AdminDashboard from './components/AdminDashboard'
   
   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<App />} />
           <Route path="/admin-secret-dashboard" element={<AdminDashboard />} />
         </Routes>
       </BrowserRouter>
     </React.StrictMode>,
   )
   ```

3. Access your dashboard at:
   - Local: `http://localhost:3000/admin-secret-dashboard`
   - Live: `https://your-site.vercel.app/admin-secret-dashboard`

### Option 2: Temporary Component (Quick Test)

Replace your `App.jsx` content temporarily with:
```jsx
import AdminDashboard from './components/AdminDashboard'

function App() {
  return <AdminDashboard />
}

export default App
```

Then run `npm run dev` and visit `http://localhost:3000`

**Remember to revert back to your original App.jsx after viewing!**

### Option 3: Use Supabase Dashboard (Easiest)

Just go to:
https://supabase.com/dashboard/project/jzjtssubsbxzzzibthve/editor

Click on "visitors" table to see all data.

## What You'll See in the Dashboard

📊 **Stats Cards:**
- Total Visitors
- Unique Visitors
- Today's Visitors
- Average Duration

🌍 **Top Countries:**
- Visual bar chart showing visitor distribution by country

👥 **Recent Visitors Table:**
- Location (City, Country)
- Device (Screen Resolution)
- Duration (Time spent)
- Visit Timestamp

## Quick Test

1. Visit your live site: https://your-portfolio.vercel.app
2. Wait 1-2 minutes
3. Check Supabase dashboard or your admin dashboard
4. You should see your visit recorded!

## SQL Queries for Quick Checks

Run these in Supabase SQL Editor:

```sql
-- See all visitors
SELECT * FROM visitors ORDER BY visited_at DESC LIMIT 10;

-- Count total visitors
SELECT COUNT(*) FROM visitors;

-- See today's visitors
SELECT * FROM visitors 
WHERE visited_at >= CURRENT_DATE;
```

---

**Pro Tip:** Bookmark your admin dashboard URL with a secret path that only you know!
