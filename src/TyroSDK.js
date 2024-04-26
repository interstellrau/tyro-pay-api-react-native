import { getPayRequest } from './clients/pay-request-client';
import { Platform, NativeModules } from 'react-native';

const { TyroPaySdkModule } = NativeModules;

class TyroSDK {
  constructor() {
    this.payRequest = undefined;
    this.payStatus = undefined;
  }

  init = async (options) => {
    if (isAndroid(Platform.OS)) {
    } else {
    }

    // TO DO: initialise native ios with config
  };

  initAndVerifyPaySecret = async (paySecret, liveMode) => {
    if (!paySecret) {
      throw new TypeError('NO_PAY_SECRET');
    }
    this.payRequest = await getPayRequest(paySecret);
    this.payStatus = this.payRequest.status;
    if (this.payRequest.isLive !== liveMode) {
      throw new Error('ENVIRONMENT_MISMATCH');
    }
    if (this.payRequestAlreadySubmitted(this.payStatus)) {
      throw new Error('Pay Request already submitted');
    }
    return this.payRequest;
  };

  initWalletPay = async (options) => {
    const walletPaymentConfigs = options?.['options'];
    if (walletPaymentConfigs?.googlePay?.enabled) {
      const liveMode = options['liveMode'];
      const googlePaySupported = await TyroPaySdkModule.initWalletPay({
        googlePay: { ...walletPaymentConfigs.googlePay, liveMode },
      });
      return {
        googlePaySupported,
      };
    }
    return {};
  };

  initPaySheet = async (paySecret, liveMode) => {
    const payRequest = await this.initAndVerifyPaySecret(paySecret, liveMode);
    return payRequest;
  };

  startWalletPay = async (paySecret) => {
    const walletPaymentResult = await TyroPaySdkModule.startWalletPay(paySecret);
    return walletPaymentResult;
  };

  payRequestAlreadySubmitted = (status) => {
    return status === 'SUCCESS';
  };
}

export default new TyroSDK();
