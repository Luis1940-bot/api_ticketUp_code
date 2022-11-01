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

router.post("/alta_critic", async (req, res) => {
  try {
    const { criticidad, datetime } = req.body;

    const integrity = bcrypt.hashSync(criticidad + datetime, 10);
    const [criticidadCreated, created] = await db.Critics.findOrCreate({
      where: {
        criticidad: criticidad.toLowerCase(),
      },
      defaults: {
        criticidad: criticidad.toLowerCase(),
        datetime: datetime,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("Critics created");
    } else {
      res.status(422).send("Existing Critics ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_critics", async (req, res) => {
  try {
    const criticidad = await db.Critics.findAll();

    if (criticidad.length > 0) {
      res.status(201).json(criticidad);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
