const { Router } = require("express");
const express = require("express");
const db = require("../db.js");
const router = Router();
const bcrypt = require("bcrypt");
const manejoFechas = require("../controllers/manejoFecha");
const jwt = require("jsonwebtoken");
router.use(express.json());
const cors = require("cors");
router.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
router.use(
  express.urlencoded({
    extended: true,
  })
);

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

router.post("/alta_users", async (req, res) => {
  try {
    const {
      name,
      surname,
      datetime,
      password,
      email,
      phone,
      area,
      funcion,
      fecha_nacimiento,
    } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const integrity =
      email.toLowerCase() +
      hash +
      name.toLowerCase() +
      manejoFechas.fecha_yyyy_mm_dd_hh(userFound.datetime);

    const [userCreated, created] = await db.Users.findOrCreate({
      where: {
        email: email.toLowerCase(),
      },
      defaults: {
        email: email.toLowerCase(),
        password: hash,
        name: name.toLowerCase(),
        surname: surname.toLowerCase(),
        phone: phone,
        areaId: area
          ? (
              await db.Areas.findOne({ where: { area: area.toLowerCase() } })
            )?.id
          : null,
        functionId: funcion
          ? (
              await db.Functions.findOne({
                where: { function: funcion.toLowerCase() },
              })
            )?.id
          : null,
        fecha_nacimiento: fecha_nacimiento,
        datetime: manejoFechas.fecha_yyyy_mm_dd_hh(userFound.datetime),
        integrity: integrity,
      },
    });
    if (created) {
      res.status(200).send("User created");
    } else {
      res.status(422).send("Existing User ");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_users", async (req, res) => {
  try {
    const users = await db.Users.findAll({
      include: [
        {
          model: db.Areas,
          attributes: ["area"],
          //required: true,
        },
        {
          model: db.Functions,
          attributes: ["function"],
          //required: true,
        },
      ],
      raw: true,
    });

    if (users.length > 0) {
      res.status(201).json(users);
    } else {
      res.status(422).json("Not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/userdblogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await db.Users.findOne({
      where: {
        email: email.toLowerCase(),
      },
      include: [
        {
          model: db.Areas,
          attributes: ["area"],
          //required: true,
        },
        {
          model: db.Functions,
          attributes: ["function"],
          //required: true,
        },
      ],
      raw: true,
    });

    if (!userFound) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (userFound.active === 0) {
      return res.status(401).json({ error: "User is inactive" });
    }
    if (userFound.validated_email === 0) {
      return res
        .status(401)
        .json({ error: "User email is not validated", id: userFound.id });
    }
    let encrypted = userFound.password;

    bcrypt.compare(password, encrypted, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Error checking password",
        });
      }
      if (!result) {
        return res.status(401).json({ error: "Wrong password" });
      }

      const integrity =
        userFound.email.toLowerCase() +
        userFound.password +
        userFound.name.toLowerCase() +
        manejoFechas.fecha_yyyy_mm_dd_hh(userFound.datetime);

      if (integrity != userFound.integrity) {
        return res.status(401).json({
          error: "Not integrity",
        });
      }
      const userInfoFront = {
        id: userFound.id,
        email: userFound.email,
        name: userFound.name,
        surname: userFound.surname,
        phone: userFound.phone,
        datetime: userFound.datetime,
        firma: userFound.firma,
        admin: userFound.admin,
        photo: userFound.photo,
        userType: userFound.userType,
        fecha_nacimiento: userFound.fecha_nacimiento,
        integrity: userFound.integrity,
        area: userFound["area.area"],
        funcion: userFound["function.function"],
      };

      const tokenFront = jwt.sign({ userInfoFront }, process.env.TOKENKEY, {
        expiresIn: "3h",
      });
      const tokenBack = jwt.sign({ id: userFound.id }, process.env.TOKENKEY, {
        expiresIn: "3h",
      });

      // COOKIE BACKEND
      res.cookie("userBackend", tokenBack, {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //3 hours expiration
        httpOnly: true,
      });
      // COOKIE FRONTEND
      res.cookie(
        "SessionUserClickCare",
        { userId: userFound.id },
        {
          expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //3 hours expiration
          httpOnly: false,
        }
      );
      // RESPONSE
      res.status(200).json({
        message: "Login success",
        token: tokenFront,
        // userInformation: userInfoFront,
      });
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
});

router.get("/userValidationEmail/:id", async (req, res) => {
  let { id } = req.params;
  if (!id || !isNumeric(id)) {
    return res.status(400).json({
      error: "information required for user validation",
    });
  }
  const userFound = await db.Users.findOne({
    where: {
      id: id,
    },
    raw: true,
  });

  if (!userFound) {
    return res.status(401).json({
      error: "User not found",
    });
  }

  if (userFound.validated_email) {
    return res.status(201).json({
      error: "That mail was already validated",
    });
  }
  await db.Users.update(
    {
      validated_email: true,
    },
    {
      where: {
        id: id,
      },
    }
  );
  // sendSimpleEmail(
  //   userFound.email,
  //   "ClickCare - User Validation",
  //   "Your email was successfully validated. Thank you for using ClickCare.",
  //   userFound.name,
  //   userFound.surname
  // );
  return res.status(200).json({
    message: "User validated",
    email: userFound.email,
  });
});

router.get("/get_user_ID/:id", async (req, res) => {
  try {
    console.log("entro");
    let { id } = req.params;
    if (!id || !isNumeric(id)) {
      return res.status(400).json({
        error: "information required for user validation",
      });
    }
    console.log(id);
    const userFound = await db.Users.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.Areas,
          attributes: ["area"],
          //required: true,
        },
        {
          model: db.Functions,
          attributes: ["function"],
          //required: true,
        },
      ],
      raw: true,
    });

    if (!userFound) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (userFound.active === 0) {
      return res.status(401).json({ error: "User is inactive" });
    }
    if (userFound.validated_email === 0) {
      return res
        .status(401)
        .json({ error: "User email is not validated", id: userFound.id });
    }

    const integrity =
      userFound.email.toLowerCase() +
      userFound.password +
      userFound.name.toLowerCase() +
      manejoFechas.fecha_yyyy_mm_dd_hh(userFound.datetime);

    if (integrity != userFound.integrity) {
      return res.status(401).json({
        error: "Not integrity",
      });
    }
    const userInfoFront = {
      id: userFound.id,
      email: userFound.email,
      name: userFound.name,
      surname: userFound.surname,
      phone: userFound.phone,
      datetime: userFound.datetime,
      firma: userFound.firma,
      admin: userFound.admin,
      photo: userFound.photo,
      userType: userFound.userType,
      fecha_nacimiento: userFound.fecha_nacimiento,
      integrity: userFound.integrity,
      area: userFound["area.area"],
      funcion: userFound["function.function"],
    };

    // RESPONSE
    res.status(200).json({
      userInfoFront,
    });
  } catch (error) {
    return res.status(401).json({
      error: error,
    });
  }
});

module.exports = router;
