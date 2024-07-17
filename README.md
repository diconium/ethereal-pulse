# Ethereal Pulse

Ethereal Pulse is a platform that simplifies that way emails are built and delivered.

## Getting Started

### Prerequisites

- NodeJs - `v18.17.1` or `v20.3.0` or higher

### SDK integration

TBD

### Development

> [!IMPORTANT]
> To setup our project locally you will need the additional tools:
> - Pnpm - `8.6.12` or higher
> - Docker - for MongoDB connection

Install dependencies
```bash
pnpm install
```

Create `.env` and ask for credentials

```bash
cp .env.example .env
```

Start MongoDB container

```bash
docker compose -f "apps/server/docker-compose.yml" up -d --build
```

Spin up the apps

```bash
pnpm start
```

Open client in: `http://localhost:5173`
Open server in: `http://localhost:3000`

### Linting

To run ESLint in all projects:

```bash
pnpm lint
```

To run Prettier in all projects:
```bash
pnpm format
```
