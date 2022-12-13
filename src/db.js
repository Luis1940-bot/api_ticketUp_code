require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } =
  process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   logging: false, // true para ver logs de creacion de tablas y otros
//   host: DB_HOST,
//   dialect: "mysql",
//   port: DB_PORT,
//   // dialectOptions: {
//   //   mysql2: "^2.3.3",
//   // },
// });
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // true para ver logs de creacion de tablas y otros
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  // dialectOptions: {
  //   mysql2: "^2.3.3",
  // },
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
// console.log(sequelize.models);
const {
  Users,
  Areas,
  Functions,
  Categorias,
  Critics,
  Tickets,
  R_tickets,
  Comments,
  Asiggments,
  Fotos,
  Resolutions,
} = sequelize.models;

Areas.hasMany(Users);
Users.belongsTo(Areas);

Functions.hasMany(Users);
Users.belongsTo(Functions);

Categorias.hasMany(Tickets);
Tickets.belongsTo(Categorias);

Critics.hasMany(Tickets);
Tickets.belongsTo(Critics);

Users.hasMany(Tickets);
Tickets.belongsTo(Users);

Areas.hasMany(Tickets);
Tickets.belongsTo(Areas);

Categorias.hasMany(R_tickets);
R_tickets.belongsTo(Categorias);

Critics.hasMany(R_tickets);
R_tickets.belongsTo(Critics);

Users.hasMany(R_tickets);
R_tickets.belongsTo(Users);

Areas.hasMany(R_tickets);
R_tickets.belongsTo(Areas);

Tickets.hasMany(Comments);
Comments.belongsTo(Tickets);

Users.hasMany(Comments);
Comments.belongsTo(Users);

Tickets.hasMany(Asiggments);
Asiggments.belongsTo(Tickets);

Users.hasMany(Asiggments);
Asiggments.belongsTo(Users);

Tickets.hasMany(Fotos);
Fotos.belongsTo(Tickets);

Resolutions.hasMany(Tickets);
Tickets.belongsTo(Resolutions);

Resolutions.hasMany(R_tickets);
R_tickets.belongsTo(Resolutions);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
