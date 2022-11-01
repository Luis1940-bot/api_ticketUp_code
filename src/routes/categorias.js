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

router.post("/alta_categoria", async (req, res) => {
  try {
    const { categoria, datetime } = req.body;

    const integrity = bcrypt.hashSync(categoria + datetime, 10);
    const [categoriaCreated, created] = await db.Categorias.findOrCreate({
      where: {
        categoria: categoria.toLowerCase(),
      },
      defaults: {
        categoria: categoria.toLowerCase(),
        datetime: datetime,
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("Categoria created");
    } else {
      res.status(422).send("Existing Categoria ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_categorias", async (req, res) => {
  try {
    const categorias = await db.Categorias.findAll();

    if (categorias.length > 0) {
      res.status(201).json(categorias);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
