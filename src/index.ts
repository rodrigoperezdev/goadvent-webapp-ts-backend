import express, { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("¡Bienvenido a la API de Travel!");
});

app.get("/api/v1/destinos", (req: Request, res: Response) => {
  res.json([
    { id: 1, name: "Ciudad de México" },
    { id: 2, name: "Medellín" },
    { id: 3, name: "Buenos Aires" },
  ]);
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
