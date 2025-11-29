# DPay - Digital Payment Solution

<p align="center">
  <img src="public/pwa-192.png" alt="DPay Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>Fast, Secure, and Modern Digital Payment PWA</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#scripts">Scripts</a>
</p>

---

## 🚀 Features

- **QR Code Payments** - Scan QR codes to make instant payments
- **Wallet Management** - Connect and manage multiple wallets
- **Transaction History** - View detailed transaction records
- **Rewards Program** - Earn points for every payment and climb the leaderboard
- **PWA Support** - Install as a native app on mobile devices
- **Multi-Chain Support** - Built on Somnia blockchain
- **Secure Authentication** - Powered by Privy for seamless Web3 auth

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query |
| **Web3** | Wagmi + Viem |
| **Authentication** | Privy |
| **Routing** | React Router v7 |
| **UI Components** | Radix UI + Framer Motion |
| **Code Quality** | ESLint + Prettier |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/daslabs/dpay.git
cd dpay
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_PRIVY_CLIENT_ID=your_privy_client_id
VITE_TOKEN_CONTRACT_ADDRESS=0x...
VITE_TRANSFER_CONTRACT_ADDRESS=0x...
VITE_SOMNIA_CHAIN_ID=50312
VITE_SOMNIA_RPC_URL=https://dream-rpc.somnia.network
VITE_SOMNIA_EXPLORER_URL=https://somnia-devnet.socialscan.io
VITE_API_URL=https://api.dpay.com
```

4. **Start development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to `http://localhost:5173`

## 📁 Project Structure

```
dpay/
├── public/                 # Static assets
├── src/
│   ├── abis/              # Smart contract ABIs
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable UI components
│   │   ├── home/          # Home page components
│   │   ├── popup/         # Modal/Drawer components
│   │   ├── profile/       # Profile page components
│   │   ├── scan/          # QR Scanner components
│   │   └── shared/        # Shared components (Button, Drawer, etc.)
│   ├── configs/           # App configuration
│   ├── hooks/             # Custom React hooks
│   ├── libs/              # Utility functions & helpers
│   ├── pages/             # Page components
│   ├── providers/         # Context providers
│   ├── routes/            # Route definitions
│   ├── services/          # API services
│   ├── stores/            # Zustand stores
│   ├── App.tsx            # Root component
│   ├── App.css            # Global styles
│   └── main.tsx           # Entry point
├── .env.example           # Environment variables template
├── index.html             # HTML entry
├── manifest.json          # PWA manifest
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies & scripts
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |

## 🔧 Configuration

### Wagmi Config

The app is configured to work with Somnia blockchain. Chain configuration can be found in `src/configs/wagmi-config.ts`.

### Privy Authentication

Privy is used for wallet connection and authentication. Configure your Privy app ID in the environment variables.

## 📱 PWA Installation

DPay supports Progressive Web App (PWA) installation:

### Android / Desktop Chrome
1. Visit the app in Chrome
2. Click "Install" when prompted or use the menu → "Install App"

### iOS Safari
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

## 🏗 Building for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment.

## 🚢 Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3**: Upload `dist/` to S3 bucket
- **Docker**: Use the provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by [Daslabs](https://daslabs.io)

---

<p align="center">
  <sub>© 2025 DPay. All rights reserved.</sub>
</p>