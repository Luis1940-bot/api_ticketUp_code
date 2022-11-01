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

router.post("/alta_comment", async (req, res) => {
  try {
    const { datetime, comentario, idticket, iduser } = req.body;

    const integrity = bcrypt.hashSync(datetime + idticket + iduser, 10);
    const created = await db.Comments.create({
      comentario: comentario,
      datetime: datetime,
      integrity: integrity,
      ticketId: idticket,
      userId: iduser,
    });
    if (created) {
      res.status(200).send("Comment created");
    } else {
      res.status(422).send("Existing Comment ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_comments", async (req, res) => {
  try {
    const comments = await db.Comments.findAll();

    if (comments.length > 0) {
      res.status(201).json(comments);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
