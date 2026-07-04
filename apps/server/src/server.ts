import app from "./app.js";
import { ENV } from "./config/env.js";

const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(
        `Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
