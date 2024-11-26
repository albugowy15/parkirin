export interface ParkingLocation {
  id: string;
  lon: number;
  lat: number;
  name: string;
  capacity: number;
  occupied: number;
}

export interface FilterParkingLocationsParam {
  name: string;
  minAvailable: string;
}

function isFilterItemEmpty(item: string) {
  return item.length === 0;
}

export function filterParkingLocations(filter: FilterParkingLocationsParam) {
  const filteredLocations = PARKING_LOCATIONS.filter((item) => {
    const emptyName = isFilterItemEmpty(filter.name);
    const emptyMinAvailable = isFilterItemEmpty(filter.minAvailable);
    if (!emptyName && !emptyMinAvailable) {
      return (
        item.name.toLowerCase() === filter.name?.toLowerCase() &&
        item.capacity - item.occupied >= Number(filter.minAvailable)
      );
    }
    if (!emptyName) {
      return item.name.toLowerCase() === filter.name?.toLowerCase();
    }
    if (!emptyMinAvailable) {
      return item.capacity - item.occupied >= Number(filter.minAvailable);
    }
    return false;
  });
  return filteredLocations;
}

export const PARKING_LOCATIONS: ParkingLocation[] = [
  {
    id: crypto.randomUUID(),
    lon: -7.797919,
    lat: 110.3815778,
    name: "Parkir Mobil Pak Amin",
    capacity: 20,
    occupied: 20,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.800921,
    lat: 110.389882,
    name: "Parkir Utama Malioboro",
    capacity: 50,
    occupied: 50,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.803333,
    lat: 110.377719,
    name: "Parkir Selatan Kraton",
    capacity: 30,
    occupied: 30,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.795888,
    lat: 110.369999,
    name: "Parkir Pasar Beringharjo",
    capacity: 40,
    occupied: 40,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.810457,
    lat: 110.364911,
    name: "Parkir Taman Sari",
    capacity: 25,
    occupied: 25,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.794567,
    lat: 110.382456,
    name: "Parkir Stasiun Tugu",
    capacity: 60,
    occupied: 55,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.798934,
    lat: 110.380123,
    name: "Parkir Alun-Alun Utara",
    capacity: 35,
    occupied: 12,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.809876,
    lat: 110.371234,
    name: "Parkir Gembira Loka",
    capacity: 45,
    occupied: 30,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.799999,
    lat: 110.376789,
    name: "Parkir Museum Benteng Vredeburg",
    capacity: 20,
    occupied: 18,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.800321,
    lat: 110.382789,
    name: "Parkir Kampus UGM",
    capacity: 100,
    occupied: 80,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.801921,
    lat: 110.385557,
    name: "Parkir Terminal Giwangan",
    capacity: 50,
    occupied: 20,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.802832,
    lat: 110.378234,
    name: "Parkir RS Dr. Sardjito",
    capacity: 80,
    occupied: 60,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.795612,
    lat: 110.380111,
    name: "Parkir Jogja City Mall",
    capacity: 100,
    occupied: 70,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.796123,
    lat: 110.379123,
    name: "Parkir Ambarukmo Plaza",
    capacity: 150,
    occupied: 100,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.801789,
    lat: 110.389789,
    name: "Parkir Bandara Adisucipto",
    capacity: 200,
    occupied: 150,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.809654,
    lat: 110.374321,
    name: "Parkir Kebun Binatang Gembira Loka",
    capacity: 70,
    occupied: 40,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.793456,
    lat: 110.371,
    name: "Parkir Prawirotaman",
    capacity: 30,
    occupied: 15,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.804567,
    lat: 110.382234,
    name: "Parkir Sindu Kusuma Edupark",
    capacity: 90,
    occupied: 75,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.792123,
    lat: 110.372567,
    name: "Parkir Hartono Mall",
    capacity: 120,
    occupied: 100,
  },
  {
    id: crypto.randomUUID(),
    lon: -7.791456,
    lat: 110.383123,
    name: "Parkir XT Square",
    capacity: 40,
    occupied: 10,
  },
];
