import jwt from "jsonwebtoken";
import { findAndUpdateUser, getDbConnection } from "../db";

export const updateUserInfoRoute = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    console.log("DB connection");
    const db = getDbConnection("react-auth-db");

    const updates = (({ favoriteFood, hairColor, bio }) => ({
      favoriteFood,
      hairColor,
      bio,
    }))(req.body);

    if (!authorization) {
      res.status(401).json({ message: "No Authorization header sent" });
    }

    // Only toke torn and remove the Bearer part
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unable to verify" });
      }

      const { id } = decoded;

      if (id !== userId) {
        return res
          .status(403)
          .json({ message: "Not allowed to update another User data" });
      }

      const { email, isVerified, info } = await findAndUpdateUser(
        db,
        id,
        updates
      );

      jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            return res.status(200).json(err);
          }
          res.status(200).json({ token });
        }
      );
    });
  },
};
