# Touchline

Touchline is a football management and competition platform built for fans who want control, not commentary. It enables users to create and manage teams, build dream lineups, and compete in structured auction-based leagues inside private lobbies.

Unlike preset fantasy systems, Touchline is strategy-first: every league is unique because squads are built through live auctions and drafts. Success depends on player valuation, squad construction, tactical balance, and league performance.

---

##  Features

- Create and manage football teams
- Build custom squads and lineups
- Join or host private lobbies with friends
- Conduct live player auctions and bidding sessions
- Draft players and build unique league rosters
- Compare squads and analyze team strength
- Organize custom leagues, formats, and seasons
- Strategy-driven gameplay focused on decision-making

---

## Tech Stack

- **Framework:** Next.js
- **Frontend:** React + Next.js UI rendering
- **Backend:** Next.js API Routes / Server Actions (depending on setup)
- **Database:** (Add your database here: PostgreSQL / MongoDB / Firebase etc.)
- **Auth:** (Add your auth method: NextAuth / Clerk / Firebase Auth etc.)
- **Real-Time Auctions:** (Add: WebSockets / Socket.io / Pusher etc.)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/touchline.git
cd touchline
````

Install dependencies:

```bash
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The app will be running on:

```
http://localhost:3000
```

---

## Build for Production

Build the project:

```bash
npm run build
```

Run production build:

```bash
npm start
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add the required values:

```env
NEXT_PUBLIC_APP_NAME=Touchline
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url_here

# Authentication (if used)
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Real-time auction system (if used)
SOCKET_SERVER_URL=http://localhost:4000
```

> Replace the values based on your actual stack and setup.

---

## Core Platform Modules

### 1. Teams

Users can create and manage football teams, set lineups, and build squads based on available players.

### 2. Private Lobbies

Friends can create private leagues with full control over league structure, rules, and participants.

### 3. Auctions & Drafts

Touchline leagues use live bidding systems where players are purchased through auctions, ensuring every squad is unique.

### 4. League Competition

Lobbies run competitive seasons where users compare squads, track performance, and compete for league dominance.

### 5. Squad Analysis

Users can compare teams, evaluate squad strength, and improve decision-making using performance and balance insights.

---

## Project Structure (Typical)

```bash
touchline/
│── app/                # Next.js App Router
│── components/         # UI components
│── lib/                # Utilities and helper functions
│── public/             # Static assets
│── styles/             # Global styles (if used)
│── prisma/             # Prisma schema (if using Prisma)
│── .env.local          # Environment variables
│── package.json
│── README.md
```

---

## Vision

Touchline is designed as a neutral, reliable football competition platform — where teams are built, leagues are run, and outcomes are decided purely by strategy and choices made on the touchline.

No gimmicks. No preset squads. Only smart decisions.

---

## Roadmap (Planned)

* Live auction room UI with real-time bidding updates
* Custom league rule configuration
* Player stats integration
* Advanced squad evaluation metrics
* Season history and league archives
* Match simulation / scoring system integration

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it.

---

## Touchline Summary

Touchline is not fantasy football.
It is football management competition — auction-based, strategy-driven, and built for serious decision-makers.
