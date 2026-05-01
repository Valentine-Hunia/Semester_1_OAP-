import { all, get, run } from "../db/dbClient.js";
import { EventResponseDto } from "../dtos/events.dto.js";

export const eventsRepository = {
  findAll: async (title?: string): Promise<EventResponseDto[]> => {
    let sql = `SELECT * FROM Events ORDER BY createdAt DESC;`;
    
    if (title) {
      sql = `SELECT * FROM Events WHERE title LIKE '%${title}%' ORDER BY createdAt DESC;`;
    }
    
    return await all<EventResponseDto>(sql);
  },

  findById: async (id: string): Promise<EventResponseDto | undefined> => {
    return await get<EventResponseDto>(`SELECT * FROM Events WHERE id = '${id}';`);
  },

  add: async (event: EventResponseDto): Promise<EventResponseDto> => {
    await run(`
      INSERT INTO Events (id, title, date, location, capacity, createdAt)
      VALUES ('${event.id}', '${event.title}', '${event.date}', '${event.location}', ${event.capacity}, '${event.createdAt}');
    `);
    
    const createdEvent = await get<EventResponseDto>(`SELECT * FROM Events WHERE id = '${event.id}';`);
    return createdEvent as EventResponseDto;
  },

  remove: async (id: string): Promise<boolean> => {
    const result = await run(`DELETE FROM Events WHERE id = '${id}';`);
    return result.changes > 0;
  },

  getStats: async (): Promise<{ totalEvents: number; totalCapacity: number }> => {
    const stats = await get<any>(`SELECT COUNT(id) as totalEvents, SUM(capacity) as totalCapacity FROM Events;`);
    return stats || { totalEvents: 0, totalCapacity: 0 };
  }
};