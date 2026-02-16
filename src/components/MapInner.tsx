"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPin {
  lat: number;
  lng: number;
  name: string;
  type: string;
  color: string;
  href: string;
  detail: string;
}

function createIcon(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

export default function MapInner({ pins }: { pins: MapPin[] }) {
  const center: [number, number] = [37.7749, -122.3194];

  return (
    <MapContainer
      center={center}
      zoom={9}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin, i) => (
        <Marker
          key={`${pin.name}-${i}`}
          position={[pin.lat, pin.lng]}
          icon={createIcon(pin.color)}
        >
          <Popup>
            <div className="min-w-[180px]">
              <a
                href={pin.href}
                className="text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors"
              >
                {pin.name}
              </a>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: pin.color }}
                />
                <span className="text-xs text-gray-500">{pin.type}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{pin.detail}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${pin.lat},${pin.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-500"
              >
                Get Directions &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
