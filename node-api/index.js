import express from "express";
const app = express();
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Swagger 
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import swaggerAuth from "./middleware/swagger-auth.js";

const swaggerCssOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
    customJs: [
        'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.18.3/swagger-ui-bundle.js',
        'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4.18.3/swagger-ui-standalone-preset.js'
    ],
};

import connectDB from "./config/db.js";
import guestRoutes from "./routes/guest.js";
import productRoutes from "./routes/product.js";

dotenv.config();

// Connect Database 
connectDB();
mongoose.Promise = global.Promise;

// Node Port
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*", credentials: true }));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Swagger Api Docs
app.use("/api-docs", swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerCssOptions));

// Base Route
app.get("/", (req, res) => {
    console.log("success");
    res.send(`Api running .... connected db : ${process.env.MONGO_HOST}`)
});
app.get("/cancel", (req, res) => {
    console.log("cancel");
    res.send(`Api running .... cancelled`)
});
app.get("/success", (req, res) => {
    console.log("success");
    res.send(`Api running .... success`)
});

// API Routes
app.use("/api", guestRoutes);

app.use("/api/product", productRoutes);

app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    if (error.status) {
        return res.json({
            message: error.message,
        });
    }
    return res.json({
        message: "Internal Server Error",
        error: error.message,
    });
});

app.listen(port, () => {
    console.log('Server started at : ' + port)
});