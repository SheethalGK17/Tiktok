# TikTok Player Intern Task

A mobile-first React + Vite app that recreates a TikTok-style short-video experience. The project focuses on smooth vertical swiping, responsive playback controls, and a polished UI that feels close to a real social media feed while still staying lightweight and easy to run locally.

## Overview

This project is built as a single-page application with a phone-sized layout. The main experience is a full-screen vertical video feed, but the app also includes supporting product-style screens such as Search, Add, Inbox, and Profile to make the prototype feel more complete.

The feed uses bundled local MP4 files from `public/videos`, so the app does not depend on third-party video hosts at runtime.

## Tech Stack

- React 18
- Vite 5
- Plain CSS
- Local static video assets in `public/videos`
- Netlify configuration for SPA deployment

## Main Features

- Full-screen vertical scrolling feed with `scroll-snap`
- TikTok-style `Following` and `For You` top tabs
- Bottom navigation for Home, Search, Add, Inbox, and Profile
- Auto-play for the active video and auto-pause for inactive videos
- Tap to play or pause
- Double tap to like with animated heart feedback
- Long press to pause and release to resume
- Shared mute and unmute toggle across the feed
- Progress bar for each video
- Action bar with like, comment, share, save, and follow actions
- Expandable caption and music metadata overlay
- Loading skeleton while media is starting
- Keyboard controls with `ArrowUp`, `ArrowDown`, and `Space`
- Infinite-feeling feed loop using a tripled video list with automatic recentering
- Light and dark theme support

## Screens Included

- `Home`: the main TikTok-style video feed
- `Search`: search suggestions, trending topics, and discovery content
- `Add`: upload and draft-oriented creation screen mock
- `Inbox`: notifications, followers, and creator update sections
- `Profile`: editable personal information, highlights, saved collections, and creator insights

## How The Feed Works

The main feed is powered by `src/components/VideoFeed.jsx`. To create a seamless loop, the app repeats the source video list three times and starts the user in the middle copy. When scrolling gets too close to either end, the feed silently recenters to the matching item in the middle set. This keeps the swipe experience feeling continuous without needing an endless server-backed data source.

Each card is rendered through `src/components/VideoCard.jsx`, where playback state, gesture handling, loading behavior, and progress tracking are managed.

## Project Structure

- `src/App.jsx`: top-level shell, page navigation, theme state, and mock data for non-feed screens
- `src/components/VideoFeed.jsx`: looping feed logic, active item tracking, keyboard navigation, and interaction state
- `src/components/VideoCard.jsx`: per-video playback, gestures, loading state, and overlays
- `src/components/ActionBar.jsx`: social action controls
- `src/components/UserOverlay.jsx`: username, caption, and music details
- `src/components/HeaderNav.jsx`: top tab switcher and theme toggle
- `src/components/BottomNav.jsx`: bottom app navigation
- `src/components/LoadingSkeleton.jsx`: loading placeholder shown before video is ready
- `src/data/videos.js`: video metadata and local source mapping
- `src/styles.css`: full application styling and theme variables
- `public/videos/`: local MP4 files used by the feed
- `netlify.toml`: build, redirect, and cache settings for deployment

## Local Video Setup

The app currently reuses four local MP4 files:

- `public/videos/whatsapp-1.mp4`
- `public/videos/whatsapp-2.mp4`
- `public/videos/whatsapp-3.mp4`
- `public/videos/whatsapp-4.mp4`

Those files are mapped in `src/data/videos.js` and reused across at least 15 feed entries so the UI can demonstrate a larger content stack without requiring 15 separate video files.

If you want to swap in your own footage:

1. Replace or add files inside `public/videos/`
2. Update the `localVideoSources` array in `src/data/videos.js`
3. Adjust the `videoItems` metadata as needed

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the production bundle:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Deployment Notes

- `netlify.toml` is already configured for SPA routing, so all routes redirect to `index.html`
- Static assets under `/videos/*` and `/assets/*` are served with long cache headers
- The production output is generated in `dist/`

## Accessibility And Interaction Notes

- Keyboard navigation is supported on the feed
- Buttons use clear labels for major actions
- Videos are muted through app state so the mute toggle is consistent across cards
- The layout is optimized for a mobile viewport but still runs in desktop browsers

## Possible Improvements

- Add real API-backed feed data instead of static metadata
- Persist likes, saves, and profile edits in local storage or a backend
- Add upload support instead of mock creation flows
- Introduce tests for feed behavior and gesture interactions
- Improve accessibility further with captions, focus styling review, and reduced-motion handling

## Current Status

This repository is a polished front-end prototype intended for an internship-style evaluation task. It demonstrates interaction design, state handling, reusable React components, and deployment-ready static app structure.
