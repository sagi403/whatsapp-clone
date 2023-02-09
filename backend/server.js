import express from "express";
import helmet from "helmet";
import { keys, checkEnvVariables } from "./keys.js";
import connectDB from "./config/db.js";

const app = express();

app.use(helmet());

checkEnvVariables(keys);
connectDB();

const PORT = keys.port || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${keys.nodeEnv} mode on port ${PORT}`)
);
