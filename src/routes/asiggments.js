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

router.post("/alta_asiggment", async (req, res) => {
  try {
    const { idasignados, datetime, idticket, iduser, observacion } = req.body;

    const integrity = bcrypt.hashSync(
      datetime + idticket + iduser + idasignados,
      10
    );
    const created = await db.Asiggments.create({
      datetime: datetime,
      integrity: integrity,
      ticketId: idticket,
      userId: iduser,
      idasignados: idasignados,
      observacion: observacion,
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

router.get("/get_asiggments", async (req, res) => {
  try {
    const asiggment = await db.Asiggments.findAll({ raw: true });

    if (asiggment.length > 0) {
      res.status(201).json(asiggment);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
