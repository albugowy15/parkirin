"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const bookingParkingFormSchema = z
  .object({
    fullname: z
      .string({ required_error: "wajib diisi" })
      .min(1, { message: "wajib diisi" }),
    numberPlate: z
      .string({ required_error: "wajib diisi" })
      .min(1, { message: "wajib diisi" }),
    parkingSlot: z
      .string({ required_error: "wajib diisi" })
      .min(1, { message: "wajib diisi" }),
    duration: z
      .string({ required_error: "wajib diisi" })
      .min(1, { message: "wajib diisi" }),
  })
  .required();

export type BookingParkingFormSchema = z.infer<typeof bookingParkingFormSchema>;

export type BookingDetail = { startedAt: string } & BookingParkingFormSchema;

export default function BookingFormDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const form = useForm<BookingParkingFormSchema>({
    resolver: zodResolver(bookingParkingFormSchema),
    defaultValues: {
      fullname: "",
      numberPlate: "",
      parkingSlot: "",
      duration: "",
    },
  });
  function onSubmit(values: BookingParkingFormSchema) {
    setOpen(false);
    toast.success("Berhasil memesan slot parkir");
    console.log(values);
    const bookingID = crypto.randomUUID();
    localStorage.setItem(
      bookingID,
      JSON.stringify({ startedAt: new Date(), ...values }),
    );
    router.push("/bookings/" + bookingID);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Formulir booking slot parkir</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberPlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plat nomor</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="AB 2112 JK" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parkingSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slot parkir</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih slot parkir yang tersedia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A21">A21</SelectItem>
                      <SelectItem value="B23">B23</SelectItem>
                      <SelectItem value="C30">C30</SelectItem>
                      <SelectItem value="G10">G10</SelectItem>
                      <SelectItem value="Y15">Y15</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durasi Parkir (dalam jam)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="1" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Book</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
