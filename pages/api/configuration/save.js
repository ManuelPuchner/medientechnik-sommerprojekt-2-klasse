import { getSession } from "next-auth/react";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";

import { ObjectId } from "mongodb";

function isValidConfig(config) {
  return config.laces && config.mesh && config.caps && config.inner && config.sole && config.stripes && config.band && config.patch;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    let session = await getSession({ req });
    if (!session) {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
      return;
    }
    let { db } = await connectToDatabase();

    
    let user = await db.collection("users").findOne(session.user);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
      return;
    }


    const configuration = req.body;

    if (!isValidConfig(configuration)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid configuration" });
      return;
    }

    let configToInsert = {
      userId: ObjectId(user._id),
      colors: configuration,
      createdAt: new Date(),
    }

    let hasSameConfig = await db.collection("configurations").findOne({ userId: ObjectId(user._id), colors: configuration });

    if (hasSameConfig) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "You already have this configuration" });
      return;
    }

    let result = await db.collection("configurations").insertOne(configToInsert);
    if (result.acknowledged) {
      res.status(StatusCodes.OK).json({ success: true });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to insert configuration" });
    }
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({ error: "Method not allowed" });
  }
}
