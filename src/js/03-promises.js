import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const numberOfCalls = Number(formRef.amount.value);
  const delayStep = Number(formRef.step.value);
  let firstDelay = Number(formRef.delay.value);

  for (let i = 0; i < numberOfCalls; i += 1) {
    const position = i + 1;

    createPromise(position, firstDelay)
      .then(message => Notify.success(message))
      .catch(error => Notify.failure(error));

    firstDelay += delayStep;
  }
}

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
