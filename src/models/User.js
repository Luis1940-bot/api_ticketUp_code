const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firma: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      google_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebook_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      twiter_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      validated_email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario",
      },
      fecha_nacimiento: {
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
