import BookingDetailCard from "@/components/pages/bookings/booking-detail-card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ bookingID: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <BookingDetailCard bookingID={(await params).bookingID} />
      <Link href={"/"} className={buttonVariants({ variant: "default" })}>
        Kembali Ke Halaman Utama
      </Link>
    </div>
  );
}
