import express from "express";
import {
  createUser,
  readAllUsers,
  countUsers,
  updateUser,
  deleteUser
} from "./controllers/UserController";
import {
  createCalcado,
  readAllCalcados,
  updateCalcado,
  deleteCalcado,
  countEstoque
} from "./controllers/CalcadoController";

const routes = express.Router();

routes.post("/users", createUser);
routes.get("/users", readAllUsers);
routes.get("/users/count", countUsers);
routes.patch("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

routes.post("/calcados", createCalcado);
routes.get("/calcados", readAllCalcados);
routes.get("/calcados/estoque", countEstoque);
routes.patch("/calcados/:id", updateCalcado);
routes.delete("/calcados/:id", deleteCalcado);

export default routes;