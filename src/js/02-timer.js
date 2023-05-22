// Завдання 2 - таймер зворотного відліку
// Виконуй це завдання у файлах 02-timer.html і 02-timer.js.
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет - магазинах, сторінках реєстрації подій,
// під час технічного обслуговування тощо.Подивися демо - відео роботи таймера.

// Елементи інтерфейсу
// HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по кліку на яку, таймер повинен запускатися.
// Додай мінімальне оформлення елементів інтерфейсу.

// Бібліотека flatpickr
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату
// і час в одному елементі інтерфейсу.
// Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

//  Описаний в документації
// import flatpickr from "flatpickr";
//  Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"], тому ми додали до HTML документу поле input#datetime-picker.

// <input type="text" id="datetime-picker" />

// Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів.
// Ми підготували для тебе об'єкт, який потрібен для виконання завдання.
// Розберися, за що відповідає кожна властивість в документації «Options», і використовуй його у своєму коді.
// https://flatpickr.js.org/options/

// Вибір дати
// Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr.
// Саме у ньому варто обробляти дату, обрану користувачем.
// Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.

// Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future".
// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання.
// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати,
// і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx: xx: xx: xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

// НЕ БУДЕМО УСКЛАДНЮВАТИ
// Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

// Форматування часу
// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати.
// Зверни увагу, що вона не форматує результат.Тобто, якщо залишилося 4 хвилини або будь - якої іншої складової часу,
// то функція поверне 4, а не 04.
// В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів.
// Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

// Бібліотека повідомлень

// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку notiflix.
// https://github.com/notiflix/Notiflix#readme

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/material_blue.css');

const refs = {
  fpItem: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let userSelectedDates = {};
let timeMS = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeMS = Date.parse(selectedDates[0]) - Date.parse(new Date());
    revisingDateInFuture(timeMS);
  },
};

const fp = flatpickr(refs.fpItem, options);
refs.buttonStart.setAttribute('disabled', '');

function onClickButtonStart(e) {
  userSelectedDates = convertMs(timeMS);
  addLeadingZero(userSelectedDates);
  updateTimeLess(userSelectedDates);

  timerId = setInterval(() => {
    updateTimeLess(userSelectedDates);
    timeMS -= 1000;
    userSelectedDates = convertMs(timeMS);
    addLeadingZero(userSelectedDates);
    reviseWhenNeedStopInterval(timeMS, timerId);
  }, 1000);
}

function reviseWhenNeedStopInterval(time, timerId) {
  if (time === -1000) {
    clearInterval(timerId);
  }
}

function revisingDateInFuture(time) {
  if (time < 0) {
    Notify.failure('Please choose a date in the future', {
      width: '350px',
      position: 'center-top',
      fontSize: '16px',
    });
  } else {
    refs.buttonStart.removeAttribute('disabled');
    refs.buttonStart.addEventListener('click', onClickButtonStart, {
      once: true,
    });
  }
}

function updateTimeLess(obj) {
  const { days, hours, minutes, seconds } = obj;
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  const keys = Object.keys(value);
  for (const key of keys) {
    value[key] = String(value[key]).padStart(2, '0');
  }
}

function convertMs(ms) {
  //  Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //  Remaining days
  const days = Math.floor(ms / day);
  //  Remaining hours
  const hours = Math.floor((ms % day) / hour);
  //  Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  //  Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
