import { getSession } from "next-auth/react";
import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";

import { ObjectId } from "mongodb";

function isValidConfig(config) {
  return (
    config.laces &&
    config.mesh &&
    config.caps &&
    config.inner &&
    config.sole &&
    config.stripes &&
    config.band &&
    config.patch
  );
}

export default async function handler(req, res) {
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

  if (req.method === "POST") {
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
      updatedAt: new Date(),
    };

    let hasSameConfig = await db
      .collection("configurations")
      .findOne({ userId: ObjectId(user._id), colors: configuration });

    if (hasSameConfig) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "You already have this configuration" });
      return;
    }

    let result = await db
      .collection("configurations")
      .insertOne(configToInsert);
    if (result.acknowledged) {
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: configToInsert });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to insert configuration" });
    }
  }

  ///////////////
  else if (req.method == "PUT") {
    const { configId, colors } = req.body;
    if (!isValidConfig(colors)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid color configuration" });
      return;
    }

    if (!configId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid configuration id" });
      return;
    }

    let result = await db
      .collection("configurations")
      .updateOne(
        { _id: ObjectId(configId), userId: ObjectId(user._id) },
        { $set: { colors, updatedAt: new Date() } }
      );

    if (result.acknowledged) {
      res.status(StatusCodes.OK).json({ success: true, data: result });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update configuration" });
    }
  }

  ////////////
  else if (req.method == "DELETE") {
    const { configId } = req.body;
    if (!configId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid configuration id" });
      return;
    }

    let result = await db
      .collection("configurations")
      .deleteOne({ _id: ObjectId(configId), userId: ObjectId(user._id) });

    if (result.acknowledged) {
      res.status(StatusCodes.OK).json({ success: true, data: result });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete configuration" });
    }
  } else {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: "Method not allowed" });
  }
}
