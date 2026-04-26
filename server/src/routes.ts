import express from "express";
import {
  createUser,
  readAllUsers,
  countUsers,
  updateUser,
  deleteUser
} from "./controllers/UserController";

const routes = express.Router();

routes.post("/users", createUser);
routes.get("/users", readAllUsers);
routes.get("/users/count", countUsers);
routes.patch("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

export default routes;