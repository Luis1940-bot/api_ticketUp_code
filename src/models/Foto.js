const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!se guarda la  referencia de las fotos
  sequelize.define(
    "fotos",
    {
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING,
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
