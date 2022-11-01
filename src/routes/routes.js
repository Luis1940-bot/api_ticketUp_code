const router = require("express").Router();

//middlewares
const users = require("./users");
const areas = require("./areas");
const functions = require("./functions");
const categorias = require("./categorias");
const criticidad = require("./criticidad");
const ticket = require("./ticket");
const resolutions = require("./resolutions");
const asiggments = require("./asiggments");
const comments = require("./comments");

//Routes and middlewares
router.use("/", users);
router.use("/", areas);
router.use("/", functions);
router.use("/", categorias);
router.use("/", criticidad);
router.use("/", ticket);
router.use("/", resolutions);
router.use("/", asiggments);
router.use("/", comments);

module.exports = router;
