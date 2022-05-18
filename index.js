const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
app.use(cors());
app.use(express.json());

//user_admin
//qg4Ph10NQTMqMLe3
const uri =
  "mongodb+srv://user_admin:qg4Ph10NQTMqMLe3@cluster0.cqiu7.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cqiu7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const taskCollection = client.db("Tasks").collection("Task");
// });

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("Tasks").collection("Task");

    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.get("/task/:email", async (req, res) => {
      const query = req.params;
      const cursor = taskCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
