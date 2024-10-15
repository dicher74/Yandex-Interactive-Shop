# Yandex-Interactive-Shop

## Описание
Это тестовое задание на вакансию Фронтенд-разработчки в компанию [Яндекс Крауд](https://crowd.yandex.ru/).
Интеррактивный баннер, на котором изображён прилавок с продуктами и корзина. Пользователь может взаимодествовать с баннером, перетаскивая продукты в корзину. При попадании в корзину трёх товаров появляется кнопка с надписью __Оплатить корзину__, ведущая на сайт [Яндекс Лавки](https://lavka.yandex.ru/).

## Реализация и функционал
- Реализация в виде интерактивной SVG-картинки, что позволяет удобно масштабировать баннер без потери качества. 
- Баннер поодерживает `touch` и `mouse` события перетаскивания. 
- `Autoscroll` функция прокручивает экран пользователя, если перетаскиваемый продукт покидает Viewport окна браузера
- Автоматический возврат товара на прилавок при попытке вытянуть его за пределы баннера или при `pointerup` событии
- Анимация появления товаров и их подсветка при наведении

## Языки и технологии
- HTML5 (BEM)
- CSS3
- JavaScript Vanilla
