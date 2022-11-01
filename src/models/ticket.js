const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "tickets",
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
        defaultValue: "abierto", //abierto-generado-completado-revision-aceptado
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
      }, //ubicacion geográfica por coordenadas
      progreso: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // 0 -25 -50 -100 el progreso de avance de resolución
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
