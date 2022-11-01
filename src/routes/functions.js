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

router.post("/alta_function", async (req, res) => {
  try {
    const { funcion, datetime } = req.body;

    const integrity = bcrypt.hashSync(funcion + datetime, 10);
    const [funcionCreated, created] = await db.Functions.findOrCreate({
      where: {
        function: funcion.toLowerCase(),
      },
      defaults: {
        function: funcion.toLowerCase(),
        datetime: datetime,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("Function created");
    } else {
      res.status(422).send("Existing Function ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_functions", async (req, res) => {
  try {
    const funcion = await db.Functions.findAll();

    if (funcion.length > 0) {
      res.status(201).json(funcion);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
