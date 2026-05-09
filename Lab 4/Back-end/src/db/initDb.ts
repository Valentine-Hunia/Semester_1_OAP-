import { run } from "./dbClient.js";

export async function initDb() {
  await run("PRAGMA foreign_keys = ON;");

  // Користувачі
  await run(`
    CREATE TABLE IF NOT EXISTS Users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS Events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT NOT NULL,
      capacity INTEGER NOT NULL CHECK (capacity > 0), -- Обмеження CHECK 
      createdAt TEXT NOT NULL
    );
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS Registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventId TEXT NOT NULL,
      userId TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (eventId) REFERENCES Events (id) ON DELETE CASCADE, 
      FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE RESTRICT    
    );
  `);

  console.log("DB schema initialized");
}