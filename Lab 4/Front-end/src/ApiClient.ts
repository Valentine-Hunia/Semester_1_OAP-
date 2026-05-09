import { API_BASE_URL } from "./config.js";
import { ApiError, EventResponseDto, CreateEventDto } from "./dtos.js";

async function request<T>(path: string, options: RequestInit = {}, timeoutMs = 10000): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.error?.message || "Помилка сервера",
                details: errorData.error?.code || "UNKNOWN_ERROR"
            } as ApiError;
        }

        if (response.status === 204) return null as T;
        return await response.json();
    } catch (err: any) {
        if (err.name === 'AbortError') throw { status: 0, message: "Таймаут (10с)" } as ApiError;
        if (err.status !== undefined) throw err;
        throw { status: 0, message: "Помилка мережі", details: err.message } as ApiError;
    }
}

export const eventsApi = {
    getAll: () => request<{ items: EventResponseDto[] }>("/events"),
    create: (dto: CreateEventDto) => request<EventResponseDto>("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto)
    }),
    delete: (id: string) => request<void>(`/events/${id}`, { method: "DELETE" })
};