import { send3DSecureAuthRequest } from '../clients/three-d-secure-client';
import { getUserAgent } from '../utils/helpers';
import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const invoke3DSecureAuth = async (paySecret) => {
  const authRequest = {
    javaEnabled: false,
    javascriptEnabled: true,
    language: 'en-AU',
    userAgent: getUserAgent(Platform.OS),
    colorDepth: '24',
    screenHeight: Math.trunc(height).toString(),
    screenWidth: Math.trunc(width).toString(),
    timezone: new Date().getTimezoneOffset().toString(),
  };
  await send3DSecureAuthRequest(paySecret, authRequest);
};
