import app from "./app.js";
import { ENV } from "./config/env.js";
import { startNotificationCron } from "./modules/notification/notification.cron.js";

const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => {
      console.log(
        `Server is running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`,
      );
      // Initialize background jobs
      startNotificationCron();
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
