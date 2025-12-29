$(document).ready(function() {
    // 4. Выделение раздела при выборе пункта меню
    let $currentSection = null;
    
    $('nav a').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        const $targetSection = $(targetId);
        
        if ($targetSection.length) {
            // Плавная прокрутка к разделу
            $('html, body').animate({
                scrollTop: $targetSection.offset().top - 100
            }, 500);
            
            // Сброс предыдущего выделения
            if ($currentSection) {
                $currentSection.css('background-color', '');
            }
            
            // Выделение нового раздела
            $targetSection.css('background-color', '#FFF9E6');
            $currentSection = $targetSection;
        }
    });
    
    // 5. Выделение столбцов таблицы
        let highlightedColIndex = null;
    
    $('#table-section thead th').on('click', function() {
        const colIndex = $(this).index();
        
        // Если кликнули на тот же столбец — снять выделение
        if (highlightedColIndex === colIndex) {
            $('#table-section tbody tr').find('th, td').css({
                'box-shadow': '',
                'background-color': ''
            });
            highlightedColIndex = null;
            return;
        }
        
        // Снять выделение со всех ячеек
        $('#table-section tbody tr').find('th, td').css({
            'box-shadow': '',
            'background-color': ''
        });
        
        // Выделить ячейки в нужном столбце
        $('#table-section tbody tr').each(function() {
            $(this).find('th, td').eq(colIndex).css({
                'box-shadow': 'inset 0 0 0 3px #23746B',
                'background-color': 'rgba(35, 116, 107, 0.1)'
            });
        });
        
        highlightedColIndex = colIndex;
    });
    
    // 6. Кастомный плагин для элементов aside
    $.fn.popupZoom = function() {
        return this.each(function() {
            const $aside = $(this);
            let isZoomed = false;
            
            $aside.on('click', function() {
                if (isZoomed) {
                    // Возврат на место
                    $aside
                        .css({
                            position: '',
                            top: '',
                            left: '',
                            transform: '',
                            fontSize: '',
                            zIndex: '',
                            backgroundColor: '',
                            padding: '',
                            borderRadius: '',
                            boxShadow: '',
                            width: '',
                            maxWidth: ''
                        })
                        .removeClass('popup-zoomed');
                    isZoomed = false;
                } else {
                    // Переместить в центр и увеличить
                    const originalFontSize = $aside.css('font-size');
                    $aside.data('original-font-size', originalFontSize);
                    
                    $aside
                        .addClass('popup-zoomed')
                        .css({
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '2em',
                            zIndex: 10000,
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                            width: '80%',
                            maxWidth: '600px'
                        });
                    isZoomed = true;
                }
            });
        });
    };
    
    // Применяем плагин ко всем aside элементам
    $('aside').popupZoom();
    
    // 7. Анимация логотипа при наведении
    $('header img').hover(
        function() {
            // При наведении - мигание
            $(this).fadeTo(200, 0.5).fadeTo(200, 1).fadeTo(200, 0.5).fadeTo(200, 1);
        },
        function() {
            // При уходе мыши
            $(this).stop().fadeTo(300, 1);
        }
    );
    
    // Обработка отправки формы (простая имитация)
    $('form').on('submit', function(e) {
        e.preventDefault();
        alert('Ваша заявка принята!');
    });
});