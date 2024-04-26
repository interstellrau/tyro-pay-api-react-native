const TyroPayStyleLabelPositions = {
  BLOCK: 'block',
  FLOATING: 'floating',
};

const TyroPayOptionsKeys = {
  liveMode: 'liveMode',
  theme: 'theme',
  styleProps: 'styleProps',
  options: 'options',
};

const TyroPayApplePayOptionKeys = {
  enabled: 'enabled',
  merchantIdentifier: 'merchantIdentifier',
  supportedNetworks: 'supportedNetworks',
};

const TyroPayGooglePayOptionKeys = {
  enabled: 'enabled',
  merchantName: 'merchantName',
  supportedNetworks: 'supportedNetworks',
};

const TyroPayCreditCardFormOptionKeys = {
  enabled: 'enabled',
  supportedNetworks: 'supportedNetworks',
};

const TyroPayOptionsOptionsKeys = {
  applePay: 'applePay',
  googlePay: 'googlePay',
  creditCardForm: 'creditCardForm',
};

const TyroPayStylePropKeys = {
  bodyBackgroundColor: 'bodyBackgroundColor',
  bodyPadding: 'bodyPadding',
  bodyWidth: 'bodyWidth',
  bodyMinWidth: 'bodyMinWidth',
  bodyMaxWidth: 'bodyMaxWidth',
  fontFamily: 'fontFamily',
  inputBackgroundColor: 'inputBackgroundColor',
  inputBorderColor: 'inputBorderColor',
  inputBorderSize: 'inputBorderSize',
  inputBorderRadius: 'inputBorderRadius',
  inputErrorFontColor: 'inputErrorFontColor',
  inputErrorBorderColor: 'inputErrorBorderColor',
  inputErrorBorderSize: 'inputErrorBorderSize',
  inputFocusBackgroundColor: 'inputFocusBackgroundColor',
  inputFocusBorderColor: 'inputFocusBorderColor',
  inputFocusBorderSize: 'inputFocusBorderSize',
  inputFocusFontColor: 'inputFocusFontColor',
  inputFontColor: 'inputFontColor',
  inputFontSize: 'inputFontSize',
  inputFontWeight: 'inputFontWeight',
  inputPadding: 'inputPadding',
  inputSpacing: 'inputSpacing',
  labelPosition: 'labelPosition',
  labelFontColor: 'labelFontColor',
  labelFontSize: 'labelFontSize',
  labelFontWeight: 'labelFontWeight',
  labelPadding: 'labelPadding',
  errorBackgroundColor: 'errorBackgroundColor',
  errorFontColor: 'errorFontColor',
  errorFontSize: 'errorFontSize',
  errorFontWeight: 'errorFontWeight',
  errorPadding: 'errorPadding',
  showCardIcon: 'showCardIcon',
  showErrorSpacing: 'showErrorSpacing',
  showSupportedCards: 'showSupportedCards',
  walletPaymentsDividerText: 'walletPaymentsDividerText',
  walletPaymentsDividerEnabled: 'walletPaymentsDividerEnabled',
  walletPaymentsButtonsWidth: 'walletPaymentsButtonsWidth',
  walletPaymentsButtonsMargin: 'walletPaymentsButtonsMargin',
  walletPaymentsButtonsGap: 'walletPaymentsButtonsGap',
  applePayButton: 'applePayButton',
  googlePayButton: 'googlePayButton',
};

const TyroPayOptions = {
  [TyroPayOptionsKeys.liveMode]: false,
  [TyroPayOptionsKeys.theme]: 'default',
  [TyroPayOptionsKeys.styleProps]: {},
  [TyroPayOptionsKeys.options]: {
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

const TyroPayStyleProps = {};
