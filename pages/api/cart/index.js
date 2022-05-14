import { StatusCodes } from "http-status-codes";
import { connectToDatabase } from "lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

async function getCartByUserId(userId) {
  const { db } = await connectToDatabase();
  const [cart] = await db
    .collection("users")
    .find({ _id: ObjectId(userId) })
    .project({ cart: 1 })
    .toArray();
  return cart;
}
export default async function handler(req, res) {
  let { db } = await connectToDatabase();
  const session = await getSession({ req });
  if (!session) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
    return;
  }
  let user = await db.collection("users").findOne(session.user);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    return;
  }
  const configId = req.body?.id;
  if (req.method === "POST") {
    if (!configId) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing id" });
      return;
    }

    let dbConfig = await db.collection("configurations").findOne({
      _id: ObjectId(configId),
    });

    if (!dbConfig) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Config not found" });
      return;
    }

    let result = await db.collection("users").updateOne(
      { _id: ObjectId(user._id) },
      {
        $push: {
          "cart.items": ObjectId(configId),
        },
      }
    );

    if (result.modifiedCount === 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Could not add to cart, maybe you already added it" });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true
    });
  } else if (req.method === "GET") {
    let cart = await getCartByUserId(user._id);
    if (!cart) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
      return;
    }

    let configs = await db
      .collection("configurations")
      .find({ _id: { $in: cart.cart.items } })
      .toArray();

    configs = JSON.parse(JSON.stringify(configs));
    res.status(StatusCodes.OK).json({
      configs
    });
  } else if (req.method == "DELETE") {
    let result = await db.collection("users").updateOne(
      { _id: ObjectId(user._id) },
      {
        $pull: {
          "cart.items": ObjectId(configId),
        },
      }
    );

    if (result.modifiedCount === 0) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Could not remove from cart, maybe you already removed it",
      });
      return;
    }


    res.status(StatusCodes.OK).json({
      success: true,
    });
  } else {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: "Method not allowed" });
  }
}
