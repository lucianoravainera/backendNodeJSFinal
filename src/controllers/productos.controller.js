import * as service from "../services/productos.services.js"


// GET - /api/products
export const getProducts = async (req, res) => {
    try {
        let products;     
            products = await service.getProducts();
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};


// POST - /api/products/create
export const createProduct = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "El cuerpo  esta vacio" });
    }

    const { name, price } = req.body;

    if (name === undefined) {
        return res.status(422).json({ error: "El campo 'name' es obligatorio" });
    }

    if (price === undefined) {
        return res.status(422).json({ error: "El campo 'price' es obligatorio" });
    }

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(422).json({
            error: "El campo 'name' no debe ser un string no vacío"
        });
    }

    if (typeof price !== 'number' || isNaN(price)) {
        return res.status(422).json({
            error: "El campo 'price' debe ser un numero valido"
        });
    }

    try {
        const tienda = "Ravainera store"; // Valor predeterminado para el campo 'tienda'
        const newProduct = await service.createProduct({ name, price, tienda });
        if (!newProduct) {
            return res.status(400).json({ error: "No se pudo crear el producto. Verificar los datos" });
        }
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};


// GET - /api/products/:id
export const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "El ID del producto es oblogatorio" });
    }

    try {
        const product = await service.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "No se encontro el producto" });
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}



// DELETE - /api/products/:id
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "El ID del producto es oblogatorio" });
    }

    try {
        const deleted = await service.deleteProductById(id);
        if (!deleted) {
            return res.status(404).json({ error: "No se encontro el producto" });
        }
        res.status(200).json({ message: "Producto eliminado!" });

    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}
