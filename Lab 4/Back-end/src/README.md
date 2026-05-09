[cite_start]Як запустити проєкт
1. [cite_start]Встановити залежності: `npm install`
2. [cite_start]Запустити в режимі розробки: `npm run dev`
3. [cite_start]Зібрати проєкт: `npm run build`

Зупинка серверу
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

1. Створення нової події 
$body = @{
    title = "Cyber Security Lab"
    date = "2026-03-25"
    location = "FIT KNU"
    capacity = 50
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/events" -Method Post -Body $body -ContentType "application/json"

2. Перевірка коду: $response = Invoke-WebRequest -Uri "http://localhost:3000/api/events" -Method Post -Body $body -ContentType "application/json"
>> $response.StatusCode

3. Отримання списку подій з фільтрацією та пагінацією
Invoke-RestMethod -Uri "http://localhost:3000/api/events" -Method Get

4. Перевірка валідації (400 Bad Request)
$badBody = @{ title = "Ab"; capacity = 10 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/events" -Method Post -Body $badBody -ContentType "application/json"