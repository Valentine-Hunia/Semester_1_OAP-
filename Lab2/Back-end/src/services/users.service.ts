import { usersRepository } from "../repositories/users.repository.js";
import { CreateUserDto, UserResponseDto } from "../dtos/users.dto.js";

export const usersService = {
  getAll: () => usersRepository.findAll(),

  create: (dto: CreateUserDto): UserResponseDto => {
    if (!dto.email.includes("@")) {
      throw new Error("VALIDATION:Некоректний формат email");
    }

    const newUser: UserResponseDto = {
      ...dto,
      id: crypto.randomUUID()
    };

    return usersRepository.create(newUser);
  },

  delete: (id: string) => usersRepository.delete(id)
};