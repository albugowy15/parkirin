"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CarIcon,
  Clock,
  IdCardIcon,
  ParkingMeterIcon,
  Timer,
} from "lucide-react";
import * as React from "react";
import { BookingDetail } from "../home/booking-form";

interface BookingDetailCardProps {
  bookingID: string;
}

export default function BookingDetailCard(props: BookingDetailCardProps) {
  const [bookingDetail, setBookingDetail] = React.useState<BookingDetail>();

  React.useEffect(() => {
    const data = localStorage.getItem(props.bookingID);
    if (data) {
      setBookingDetail(JSON.parse(data) as BookingDetail);
    }
  }, [props.bookingID]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Booking Parkir</CardTitle>
        <CardDescription>
          Berikut adalan informasi booking parkir Anda.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold mr-2">Booking ID:</span>
          {props.bookingID}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Nama lengkap
          </label>
          <div className="flex items-center space-x-2">
            <IdCardIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-lg">{bookingDetail?.fullname}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Plat nomor
          </label>
          <div className="flex items-center space-x-2">
            <CarIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-lg">{bookingDetail?.numberPlate}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Slot parkir
          </label>
          <div className="flex items-center space-x-2">
            <ParkingMeterIcon
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <span className="text-lg">{bookingDetail?.parkingSlot}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Durasi
          </label>
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-lg">{bookingDetail?.duration}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Mulai parkir
          </label>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-lg">
              {new Date(bookingDetail?.startedAt || "").toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
