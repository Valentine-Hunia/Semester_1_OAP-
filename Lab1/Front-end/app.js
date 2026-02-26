let events = [];

const eventForm = document.getElementById('eventForm');
const tableBody = document.getElementById('tableBody');
const resetBtn = document.getElementById('resetBtn');



eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dto = readForm();
    
    if (validate(dto)) {
        addEvent(dto); 
        renderTable();
        eventForm.reset();
        clearErrors();
    }
});

resetBtn.addEventListener('click', () => {
    console.log("Кнопка Очистити натиснута!")
    eventForm.reset();
    clearErrors();
});

function readForm() {
    return {
        title: document.getElementById('titleInput').value.trim(),
        date: document.getElementById('dateInput').value,
        location: document.getElementById('locationInput').value.trim(),
        capacity: document.getElementById('capacityInput').value
    };
}

function validate(dto) {
    let isValid = true;
    clearErrors();

    if (dto.title.length < 3) {
        showError('titleInput', 'titleError', 'Назва має бути не менше 3-х символів');
        isValid = false;
    }
    if (!dto.date) {
        showError('dateInput', 'dateError', 'Будь ласка, оберіть дату');
        isValid = false;
    }
    if (!dto.capacity || dto.capacity < 1 || dto.capacity > 500) {
        showError('capacityInput', 'capacityError', 'Вкажіть число від 1 до 500');
        isValid = false;
    }

    return isValid;
}

function addEvent(dto) {
    const newEvent = {
        ...dto,
        id: Date.now()
    };
    events.push(newEvent);
}

function deleteEvent(id) {
    events = events.filter(item => item.id !== id);
    renderTable();
}

// --- Функції рендерингу (Render) ---

function renderTable() {
    let htmlContent = "";

    events.forEach((item) => {
        htmlContent += `
            <tr>
                <td>${item.title}</td>
                <td>${item.date}</td>
                <td>${item.location}</td>
                <td>${item.capacity}</td>
                <td>
                    <button class="delete-btn" onclick="deleteEvent(${item.id})">Видалити</button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = htmlContent;
}

function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}

function clearErrors() {
    const inputs = eventForm.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('invalid'));
    
    const errorTexts = eventForm.querySelectorAll('.error-text');
    errorTexts.forEach(p => p.textContent = "");
}