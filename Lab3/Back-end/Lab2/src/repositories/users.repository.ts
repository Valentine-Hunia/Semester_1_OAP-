import { UserResponseDto } from "../dtos/users.dto.js";

let users: UserResponseDto[] = [];

export const usersRepository = {
  findAll: (): UserResponseDto[] => {
    return users;
  },

  findById: (id: string): UserResponseDto | undefined => {
    return users.find((u) => u.id === id);
  },

  create: (user: UserResponseDto): UserResponseDto => {
    users.push(user);
    return user;
  },

  delete: (id: string): boolean => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};