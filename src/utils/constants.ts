export const INITIAL_SCORE = 1500;
export const CORRECT_THRESHOLD_KM = 50;
export const HIGH_SCORE_COOKIE_NAME = 'cities_quiz_high_score';
export const GAME_STATE_COOKIE_NAME = 'cities_quiz_game_state';
export const COOKIE_EXPIRY_DAYS = 365;

export const MAP_CONFIG = {
  center: { lat: 50.8503, lng: 4.3517 },
  zoom: 5,
  minZoom: 4,
  maxZoom: 7,
};

export const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#333333' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'on' }, { color: '#000000' }, { weight: 2 }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a8d5ff' }],
  },
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];