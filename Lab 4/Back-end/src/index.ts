import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.routes.js";
import userRoutes from "./routes/users.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { initDb } from "./db/initDb.js"; 

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS: origin not allowed"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// 3. РЕШТА MIDDLEWARE
app.use(express.json());
app.use(loggerMiddleware);

// Маршрути
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
    console.error("Помилка старту сервера:", err);
    process.exit(1);
  }
}

start();