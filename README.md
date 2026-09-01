# Global Gastronomy Guide

<p align="center">
  <img src="src/app/favicon.ico" alt="Worldwide Recipes Logo" width="120" />
</p>

<p align="center">
  <b>Discover authentic recipes from every corner of the globe.</b>
</p>

<p align="center">
  <a href="https://github.com/Tienhuynh9258/worldwide-recipes-web/actions/workflows/test.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/Tienhuynh9258/worldwide-recipes-web/test.yml?branch=master&style=for-the-badge&logo=github&label=CI" alt="CI Status" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-15.2.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <br />
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge" alt="shadcn/ui" />
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </a>
  <a href="https://genkit.dev/">
    <img src="https://img.shields.io/badge/Genkit-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Genkit AI" />
  </a>
  <a href="https://www.cypress.io/">
    <img src="https://img.shields.io/badge/Cypress-14.4-69D3A7?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [AI-Powered Features](#ai-powered-features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Global Gastronomy Guide** is a modern, responsive web application that lets users explore and discover authentic recipes from around the world. Built with performance and user experience in mind, the app features advanced search capabilities — including voice and image search powered by AI — alongside rich filtering options by region, country, ingredients, and cooking time.

Whether you're craving Italian pasta, Japanese sushi, or Mexican tacos, this app brings world cuisine to your fingertips.

---

## Features

| Feature | Description |
|---------|-------------|
| **Global Recipe Discovery** | Browse a curated collection of recipes from diverse regions and countries worldwide. |
| **Smart Filtering** | Filter recipes by region, country, ingredients, and cooking time to find exactly what you need. |
| **Text Search** | Quickly search for recipes by name with an intuitive search bar. |
| **Voice Search** | Search for recipes using your voice, powered by AI speech recognition. |
| **Image Search** | Upload a photo of a dish and find matching recipes using AI image analysis. |
| **Recipe Details** | View step-by-step instructions, ingredient lists with photos, prep/cook times, servings, and dietary tags. |
| **Related Recipes** | Discover similar recipes based on region, country, and ingredient overlap. |
| **Dark Mode** | Seamlessly toggle between light and dark themes for comfortable browsing any time of day. |
| **Responsive Design** | Fully optimized for desktop, tablet, and mobile devices. |
| **Static Site Generation** | Recipe pages are statically generated at build time for blazing-fast load speeds. |

---

## Tech Stack

