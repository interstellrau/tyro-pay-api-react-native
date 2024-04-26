import { ClientPayRequestResponse } from '../@types/pay-request-types';
import { CardDetails } from '../@types/card-types';
import { HTTP_ACCEPTED, HTTP_FORBIDDEN, HTTP_OK } from '../@types/http-status-codes';
import { PaymentType } from '../@types/payment-types';
import {
  INITIAL_UPDATED_STATUSES,
  PAY_REQUEST_POLL_MAX_RETRIES,
  POLL_INTERVAL_MS,
} from './config/pay-request-client-config';
import { LIVE_INBOUND_BASE_URL, SANDBOX_INBOUND_BASE_URL, TYRO_BASE_URL } from './constants';

const setHeader = (paySecret) => {
  return { headers: { 'Pay-Secret': paySecret } };
};

export const getPayRequest = async (paySecret) => {
  const data = await fetch(`${TYRO_BASE_URL}/pay/client/requests`, setHeader(paySecret));
  if (data.status === HTTP_OK) {
    return data.json();
  }
  if (data.status === HTTP_FORBIDDEN) {
    throw new Error('Invalid Pay Secret.');
  }
  throw new Error('Something went wrong.');
};

export const submitPayRequest = async (paySecret, cardDetails, liveMode) => {
  const url = liveMode ? LIVE_INBOUND_BASE_URL : SANDBOX_INBOUND_BASE_URL;
  const response = await fetch(`${url}/connect/pay/client/requests`, {
    method: 'PATCH',
    headers: { 'Pay-Secret': paySecret, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ cardDetails, paymentType: PaymentType.CARD }),
  });
  if (response.status !== HTTP_ACCEPTED) {
    throw new Error('Payment failed to submit');
  }
};

export const pollForResult = async (paySecret, conditionFn, pollIntervalMillis, pollMaxRetries) => {
  let attemptNumber = 0;
  let statusResult = null;
  while (attemptNumber < pollMaxRetries) {
    try {
      statusResult = await getPayRequest(paySecret);
    } catch (e) {
      return null;
    }

    const conditionResult = conditionFn(statusResult);
    if (!conditionResult) {
      await new Promise((r) => setTimeout(r, pollIntervalMillis));
      attemptNumber += 1;
    } else {
      return statusResult;
    }
  }
  return statusResult;
};

export const pollForInitialStatusUpdate = async (paySecret) => {
  return pollForResult(
    paySecret,
    (payRequestStatus) => INITIAL_UPDATED_STATUSES.includes(payRequestStatus.status),
    POLL_INTERVAL_MS,
    PAY_REQUEST_POLL_MAX_RETRIES
  );
};

export const pollPayCompletion = async (paySecret) => {
  const statusResponse = await pollForInitialStatusUpdate(paySecret);
  return statusResponse;
};
