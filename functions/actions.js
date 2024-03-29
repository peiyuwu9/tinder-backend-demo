// DB config
import { MongoClient, ObjectId } from "mongodb";
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

export async function getChat(id) {
  const chats = db.collection("chats");
  const data = await chats.findOne(
    { _id: new ObjectId(id) },
    { projection: { name: true, img_url: true, conversation: true } }
  );
  return data;
}

export async function starUser(id) {
  const users = db.collection("users");
  const data = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { is_stared: true } }
  );
  return data;
}

export async function sendMsg(id, msg) {
  const chats = db.collection("chats");
  const data = await chats.findOne(
    { _id: new ObjectId(id) },
    { projection: { conversation: true } }
  );
  const conversation = [
    ...data.conversation,
    {
      is_self: true,
      msg,
    },
  ];
  const newData = await chats.updateOne(
    { _id: new ObjectId(id) },
    { $set: { conversation } }
  );
  return newData;
}
