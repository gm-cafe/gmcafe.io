# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Production build
npm run lint      # Run ESLint
npm run abi       # Regenerate smart contract ABIs from Etherscan (requires ETHERSCAN_API_KEY env var)
```

## Architecture

This is a Next.js 16 App Router project for the **Good Morning Café (gmcafe)** NFT collection on Ethereum mainnet.

### Directory Structure

- `app/` — Next.js App Router pages and layouts
  - `layout.tsx` — Root layout; renders `<Navigation>` and wraps children in `<Providers>`
  - `providers.tsx` — Client component wrapping `WagmiProvider` + `QueryClientProvider`
- `src/components/` — Shared React components
- `src/wagmi/` — Blockchain configuration
  - `config.ts` — Wagmi config (mainnet only, HTTP transport)
  - `generated.ts` — Auto-generated contract ABIs and typed hooks (do not edit manually)

### Web3 / Blockchain Layer

- **Wagmi v3** provides React hooks for Ethereum contract interactions
- **React Query v5** handles async data fetching and caching
- Two contracts configured in `wagmi.config.ts`:
  - **GMOO** — `0xE43D741e21d8Bf30545A88c46e4FF5681518eBad`
  - **KEEK** — `0x01298589d7c2bD82f54Ca84060d58967772123F2`
- Run `npm run abi` after changing `wagmi.config.ts` to regenerate `src/wagmi/generated.ts`

### Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (new v4 PostCSS engine — no `tailwind.config.js`)
- Custom theme colors (pink, purple, etc.) and a custom `gmcafe` font are defined in `app/globals.css`
- Custom cursor assets are in `public/cursor/` and applied via `cursor/trail.js` loaded in the root layout

### Planned Routes

Most routes are not yet implemented. The navigation references:
- `/` — Home
- `/dashboard` — Dashboard
- `/traits` — Traits
- `/banners` — Banners
- `/#faq`, `/#team` — Anchor sections on home page

## Code Style

ESLint enforces:
- 2-space indentation
- Single quotes
- TypeScript strict mode

Path alias `@/*` resolves to the repository root.
