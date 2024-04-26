import React, { useState, createContext, useEffect, createRef, useContext } from 'react';
import { View } from 'react-native';
import TyroSDK from './TyroSDK';
import { errorMessage } from './utils/error-message';
import { parseSupportedNetworks, sanitizeOptions } from './utils/sanitizers';
import SDKProvider from './SDKSharedContext';

export const TyroPayContext = createContext({});

const tyroReactNativeContextRef = createRef();

const FINAL_STATUSES = ['SUCCESS', 'FAILED', 'VOIDED'];

const TyroProvider = ({ children, options }) => {
  const useOptions = sanitizeOptions(options);

  const [cleanedOptions, setOptions] = useState(useOptions);
  const [initialised, setInitialised] = useState(null);
  const [payRequest, setPayRequest] = useState(null);
  const [isPayRequestReady, setPayRequestReady] = useState(false);
  const [isPayRequestLoading, setPayRequestIsLoading] = useState(false);
  const [tyroError, setTyroErrorMessage] = useState(null);
  const [paySecret, setPaySecret] = useState(null);
  const [supportedNetworks, setSupportedNetworks] = useState(
    useOptions?.options?.creditCardForm?.supportedNetworks ?? null
  );

  useEffect(() => {
    const initTyroSDK = async (options) => {
      await TyroSDK.init(options);
    };
    if (!initialised) {
      initTyroSDK(cleanedOptions)
        .then(() => {
          setInitialised(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTyroErrorMessage(null);
  }, [paySecret]);

  useEffect(() => {
    if (payRequest) {
      const parsedNetworks = parseSupportedNetworks(
        payRequest.supportedNetworks,
        options?.options?.creditCardForm?.supportedNetworks
      );
      setSupportedNetworks(parsedNetworks);
    } else {
      setSupportedNetworks(null);
    }
  }, [payRequest, options]);

  const readyPaySheet = (payRequest) => {
    setPayRequest(payRequest);
    setPayRequestReady(true);
    setPayRequestIsLoading(false);
  };

  async function initPaySheet(paySecret) {
    if (!verifyInitialisation()) {
      setTyroErrorMessage(errorMessage('Not initialised'));
      return;
    }
    try {
      setPayRequestIsLoading(true);
      const payRequest = await TyroSDK.initPaySheet(paySecret, cleanedOptions.liveMode);
      const initWalletPayResult = await TyroSDK.initWalletPay(cleanedOptions);
      if (initWalletPayResult.googlePaySupported === false) {
        setOptions((options) => ({
          ...options,
          options: { ...options.options, googlePay: { ...options.options.googlePay, enabled: false } },
        }));
      }
      setPaySecret(paySecret);
      readyPaySheet(payRequest);
    } catch (error) {
      setPayRequestIsLoading(false);
      setPayRequestReady(false);
      setTyroErrorMessage(errorMessage('Paysheet initialization failed'));
    }
  }

  const verifyInitialisation = () => {
    return !!initialised && !!options;
  };

  const hasPayRequestCompleted = () => {
    return !!payRequest && FINAL_STATUSES.includes(payRequest.status);
  };

  const providerValues = {
    initialised,
    payRequest,
    isPayRequestReady,
    isPayRequestLoading,
    tyroError,
    initPaySheet,
    hasPayRequestCompleted,
  };

  const sdkProviderValues = {
    options: cleanedOptions,
    paySecret,
    supportedNetworks,
    setPayRequestIsLoading,
    setTyroErrorMessage,
    setPayRequest,
  };

  return (
    <TyroPayContext.Provider value={providerValues}>
      <View ref={tyroReactNativeContextRef}>
        <SDKProvider tyroProvider={sdkProviderValues}>{children}</SDKProvider>
      </View>
    </TyroPayContext.Provider>
  );
};

export const useTyro = () => useContext(TyroPayContext);

export default TyroProvider;
