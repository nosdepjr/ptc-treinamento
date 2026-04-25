import express from "express";
import {
  createUser,
  readAllUsers,
  updateUser,
  deleteUser
} from "./controllers/UserController";

const routes = express.Router();

routes.post("/users", createUser);
routes.get("/users", readAllUsers);
routes.patch("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

export default routes;