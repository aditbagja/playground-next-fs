"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [userList, setUserList] = useState<Users[]>([]);

  async function fetchUserData() {
    const allUserData = await axios.get("http://localhost:3000/api/getUser");
    const userData = allUserData.data.data;
    setUserList(userData);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleDelete(userId: number) {
    await axios
      .delete(`http://localhost:3000/api/deleteUser?id=${userId}`)
      .then((response) => {
        console.log(`User with userId ${userId} deleted`);
        fetchUserData();
      })
      .catch((error) => {
        console.log("Error delete User Data", error);
      });
  }

  return (
    <main>
      <section className="py-32">
        <div className="container mx-auto">
          <Button asChild>
            <Link href="/create">Insert New Data</Link>
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList?.map((data: Users) => (
                <TableRow key={data.user_id}>
                  <TableCell className="font-medium">{data.user_id}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.alamat}</TableCell>
                  <TableCell className="flex gap-3">
                    <Button>Edit</Button>
                    <Button asChild variant="secondary">
                      <Link href={`/${data.user_id}`}>Detail</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(data.user_id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default Home;
