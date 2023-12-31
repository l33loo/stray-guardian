import express from "express";
import db from "../database";
import upload from "../utilities/uploader";
import { Op, Sequelize } from "sequelize";
import crypto from "crypto";
import catalog from "../utilities/detection";
import { generateRandomPoint } from "../utilities/geo";
const router = express.Router();

router.get("/", async (req, res) => {
  const { status, type, token } = req.query;
  console.log("Found with token", token);
  if (token) {
    const found = await db.StrayRequest.findOne({
      where: {
        token: token,
      },
    });
    if (found) {
      const data = found?.toJSON();
      const similar = await db.StrayRequest.findAll({
        where: {
          type: data.type,
          color: data.color,
        },
      });
      res.json(similar);
      return;
    } else {
      res.statusCode = 204;
      res.send();
      return;
    }
  }

  if (type) {
    const types = String(type).split(",");
    const strayRequests = await db.StrayRequest.findAll({
      where: {
        [Op.or]: [
          {
            type: {
              [Op.or]: types,
            },
          },
        ],
      },
    });
    res.json(strayRequests);
    return;
  }

  if (status) {
    const strayRequests = await db.StrayRequest.findAll({
      where: {
        status: {
          [Op.or]: String(type).split(","),
        },
      },
    });
    res.json(strayRequests);
    return;
  }

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

  const randomPoint = generateRandomPoint(
    { lat: Number(lat), lng: Number(lon) },
    1000
  );
  console.log(randomPoint);
  const stray = {
    photoUrl: photoUrl,
    type: p.class,
    color: "#000000",
    status: status,
    lastSeen: new Date(lastSeen),
    lat: randomPoint.lat,
    lon: randomPoint.lng,
    phone: phone,
    email: email,
    observations: observations,
    token: crypto.randomUUID(),
  };
  res.json(await db.StrayRequest.create(stray));
});

export default router;
