"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ParkingLocation } from "@/data/parking-locations";
import { icon } from "leaflet";
import BookingFormDialog from "./booking-form";

export interface ParkingMapProps {
  parkingLocations: ParkingLocation[];
}

const customGreenParkingIcon = icon({
  iconUrl: "/icons/green_parking_location.png",
  iconSize: [20, 20],
});
const customRedParkingIcon = icon({
  iconUrl: "/icons/red_parking_location.png",
  iconSize: [20, 20],
});

function isParkingAreaFull(capacity: number, occupied: number) {
  return capacity <= occupied;
}

export default function ParkingMap(props: ParkingMapProps) {
  return (
    <MapContainer
      center={[-7.797919, 110.3815778]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.parkingLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lon, location.lat]}
          icon={
            !isParkingAreaFull(location.capacity, location.occupied)
              ? customGreenParkingIcon
              : customRedParkingIcon
          }
        >
          <Popup>
            <div className="flex flex-col items-center gap-0">
              <div>
                <span className="font-bold text-md">{location.name}</span>
                <br />
                Sisa: {location.capacity -
                  location.occupied} / {location.capacity}
              </div>
              {!isParkingAreaFull(location.capacity, location.occupied) ? (
                <BookingFormDialog />
              ) : null}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
