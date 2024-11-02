import {default as express } from "express";
import * as userController from "../controllers/userController.mjs";

const router = express.Router();

router.get("/", userController.login);
router.get("/signup", userController.signup);

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);


export default router;
