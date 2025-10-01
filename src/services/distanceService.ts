export interface PinPlacement {
  lat: number;
  lng: number;
  distance: number;
  isCorrect: boolean;
}

const CORRECT_THRESHOLD_KM = 50;

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

const isWithinThreshold = (distance: number, threshold: number): boolean => {
  return distance <= threshold;
};

export class DistanceService {
  static calculatePinPlacement(
    pinLat: number,
    pinLng: number,
    cityLat: number,
    cityLng: number
  ): PinPlacement {
    const distance = calculateDistance(pinLat, pinLng, cityLat, cityLng);
    const isCorrect = isWithinThreshold(distance, CORRECT_THRESHOLD_KM);

    return {
      lat: pinLat,
      lng: pinLng,
      distance,
      isCorrect,
    };
  }

  static calculateNewScore(currentScore: number, distance: number): number {
    const newScore = currentScore - distance;
    return Math.max(0, newScore);
  }
}