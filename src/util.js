import { Toast } from 'buefy'
import uniq from 'lodash/uniq'

export function displayError(err) {
  Toast.open({
    message: err.message,
    position: 'is-bottom',
    type: 'is-danger',
    duration: 6000,
  })
}

export const tagRegExp = /#([^\s]+)/g
export function getTagsFromLine(line) {
  const matchesArray = line.match(tagRegExp)
  return uniq(matchesArray)
}
