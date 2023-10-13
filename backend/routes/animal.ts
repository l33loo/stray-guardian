import express from "express";
import db from "../database";

const router = express.Router();

router.get("/", async (req, res) => {
  const animals = await db.Animal.findAll();
  res.json(animals);
});
router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {
  const animal = await db.Animal.create({
    name: "Hi!",
  });
  res.json(animal);
});

export default router;
