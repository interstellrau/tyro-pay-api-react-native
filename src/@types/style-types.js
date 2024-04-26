import { StyleProp, ViewStyle } from 'react-native';

const StyleLabelPositions = {
  BLOCK: 'block',
  FLOATING: 'floating',
  INLINE: 'inline',
};

const StyleTypes = {
  labelPosition: {
    pattern: new RegExp('^' + Object.values(StyleLabelPositions).join('|') + '$'),
  },
  fontFamily: {
    pattern: /^[a-z0-9_\- ]*$/gi,
  },
  cardType: {
    pattern: new RegExp('^' + Object.values(CardTypeNames).join('|') + '$'),
  },
  color: {
    pattern: new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$'),
  },
  text: {
    pattern: /^[a-z0-9_?&@!\- ]*$/gi,
  },
  size: {
    pattern: /^(?:(?:[1-9]\d*|0)(?:\.\d+)?%?|auto)$/gim,
  },
  weight: {
    pattern: /^[1-9]00$|^(1000)$/,
  },
  padding: {
    pattern: /^([ ]*((?:(?:[1-9]\d*|0)(?:\.\d+)?%?)[ ]*)){1,4}$/g,
  },
  boolean: {
    pattern: '^true|false|0|1$',
    process: (value) => {
      return value === 'true' || value === '1';
    },
  },
};

const StyleProps = {
  bodyBackgroundColor: '',
  bodyPadding: '',
  bodyWidth: '',
  bodyMinWidth: '',
  bodyMaxWidth: '',
  fontFamily: '',
  inputBackgroundColor: '',
  inputBorderColor: '',
  inputBorderSize: '',
  inputBorderRadius: '',
  inputErrorFontColor: '',
  inputErrorBorderColor: '',
  inputErrorBorderSize: '',
  inputFocusBackgroundColor: '',
  inputFocusBorderColor: '',
  inputFocusBorderSize: '',
  inputFocusFontColor: '',
  inputFontColor: '',
  inputFontSize: '',
  inputFontWeight: '',
  inputPadding: '',
  inputSpacing: '',
  labelPosition: '',
  labelFontColor: '',
  labelFontSize: '',
  labelFontWeight: '',
  labelPadding: '',
  errorBackgroundColor: '',
  errorFontColor: '',
  errorFontSize: '',
  errorFontWeight: '',
  errorPadding: '',
  showCardIcon: false,
  showErrorSpacing: false,
  showSupportedCards: false,
  walletPaymentsDividerText: '',
  walletPaymentsDividerEnabled: false,
  walletPaymentsButtonsWidth: '',
  walletPaymentsButtonsMargin: '',
  applePayButton: {
    buttonBorderRadius: '',
    buttonStyle: '',
    buttonType: '',
  },
  googlePayButton: {
    buttonColor: '',
    buttonType: '',
    buttonBorderRadius: 0,
  },
};

const ApplePayButtonType = {
  PLAIN: 'plain',
  ADD_MONEY: 'add-money',
  BOOK: 'book',
  BUY: 'buy',
  CHECK_OUT: 'check-out',
  CONTINUE: 'continue',
  CONTRIBUTE: 'contribute',
  DONATE: 'donate',
  ORDER: 'order',
  PAY: 'pay',
  RELOAD: 'reload',
  RENT: 'rent',
  SET_UP: 'set-up',
  SUBSCRIBE: 'subscribe',
  SUPPORT: 'support',
  TIP: 'tip',
  TOP_UP: 'top-up',
};

const ApplePayButtonStyle = {
  BLACK: 'black',
  WHITE_OUTLINE: 'white-outline',
  WHITE: 'white',
};

const GooglePayButtonColor = {
  WHITE: 'white',
  BLACK: 'black',
  DEFAULT: 'default',
};

const StyleProcessorType = {
  pattern: '',
};

const StyleProcessor = {
  type: StyleProcessorType,
};

module.exports = {
  StyleProps,
  StyleTypes,
  StyleProcessor,
  StyleLabelPositions,
  ApplePayButtonType,
  ApplePayButtonStyle,
  GooglePayButtonColor,
};
