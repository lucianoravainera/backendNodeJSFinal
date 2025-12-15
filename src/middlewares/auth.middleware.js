import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No se encontro el Token" });

    jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) return res.status(401).json({ error: "Token error: Invalido" });
        next();
    });
};

export default auth;