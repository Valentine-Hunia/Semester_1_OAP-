export interface EventResponseDto {
    id: string;
    title: string;
    date: string;
    location: string;
    capacity: number;
    createdAt: string;
}

export interface CreateEventDto {
    title: string;
    date: string;
    location: string;
    capacity: number;
}

export interface ApiError {
    status: number;
    message: string;
    details?: string;
}