### Framework & Language

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.2.3 | React framework with App Router, SSR, and SSG |
| [React](https://react.dev/) | 18.3.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe development |

### Styling & UI

| Technology | Purpose |
|------------|---------|
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, customizable UI components |
| [Radix UI](https://www.radix-ui.com/) | Headless UI primitives (dialogs, dropdowns, etc.) |
| [Lucide React](https://lucide.dev/) | Beautiful icon library |

### AI & Backend

| Technology | Purpose |
|------------|---------|
| [Genkit](https://genkit.dev/) | AI framework for building AI-powered features |
| [Google AI](https://ai.google.dev/) | Gemini models for voice and image search |
| [Firebase](https://firebase.google.com/) | Backend services and hosting |

### Testing & CI/CD

| Technology | Purpose |
|------------|---------|
| [Cypress](https://www.cypress.io/) | End-to-end testing |
| [GitHub Actions](https://github.com/features/actions) | Continuous integration |

---

## Project Structure

```
worldwide-recipes-web/
├── .claude/                    # Claude Code configuration & memory
├── .github/
│   └── workflows/
│       └── test.yml            # GitHub Actions CI pipeline
├── cypress/
│   └── e2e/
│       └── basic.cy.js         # E2E test suite
├── docs/
│   └── blueprint.md            # Project blueprint / architecture docs
├── public/                     # Static assets
├── src/
│   ├── ai/
│   │   ├── dev.ts              # Genkit development server config
│   │   ├── genkit.ts           # Genkit initializer
│   │   └── flows/
│   │       ├── image-search-recipe.ts   # AI image search flow
│   │       └── voice-search-recipe.ts   # AI voice search flow
│   ├── app/
│   │   ├── globals.css         # Global styles & Tailwind directives
│   │   ├── layout.tsx          # Root layout with Header & Footer
│   │   ├── loading.tsx         # Global loading state
│   │   ├── error.tsx           # Global error boundary
│   │   ├── page.tsx            # Home page (recipe listing & search)
│   │   └── recipes/
│   │       └── [id]/
│   │           └── page.tsx    # Dynamic recipe detail page (SSG)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DarkModeToggle.tsx
│   │   ├── recipes/
│   │   │   ├── RecipeCard.tsx
│   │   │   └── RecipeFilters.tsx
│   │   ├── search/
│   │   │   ├── ImageSearchModal.tsx
│   │   │   └── VoiceSearchModal.tsx
│   │   └── ui/                 # shadcn/ui components (Button, Card, Dialog, etc.)
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── utils.ts            # Utility functions (cn helper)
│   │   ├── mock-data.ts        # Mock recipe dataset
│   │   └── file-utils.ts       # File handling utilities
│   └── types/
│       └── index.ts            # TypeScript interfaces (Recipe, Ingredient)
├── components.json             # shadcn/ui configuration
├── cypress.config.js           # Cypress configuration
├── next.config.ts              # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x (recommended: use the latest LTS)
- **npm** >= 9.x (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tienhuynh9258/worldwide-recipes-web.git
   cd worldwide-recipes-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Environment Variables

The application uses [dotenv](https://github.com/motdotla/dotenv) for environment configuration. Create a `.env.local` file in the project root:

```bash
# Example environment variables
# Add your Firebase, Genkit, or Google AI API keys here
# GOOGLE_API_KEY=your_google_api_key
# FIREBASE_API_KEY=your_firebase_api_key
```

> **Note:** The app runs with mock data out of the box, so no API keys are required for basic functionality.

### Running the Development Server

Start the Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To start the Genkit AI development server simultaneously:

```bash
npm run genkit:dev
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server with Turbopack on port 3000 |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Run TypeScript compiler without emitting files |
| `npm run test` | Run Cypress end-to-end tests in headless mode |
| `npm run testui` | Open the Cypress interactive test runner |
| `npm run genkit:dev` | Start the Genkit AI development server |
| `npm run genkit:watch` | Start Genkit AI server with file watching |

---

## Architecture

### Frontend Architecture

The project follows the **Next.js App Router** paradigm with a clear separation of concerns:

- **App Router (`src/app/`)**: File-system based routing with nested layouts, loading states, and error boundaries.
- **Server Components**: Recipe detail pages leverage React Server Components for data fetching and static generation.
- **Client Components**: Interactive UI elements (filters, modals, search) are marked with `"use client"` and manage local state.
- **Component Layering**:
  - `ui/` — Primitive shadcn/ui components (buttons, dialogs, inputs)
  - `layout/` — Structural components (header, footer, theme toggle)
  - `recipes/` — Domain-specific components (recipe cards, filters)
  - `search/` — AI-powered search modals (voice, image)

### Data Flow

```
User Interaction
       |
       v
Client Component (state: filters, search query)
       |
       v
Filter Logic (useMemo) -> Filtered Recipes
       |
       v
RecipeCard (display)
```

### Static Site Generation (SSG)

Recipe detail pages use `generateStaticParams()` to pre-render all recipes at build time, ensuring optimal performance and SEO.

---

## AI-Powered Features

### Voice Search

Powered by **Genkit** and Google's Gemini models, users can speak a dish name or describe a recipe they're looking for. The AI processes the audio input and returns matching recipe suggestions.

**Flow**: `src/ai/flows/voice-search-recipe.ts`

### Image Search

Users can upload a photo of a dish, and the AI analyzes the image to identify the dish and suggest matching recipes from the database.

**Flow**: `src/ai/flows/image-search-recipe.ts`

---

## Testing

This project uses **Cypress** for end-to-end testing.

### Running Tests

**Headless mode** (CI/CD):

```bash
npm run test
```

**Interactive mode** (development):

```bash
npm run testui
```

### CI/CD Pipeline

Every pull request triggers the GitHub Actions workflow (`.github/workflows/test.yml`), which:

1. Checks out the code
2. Sets up Node.js 18
3. Installs dependencies
4. Builds the Next.js app
5. Starts the production server
6. Runs the full Cypress test suite

---

## Deployment

### Firebase Hosting (Recommended)

This project is configured for deployment on **Firebase Hosting**.

```bash
# Build for production
npm run build

# Deploy to Firebase (requires Firebase CLI)
firebase deploy
```

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Self-hosted with Docker

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Commit Convention

We follow conventional commits:

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, missing semi-colons, etc.)
- `refactor:` — Code refactoring
- `test:` — Adding or updating tests
- `chore:` — Build process or auxiliary tool changes

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and a passion for world cuisine.
</p>

<p align="center">
  <a href="https://github.com/Tienhuynh9258/worldwide-recipes-web">
    <img src="https://img.shields.io/github/stars/Tienhuynh9258/worldwide-recipes-web?style=social" alt="GitHub Stars" />
  </a>
</p>
