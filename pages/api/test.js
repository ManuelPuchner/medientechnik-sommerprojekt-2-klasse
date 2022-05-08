import { connectToDatabase } from "lib/mongodb";

export default async function handler(req, res) {
  let { db } = await connectToDatabase();
  let users = (await db.collection("users").find({}).toArray()).map((user) => {
    delete user._id;
    return user;
  });
  res.status(200).json(users);
}
