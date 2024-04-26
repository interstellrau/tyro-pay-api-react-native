const { CardTypeNames } = require('./card-types');
const { TyroPayOptions } = require('./definitions');
const { SupportedNetworks } = require('./network-types');
const { applePayButtonDefaultStyles, googlePayButtonDefaultStyles, ThemeNames, ThemeStyles } = require('./theme-styles');

const defaultOptions = {
  liveMode: false,
  theme: ThemeNames.DEFAULT,
  styleProps: {
    ...ThemeStyles.default,
    googlePayButton: googlePayButtonDefaultStyles,
    applePayButton: applePayButtonDefaultStyles,
  },
  options: {
    applePay: {
      enabled: false,
    },
    googlePay: {
      enabled: false,
    },
    creditCardForm: {
      enabled: true,
    },
  },
};

const defaultSupportedNetworks = Object.values(CardTypeNames);

module.exports = { defaultOptions, defaultSupportedNetworks };
