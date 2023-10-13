import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import animalRoutes from "./routes/animal";
const app = express();
dotenv.config();

// Photo uploads
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json());

app.use("/api/animal", animalRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Stray guardian is listening on port ${port}`);
});
