# GExchange

**GExchange** is a **hybrid decentralized exchange (Dcex)** that currently supports **Git-based authentication** and **token swapping** between **SOL, USDC, and USDT**.

## Features

- **Git Provider Authentication**
  - Users sign in using their Git provider.
  - Upon authentication, a **Solana keypair** is generated and stored securely in **PostgreSQL** for future use.

- **Token Swapping**
  - Users can swap between **SOL, USDC, and USDT** directly from their wallets.
  - The platform fetches **USD balances** and **current exchange rates** from on-chain data.

## Architecture

GExchange consists of three main components:

### 1. Backend Services (Node.js)
- **Auth Service**: Handles user authentication via Git providers.
- **User Service**: Generates and manages **Solana keypairs**, storing them in **PostgreSQL**.

### 2. Frontend (Next.js)
- The frontend interacts with backend services and the blockchain.
- It also exposes two API endpoints:
  - **`/api/tokens?address={}`** → Fetches token balances and USD values for a given Solana wallet address.
  - **`/api/swap`** → Allows users to swap tokens between **SOL, USDC, and USDT**.

### 3. Database
- **PostgreSQL** is used to store user metadata and Solana keypairs.

## API Endpoints

Since **GExchange is a SaaS app**, APIs are **not publicly exposed** for external developers. The backend and frontend handle all necessary operations internally.

## Current Limitations
- **Limited Scalability**: Designed for a controlled user base.
- **Feature Scope**: Currently supports only authentication and token swapping.

## Getting Started

For internal deployment or testing, ensure you have:
- **Node.js 18+**
- **PostgreSQL**
- **Next.js (Frontend)**

## Future Enhancements
- **Additional Authentication Methods**
- **More Token Support**
- **On-Chain Order Book**
