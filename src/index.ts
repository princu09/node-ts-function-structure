import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./middleware/_db";
import successMiddleware from "./middleware/successMiddleware";
import { jwtChecker } from "@northfoxgroup/node-utils";


jwtChecker.setup(() => "f2574c7b313606aad069c4df76b44279489c51cb");

const customFunction = async (user: any) => {
  if (user.email === "prince2@yopmail.com") {
    return true;
  } else {
    return false;
  }
};

jwtChecker.setupCustomFunction(customFunction);

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Express configuration - middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());

// Express configuration for success middleware
app.use(successMiddleware);

// Server setup
const port = process.env.PORT || 3001;
const server = http.createServer(app);

// Start Express server
server.listen(port, () => {
  console.log(`Server started on ${process.env.BASE_URL}:${port}/`);
});

// Connect to MSSQL Server
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MSSQL Server");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to MSSQL Server:", err);
  });

// Routes
import allRoutes from "./routes/index";

app.use("/api", allRoutes);
