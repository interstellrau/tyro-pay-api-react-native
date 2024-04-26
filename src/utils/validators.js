import { CardValidationStatus, eventType } from './enums';
import { luhnCheck } from './luhn';

const cardNumberValidate = (event, error, value) => {
  const number = value.replace(/[^0-9]/g, '');
  if (error || event === eventType.BLUR || event === eventType.SUBMIT) {
    if (!number) {
      return CardValidationStatus.NO_CARD_NUMBER;
    }
    if (number.length < 16) {
      return CardValidationStatus.INVALID_CARD_NUMBER;
    }
    if (!luhnCheck(number)) {
      return CardValidationStatus.INVALID_CARD_NUMBER;
    }
  }
  return CardValidationStatus.NO_ERRORS;
};

const cardNameValidate = (event, error, value) => {
  if (error || event === eventType.BLUR || event === eventType.SUBMIT) {
    if (!value) {
      return CardValidationStatus.NO_CARD_NAME;
    }
  }
  return CardValidationStatus.NO_ERRORS;
};

const cardExpirationValidate = (event, error, value) => {
  if (error || event === eventType.BLUR || event === eventType.SUBMIT) {
    if (!value) {
      return CardValidationStatus.NO_CARD_EXPIRY;
    }
    if (!value.match(/^(0[1-9]|1[0-2]|[1-9])\/?([0-9]{2})$/)) {
      return CardValidationStatus.INVALID_CARD_EXPIRY;
    }
    const [cardMonth, cardYear] = value.split('/');
    if (isExpired(cardYear, cardMonth)) {
      return CardValidationStatus.CARD_EXPIRED;
    }
  }
  return CardValidationStatus.NO_ERRORS;
};

const cardCvvValidate = (event, error, value, cardType) => {
  if (error || event === eventType.BLUR || event === eventType.SUBMIT) {
    if (!value) {
      return CardValidationStatus.NO_CARD_CVV;
    }
    if ((cardType === CardTypeNames.AMEX && !value.match(/^[0-9]{4}$/)) || !value.match(/^[0-9]{3}$/)) {
      return CardValidationStatus.INVALID_CARD_CVV;
    }
  }
  return CardValidationStatus.NO_ERRORS;
};

const validationTriggers = {
  card_number: cardNumberValidate,
  card_name: cardNameValidate,
  card_expiry: cardExpirationValidate,
  card_cvv: cardCvvValidate,
};

const validateInput = (event, key, value, cardType, errors, setErrors) => {
  const validator = validationTriggers[key];
  setErrors({ ...errors, [key]: validator(event, errors[key], value, cardType) });
};

const validateAllInputs = (cardDetails) => {
  return [
    ['card_number', cardNumberValidate(eventType.SUBMIT, '', cardDetails.number)],
    ['card_name', cardNameValidate(eventType.SUBMIT, '', cardDetails.nameOnCard)],
    [
      'card_expiry',
      cardExpirationValidate(
        eventType.SUBMIT,
        '',
        formatCardExpiry(cardDetails.expiry.month + cardDetails.expiry.year)
      ),
    ],
    [
      'card_cvv',
      cardCvvValidate(eventType.SUBMIT, '', cardDetails.securityCode, getCardType(cardDetails.number)?.type),
    ],
  ]
    .filter((error) => error[1]?.length !== 0)
    .reduce((acc, validator) => {
      const [key, error] = validator;
      acc[key] = error;
      return acc;
    }, {});
};
