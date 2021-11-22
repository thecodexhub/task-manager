import express from "express";
import { signinController } from "../controllers/auth/signin";
import { signupController } from "../controllers/auth/signup";
import { signoutController } from "../controllers/auth/signout";
import { currentUserController } from "../controllers/auth/current-user";

const router = express.Router();
const authUrl = "/api/v1/users";

router.post(`${authUrl}/signup`, signupController);
router.post(`${authUrl}/signin`, signinController);
router.post(`${authUrl}/signout`, signoutController);
router.get(`${authUrl}/currentuser`, currentUserController);

export { router as authRouter };
