"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter",
  }),
  alamat: z.string().min(2, {
    message: "Alamat harus minimal 2 karakter",
  }),
});

const Create = () => {
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      alamat: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.post(
      "http://localhost:3000/api/createUser",
      values
    );
    console.log(response);

    setTimeout(() => {
      route.push("/");
    }, 1000);
  }

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-5">Create New Data</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Silahkan isi Kolom Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder="Alamat" {...field} />
                  </FormControl>
                  <FormDescription>Silahkan isi Kolom Alamat</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Create;
