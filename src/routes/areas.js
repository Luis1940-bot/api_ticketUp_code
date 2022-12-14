const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
const bcrypt = require("bcrypt");
const whiteList = [""]; //["http://localhost:3001/api/get_areas"];
const cors = require("cors");
router.use(cors({ origin: whiteList }));
router.use(express.json());
// router.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

router.post("/alta_area", async (req, res) => {
  try {
    const { area, datetime } = req.body;

    const integrity = bcrypt.hashSync(area + datetime, 10);
    const [areaCreated, created] = await db.Areas.findOrCreate({
      where: {
        area: area.toLowerCase(),
      },
      defaults: {
        area: area.toLowerCase(),
        datetime: datetime,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("Area created");
    } else {
      res.status(422).send("Existing Area ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_areas", async (req, res) => {
  res.send("entroooooooooooooo");
  try {
    const areas = await db.Areas.findAll({
      raw: true,
    });

    if (areas.length > 0) {
      res.status(201).json(areas);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
