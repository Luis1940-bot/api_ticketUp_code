//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { sequelize } = require("sequelize");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
// Syncing all the models at once.
//modifica => alter: true
//desde cero => force:true
conn
  .sync({ alter: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log("%s listening at " + PORT); // eslint-disable-line no-console
    });
  })
  .then(() => {
    let tables = conn.query("SHOW FULL TRIGGERS"); //!son las tablas  + triggers
    return tables;
  })
  .then((res) => {
    res[0].length > 0
      ? console.log(res[0].length, " zzzzzzzzzzzz alter : false")
      : (conn.query(
          "CREATE TRIGGER insert_ticket AFTER INSERT " +
            "ON tickets " +
            "FOR EACH ROW " +
            "INSERT INTO r_tickets (r_tickets.id, r_tickets.fecha, r_tickets.hora, r_tickets.estado, r_tickets.fechaProgreso, r_tickets." +
            "fechaCompletado, " +
            "r_tickets.fechaRevisado, r_tickets.fechaAceptado, r_tickets.ubicacion, r_tickets.progreso, r_tickets.integrity, r_tickets." +
            "categoriaId, r_tickets.criticId" +
            ", r_tickets.userId, r_tickets.areaId,r_tickets.problema) VALUES (NEW.id, NEW.fecha, NEW.hora, NEW.estado, NEW.fechaProgreso," +
            " NEW.fechaCompletado" +
            ", NEW.fechaRevisado, NEW.fechaAceptado, NEW.ubicacion, NEW.progreso, NEW.integrity, " +
            "NEW.categoriaId, NEW.criticId" +
            ", NEW.userId, NEW.areaId,NEW.problema);"
        ),
        console.log("zzzzzzzzzzzz force : true"));
  });
