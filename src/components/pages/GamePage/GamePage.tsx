import React, { useState, useCallback, lazy, Suspense, useRef } from 'react';
import { useGameLogic } from '../../../hooks/useGameLogic';
import { GameTemplate } from '../../templates/GameTemplate/GameTemplate';
import { GameStats } from '../../organisms/GameStats/GameStats';
import { CityDisplay } from '../../molecules/CityDisplay/CityDisplay';
import Skeleton from 'react-loading-skeleton';
import styles from './GamePage.module.scss';

const GameMap = lazy(() =>
  import('../../organisms/GameMap/GameMap').then((module) => ({
    default: module.GameMap,
  }))
);

const ResultModal = lazy(() =>
  import('../../molecules/ResultModal/ResultModal').then((module) => ({
    default: module.ResultModal,
  }))
);

export const GamePage: React.FC = () => {
  const { gameState, placePin } = useGameLogic();
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [modalData, setModalData] = useState<{
    isCorrect: boolean;
    distance: number;
    cityName: string;
    userLat: number;
    userLng: number;
    actualLat: number;
    actualLng: number;
  } | null>(null);

  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (gameStateRef.current.gameOver || showModal) return;

      const currentCity = gameStateRef.current.cities[gameStateRef.current.currentCityIndex];
      const actualLat = currentCity.lat;
      const actualLng = currentCity.long;
      const cityName = currentCity.capitalCity;

      console.log('=== CLICK DEBUG ===');
      console.log('Current city index:', gameStateRef.current.currentCityIndex);
      console.log('Current city:', cityName);
      console.log('City location:', actualLat, actualLng);
      console.log('User clicked:', lat, lng);

      const R = 6371;
      const dLat = ((actualLat - lat) * Math.PI) / 180;
      const dLon = ((actualLng - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((actualLat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c);
      const isCorrect = distance <= 50;

      console.log('Distance:', distance, 'km');
      console.log('Is correct?', isCorrect);
      console.log('==================');

      const resultData = {
        isCorrect,
        distance,
        cityName,
        userLat: lat,
        userLng: lng,
        actualLat,
        actualLng,
      };

      setModalData(resultData);
      setShowResult(true);

      placePin(lat, lng);

      setTimeout(() => {
        setShowModal(true);
      }, 500);
    },
    [showModal, placePin]
  );

  const handleCloseModal = useCallback(() => {
    console.log('Closing modal, advancing to next city');
    setShowModal(false);
    
    setTimeout(() => {
      setShowResult(false);
      setModalData(null);
    }, 300);
  }, []);

  if (gameState.gameOver) {
    return null;
  }

  const currentCity = gameState.cities[gameState.currentCityIndex];
  const citiesRemaining = gameState.cities.length - gameState.currentCityIndex;

  return (
    <GameTemplate>
      <GameStats
        score={gameState.score}
        citiesFound={gameState.citiesFound}
        highScore={gameState.highScore}
      />

      <CityDisplay cityName={currentCity.capitalCity} citiesRemaining={citiesRemaining} />

      <div className={styles.mapWrapper}>
        <Suspense fallback={<Skeleton height={500} />}>
          <GameMap
            onMapClick={handleMapClick}
            cityLat={showResult && modalData ? modalData.actualLat : undefined}
            cityLng={showResult && modalData ? modalData.actualLng : undefined}
            showResult={showResult}
            userLat={modalData?.userLat}
            userLng={modalData?.userLng}
          />
        </Suspense>
      </div>

      {showModal && modalData && (
        <Suspense fallback={null}>
          <ResultModal
            isOpen={showModal}
            onClose={handleCloseModal}
            isCorrect={modalData.isCorrect}
            distance={modalData.distance}
            cityName={modalData.cityName}
          />
        </Suspense>
      )}

      <div className={styles.instructions}>
        <h3>How to Play:</h3>
        <ul>
          <li>You start with 1500 kilometers</li>
          <li>Click on the map where you think the city is located</li>
          <li>Your distance error is deducted from your score</li>
          <li>Within 50km = Correct!</li>
          <li>Game ends when you run out of kilometers</li>
          <li>Your high score = number of cities found</li>
        </ul>
      </div>
    </GameTemplate>
  );
};