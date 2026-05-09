import { ApiError, EventResponseDto } from "./dtos.js";


export function renderStatus(status: "loading" | "success" | "empty" | "error", error?: ApiError) {
    const el = document.getElementById("listStatus");
    if (!el) return;

    if (status === "loading") {
        el.innerHTML = "Завантаження подій...";
    } else if (status === "empty") {
        el.innerHTML = "Поки що немає жодної події.";
    } else if (status === "error") {
        el.innerHTML = `Помилка (${error?.status || 0}): ${error?.message || "Невідома помилка"}`;
    } else {
        el.innerHTML = "";
    }
}

export function renderTable(items: EventResponseDto[], onDelete: (id: string) => void | Promise<void>) {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;

    tableBody.innerHTML = items.map(item => `
        <tr>
            <td>${item.title}</td>
            <td>${item.date}</td>
            <td>${item.location}</td>
            <td>${item.capacity}</td>
            <td>
                <button class="delete-btn" data-id="${item.id}">Видалити</button>
            </td>
        </tr>
    `).join("");

    tableBody.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = (e.target as HTMLElement).dataset.id;
            if (id && confirm("Ви впевнені, що хочете видалити цю подію?")) {
                onDelete(id);
            }
        });
    });
}