const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


module.exports = (req, res, next) => {
    const routes = req.path;
    const allowedRoutes = [
        "/user/create",
        "/user/login",
        "/iten/create"
    ];
    if (allowedRoutes.includes(routes)) {
        return next();
    }

    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Token não informado" });
    }
    const parts = authHeader.split(" ");
    if (!parts.length === 2) {
        return res.status(401).json({ message: "Formato inválido" });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Seu token não corresponde." });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token não é válido" });
        }
        req.userId = decoded.id;
        return next();
    });
};
