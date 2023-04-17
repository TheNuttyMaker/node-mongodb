import { getDbConnection, findUserByEmail, createUser } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    let user;
    console.log("DB connection");
    const db = getDbConnection("react-auth-db");
    try {
      console.log("Find User");
      user = await findUserByEmail(db, email);
      console.log(user);
    } catch (err) {
      console.log("Error is: " + err);
    }
    console.log("user" + user);

    if (user) {
      console.error("User already exists");
      res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await createUser(db, {
      email,
      passwordHash,
      info: startingInfo,
      isVerified: false,
    });

    const { insertedId } = result;

    jwt.sign(
      {
        id: insertedId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          console.error("There's an error" + err);
          return res.status(500).send(err);
        }
        console.log("Success! Sending token" + token);
        res.status(200).json({ token });
      }
    );
  },
};
