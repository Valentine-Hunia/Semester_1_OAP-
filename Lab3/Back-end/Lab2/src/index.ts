import express from "express";
import eventRoutes from "./routes/events.routes.js";
import userRoutes from "./routes/users.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { initDb } from "./db/initDb.js"; 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

async function start() {
  try {
    console.log("Починаємо ініціалізацію БД...");
    await initDb(); 
    
    app.listen(PORT, () => {
      console.log(`Сервер запущено на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Помилка старту сервера:", err);
    process.exit(1);
  }
}

start();