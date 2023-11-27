import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3030,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  timezone: "Z",
});

connection.connect((err) => {
  if (err) {
    logger.info(`Database Connection ${err}`);
    return;
  }
  logger.info("Connected to MySQL Database");
});

export default connection;
