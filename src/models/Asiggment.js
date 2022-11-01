const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!permite armar relaciones para asignar quien debe realizar las acciones resolutivas
  //!una persona de mayor nivel en la organización ingresa al modulo de asignacion y decide la o las personas que deben resolverlo
  sequelize.define(
    "asiggments",
    {
      idasignados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
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
