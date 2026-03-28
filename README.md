# TikTok Player Intern Task

A mobile-first React + Vite single-page app that recreates a TikTok-style vertical video experience for the CMRIT internship task.

## Included Features

- Full-screen vertical video feed with `scroll-snap`
- Minimum 15 videos backed by structured data
- Auto-play for the active video and auto-pause for all others
- Tap to play/pause with center feedback icon
- Bottom progress bar
- Right-side action bar with like, comment, share, save, and follow
- Bottom-left user info overlay with expandable caption
- Spinning music disc
- Global mute / unmute toggle
- Double tap to like with heart burst animation
- Long press to pause and release to resume
- Dark mode toggle
- Keyboard controls: `ArrowUp`, `ArrowDown`, `Space`
- Looping feed using a tripled list and automatic recentring
- Loading skeleton for video startup

## Project Structure

- `src/App.jsx`: overall shell and theme state
- `src/components/VideoFeed.jsx`: feed looping, active index, keyboard navigation, shared state
- `src/components/VideoCard.jsx`: playback, gestures, progress bar, overlays
- `src/components/ActionBar.jsx`: right-side actions
- `src/components/UserOverlay.jsx`: username, caption, music metadata
- `src/components/HeaderNav.jsx`: top feed tabs and dark mode toggle
- `src/components/BottomNav.jsx`: bottom navigation
- `src/data/videos.js`: video metadata list

## Run Locally

1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Build with `npm run build`

## Notes

- Public sample MP4 URLs are used so the app can run without bundling local video assets.
- This workspace did not have a usable Node runtime in the current shell, so the code was scaffolded directly and not executed here.
