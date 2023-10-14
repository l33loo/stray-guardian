import express from "express";
import db from "../database";
import upload from "../utilities/uploader";
import { Sequelize } from "sequelize";
import crypto from "crypto";
import catalog from "../utilities/detection";

const router = express.Router();

router.get("/", async (req, res) => {
  const strayRequests = await db.StrayRequest.findAll();
  res.json(strayRequests);
});

router.get("/types", async (req, res) => {
  const types = await db.StrayRequest.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("type")), "type"]],
  });
  res.json(types);
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

router.post("/", upload.single("photo"), async (req, res) => {
  const { status, lastSeen, lat, lon, phone, email, observations } = req.body;
  const photoUrl = `${req.protocol}://${req.header("host")}/uploads/${
    req.file?.filename
  }`;
  const p = await catalog(req.file!.path);
  const stray = {
    photoUrl: photoUrl,
    type: p.class,
    color: "#000",
    status: status,
    lastSeen: new Date(lastSeen),
    lat: lat,
    lon: lon,
    phone: phone,
    email: email,
    observations: observations,
    token: crypto.randomUUID(),
  };
  res.json(await db.StrayRequest.create(stray));
});

export default router;
