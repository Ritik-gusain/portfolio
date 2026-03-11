// TEST_VISITOR_TRACKING.md

# Testing Visitor Tracking

## How to Test Locally

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to http://localhost:3000
   - Open Developer Console (F12)
   - Check the Console tab for any errors

3. **What happens automatically:**
   - A unique visitor ID is generated and stored in localStorage
   - Your IP, location, and device info are collected
   - Data is inserted into Supabase `visitors` table
   - Every 30 seconds, your page duration is updated
   - When you close the tab, final duration is saved

## How to View Data in Supabase

### Method 1: Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/jzjtssubsbxzzzibthve
2. Click "Table Editor" → "visitors"
3. You'll see all visitor records

### Method 2: SQL Query

In Supabase SQL Editor, run:

```sql
-- Get all visitors
SELECT * FROM visitors ORDER BY visited_at DESC;

-- Get visitor count
SELECT COUNT(*) as total_visitors FROM visitors;

-- Get visitors by country
SELECT country, COUNT(*) as count 
FROM visitors 
GROUP BY country 
ORDER BY count DESC;

-- Get average page duration
SELECT AVG(page_duration) as avg_duration_seconds 
FROM visitors;

-- Get today's visitors
SELECT * FROM visitors 
WHERE visited_at >= CURRENT_DATE 
ORDER BY visited_at DESC;
```

## What Data is Collected

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Auto-generated ID | 1, 2, 3... |
| `visitor_uuid` | Unique visitor identifier | "a1b2c3d4-..." |
| `ip_address` | Visitor's IP | "192.168.1.1" |
| `user_agent` | Browser/Device info | "Mozilla/5.0..." |
| `referrer` | Where they came from | "google.com" or "direct" |
| `country` | Country name | "India", "USA" |
| `city` | City name | "New Delhi", "New York" |
| `screen_resolution` | Screen size | "1920x1080" |
| `language` | Browser language | "en-US" |
| `timezone` | User's timezone | "Asia/Kolkata" |
| `visited_at` | Visit timestamp | "2024-01-15 10:30:00" |
| `page_duration` | Time spent (seconds) | 120 |

## Real-time Updates

The tracking updates every 30 seconds while the visitor is on your site:
- Initial visit: `page_duration = 0`
- After 30s: `page_duration = 30`
- After 1 min: `page_duration = 60`
- And so on...

## Privacy Note

The tracking is anonymous and only collects:
- ✅ Technical data (IP, browser, screen size)
- ✅ Geographic data (country, city)
- ✅ Behavioral data (time spent, referrer)
- ❌ NO personal information
- ❌ NO cookies (uses localStorage only)

## Troubleshooting

### If data is not appearing:

1. **Check Supabase connection:**
   - Verify `.env` variables are correct
   - Check Supabase project is active

2. **Check browser console:**
   - Look for any error messages
   - Verify API calls are being made

3. **Check Supabase RLS (Row Level Security):**
   - Go to Supabase → Authentication → Policies
   - Ensure INSERT policy allows anonymous users

4. **Test the connection:**
   ```javascript
   // Open browser console and run:
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
   console.log('Visitor ID:', localStorage.getItem('visitor_id'))
   ```

## Expected Behavior

✅ **First Visit:**
- New UUID generated
- Stored in localStorage
- Data inserted into database
- Duration starts at 0

✅ **Return Visit:**
- Same UUID retrieved from localStorage
- New visit record created
- Previous visits remain in database

✅ **Multiple Tabs:**
- Each tab tracks separately
- Same visitor UUID used
- Multiple duration updates

## Quick SQL Queries for Analytics

```sql
-- Total unique visitors
SELECT COUNT(DISTINCT visitor_uuid) as unique_visitors FROM visitors;

-- Visitors in last 24 hours
SELECT COUNT(*) FROM visitors 
WHERE visited_at > NOW() - INTERVAL '24 hours';

-- Top 5 countries
SELECT country, COUNT(*) as visits 
FROM visitors 
GROUP BY country 
ORDER BY visits DESC 
LIMIT 5;

-- Average session duration
SELECT 
  AVG(page_duration) as avg_seconds,
  AVG(page_duration) / 60 as avg_minutes
FROM visitors;

-- Visitors by hour (today)
SELECT 
  EXTRACT(HOUR FROM visited_at) as hour,
  COUNT(*) as visits
FROM visitors
WHERE visited_at >= CURRENT_DATE
GROUP BY hour
ORDER BY hour;
```

## Live Demo Test

1. Deploy to Vercel (already done ✅)
2. Visit your live site
3. Wait 1-2 minutes
4. Check Supabase dashboard
5. You should see your visit recorded!

---

**Need help?** Check the browser console for errors or verify your Supabase credentials.
