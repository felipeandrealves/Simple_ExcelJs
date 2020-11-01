import { Router } from "express";

import excelController from "./app/controllers/excel.controller";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Bem vindo a API Teste de excel" });
});

routes.post("/excel/users", excelController.create);

export default routes;
