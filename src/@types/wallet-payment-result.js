const ErrorMessageType = {
  DEFAULT: 'default',
  INSUFFICIENT_FUNDS: 'insufficient-funds',
  INVALID_REQUEST: 'invalid-request',
  UNAUTHORIZED: 'unauthorized',
};

const WalletPaymentStatus = {
  SUCCESS: 'SUCCESS',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
};

module.exports = {
  WalletPaymentStatus,
  WalletPaymentResult: {
    status: WalletPaymentStatus,
    error: {
      errorMessage: '',
      errorType: ErrorMessageType.DEFAULT,
    },
  },
  WalletPaymentInitResult: {
    googlePaySupported: undefined,
  },
};
