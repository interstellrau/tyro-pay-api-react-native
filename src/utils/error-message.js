export const errorMessage = (error, errorCode, gatewayCode) => {
  return {
    errorType: error.type,
    ...(errorCode && { errorCode }),
    ...(gatewayCode && { gatewayCode }),
    errorMessage: error.message,
  };
};
