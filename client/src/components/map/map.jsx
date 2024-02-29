'use client'
import { MapContainer, TileLayer, Circle, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Asegúrate de importar el CSS de Leaflet
import { useEffect, useState } from 'react';

// Actualiza el polígono si es necesario para reflejar una ubicación relevante en Paraguay



const Mapa = ({coordinates}) => {
  const [isClient, setIsClient] = useState(false);
  const polygon = coordinates;
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  const [mapState, setMapState] = useState({
    lat: -23.4425, // Actualizado a la latitud de Paraguay
    lng: -58.4438, // Actualizado a la longitud de Paraguay
    zoom: 6, // Ajustado para mostrar una vista más amplia de Paraguay
  
  });

  const position = [mapState.lat, mapState.lng];

  return (
    <>
  
      {isClient && (
        <MapContainer center={position} zoom={mapState.zoom} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon color="purple" positions={polygon} /> {/* Asegúrate de actualizar o remover si no es relevante */}
          <Marker position={position}>
            <Popup>Hello User</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Mapa;
