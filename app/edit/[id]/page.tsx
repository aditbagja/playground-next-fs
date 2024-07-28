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
import { Users } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const Edit = ({ params }: { params: { id: number } }) => {
  const route = useRouter();
  const [userData, setUserData] = useState<Users>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchUserData() {
      const response = await axios.get(
        `http://localhost:3000/api/detailUser?id=${params.id}`
      );
      const data = response.data.data;
      setUserData(data);
      form.reset({
        name: data.name,
        alamat: data.alamat,
      });
    }

    fetchUserData();
  }, [params.id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.put(
      `http://localhost:3000/api/editUser?id=${params.id}`,
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
        <h1 className="text-2xl font-bold mb-5">Edit Data {userData?.name}</h1>

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

export default Edit;
