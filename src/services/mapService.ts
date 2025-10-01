interface MapConfig {
  center: google.maps.LatLngLiteral;
  zoom: number;
  mapTypeId: string;
  disableDefaultUI: boolean;
  styles: google.maps.MapTypeStyle[];
}

const MAP_CONFIG = {
  center: { lat: 50.8503, lng: 4.3517 },
  zoom: 5,
};

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#e8e8e8' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#e8e8e8' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a8d5ff' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      { visibility: 'on' },
      { color: '#666666' },
      { weight: 1.2 },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [{ visibility: 'off' }],
  },
];

export class MapService {
  private static isLoading = false;
  private static isLoaded = false;
  private static loadPromise: Promise<any> | null = null;

  static async loadMapsAPI(): Promise<any> {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    console.log('Loading Google Maps API...');
    console.log('API Key present:', !!apiKey);

    if (!apiKey) {
      throw new Error('Google Maps API key is not defined. Check environment variables.');
    }

    if (this.isLoaded && (window as any).google?.maps) {
      console.log('Google Maps already loaded');
      return (window as any).google.maps;
    }

    if (this.isLoading && this.loadPromise) {
      console.log('Waiting for existing load...');
      return this.loadPromise;
    }

    this.isLoading = true;

    this.loadPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      );

      if (existingScript && (window as any).google?.maps) {
        console.log('Script already present');
        this.isLoaded = true;
        this.isLoading = false;
        resolve();
        return;
      }

      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        this.isLoaded = true;
        this.isLoading = false;
        resolve();
      };

      script.onerror = (error) => {
        console.error('Failed to load Google Maps script:', error);
        this.isLoading = false;
        this.loadPromise = null;
        reject(new Error('Failed to load Google Maps script'));
      };

      document.head.appendChild(script);
    }).then(() => {
      return (window as any).google.maps;
    });

    return this.loadPromise;
  }

  static createMapConfig(): MapConfig {
    return {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      styles: MAP_STYLES,
    };
  }

  static createMarker(
    map: any,
    position: { lat: number; lng: number },
    title: string,
    icon?: string
  ): any {
    const google = (window as any).google;
    return new google.maps.Marker({
      position,
      map,
      title,
      icon: icon || undefined,
      animation: google.maps.Animation.DROP,
    });
  }

  static drawLine(
    map: any,
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    color: string = '#667eea'
  ): any {
    const google = (window as any).google;
    return new google.maps.Polyline({
      path: [start, end],
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map,
    });
  }
}