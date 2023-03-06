import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnRef = document.querySelector('[data-start]');

const timerRef = document.querySelector('.timer');
const inputRef = document.querySelector('#datetime-picker');

startBtnRef.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const delta = selectedDates[0].getTime() - Date.now();

    if (delta <= 0) {
      Notify.info('Please choose a date in the future', this.notifyOptions);
      return;
    } else {
      startBtnRef.removeAttribute('disabled');
      startBtnRef.addEventListener('click', onStartBtnClick);
    }

    function onStartBtnClick() {
      timer.start(timerRef, selectedDates[0]);
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  refs: {},
  notifyOptions: {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
    closeButton: true,
  },

  start(rootSelector, deadline) {
    if (!deadline) {
      return;
    }
    startBtnRef.setAttribute('disabled', '');
    inputRef.setAttribute('disabled', '');

    // const delta = deadline.getTime() - Date.now();
    this.getRefs(rootSelector);

    this.intervalId = setInterval(() => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success(`here we go`, this.notifyOptions);
      }
      const data = this.convertMs(diff);

      console.log(data);

      Object.entries(data).forEach(([name, value]) => {
        this.refs[name].textContent = this.zeroAdd(value);
      });
    }, 1000);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },
  zeroAdd(value) {
    return String(value).padStart(2, '0');
  },
};
