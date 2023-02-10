import dotenv from "dotenv";

dotenv.config();

const keys = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

const checkEnvVariables = keys => {
  for (let key in keys) {
    if (!keys[key]) {
      throw new Error(`${key} must be defined`);
    }
  }
};

export { keys, checkEnvVariables };
