import { Router } from "express";
import { login } from "../controllers/auth.controller";

const loginRoute = Router();

loginRoute.route('/login').post(login);

export default loginRoute;