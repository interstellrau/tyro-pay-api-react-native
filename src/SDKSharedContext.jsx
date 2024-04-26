import React, { createContext, createRef, useContext, useState } from 'react';
import { View } from 'react-native';
import { errorMessage } from './utils/error-message';
import { getPayRequest, pollPayCompletion, submitPayRequest } from './clients/pay-request-client';
import { pollFor3DSecureAuthResult, pollFor3DSecureChallengeAndFinalResult, pollFor3DSecureMethodResult } from './clients/three-d-secure-client';
import { invoke3DSecureAuth } from './services/3dsecure-auth-service';
import { getCardType, UNKNOWN_CARD_TYPE } from './utils/card-formatting';

const SDKContext = createContext({});

const sdkReactNativeContextRef = createRef();

const SDKProvider = ({ children, tyroProvider }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [threeDSCheck, setThreeDSCheck] = useState({ isTrue: false, url: '' });
  const { options, paySecret, supportedNetworks, setPayRequestIsLoading, setTyroErrorMessage, setPayRequest } = tyroProvider;
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    number: '',
    expiry: { month: '', year: '' },
    securityCode: '',
  });

  const updatePaySheet = (payRequest) => {
    setCardDetails({
      nameOnCard: '',
      number: '',
      expiry: { month: '', year: '' },
      securityCode: '',
    });
    setPayRequest(payRequest);
  };

  const handleCompletedPayRequest = (payRequest) => {
    if (payRequest.status === 'SUCCESS') {
      updatePaySheet(payRequest);
      setPayRequest(payRequest);
      setTyroErrorMessage(null);
      return;
    }
    updatePaySheet(payRequest);
    setPayRequest(payRequest);
    setTyroErrorMessage(errorMessage('Payment failed', payRequest.errorCode));
  };

  const handleThreeDSChallenge = async (paySecret) => {
    const payRequest = await pollFor3DSecureChallengeAndFinalResult(paySecret);
    if (payRequest) {
      if (payRequest.threeDSecure?.status === 'FAILED') {
        updatePaySheet(payRequest);
        setTyroErrorMessage(errorMessage('Payment failed', payRequest.errorCode));
        return;
      }
      handleCompletedPayRequest(payRequest);
      return;
    }
    setTyroErrorMessage(errorMessage('Timeout'));
  };

  const handleFrictionless = (payRequest) => {
    handleCompletedPayRequest(payRequest);
  };

  const do3DSAuth = async (paySecret) => {
    let payRequest = await pollFor3DSecureMethodResult(paySecret);
    if (payRequest) {
      await invoke3DSecureAuth(paySecret);
      payRequest = await pollFor3DSecureAuthResult(paySecret);
      if (payRequest) {
        if (payRequest.threeDSecure?.challengeURL && payRequest.threeDSecure?.status === 'AWAITING_CHALLENGE') {
          // handle 3ds challenge
          setThreeDSCheck({ isTrue: true, url: payRequest.threeDSecure.challengeURL });
          await handleThreeDSChallenge(paySecret);
          setThreeDSCheck({ isTrue: false, url: '' });
          return;
        } else {
          // handle frictionless flow
          handleFrictionless(payRequest);
          return;
        }
      }
      setTyroErrorMessage(errorMessage('Timeout'));
    } else {
      setTyroErrorMessage(errorMessage('Server error'));
    }
  };

  const handlePaymentStatusUpdate = async (payRequest, paySecret) => {
    if (!payRequest) {
      setTyroErrorMessage(errorMessage('Server error'));
      return;
    }
    switch (payRequest.status) {
      case 'PROCESSING':
        setTyroErrorMessage(errorMessage('Timeout'));
        break;
      case 'AWAITING_AUTHENTICATION':
        await do3DSAuth(paySecret);
        break;
      case 'SUCCESS':
        updatePaySheet(payRequest);
        setPayRequest(payRequest);
        setTyroErrorMessage(null);
        break;
      case 'FAILED':
      case 'VOIDED':
        updatePaySheet(payRequest);
        setPayRequest(payRequest);
        setTyroErrorMessage(errorMessage('Payment failed', payRequest.errorCode));
        break;
      default:
        updatePaySheet(payRequest);
        setTyroErrorMessage(errorMessage('Unknown error'));
        break;
    }
  };

  const handleSubmit = async (cardDetails) => {
    if (!paySecret) {
      setTyroErrorMessage(errorMessage('No pay secret'));
      return;
    }
    if (supportedNetworks?.length) {
      const cardType = getCardType(cardDetails.number);
      if (cardType.type !== UNKNOWN_CARD_TYPE.type && !supportedNetworks.includes(cardType.type)) {
        setTyroErrorMessage(errorMessage('Invalid card type'));
        return;
      }
    }
    try {
      setTyroErrorMessage(null);
      setIsSubmitting(true);
      await submitPayRequest(paySecret, cardDetails, options['liveMode']);
    } catch (error) {
      setTyroErrorMessage(errorMessage('Payment failed'));
      setIsSubmitting(false);
      return;
    }
    const payRequest = await pollPayCompletion(paySecret);
    await handlePaymentStatusUpdate(payRequest, paySecret);
    setIsSubmitting(false);
  };

  const handleWalletPaymentStatusUpdate = async (paySecret, walletPaymentResult) => {
    const { status, error } = walletPaymentResult;
    if (error) {
      const { errorMessage: message, errorType: type, errorCode, gatewayCode } = error;
      setTyroErrorMessage(errorMessage({ type, message }, errorCode, gatewayCode));
    } else if (status === 'SUCCESS') {
      setTyroErrorMessage(null);
    }
    const payRequest = await getPayRequest(paySecret);
    setPayRequest(payRequest);
  };

  const providerValues = {
    options,
    paySecret,
    supportedNetworks,
    threeDSCheck,
    cardDetails,
    isSubmitting,
    setPayRequestIsLoading,
    setTyroErrorMessage,
    setPayRequest,
    setCardDetails,
    handleSubmit,
    handleWalletPaymentStatusUpdate,
  };

  return (
    <SDKContext.Provider value={providerValues}>
      <View ref={sdkReactNativeContextRef}>{children}</View>
    </SDKContext.Provider>
  );
};

export const useSDK = () => useContext(SDKContext);

export default SDKProvider;
