import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.from');

formRef.addEventListener('submit', onFormSubmit);

// function onFormSubmit {

// }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
