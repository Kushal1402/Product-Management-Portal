const swaggerAuth = async (req, res, next) => {
    const auth = {
        login: process.env.SWAGGER_USER,
        password: process.env.SWAGGER_PASSWORD,
    };

    const swaggerauth = (req.headers.authorization || "").split(" ")[1] || "";

    const getUserData = Buffer.from(swaggerauth, "base64").toString().split(":");

    const login = getUserData[0];
    const password = getUserData[1];

    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }

    res.set("WWW-Authenticate", 'Basic realm="My Swagger API"');
    res.status(401).send("Authentication required.");
};

export default swaggerAuth;