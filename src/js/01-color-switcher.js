// Завдання 1 - перемикач кольорів
// Виконуй це завдання у файлах 01-color-switcher.html і 01-color-switcher.js. Подивися демо-відео роботи перемикача.
// HTML містить кнопки «Start» і «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення,
// використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', onClickStart);
refs.stop.setAttribute('disabled', '');

/**
 * the function processes the click on the start button
 * @param {Click} e event
 */
function onClickStart(e) {
  refs.start.setAttribute('disabled', '');
  let bodyBackgroundColor = getRandomHexColor();
  refs.body.style.backgroundColor = bodyBackgroundColor;

  timerId = setInterval(() => {
    bodyBackgroundColor = getRandomHexColor();
    refs.body.style.backgroundColor = bodyBackgroundColor;
  }, 1000);

  refs.stop.addEventListener('click', onClickStop);
  refs.stop.removeAttribute('disabled');
}

/**
 * the function handles the click on the stop button
 * @param {Click} e event
 */
function onClickStop(e) {
  clearInterval(timerId);
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', '');
}

/**
 * function to create an arbitrary color in hex format
 * @returns returns an arbitrary color in hex format
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
