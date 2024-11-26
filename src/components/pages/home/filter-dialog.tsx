"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";

const filterParkingLocationFormSchema = z.object({
  name: z.string().max(100, { message: "Maksimal 100 karakter" }).optional(),
  min_available: z.string().optional(),
});

type FilterParkingLocationFormSchema = z.infer<
  typeof filterParkingLocationFormSchema
>;

function parseMinAvailableParam(param: string | null): string {
  if (!param) return "";
  try {
    return Number(param).toString();
  } catch (err) {
    console.log(err);
    return "";
  }
}

export default function FilterDialog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameParam = searchParams.get("name");
  const minAvailableParam = searchParams.get("minAvailable");

  const form = useForm<FilterParkingLocationFormSchema>({
    resolver: zodResolver(filterParkingLocationFormSchema),
    defaultValues: {
      name: nameParam || "",
      min_available: parseMinAvailableParam(minAvailableParam),
    },
  });

  function onSubmit(values: FilterParkingLocationFormSchema) {
    router.push(`?name=${values.name}&minAvailable=${values.min_available}`);
    console.log(values);
  }
  function onReset() {
    form.reset({ name: "", min_available: "" });
    router.push("/");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Lokasi Parkir</DialogTitle>
          <DialogDescription>
            Filter lokasi parkir dengan ukuran lokasi, dan ketersediaan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lokasi Parkir</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Parkir Pak Amin"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="min_available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min. Sisa</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="reset" onClick={onReset}>
                  Reset
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" variant="default">
                  Filter
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
