import app from './app.js';
import { env } from './config/index.js';
import { connectDB } from './config/db.js';
import logger from './config/logger.js';

const port = env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err });
    process.exit(1);
  }
})();
