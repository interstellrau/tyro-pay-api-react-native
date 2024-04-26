const StyleLabelPositions = {
  BLOCK: 'block',
  FLOATING: 'floating',
  INLINE: 'inline',
};

const ApplePayButtonStyle = {
  BLACK: 'black',
  WHITE_OUTLINE: 'white-outline',
  WHITE: 'white',
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

const GooglePayButtonColor = {
  WHITE: 'white',
  BLACK: 'black',
  DEFAULT: 'default',
};

const GooglePayButtonText = {
  BOOK: 'book',
  BUY: 'buy',
  CHECKOUT: 'checkout',
  DONATE: 'donate',
  ORDER: 'order',
  PAY: 'pay',
  PLAIN: 'plain',
  SUBSCRIBE: 'subscribe',
};

const ThemeNames = {
  DEFAULT: 'default',
  DARK: 'dark',
  SHARP: 'sharp',
  MINIMAL: 'minimal',
};

const ThemeStyles = {
  default: {
    labelPosition: StyleLabelPositions.FLOATING,
    inputFontSize: '16px',
    showSupportedCards: true,
  },
  dark: {
    labelPosition: StyleLabelPositions.FLOATING,
    bodyBackgroundColor: '#1A1F36',
    inputBackgroundColor: '#30313D',
    inputBorderColor: '#424253',
    inputFontColor: '#FEFEFE',
    inputFocusBorderColor: '#878799',
    inputErrorFontColor: '#FE87A1',
    inputErrorBorderColor: '#FE87A1',
    labelFontColor: '#D3D3D4',
    errorFontColor: '#FE87A1',
    showSupportedCards: true,
    applePayButton: {
      buttonStyle: ApplePayButtonStyle.WHITE,
    },
    googlePayButton: {
      buttonColor: GooglePayButtonColor.WHITE,
    },
  },
  sharp: {
    labelPosition: StyleLabelPositions.BLOCK,
    inputBorderRadius: '0px',
    inputSpacing: '0px',
    showSupportedCards: true,
  },
  minimal: {
    labelPosition: StyleLabelPositions.FLOATING,
    inputBorderRadius: '10px',
    inputBorderSize: '0px',
    inputBackgroundColor: '#F6F8FA',
    showCardIcon: false,
    showErrorSpacing: false,
    showSupportedCards: false,
  },
};

const applePayButtonDefaultStyles = {
  buttonBorderRadius: '4',
  buttonStyle: ApplePayButtonStyle.BLACK,
  buttonType: ApplePayButtonType.PLAIN,
};

const googlePayButtonDefaultStyles = {
  buttonColor: GooglePayButtonColor.DEFAULT,
  buttonType: GooglePayButtonText.PLAIN,
  buttonBorderRadius: 4,
};

module.exports = {
  ThemeNames,
  ThemeStyles,
  applePayButtonDefaultStyles,
  googlePayButtonDefaultStyles,
};
