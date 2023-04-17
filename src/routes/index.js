import { testRoute } from "./testRoute";
import { config } from "dotenv";
import { signUpRoute } from "./signUpRoutes";
import { LoginRoute } from "./loginRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";

config();
console.log(process.env.DB_URI);

export const routes = [testRoute, signUpRoute, LoginRoute, updateUserInfoRoute];
