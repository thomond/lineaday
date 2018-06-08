import { Toast } from 'buefy'

// eslint-disable-next-line import/prefer-default-export
export function displayError(err) {
  Toast.open({
    message: err.message,
    position: 'is-bottom',
    type: 'is-danger',
    duration: 6000,
  })
}
