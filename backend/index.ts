import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import animalRoutes from "./routes/animal";

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use("/api/animal", animalRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Stray guardian is listening on port ${port}`);
});
