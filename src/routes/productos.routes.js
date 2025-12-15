import { Router } from "express";
import * as controller from "../controllers/productos.controller.js"

const router = Router();

router.get('/', controller.getProducts);//devuelve tosos los productos
router.post('/create', controller.createProduct); // crear un producto
router.get('/:id', controller.getProductById);// devuelve un producto por id
router.delete('/:id', controller.deleteProductById);//elimina un producto por id

export default router;
