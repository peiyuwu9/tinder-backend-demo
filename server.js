import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Card from "./dbCards.js";

// App config
// MongoDB user: admin
// MongoDB password: Ct8gt9cHyo02CzA6
// MongoDB IP: 0.0.0.0/0
const app = express();
const port = process.env.PORT || 8001;
const connectionUrl =
  "mongodb+srv://admin:Ct8gt9cHyo02CzA6@cluster0.18zbi.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Card.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Card.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
