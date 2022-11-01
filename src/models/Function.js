const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!Functions por ejemplo Supervisor
  sequelize.define(
    "functions",
    {
      function: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      integrity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
