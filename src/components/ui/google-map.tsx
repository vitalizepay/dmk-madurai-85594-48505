/// <reference types="google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    info?: string;
  }>;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  className = '',
  onMapClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      // For demo purposes, we'll show a placeholder
      // In production, you would use the Google Maps API key
      const loader = new Loader({
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with actual API key
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current && window.google) {
          const mapInstance = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });

          setMap(mapInstance);
          setIsLoaded(true);

          // Add markers
          markers.forEach(marker => {
            const mapMarker = new window.google.maps.Marker({
              position: marker.position,
              map: mapInstance,
              title: marker.title,
            });

            if (marker.info) {
              const infoWindow = new window.google.maps.InfoWindow({
                content: marker.info,
              });

              mapMarker.addListener('click', () => {
                infoWindow.open(mapInstance, mapMarker);
              });
            }
          });

          // Add click listener
          if (onMapClick) {
            mapInstance.addListener('click', (event: any) => {
              if (event.latLng) {
                onMapClick(event.latLng.lat(), event.latLng.lng());
              }
            });
          }
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsLoaded(false);
      }
    };

    initMap();
  }, [center, zoom, markers, onMapClick]);

  if (!isLoaded) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading map...</p>
          <p className="text-xs text-muted-foreground mt-2">
            Google Maps integration will be available in production
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};