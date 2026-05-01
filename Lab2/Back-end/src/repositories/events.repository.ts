import { EventResponseDto } from "../dtos/events.dto.js";

let events: EventResponseDto[] = [];

export const eventsRepository = {
  findAll: () => events,
  findById: (id: string) => events.find(e => e.id === id),
  add: (event: EventResponseDto) => {
    events.push(event);
    return event;
  },
  remove: (id: string) => {
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events.splice(index, 1);
      return true;
    }
    return false;
  }
};