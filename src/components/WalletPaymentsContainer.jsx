import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WalletPaymentResult } from '../@types/wallet-payment-result';
import TyroSDK from '../TyroSDK';
import { getWalletPaymentsStyles } from '../services/style-drawer';
import { TyroPayOptionsKeys } from '../@types/definitions';
import { useSDK } from '../SDKSharedContext';
import GooglePayButton from '../wallets/google-pay/GooglePayButton';
import ApplePayButton from '../wallets/apple-pay/ApplePayButton';

const WalletPaymentsContainer = () => {
  const { options, paySecret, setPayRequestIsLoading, handleWalletPaymentStatusUpdate } = useSDK();

  const styles = StyleSheet.create({
    ...getWalletPaymentsStyles(options[TyroPayOptionsKeys.styleProps]),
  });

  const launchWalletPayment = async (paySecret) => {
    setPayRequestIsLoading(true);
    const walletPaymentResult = await TyroSDK.startWalletPay(paySecret);
    setPayRequestIsLoading(false);
    handleWalletPaymentStatusUpdate(paySecret, walletPaymentResult);
  };

  return (
    <TouchableOpacity
      style={styles.walletWrapper}
      onPress={() => launchWalletPayment(paySecret)}
    >
      <View style={styles.walletPadder}>
        <View style={styles.walletContainer}>
          {options?.options?.googlePay?.enabled && (
            <GooglePayButton buttonStyles={options?.styleProps?.googlePayButton} />
          )}
          {options?.options?.applePay?.enabled && (
            <ApplePayButton
              title={'IOS Pay Button'}
              styles={{}}
              onSubmit={() => {
                // @Todo
                // Do nothing for now
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletPaymentsContainer;
