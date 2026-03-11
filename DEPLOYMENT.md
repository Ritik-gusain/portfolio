# Deployment Guide

## Deploy to Vercel

### Quick Deploy (CLI)

1. Run the deployment command:
```bash
vercel
```

2. Follow the prompts:
   - Login to Vercel (if not already logged in)
   - Set up and deploy

3. Add environment variables in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

4. Redeploy after adding environment variables:
```bash
vercel --prod
```

### Deploy via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables in the deployment settings
6. Click "Deploy"

### Environment Variables

Make sure to add these in Vercel Dashboard:
- `VITE_SUPABASE_URL` = Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` = Your Supabase Anon Key
- `VITE_EMAILJS_SERVICE_ID` = Your EmailJS Service ID
- `VITE_EMAILJS_TEMPLATE_ID` = Your EmailJS Template ID
- `VITE_EMAILJS_PUBLIC_KEY` = Your EmailJS Public Key

### Build Settings (Auto-detected by Vercel)
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```
