/* eslint-disable no-console */

import { register } from 'register-service-worker';
import { Toast } from 'buefy'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated() {
      console.log('New content is available; please refresh.');
      Toast.open({
        duration: 600000,
        message: 'New content is available; please refresh.',
        position: 'is-bottom',
      })
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
