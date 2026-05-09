console.log("=== СКРИПТ УСПІШНО ЗАПУСТИВСЯ ===");
console.log("Чи бачить JS форму?", document.getElementById('eventForm'));
import { eventsApi } from "./ApiClient.js";
import { renderStatus, renderTable } from "./ui.js";
import { EventResponseDto, CreateEventDto, ApiError } from "./dtos.js";

const eventForm = document.getElementById('eventForm') as HTMLFormElement;
const submitBtn = eventForm?.querySelector('button[type="submit"]') as HTMLButtonElement;

async function loadList() {
    renderStatus("loading"); 
    
    try {
        const data = await eventsApi.getAll();
        const items: EventResponseDto[] = data.items || [];

        if (items.length === 0) {
            renderStatus("empty");
            renderTable([] as EventResponseDto[], deleteEvent);
        } else {
            renderStatus("success");
            renderTable(items, deleteEvent);
        }
    } catch (err: any) {
        renderStatus("error", err as ApiError);
        renderTable([] as EventResponseDto[], deleteEvent);
    }
}


async function deleteEvent(id: string) {
    try {
        await eventsApi.delete(id);
        await loadList();
    } catch (err: any) {
        alert(`Помилка при видаленні: ${err.message}`);
    }
}


const mySubmitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;

if (mySubmitBtn) {
    mySubmitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('titleInput') as HTMLInputElement;
        const dateInput = document.getElementById('dateInput') as HTMLInputElement;
        const locationInput = document.getElementById('locationInput') as HTMLInputElement;
        const capacityInput = document.getElementById('capacityInput') as HTMLInputElement;

        const titleError = document.getElementById('titleError');
        const dateError = document.getElementById('dateError');
        const locationError = document.getElementById('locationError');
        const capacityError = document.getElementById('capacityError');

        if(titleError) titleError.textContent = "";
        if(dateError) dateError.textContent = "";
        if(locationError) locationError.textContent = "";
        if(capacityError) capacityError.textContent = "";

        let hasError = false;

        if (!titleInput || !titleInput.value.trim()) {
            if(titleError) titleError.textContent = "Будь ласка, введіть назву події.";
            hasError = true;
        }
        if (!dateInput || !dateInput.value) {
            if(dateError) dateError.textContent = "Будь ласка, оберіть дату.";
            hasError = true;
        }
        if (!locationInput || !locationInput.value.trim()) {
            if(locationError) locationError.textContent = "Будь ласка, введіть локацію проведення.";
            hasError = true;
        }
        if (!capacityInput || Number(capacityInput.value) <= 0) {
            if(capacityError) capacityError.textContent = "Місткість повинна бути більшою за 0.";
            hasError = true;
        }

        if (hasError) return;

        const dto: CreateEventDto = {
            title: titleInput.value.trim(),
            date: dateInput.value,
            location: locationInput.value.trim(),
            capacity: Number(capacityInput.value)
        };

        try {
            mySubmitBtn.disabled = true;
            
            await eventsApi.create(dto); 
            
            titleInput.value = "";
            dateInput.value = "";
            locationInput.value = "";
            capacityInput.value = "";
            
            await loadList(); 
        } catch (err: any) {
            const noticeBlock = document.getElementById('notice');
            if (noticeBlock) {
                noticeBlock.textContent = `Помилка сервера: ${err.message}`;
                noticeBlock.style.color = "red";
            } else {
                console.error("Помилка створення:", err.message);
            }
        } finally {
            mySubmitBtn.disabled = false;
        }
    });
}

const resetBtn = document.getElementById('resetBtn');

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('titleInput') as HTMLInputElement;
        const dateInput = document.getElementById('dateInput') as HTMLInputElement;
        const locationInput = document.getElementById('locationInput') as HTMLInputElement;
        const capacityInput = document.getElementById('capacityInput') as HTMLInputElement;

        if(titleInput) titleInput.value = "";
        if(dateInput) dateInput.value = "";
        if(locationInput) locationInput.value = "";
        if(capacityInput) capacityInput.value = "";
    });
}

loadList();