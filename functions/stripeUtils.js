const moment = require('moment')
const last = require('lodash/last')
const functions = require('firebase-functions')

exports.stripe = require('stripe')(functions.config().stripe.token)

exports.getSubscription = function(customer) {
  return last(customer.subscriptions.data) || {}
}

exports.getCCInfo = function(customer) {
  const defaultSourceId = customer.default_source
  const { last4, brand } = customer.sources.data.find(source => source.id === defaultSourceId)
  return { last4, brand }
}

exports.hasImageThisMonth = function(user, line) {
  const hasImage = moment(user.lastImageDate).isSameOrAfter(line.createdAt, 'month')
  console.log('user has image this month: ', hasImage)
  return hasImage
}
