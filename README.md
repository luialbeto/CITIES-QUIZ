# Cities Quiz Game

A responsive, accessible web game where players locate European cities on a map. Built with React 18, TypeScript, and Google Maps API.

## WEB

<img width="1228" height="622" alt="image" src="https://github.com/user-attachments/assets/d9729037-3467-4b60-ba46-ccac6d63e053" />

## MOBILE

<img width="270" height="555" alt="image" src="https://github.com/user-attachments/assets/3f76238d-0168-4474-8972-a167047ebb0b" />

## INFO

<img width="797" height="561" alt="image" src="https://github.com/user-attachments/assets/bb24c65e-ad2a-4f54-8e23-f1dedc57367f" />

<img width="1207" height="614" alt="image" src="https://github.com/user-attachments/assets/6f98a68c-b1af-43f9-9a08-409b38bcdc16" />


## Game Description

Find the correct location of European cities on a map! Start with 1500 kilometers and lose distance for each incorrect guess. Place your pin within 50km of the actual city to score. The game ends when you run out of kilometers.

## Features

- **React 18** with TypeScript
- **Context API** for state management
- **Atomic Design Pattern** (Atoms, Molecules, Organisms, Templates, Pages)
- **SCSS** with modular architecture
- **Error Boundaries** for graceful error handling
- **Cookies** for persistent high scores
- **React ARIA** for accessibility
- **Lazy Loading** for optimal performance
- **React Loading Skeleton** for loading states
- **Google Maps API** for interactive maps
- **Fully Responsive** design
- **Clean Code** with SRP architecture
- **Vite** for fast development

## Getting Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Google Maps API Key ([Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key))

### Installation

1. **Clone or create the project:**
mkdir cities-quiz-game
cd cities-quiz-game

2. **Initialize and install dependencies:**
npm init -y
npm install

3. **Set up environment variables:**
cp .env.example .env
Edit .env and add your Google Maps API key:
envVITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here

4. **Start development server:**
npm run dev


Project Architecture
Atomic Design Pattern
components/
├── atoms/          # Basic building blocks (Button, Text, Icon)
├── molecules/      # Simple component combinations (ScoreCard, CityDisplay)
├── organisms/      # Complex components (GameMap, GameHeader, GameStats)
├── templates/      # Page layouts (GameTemplate)
└── pages/          # Full pages (GamePage, GameOverPage)


Key Technologies
React 18: Latest features
TypeScript: Type-safe development
Context API: Global state management
SCSS Modules: Component-scoped styling
React ARIA: Accessible UI components
js-cookie: Cookie management
Google Maps API: Interactive mapping
Vite: Build tool


What Could Be Improved
Given more time (beyond the 8-hour limit):

*Game difficulty should be improved by hiding country names on the map* (!important)

Technical:
Unit tests (Jest + React Testing Library)
E2E tests
Internationalization (i18n)
Dark mode

