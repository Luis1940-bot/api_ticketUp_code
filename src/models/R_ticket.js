const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "r_tickets",
    {
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      hora: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      problema: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // iduser: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      // idcategoria: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      // idarea: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaProgreso: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fechaCompletado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fechaRevisado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fechaAceptado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // idcriticidad: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      progreso: {
        type: DataTypes.INTEGER,
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
