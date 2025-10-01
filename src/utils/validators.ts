export const isValidCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};


export const isValidScore = (score: number): boolean => {
  return score >= 0 && !isNaN(score) && isFinite(score);
};


export const sanitizeInput = (input: string): string => {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
};