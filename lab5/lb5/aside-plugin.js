/* Плагин jQuery для aside элементов */

(function($) {
    $.fn.asidePopup = function() {
        return this.each(function() {
            const $element = $(this);
            let isExpanded = false;
            const originalPosition = $element.css('position');
            const originalZIndex = $element.css('z-index');
            
            // Сохраняем исходные размеры и положение
            const originalStyles = {
                position: $element.css('position'),
                top: $element.css('top'),
                left: $element.css('left'),
                width: $element.css('width'),
                height: $element.css('height'),
                'font-size': $element.css('font-size'),
                'z-index': $element.css('z-index'),
                'background-color': $element.css('background-color'),
                border: $element.css('border'),
                padding: $element.css('padding'),
                'box-shadow': $element.css('box-shadow'),
                transform: $element.css('transform'),
                margin: $element.css('margin')
            };
            
            $element.on('click', function() {
                if (!isExpanded) {
                    // Анимация увеличения и перемещения в центр
                    $element.css({
                        'position': 'fixed',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'z-index': '1000',
                        'background-color': '#FFFCDF',
                        'border': '2px solid #23746B',
                        'padding': '25px',
                        'box-shadow': '0 0 25px rgba(0,0,0,0.4)',
                        'margin': '0'
                    }).animate({
                        'font-size': '1.5em',
                        'width': '550px',
                        'min-height': '300px'
                    }, 600);
                    isExpanded = true;
                } else {
                    // Возврат к исходному состоянию
                    $element.animate({
                        'font-size': originalStyles['font-size'],
                        'width': originalStyles['width'],
                        'min-height': originalStyles['height']
                    }, 400, function() {
                        $element.css({
                            'position': originalStyles.position,
                            'top': originalStyles.top,
                            'left': originalStyles.left,
                            'transform': originalStyles.transform,
                            'z-index': originalStyles['z-index'],
                            'background-color': originalStyles['background-color'],
                            'border': originalStyles.border,
                            'padding': originalStyles.padding,
                            'box-shadow': originalStyles['box-shadow'],
                            'margin': originalStyles.margin
                        });
                    });
                    isExpanded = false;
                }
            });
        });
    };
})(jQuery);