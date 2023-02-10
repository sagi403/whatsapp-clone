import express from "express";
import helmet from "helmet";
import { keys, checkEnvVariables } from "./keys.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieSession from "cookie-session";

const app = express();

app.use(helmet());
app.use(express.json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

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
