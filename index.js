import "dotenv/config";
import express from "express";
import cors from "cors";
 import productsRouter from "./src/routes/productos.routes.js"
 import authRouter from "./src/routes/auth.routes.js"
 import auth from "./src/middlewares/auth.middleware.js";
import rutaDesconocida from "./src/middlewares/rutaDesconocida.middleware.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Productos APIrest V" + process.env.VERSION + " .Luciano Ravainera" });
});

 app.use("/auth", authRouter);
 app.use("/api/products", auth, productsRouter);



 app.use(rutaDesconocida);

const PORT = process.env.PORT;
console.log('Servidor iniciado en el puerto', PORT );
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
