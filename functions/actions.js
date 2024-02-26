// DB config
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DB_CONNECTION_URL);
const db = client.db("tinder_demo");

export async function getUsers() {
  const users = db.collection("users");
  const data = await users.aggregate([{ $sample: { size: 10 } }]).toArray();
  return data;
}

export async function getChats() {
  const chats = db.collection("chats");
  const data = await chats.find().toArray();
  return data;
}
