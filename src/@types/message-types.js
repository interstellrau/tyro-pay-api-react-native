const SuccessMessageType = {
  SECRET_INITIALISED: 'SECRET_INITIALISED',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  INVOKE_3DSECURE_METHOD: 'INVOKE_3DSECURE_METHOD',
  INVOKE_3DSECURE_CHALLENGE: 'INVOKE_3DSECURE_CHALLENGE',
  CLOSE_3DSECURE_CHALLENGE: 'CLOSE_3DSECURE_CHALLENGE',
};

const ErrorMessageType = {
  PAYSHEET_INIT_FAILED: 'PAYSHEET_INIT_FAILED',
  INVALID_PAY_SECRET: 'INVALID_PAY_SECRET',
  NOT_INITIALISED: 'NOT_INITIALISED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  NO_FORM: 'NO_FORM',
  INVALID_CARD_TYPE: 'INVALID_CARD_TYPE',
  INVALID_CARD_DETAILS: 'INVALID_CARD_DETAILS',
  SERVER_ERROR: 'SERVER_ERROR',
  ALREADY_PROCESSED: 'ALREADY_PROCESSED',
  TIMEOUT: 'TIMEOUT',
  INVALID_ACTION: 'INVALID_ACTION',
  NO_PAY_SECRET: 'NO_PAY_SECRET',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  ENVIRONMENT_MISMATCH: 'ENVIRONMENT_MISMATCH',
};

const TyroErrorMessage = (type, message) => ({ type, message });

const TyroErrorMessages = {
  [ErrorMessageType.PAYSHEET_INIT_FAILED]: TyroErrorMessage(ErrorMessageType.PAYSHEET_INIT_FAILED, 'PaySheet failed to initialise'),
  [ErrorMessageType.INVALID_PAY_SECRET]: TyroErrorMessage(ErrorMessageType.INVALID_PAY_SECRET, 'The pay secret provided is invalid'),
  [ErrorMessageType.NOT_INITIALISED]: TyroErrorMessage(ErrorMessageType.NOT_INITIALISED, 'TyroProvider not initialised'),
  [ErrorMessageType.PAYMENT_FAILED]: TyroErrorMessage(ErrorMessageType.PAYMENT_FAILED, 'Payment failed'),
  [ErrorMessageType.NO_FORM]: TyroErrorMessage(ErrorMessageType.NO_FORM, 'No form'),
  [ErrorMessageType.INVALID_CARD_TYPE]: TyroErrorMessage(ErrorMessageType.INVALID_CARD_TYPE, 'Card type not supported.'),
  [ErrorMessageType.INVALID_CARD_DETAILS]: TyroErrorMessage(ErrorMessageType.INVALID_CARD_DETAILS, 'Invalid card details'),
  [ErrorMessageType.SERVER_ERROR]: TyroErrorMessage(ErrorMessageType.SERVER_ERROR, 'Server error'),
  [ErrorMessageType.ALREADY_PROCESSED]: TyroErrorMessage(ErrorMessageType.ALREADY_PROCESSED, 'PayRequest already processed'),
  [ErrorMessageType.TIMEOUT]: TyroErrorMessage(ErrorMessageType.TIMEOUT, 'Timeout'),
  [ErrorMessageType.INVALID_ACTION]: TyroErrorMessage(ErrorMessageType.INVALID_ACTION, 'Invalid action'),
  [ErrorMessageType.NO_PAY_SECRET]: TyroErrorMessage(ErrorMessageType.NO_PAY_SECRET, 'No pay secret provided'),
  [ErrorMessageType.UNKNOWN_ERROR]: TyroErrorMessage(ErrorMessageType.UNKNOWN_ERROR, 'Unknown error occurred'),
  [ErrorMessageType.ENVIRONMENT_MISMATCH]: TyroErrorMessage(ErrorMessageType.ENVIRONMENT_MISMATCH, 'There is an environment mismatch. Check TyroProvider was initialised with the correct value for liveMode'),
};

const SuccessMessage = {
  success: SuccessMessageType,
};

const Invoke3DSecureMethodMessage = {
  threeDSMethodUrl: '',
};

const Invoke3DSecureChallengeMessage = {
  challengeUrl: '',
};

const ErrorMessage = {
  errorType: '',
  errorMessage: '',
};

const MessageResponse = SuccessMessage | ErrorMessage;
