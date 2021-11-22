import express from "express";
import { body } from "express-validator";

import { signinController } from "../controllers/auth/signin";
import { signupController } from "../controllers/auth/signup";
import { signoutController } from "../controllers/auth/signout";
import { currentUserController } from "../controllers/auth/current-user";

const router = express.Router();
const authUrl = "/api/v1/users";

router.post(
  `${authUrl}/signup`,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  signupController
);

router.post(`${authUrl}/signin`, signinController);
router.post(`${authUrl}/signout`, signoutController);
router.get(`${authUrl}/currentuser`, currentUserController);

export { router as authRouter };
