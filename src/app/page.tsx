import ParkingLocationCard from "@/components/pages/home/parking-location-card";
import { filterParkingLocations } from "@/data/parking-locations";

export interface HomePageSearchParams {
  name: string | null;
  minAvailable: string | null;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<HomePageSearchParams>;
}) {
  const filters = await searchParams;
  const parkingLocations = filterParkingLocations({
    name: filters.name || "",
    minAvailable: filters.minAvailable || "0",
  });
  return (
    <main>
      <ParkingLocationCard parkingLocations={parkingLocations} />
    </main>
  );
}
