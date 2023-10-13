import express from "express";
import db from "../database";

const router = express.Router();

router.get("/", async (req, res) => {
  const strayRequests = await db.StrayRequest.findAll();
  res.json(strayRequests);
});
router.get("/:id", async (req, res) => {
  const stray = await db.StrayRequest.findByPk(req.params.id);

  if (stray) {
    res.json(stray);
  } else {
    res.statusCode = 204;
    res.send();
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({});
});

export default router;
