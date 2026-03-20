import { eventsRepository } from "../repositories/events.repository.js";
import { CreateEventDto, EventResponseDto } from "../dtos/events.dto.js";

export const eventsService = {
  getEvents: (title?: string, page = 1, limit = 5) => {
    let items = eventsRepository.findAll();

    if (title) {
      const search = title.toLowerCase();
      items = items.filter((e) => e.title.toLowerCase().includes(search));
    }

    const total = items.length;
    const skip = (page - 1) * limit;
    const paginatedItems = items.slice(skip, skip + limit);

    return {
      items: paginatedItems,
      total,
      page,
      limit
    };
  },

  create: (dto: CreateEventDto): EventResponseDto => {
    if (!dto.title || dto.title.length < 3) {
      throw new Error("VALIDATION:Назва події має бути не менше 3 символів");
    }
    if (dto.capacity < 1 || dto.capacity > 500) {
      throw new Error("VALIDATION:Місткість має бути в межах 1-500");
    }

    const newEvent: EventResponseDto = {
      ...dto,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    return eventsRepository.add(newEvent);
  },

  getById: (id: string) => {
    const event = eventsRepository.findById(id);
    if (!event) throw new Error("NOT_FOUND:Подію не знайдено");
    return event;
  },

  delete: (id: string) => {
    const deleted = eventsRepository.remove(id);
    if (!deleted) throw new Error("NOT_FOUND:Неможливо видалити неіснуючу подію");
    return true;
  }
};