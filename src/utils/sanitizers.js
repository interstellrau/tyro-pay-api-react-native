import {
  SupportedCardsApplePay,
  SupportedCardsGooglePay,
  SupportedNetworks,
  SupportedNetworksApplePay,
  SupportedNetworksGooglePay,
} from '../@types/network-types';
import { defaultOptions, defaultSupportedNetworks } from '../@types/default';
import {
  TyroPayOptionsKeys,
  TyroPayOptionsOptionsKeys,
  TyroPayOptionsProps,
  TyroPayStylePropKeys,
} from '../@types/definitions';
import { isAndroid, isiOS } from './helpers';
import { Platform } from 'react-native';
import { ThemeNames, ThemeStyles } from '../@types/theme-styles';
import {
  getSanitizedApplePayStyles,
  getSanitizedGooglePayStyles,
  getSanitizedStyles,
} from '../services/style-properties';

const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const sanitizeOptions = (options) => {
  const useOptions = {
    ...defaultOptions,
    ...options,
    [TyroPayOptionsKeys.styleProps]: {},
    [TyroPayOptionsKeys.options]: {
      [TyroPayOptionsOptionsKeys.applePay]: {
        ...defaultOptions[TyroPayOptionsKeys.options][TyroPayOptionsOptionsKeys.applePay],
        ...(options?.[TyroPayOptionsKeys.options]?.[TyroPayOptionsOptionsKeys.applePay] ?? {}),
      },
      [TyroPayOptionsOptionsKeys.googlePay]: {
        ...defaultOptions[TyroPayOptionsKeys.options][TyroPayOptionsOptionsKeys.googlePay],
        ...(options?.[TyroPayOptionsKeys.options]?.[TyroPayOptionsOptionsKeys.googlePay] ?? {}),
      },
      [TyroPayOptionsOptionsKeys.creditCardForm]: {
        ...defaultOptions[TyroPayOptionsKeys.options][TyroPayOptionsOptionsKeys.creditCardForm],
        ...(options?.[TyroPayOptionsKeys.options]?.[TyroPayOptionsOptionsKeys.creditCardForm] ?? {}),
      },
    },
  };

  if (useOptions?.options?.applePay?.enabled === true && isAndroid(Platform.OS)) {
    useOptions.options.applePay.enabled = false;
  }
  if (useOptions?.options?.googlePay?.enabled === true && isiOS(Platform.OS)) {
    useOptions.options.googlePay.enabled = false;
  }

  const supportedNetworks = parseSupportedNetworks(null, useOptions?.options?.creditCardForm?.supportedNetworks);
  useOptions.options.creditCardForm.supportedNetworks = supportedNetworks ?? undefined;

  useOptions.options.applePay.supportedNetworks = parseSupportedNetworksApplePay(
    useOptions?.options?.applePay?.supportedNetworks
  );
  useOptions.options.googlePay.supportedNetworks = parseSupportedNetworksGooglePay(
    useOptions?.options?.googlePay?.supportedNetworks
  );

  if (!useOptions?.theme || !Object.values(ThemeNames).includes(useOptions.theme)) {
    useOptions.theme = ThemeNames.DEFAULT;
  }

  const providedApplePayStyles = options?.[TyroPayOptionsKeys.styleProps]?.[TyroPayStylePropKeys.applePayButton];
  const providedGooglePayStyles = options?.[TyroPayOptionsKeys.styleProps]?.[TyroPayStylePropKeys.googlePayButton];

  useOptions.styleProps = {
    ...defaultOptions[TyroPayOptionsKeys.styleProps],
    ...ThemeStyles[useOptions.theme],
    ...getSanitizedStyles((options?.[TyroPayOptionsKeys.styleProps] ?? {})),
  };

  useOptions[TyroPayOptionsKeys.styleProps][TyroPayStylePropKeys.applePayButton] = {
    ...defaultOptions[TyroPayOptionsKeys.styleProps][TyroPayStylePropKeys.applePayButton],
    ...getSanitizedApplePayStyles(providedApplePayStyles ?? {}),
  };
  useOptions[TyroPayOptionsKeys.styleProps][TyroPayStylePropKeys.googlePayButton] = {
    ...defaultOptions[TyroPayOptionsKeys.styleProps][TyroPayStylePropKeys.googlePayButton],
    ...getSanitizedGooglePayStyles(providedGooglePayStyles ?? {}),
  };

  return deepClone(useOptions);
};

export const parseSupportedNetworks = (fromPayRequest, fromOptions) => {
  const availableOptions = Array.isArray(fromPayRequest) && fromPayRequest.length ? fromPayRequest : defaultSupportedNetworks;
  const intersection = Array.isArray(fromOptions) ? availableOptions.filter((value) => fromOptions.includes(value)) : availableOptions;
  if (intersection.length === 0 && Array.isArray(fromPayRequest)) {
    return fromPayRequest;
  }
  return intersection.length && intersection.length !== defaultSupportedNetworks.length ? (intersection) : null;
};

export const parseSupportedNetworksApplePay = (fromOptions) => {
  return Array.isArray(fromOptions)
    ? (SupportedCardsApplePay.filter((value) => fromOptions.includes(value)))
    : undefined;
};

export const parseSupportedNetworksGooglePay = (fromOptions) => {
  return Array.isArray(fromOptions)
    ? (SupportedCardsGooglePay.filter((value) => fromOptions.includes(value)))
    : undefined;
};
