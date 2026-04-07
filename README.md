# Bed Wars Stats Dashboard

A Next.js web app for viewing Hypixel Bed Wars statistics by player username.

## Features

- Search any Hypixel player by username
- View overall and per-mode stats (Solo, Doubles, Threes, Fours, 4v4)
- Displays key metrics: wins, losses, kills, deaths, final K/D ratio, beds broken/lost, win rate, and more
- Renders the player's Minecraft skin using a 3D skin viewer
- Dark-themed UI built with HeroUI and Tailwind CSS

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [HeroUI](https://www.heroui.com/) component library
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer-motion.com/)
- TypeScript

## APIs Used

- [Mojang API](https://api.mojang.com/) — resolves usernames to UUIDs and fetches skin data
- [Hypixel API](https://api.hypixel.net/) — retrieves player Bed Wars statistics

## Getting Started

### Prerequisites

- Node.js 18+
- A [Hypixel API key](https://developer.hypixel.net/)

### Installation

```bash
cd bed-wars-stats
npm install
```

### Environment Variables

Create a `.env.local` file in the `bed-wars-stats` directory:

```env
HYPIXEL_API_KEY=your_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bed-wars-stats/
├── app/
│   ├── api/
│   │   ├── hypixel/       # Hypixel API proxy routes
│   │   ├── playerSession/ # Mojang username → UUID lookup
│   │   └── playerUuid/    # Mojang UUID → profile/skin lookup
│   ├── player/[userName]/ # Player stats page
│   └── page.tsx           # Home / search page
├── components/
│   ├── bedwarsStatsTable.tsx
│   ├── minecraftSkinViewer.tsx
│   └── navbar.tsx
└── types/
    └── index.ts           # BedwarsProfile types and Hypixel API parser
```

## License

See [LICENSE](bed-wars-stats/LICENSE).
