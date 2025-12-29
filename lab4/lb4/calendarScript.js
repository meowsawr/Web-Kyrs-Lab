// Глобальные переменные
let currentDate = new Date();
let selectedDate = null;
let tasks = {}; // Объект для хранения задач { "2024-12-25": ["Задача 1", "Задача 2"] }

// Загрузка задач из localStorage
function loadTasks() {
    const saved = localStorage.getItem('organizerTasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            tasks = {};
        }
    }
}

// Сохранение задач в localStorage
function saveTasks() {
    localStorage.setItem('organizerTasks', JSON.stringify(tasks));
}

// Получение ключа даты в формате YYYY-MM-DD
function getDateKey(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function getRussianMonth(monthIndex) {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                   'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months[monthIndex];
}

function getRussianWeekday(dayIndex) {
    const weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
                     'Четверг', 'Пятница', 'Суббота'];
    return weekdays[dayIndex];
}

// Проверка, является ли дата сегодняшней
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function renderCalendar() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYearEl = document.getElementById('current-month-year');
    
    monthYearEl.textContent = `${getRussianMonth(currentDate.getMonth())} ${currentDate.getFullYear()}`;
    
    // Очищаем таблицу
    calendarBody.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Первый день месяца
    const firstDay = new Date(year, month, 1);
    // Последний день месяца
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // День недели первого дня (воскресенье = 0)
    let firstDayOfWeek = firstDay.getDay();
    // Делаем понедельник первым днем недели
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;
    
    let date = 1;
    
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 1; j <= 7; j++) {
            const cell = document.createElement('td');
            
            // Пустые ячейки в начале месяца
            if (i === 0 && j < firstDayOfWeek) {
                cell.className = 'empty';
            } 
            // Пустые ячейки после последнего дня
            else if (date > daysInMonth) {
                cell.className = 'empty';
            } 
            // Ячейки с днями
            else {
                const dayDate = new Date(year, month, date);
                const dateKey = getDateKey(dayDate);
                
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = date;
                
                cell.appendChild(dayNumber);
                
                cell.setAttribute('data-date', dateKey);
                
                // Проверяем, сегодня ли это
                if (isToday(dayDate)) {
                    cell.className = 'day today';
                } else {
                    cell.className = 'day';
                }
                
                // Проверяем, есть ли задачи на эту дату
                if (tasks[dateKey] && tasks[dateKey].length > 0) {
                    cell.classList.add('has-tasks');
                }
                
                // Обработчик клика
                cell.addEventListener('click', () => showTasksForDate(dateKey, dayDate));
                
                date++;
            }
            
            row.appendChild(cell);
        }
        
        calendarBody.appendChild(row);
        
        // Если все дни отображены, выходим из цикла
        if (date > daysInMonth) {
            break;
        }
    }
}

// Показать задачи для выбранной даты
function showTasksForDate(dateKey, date) {
    selectedDate = dateKey;
    
    const modal = document.getElementById('tasks-modal');
    const dateTitle = document.getElementById('selected-date');
    const tasksList = document.getElementById('tasks-list');
    const noTasks = document.getElementById('no-tasks');
    
    const dateStr = `${getRussianWeekday(date.getDay())}, ${date.getDate()} ${getRussianMonth(date.getMonth()).toLowerCase()} ${date.getFullYear()} года`;
    dateTitle.textContent = `Задачи на ${dateStr}`;
    
    const dateTasks = tasks[dateKey] || [];
    
    if (dateTasks.length === 0) {
        // Нет задач
        tasksList.innerHTML = '';
        noTasks.style.display = 'block';
    } else {
        // Есть задачи
        noTasks.style.display = 'none';
        
        // Создаем элементы списка
        let tasksHTML = '';
        dateTasks.forEach((task, index) => {
            tasksHTML += `
                <li class="task-item">
                    <span class="task-text">${task}</span>
                    <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
                </li>
            `;
        });
        
        tasksList.innerHTML = tasksHTML;
    }
    
    modal.style.display = 'block';
}

// Добавить задачу
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (!taskText || !selectedDate) return;
    
    // Создаем массив задач для даты, если его еще нет
    if (!tasks[selectedDate]) {
        tasks[selectedDate] = [];
    }
    
    // Добавляем задачу
    tasks[selectedDate].push(taskText);
    
    saveTasks();
    
    showTasksForDate(selectedDate, new Date(selectedDate));
    renderCalendar();
    
    // Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();
}

// Удалить задачу
function deleteTask(index) {
    if (!tasks[selectedDate] || index >= tasks[selectedDate].length) return;
    
    // Удаляем задачу
    tasks[selectedDate].splice(index, 1);
    
    if (tasks[selectedDate].length === 0) {
        delete tasks[selectedDate];
    }
    
    saveTasks();
    
    // Обновляем отображение
    showTasksForDate(selectedDate, new Date(selectedDate));
    renderCalendar();
}

// Скрыть модальное окно
function hideModal() {
    const modal = document.getElementById('tasks-modal');
    modal.style.display = 'none';
}

// Изменить месяц
function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем задачи
    loadTasks();
    
    // Инициализируем кнопки
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
    document.getElementById('close-modal').addEventListener('click', hideModal);
    document.getElementById('add-task-btn').addEventListener('click', addTask);
    
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('tasks-modal');
        if (event.target === modal) {
            hideModal();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModal();
        }
    });
    
    document.getElementById('new-task').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    renderCalendar();
});