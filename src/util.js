import { Toast } from 'buefy'
import uniq from 'lodash/uniq'

export function displayMessage(message) {
  Toast.open({
    duration: 6000,
    message,
    position: 'is-bottom',
  })
}

export function displayError(err) {
  Toast.open({
    message: err.message,
    position: 'is-bottom',
    type: 'is-danger',
    duration: 6000,
  })
}

export const tagRegExp = /#([\w]+)/g
export function getTagsFromLine(line) {
  const matchesArray = line.match(tagRegExp)
  return uniq(matchesArray).map(match => match.replace('#', ''))
}

export function tagToUrl(tag) {
  return `/home/${tag.replace('#', '')}`
}

export const groupByDateFormat = 'MMMM DD'

export const defaultReminderTime = 0

export function browserHasPush() {
  return 'PushManager' in window
}
