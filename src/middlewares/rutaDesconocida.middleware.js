const rutaDesconocida = (req, res, next) => {
    res.status(404).json({ error: "404 || NotFound. Ruta no encontrada" });
};

export default rutaDesconocida;