import express from "express";
import { login, users } from "../controllers/authController";
import { jwtChecker } from "@northfoxgroup/node-utils";

jwtChecker.setup(() => "f2574c7b313606aad069c4df76b44279489c51cb");

const customFunction = async (user: any) => {
  if (user.email === "prince2@yopmail.com") {
    return true;
  } else {
    return false;
  }
};

jwtChecker.setupCustomFunction(customFunction);

// create router
const router = express.Router();

router.post("/login", login);

router.get("/users", jwtChecker.checker, users);

export default router;

// No inputs were found in config file '/Users/princu09/Desktop/node-typescript-structure/node_modules/@northfoxgroup/node-utils/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '["./dist"]'.
