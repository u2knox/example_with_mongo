const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json())

const port = 3000;

const url = "mongodb://127.0.0.1:27017/";

const mongoClient = new MongoClient(url);

(async () => {
  try {
    await mongoClient.connect();
    app.locals.itemsCollection = mongoClient.db("store").collection("items");
    app.listen(3000);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/items", async (req, res) => {
  const collection = req.app.locals.itemsCollection;
  const items = await collection.find({}).toArray();
  res.json(items);
});

app.post("/items/add", async (req, res) => {
  const collection = req.app.locals.itemsCollection;
  res.json(await collection.insertOne(req.body))
});
