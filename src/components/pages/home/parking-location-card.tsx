"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilterDialog from "./filter-dialog";
import dynamic from "next/dynamic";
import { ParkingLocation } from "@/data/parking-locations";
import BookingFormDialog from "./booking-form";

const LazyMap = dynamic(() => import("./parking-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface ParkingLocationCardProps {
  parkingLocations: ParkingLocation[];
}

export default function ParkingLocationCard(props: ParkingLocationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Lokasi Parkir</CardTitle>
          <CardDescription>Temukan lokasi parkir terdekat</CardDescription>
        </div>
        <FilterDialog />
      </CardHeader>
      <CardContent>
        <LazyMap parkingLocations={props.parkingLocations} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {props.parkingLocations.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="m-0 pb-3">
                <ul className="text-md">
                  <li className="list-disc list-inside">
                    Kapasitas: {item.capacity}
                  </li>
                  <li className="list-disc list-inside">
                    Terpakai: {item.occupied}
                  </li>
                  <li className="list-disc list-inside">
                    Sisa: {item.capacity - item.occupied}
                  </li>
                </ul>
              </CardContent>
              {item.capacity - item.occupied > 0 ? (
                <CardFooter>
                  <BookingFormDialog />
                </CardFooter>
              ) : null}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
