import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, {
    message: "name tidak boleh kosong",
  }),
  alamat: z.string().min(2, {
    message: "alamat tidak boleh kosong",
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
  }

  const request = schema.safeParse(req.body);

  if (!request.success) {
    res.status(400).send({ message: request });
  }

  const response = await prisma.users.create({
    data: {
      name: request.data?.name,
      alamat: request.data?.alamat,
    },
  });

  console.log(response);

  res.status(201).json(request);
}
