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

/**
 * triggers on the submit event and starts functions for creating promises and launching them
 * @param {submit} e event
 */
function onClickButtonCreatePromises(e) {
  e.preventDefault();
  const promises = creatingPromises();
  startingAllPromises(promises);
}

/**
 * the function creates an array of promises, for this it runs functions to create an object from the data entered in the input,
 * to create an array from data to create promises
 * @returns returns an array of created promises
 */
function creatingPromises() {
  const objInputsValue = createObjFromInputData(refs.formInputs);
  const arrayDataPromises = createArrayDataPromises(objInputsValue);
  return createArrayPromises(arrayDataPromises);
}

/**
 * the function iterates the array of created promises and adds to then and catch
 * @param {Array} promises
 */
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

/**
 * the function creates a new transaction based on the corresponding values of position and delay
 * @param {Number} position
 * @param {Number} delay
 * @returns
 */
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

/**
 * function creates promises based on the passed array of data to create promises
 * @param {Array} arr
 * @returns returns an array of created promises
 */
function createArrayPromises(arr) {
  return arr.map(({ position, delay }) => createPromise(position, delay));
}

/**
 * the function creates a data array for promises with the number of elements according to the number entered by the user
 * @param {Object} obj
 * @returns array of data to create promises
 */
function createArrayDataPromises(obj) {
  const arr = [];
  for (let i = 1; i <= obj.amount; i += 1) {
    const position = i;
    let delay = Number(obj.delay) + Number(obj.step * (i - 1));
    arr.push({ position, delay });
  }
  return arr;
}

/**
 * the function processes the data entered by the user by creating an object
 * @param {Object} inputs
 * @returns  an object with user-entered data in inputs
 */
function createObjFromInputData(inputs) {
  const obj = {};
  inputs.forEach(elem => {
    obj[elem.getAttribute('name')] = elem.value;
  });
  return obj;
}
