import React, { lazy, Suspense } from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { GameProvider } from './context/GameProvider';
import { useGameLogic } from './hooks/useGameLogic';
import { ErrorBoundary } from './boundaries/ErrorBoundary';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './assets/styles/main.scss';

const GamePage = lazy(() =>
  import('./components/pages/GamePage/GamePage').then((module) => ({
    default: module.GamePage,
  }))
);

const GameOverPage = lazy(() =>
  import('./components/pages/GameOverPage/GameOverPage').then((module) => ({
    default: module.GameOverPage,
  }))
);

const AppContent: React.FC = () => {
  const { gameState } = useGameLogic();

  return (
    <Suspense
      fallback={
        <div style={{ padding: '20px' }}>
          <Skeleton height={60} style={{ marginBottom: '20px' }} />
          <Skeleton height={400} />
        </div>
      }
    >
      {gameState.gameOver ? <GameOverPage /> : <GamePage />}
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <OverlayProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </OverlayProvider>
    </ErrorBoundary>
  );
};

export default App;