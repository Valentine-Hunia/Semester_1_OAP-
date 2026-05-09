import { eventsRepository } from "../repositories/events.repository.js";
import { CreateEventDto, EventResponseDto } from "../dtos/events.dto.js";
import crypto from "crypto";

export const eventsService = {
  getStats: async () => await eventsRepository.getStats(),
  getEvents: async (title?: string, page = 1, limit = 5) => {
    const items = await eventsRepository.findAll(title);

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

  create: async (dto: CreateEventDto): Promise<EventResponseDto> => {
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

    return await eventsRepository.add(newEvent);
  },

  getById: async (id: string) => {
    const event = await eventsRepository.findById(id);
    if (!event) throw new Error("NOT_FOUND:Подію не знайдено");
    return event;
  },

  delete: async (id: string) => {
    const deleted = await eventsRepository.remove(id);
    if (!deleted) throw new Error("NOT_FOUND:Неможливо видалити неіснуючу подію");
    return true;
  }
};