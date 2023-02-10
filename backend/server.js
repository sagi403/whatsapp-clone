import express from "express";
import helmet from "helmet";
import { keys, checkEnvVariables } from "./keys.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(express.json());

checkEnvVariables(keys);
connectDB();

app.use("/api/users", userRoutes);

const PORT = keys.port || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${keys.nodeEnv} mode on port ${PORT}`)
);

app.use(notFound);
app.use(errorHandler);
