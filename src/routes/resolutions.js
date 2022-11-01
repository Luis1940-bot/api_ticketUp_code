const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
const bcrypt = require("bcrypt");
router.use(express.json());
const cors = require("cors");
router.use(cors());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/alta_resolution", async (req, res) => {
  try {
    const { datetime, tiempos } = req.body;
    console.log(datetime, tiempos);
    const integrity = bcrypt.hashSync(datetime + tiempos, 10);
    const [resolutionsCreated, created] = await db.Resolutions.findOrCreate({
      where: {
        tiempos: tiempos.toLowerCase(),
      },
      defaults: {
        tiempos: tiempos.toLowerCase(),
        datetime: datetime,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("Resolution created");
    } else {
      res.status(422).send("Existing Resolution ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_resolutions", async (req, res) => {
  try {
    const resolution = await db.Resolutions.findAll();

    if (resolution.length > 0) {
      res.status(201).json(resolution);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
