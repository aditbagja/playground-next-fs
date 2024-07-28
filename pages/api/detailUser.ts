import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
  }

  const request = req.query.id || 0;
  if (typeof request === "string") {
    const id = parseInt(request);

    const data = await prisma.users.findUnique({
      where: { user_id: id },
    });

    res.status(200).json({ data });
  }
}
