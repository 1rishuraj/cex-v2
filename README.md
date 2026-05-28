# CEX Orderbook Platform

A TypeScript-based centralized exchange (CEX) platform with a distributed architecture. The backend and engine communicate asynchronously through Redis queues for high-performance order processing.

## Current Status

### ✅ Implemented
- **Authentication System**
  - Signup and signin logic
  - JWT-based authentication
  - Secure password hashing with bcrypt

### 📦 Tech Stack
- **Runtime**: TypeScript
- **Validation**: Zod
- **Database**: Prisma + Neon DB
- **Message Queue**: Redis
- **Architecture**: Backend + Engine (decoupled via queues)

## Getting Started

### Prerequisites
- Node.js
- Redis
- Neon Database

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file with:
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
```

### Development

```bash
npm run dev
```

## Architecture

```
┌─────────────┐     Redis Queue     ┌─────────────┐
│   Backend   │◄──────────────────►│   Engine    │
│  (REST API) │                     │ (Orderbook) │
└─────────────┘                     └─────────────┘
      ▲
      │ HTTP
      │
   Clients
```

## Roadmap

- [ ] Order matching engine
- [ ] WebSocket support
- [ ] Trading pairs management
- [ ] Market data aggregation
- [ ] Risk management & compliance

## License

MIT
