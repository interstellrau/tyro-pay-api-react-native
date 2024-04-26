const { SupportedNetworks } = require('./network-types');

/**
 * @typedef {Object} PayRequestOrigin
 * @property {string} orderId
 * @property {string} [orderReference]
 * @property {string} [name]
 */

/**
 * @enum {string}
 * @readonly
 */
const PayRequestStatus = {
  AWAITING_PAYMENT_INPUT: 'AWAITING_PAYMENT_INPUT',
  AWAITING_AUTHENTICATION: 'AWAITING_AUTHENTICATION',
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  VOIDED: 'VOIDED',
};

/**
 * @typedef {Object} AmountWithCurrency
 * @property {number} amount
 * @property {string} currency
 */

/**
 * @enum {string}
 * @readonly
 */
const CaptureMethod = {
  AUTOMATIC: 'AUTOMATIC',
  MANUAL: 'MANUAL',
};

/**
 * @typedef {Object} ClientPayRequestResponse
 * @property {PayRequestOrigin} origin
 * @property {PayRequestStatus} status
 * @property {Object} [capture]
 * @property {CaptureMethod} [capture.method]
 * @property {AmountWithCurrency} [capture.total]
 * @property {AmountWithCurrency} total
 * @property {ThreeDSecure} [threeDSecure]
 * @property {string} [errorCode]
 * @property {string} [errorMessage]
 * @property {string} [gatewayCode]
 * @property {SupportedNetworks[] | null} supportedNetworks
 * @property {boolean} isLive
 */

/**
 * @typedef {Object} PayRequestResponse
 * @property {string} id
 * @property {string} paySecret
 */

/**
 * @typedef {Object} ClientCardSubmitResponse
 * @property {HttpStatusCode} status
 * @property {Object} [data]
 * @property {string} [data.error]
 * @property {string} [data.errorCode]
 */

/**
 * @enum {string}
 * @readonly
 */
const ThreeDSecureStatus = {
  AWAITING_3DS_METHOD: 'AWAITING_3DS_METHOD',
  AWAITING_AUTH: 'AWAITING_AUTH',
  AWAITING_CHALLENGE: 'AWAITING_CHALLENGE',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

/**
 * @typedef {Object} ThreeDSecure
 * @property {ThreeDSecureStatus} status
 * @property {string} [methodURL]
 * @property {string} [challengeURL]
 */

/**
 * @enum {number}
 * @readonly
 */
const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};

module.exports = {
  PayRequestStatus,
  CaptureMethod,
  ThreeDSecureStatus,
  HttpStatusCode,
};
