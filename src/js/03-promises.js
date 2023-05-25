// Завдання 3 - генератор промісів
// Виконуй це завдання у файлах 03 - promises.html і 03 - promises.js.Подивися демо - відео роботи генератора промісів.
// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах,
// крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.

//   Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount.
// Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку,
// враховуючи першу затримку(delay), введену користувачем, і крок(step).

//   Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
// який виконується або відхиляється через delay часу.
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay зі значеннями однойменних параметрів.
// Використовуй початковий код функції для вибору того, що потрібно зробити з промісом - виконати або відхилити.

// Бібліотека повідомлень
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.
// https://github.com/notiflix/Notiflix#readme

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  formInputs: document.querySelectorAll('.form input'),
  buttonCreatePromises: document.querySelector('button[type="submit"]'),
};
refs.form.addEventListener('submit', onClickButtonCreatePromises);

function onClickButtonCreatePromises(e) {
  e.preventDefault();
  const promises = creatingPromises();
  startingAllPromises(promises);
}

function creatingPromises() {
  const objInputsValue = createObjFromInputData(refs.formInputs);
  const arrayDataPromises = createArrayDataPromises(objInputsValue);
  return createArrayPromises(arrayDataPromises);
}

function startingAllPromises(promises) {
  for (const promise of promises) {
    promise
      .then(({ position, delay }) =>
        Notify.success(`position: ${position}, delay: ${delay}`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`position: ${position}, delay: ${delay}`)
      );
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createArrayPromises(arr) {
  return arr.map(({ position, delay }) => createPromise(position, delay));
}

function createArrayDataPromises(obj) {
  const arr = [];
  for (let i = 1; i <= obj.amount; i += 1) {
    const position = i;
    let delay = Number(obj.delay) + Number(obj.step * (i - 1));
    arr.push({ position, delay });
  }
  return arr;
}

function createObjFromInputData(inputs) {
  const obj = {};
  inputs.forEach(elem => {
    obj[elem.getAttribute('name')] = elem.value;
  });
  return obj;
}
