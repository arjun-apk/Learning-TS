//Required External Modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.route";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import logger from "./logger";
import connection from "./database";
import executeQuery from "./executeQuery";

dotenv.config();

// App Variables
if (!process.env.EXPOSE_PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.EXPOSE_PORT as string, 10);
const hostName: string = process.env.IDENTITY_ISSUER_URL as string;
const nodeEnvironment: string = process.env.NODE_ENV as string;
const appVersion: string = process.env.NODE_ENV as string;

logger.info(`Node Environment : ${nodeEnvironment}`);
logger.info(`App Version : ${appVersion}`);

const app = express();

// App Configuration
app.use(helmet());
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});
app.use("/api/menu/items", itemsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

//Server Activation
app.listen(port, hostName, () => {
  logger.info(
    `Server is running at http://${hostName}:${port} - ${nodeEnvironment}`
  );
});
