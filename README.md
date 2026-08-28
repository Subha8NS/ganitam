# Ganitam

Vedic Maths learning app for kids — **Hindi + English**, light mode, glassmorphic UI with animations.

## Run locally

```bash
cd ganitam
npm install
npm run dev
```

Opens at **http://localhost:3470**

## Features

- 6 Vedic techniques with pros (EN/HI)
- Why Vedic? panels, Regular vs Vedic comparison
- Guided step-by-step practice with pro tips
- Speed rounds, daily challenge, progress & streaks
- Light mode glassmorphic 3D UI with Framer Motion animations

## Stack

- React 19 + Vite
- Framer Motion
- No backend — progress saved in localStorage

## Publish (GitHub + Vercel)

### 1. Push to GitHub

Create a new empty repo at https://github.com/new named `ganitam`, then run:

```bash
cd ganitam
git remote add origin https://github.com/YOUR_USERNAME/ganitam.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. **Add New Project** → import `ganitam`
3. Settings (auto-detected for Vite):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**

Your app will be live at a URL like `https://ganitam.vercel.app`. Every push to `main` redeploys automatically.
