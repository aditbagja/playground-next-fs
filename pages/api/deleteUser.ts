import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).send("Method Not Allowed");
  }

  const request = req.query.id;
  if (typeof request === "string") {
    const id = parseInt(request);

    const response = await prisma.users.delete({
      where: { user_id: id },
    });

    res.status(200).json(response);
  }
}
