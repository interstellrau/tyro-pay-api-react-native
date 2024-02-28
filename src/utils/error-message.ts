import { ErrorMessage, TyroErrorMessage } from '../@types/message-types';

export const errorMessage = (error: TyroErrorMessage, errorCode?: string, gatewayCode?: string): ErrorMessage => {
  return {
    errorType: error.type,
    ...(errorCode && { errorCode }),
    ...(gatewayCode && { gatewayCode }),
    errorMessage: error.message,
  };
};
