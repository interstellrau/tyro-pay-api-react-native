const { CardTypeNames } = require('./card-types');

const SupportedCardsGooglePay = [
  CardTypeNames.AMEX,
  CardTypeNames.JCB,
  CardTypeNames.MASTERCARD,
  CardTypeNames.VISA,
];

const SupportedCardsApplePay = [
  CardTypeNames.AMEX,
  CardTypeNames.JCB,
  CardTypeNames.MASTERCARD,
  CardTypeNames.VISA,
  CardTypeNames.MAESTRO,
];

module.exports = { SupportedCardsGooglePay, SupportedCardsApplePay };
