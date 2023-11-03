import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const sequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_SERVER,
    dialect: "mssql",
    logging: false,
    dialectOptions: {
      options: {
        encrypt: true, // Enable if using Azure SQL
      },
    },
  }
);

export { sequelize };
