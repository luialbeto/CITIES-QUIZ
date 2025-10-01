import React, { useEffect, useRef, useState } from 'react';
import { MapService } from '../../../services/mapService';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './GameMap.module.scss';

const MAP_CONFIG = {
  center: { lat: 50.8503, lng: 4.3517 },
  zoom: 5,
};

interface GameMapProps {
  onMapClick: (lat: number, lng: number) => void;
  cityLat?: number;
  cityLng?: number;
  showResult?: boolean;
  userLat?: number;
  userLng?: number;
}

export const GameMap: React.FC<GameMapProps> = ({
  onMapClick,
  cityLat,
  cityLng,
  showResult,
  userLat,
  userLng,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<any[]>([]);
  const linesRef = useRef<any[]>([]);

  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        await MapService.loadMapsAPI();

        if (mapRef.current) {
          const google = (window as any).google;
          const mapInstance = new google.maps.Map(
            mapRef.current,
            MapService.createMapConfig()
          );

          mapInstance.addListener('click', (e: any) => {
            if (e.latLng && !showResult) {
              onMapClick(e.latLng.lat(), e.latLng.lng());
            }
          });

          setMap(mapInstance);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load map. Please check your API key.');
        setLoading(false);
        console.error('Map initialization error:', err);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!map) return;


    markersRef.current.forEach((marker) => marker.setMap(null));
    linesRef.current.forEach((line) => line.setMap(null));
    markersRef.current = [];
    linesRef.current = [];


    if (showResult && cityLat !== undefined && cityLng !== undefined && 
        userLat !== undefined && userLng !== undefined) {
      
      const google = (window as any).google;

      const userMarker = MapService.createMarker(
        map,
        { lat: userLat, lng: userLng },
        'Your Guess',
        'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      );
      markersRef.current.push(userMarker);

      const cityMarker = MapService.createMarker(
        map,
        { lat: cityLat, lng: cityLng },
        'Actual Location',
        'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      );
      markersRef.current.push(cityMarker);

      const line = MapService.drawLine(
        map,
        { lat: userLat, lng: userLng },
        { lat: cityLat, lng: cityLng },
        '#667eea'
      );
      linesRef.current.push(line);

      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat: userLat, lng: userLng });
      bounds.extend({ lat: cityLat, lng: cityLng });
      map.fitBounds(bounds);
    } else {
      map.setCenter(MAP_CONFIG.center);
      map.setZoom(MAP_CONFIG.zoom);
    }
  }, [map, showResult, cityLat, cityLng, userLat, userLng]);

  if (loading) {
    return (
      <div className={styles.mapContainer}>
        <Skeleton height="100%" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapRef} className={styles.mapContainer} role="application" aria-label="Game map" />
  );
};