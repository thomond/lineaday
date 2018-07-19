/* eslint-disable no-console */

import { register } from 'register-service-worker';
import { Snackbar } from 'buefy'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      Snackbar.open({
        message: 'New content is available!',
        position: 'is-bottom',
        actionText: 'Refresh',
        indefinite: true,
        type: 'is-primary',
        onAction: async () => {
          await registration.skipWaiting()
          window.location.reload(true)
        }
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
