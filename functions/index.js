/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import "dotenv/config";
import cors from "cors";

import { getChats, getUsers } from "./actions.js";

const server = express();

// Middlewares
server.use(express.json());
server.use(cors());

// API endpoints
server.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

server.get("/api/chats", async (req, res) => {
  try {
    const chats = await getChats();
    return res.status(200).send(chats);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

export const app = onRequest(server);
