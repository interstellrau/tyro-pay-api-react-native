import React from 'react';
import { Button } from 'react-native';

const ApplePayButton = ({ title, styles, onSubmit }) => {
  // @todo, implement
  /*
  import { requireNativeComponent } from "react-native";
  const ApplePayButtonView = requireNativeComponent('ApplePayButtonView');
  return <ApplePayButtonView style={styles} buttonTitle={title} onSubmit={onSubmit} />;
  */
  return <Button title={title ?? 'ApplePay Button'} />;
};

export default ApplePayButton;
