export interface CreateEventDto {
  title: string;
  date: string;
  location: string;
  capacity: number;
}

export interface EventResponseDto extends CreateEventDto {
  id: string;
  createdAt: string;
}