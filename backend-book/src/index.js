import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected"))
  .catch((error) => {
    console.log("connect DB ERR",error);
  });

routes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
