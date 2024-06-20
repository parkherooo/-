import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

const Map = ({ position, name }) => {
  return (
    <div className="map-container">
      <h2>{name} 위치</h2>
      <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, iconAnchor: [12, 41], popupAnchor: [0, -41] })}>
          <Popup>
            {name}<br />서울특별시 종로구 사직로 161
          </Popup>
        </Marker>
      </MapContainer>
      <div className="directions">
        <a href={`https://map.kakao.com/link/to/${name},${position[0]},${position[1]}`} target="_blank" rel="noopener noreferrer">
          길찾기
        </a>
      </div>
    </div>
  );
};

export default Map;
