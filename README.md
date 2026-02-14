# DayCast Pub

Public blog site for DayCast — displays AI-generated posts published from the main app.

Built with React 19, TypeScript, Vite, and Framer Motion.

## Pages

- **Feed** — hero section + infinite scroll post feed. Sidebar with calendar heatmap and site stats. Channel filter pills. Shimmer loading skeletons. Light/dark mode.
- **Post** — full post view with channel badge, date, copy link button. Markdown-rendered content.
- **Archive** — monthly archive with post counts and site statistics.

## Features

- **Infinite scroll** — cursor-based pagination with IntersectionObserver.
- **Channel filters** — filter posts by channel (Blog, Diary, Telegram, Twitter/X). Input-based posts shown as "Personal".
- **Calendar heatmap** — 7-column grid showing days with published posts.
- **Design System V2** — synced with DayCast Web (Apple Premium + Futuristic + Warm). Glassmorphism header, gradient mesh background, glow effects on cards, spring animations via Framer Motion.
- **Dark mode** — CSS variables with `prefers-color-scheme` support. Full dark mode token set synced with web admin.
- **Two post types** — supports both AI-generated channel posts and directly published input items (shown with "Personal" label, nullable channel/style/language).
- **No authentication** — reads from the public API endpoints only.

## Tech Stack

- **React 19** with functional components and hooks
- **TypeScript**
- **Vite 6** — dev server and production builds
- **React Router 7** — client-side routing
- **Framer Motion 12** — spring physics animations
- **CSS** — Design System V2 with CSS variables, glassmorphism, glow effects

## Project Structure

```
daycast-pub/
├── src/
│   ├── api/client.ts         # API client (fetch, no auth)
│   ├── components/
│   │   ├── Layout.tsx        # Header + nav + footer
│   │   ├── PostCard.tsx      # Post card with hover effects
│   │   ├── Calendar.tsx      # Calendar heatmap grid
│   │   ├── ChannelFilter.tsx # Channel pill buttons
│   │   ├── ChannelIcon.tsx   # Gradient channel badges
│   │   ├── Footer.tsx        # Site footer
│   │   └── SEO.tsx           # Meta tags
│   ├── pages/
│   │   ├── Feed.tsx          # Main feed with sidebar
│   │   ├── Post.tsx          # Single post detail
│   │   └── Archive.tsx       # Monthly archive
│   ├── hooks/
│   │   ├── useInfiniteScroll.ts  # IntersectionObserver hook
│   │   └── usePosts.ts          # Posts pagination hook
│   ├── types/index.ts        # TypeScript types
│   ├── styles/globals.css    # Global styles, CSS variables, dark mode
│   ├── App.tsx               # Router setup
│   └── main.tsx              # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## API

Reads from the DayCast API public endpoints (no authentication required):

- `GET /api/v1/public/posts` — post feed (cursor pagination, channel/language/date filters)
- `GET /api/v1/public/posts/{slug}` — single post by slug
- `GET /api/v1/public/calendar?year=&month=` — calendar heatmap data
- `GET /api/v1/public/archive` — monthly archive
- `GET /api/v1/public/stats` — site statistics

## Development

```bash
npm install
npm run dev
```

Dev server runs on port 5174. Configure API URL in `.env` (see `.env.example`).

## Production

Hosted on the production Mac (192.168.31.131:3000) via `serve` static server, managed by launchd (`com.daycast.pub`).

```bash
npm run build
# dist/ is copied to /Users/andrewmaier/daycast/pub-dist/ on the Mac
```

## License

Private project.
