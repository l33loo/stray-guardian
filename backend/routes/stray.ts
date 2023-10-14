import express from "express";
import db from "../database";
import upload from "../utilities/uploader";

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
  const { status } = req.body;
  res.json({
    photoUrl: `${req.protocol}://${req.header("host")}/uploads/${
      req.file?.filename
    }`,
    stauts: status,
  });
});

export default router;
