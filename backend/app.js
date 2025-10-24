import express from "express";
import cors from "cors";
import { getAll, getById, getByQuery, getBalance } from "./handlers/app.controllers.js";       

const app = express();
const PORT = process.env.PORT || 3130;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/cuentas", getAll); 
app.get("/cuentas/:id", getById);
app.get("/cuentasQuery", getByQuery); 
app.get("/cuentasBalance", getBalance);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});