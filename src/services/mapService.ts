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


  static async loadMapsAPI(): Promise<typeof google.maps> {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error('Google Maps API key is not defined. Please check your .env file.');
    }

    if (this.isLoaded && window.google?.maps) {
      return google.maps;
    }

    if (this.isLoading) {
      return new Promise((resolve) => {
        const checkLoaded = setInterval(() => {
          if (this.isLoaded && window.google?.maps) {
            clearInterval(checkLoaded);
            resolve(google.maps);
          }
        }, 100);
      });
    }

    this.isLoading = true;

    try {
      await new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector(
          'script[src*="maps.googleapis.com"]'
        );

        if (existingScript && window.google?.maps) {
          this.isLoaded = true;
          this.isLoading = false;
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          this.isLoaded = true;
          this.isLoading = false;
          resolve();
        };

        script.onerror = () => {
          this.isLoading = false;
          reject(new Error('Failed to load Google Maps script'));
        };

        document.head.appendChild(script);
      });

      return google.maps;
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading Google Maps API:', error);
      throw error;
    }
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
    map: google.maps.Map,
    position: google.maps.LatLngLiteral,
    title: string,
    icon?: string
  ): google.maps.Marker {
    return new google.maps.Marker({
      position,
      map,
      title,
      icon: icon || undefined,
      animation: google.maps.Animation.DROP,
    });
  }

 
  static drawLine(
    map: google.maps.Map,
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral,
    color: string = '#667eea'
  ): google.maps.Polyline {
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