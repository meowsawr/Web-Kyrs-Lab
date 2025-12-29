document.addEventListener('DOMContentLoaded', () => {
    // 1. Навигация по меню и выделение разделов ===
    const menuLinks = document.querySelectorAll('menu a');
    let currentHighlightedSection = null;

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentHighlightedSection) {
                currentHighlightedSection.style.backgroundColor = '';
            }
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.backgroundColor = '#FFF9E6';
                currentHighlightedSection = targetSection;
            }
        });
    });

    // 2. Выделение столбца таблицы ===
    const table = document.querySelector('#table-section table');
    let currentlyHighlightedColumn = null;

    if (table) {
        const headers = table.querySelectorAll('thead th');
        headers.forEach((header, colIndex) => {
            header.addEventListener('click', () => {
                if (currentlyHighlightedColumn === colIndex) {
                    removeColumnHighlight();
                    currentlyHighlightedColumn = null;
                    return;
                }
                removeColumnHighlight();
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cell = row.children[colIndex];
                    if (cell) {
                        cell.style.boxShadow = 'inset 0 0 0 3px #23746B';
                    }
                });
                currentlyHighlightedColumn = colIndex;
            });
        });
    }

    function removeColumnHighlight() {
        if (!table) return;
        const allCells = table.querySelectorAll('tbody td');
        allCells.forEach(cell => cell.style.boxShadow = '');
    }

    // 3. Клик по <aside> → alert ===
    document.querySelectorAll('aside').forEach(aside => {
        aside.addEventListener('click', () => {
            alert(aside.innerText.trim() || 'Нет данных');
        });
    });

    // 4. Обработка формы ===
    const form = document.querySelector('#form form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const resetBtn = form.querySelector('button[type="reset"]');

    // Отменяем стандартное поведение кнопки "Сбросить"
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault(); // ← КЛЮЧЕВОЙ МОМЕНТ: отменяем сброс по умолчанию
            const fields = form.querySelectorAll('input, textarea, select');

            if (confirm('Вы уверены, что хотите сбросить форму?')) {
                // Мигаем красным → затем сбрасываем
                flashFields(fields, 'red', () => {
                    form.reset(); // ← сброс после анимации
                });
            } else {
                // Мигаем зелёным, сброса нет
                flashFields(fields, 'green');
            }
        });
    }

    // Обработка отправки
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll('input, textarea, select');
        flashFields(fields, 'blue', () => {
            alert('Данные отправлены!');
        });
    });

    // Вспомогательная функция для "мигания" фона полей
    function flashFields(fields, color, callback = null) {
        const originalColors = Array.from(fields).map(field => field.style.backgroundColor || '');
        fields.forEach(field => {
            field.style.backgroundColor = color;
        });

        setTimeout(() => {
            fields.forEach((field, i) => {
                field.style.backgroundColor = originalColors[i] || '';
            });
            if (callback) callback();
        }, 1000);
    }
});