import { Router } from "express";
import AuthController from "../controllers/AuthController";

const routes = Router();

routes.use("/login", AuthController.login);

export default routes;
