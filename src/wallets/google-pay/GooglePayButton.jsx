import React from 'react';
import { requireNativeComponent } from 'react-native';

const GooglePayButtonComponent = requireNativeComponent('GooglePayButton');

const GooglePayButton = ({ buttonStyles }) => {
  if (buttonStyles?.buttonBorderRadius) {
    buttonStyles.buttonBorderRadius = parseFloat(String(buttonStyles.buttonBorderRadius));
  }
  return <GooglePayButtonComponent style={{ flex: 1 }} {...buttonStyles} testID="google-pay-button" />;
};

export default GooglePayButton;
