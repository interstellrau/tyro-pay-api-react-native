export const format464Spacing = (cardNumber) =>
  [cardNumber.substring(0, 4), cardNumber.substring(4, 10), cardNumber.substring(10, 14)].join(' ').trim();

export const format465Spacing = (cardNumber) =>
  [cardNumber.substring(0, 4), cardNumber.substring(4, 10), cardNumber.substring(10, 15)].join(' ').trim();

export const format466Spacing = (cardNumber) =>
  [cardNumber.substring(0, 4), cardNumber.substring(4, 10), cardNumber.substring(10, 16)].join(' ').trim();

export const format4444Spacing = (cardNumber) =>
  [
    cardNumber.substring(0, 4),
    cardNumber.substring(4, 8),
    cardNumber.substring(8, 12),
    cardNumber.substring(12, 16),
    cardNumber.substring(16, 20),
  ]
    .join(' ')
    .trim();

export const cardTypes = [
  {
    type: 'visa',
    pattern: /^4/,
    format: format4444Spacing,
    minlength: 13,
    maxlength: 16,
    field_maxlength: 19,
    cvc_minlength: 3,
    cvc_maxlength: 3,
  },
  {
    type: 'mastercard',
    pattern: /^((5[12345])|(2[2-7]))/,
    format: format4444Spacing,
    minlength: 16,
    maxlength: 16,
    field_maxlength: 19,
    cvc_minlength: 3,
    cvc_maxlength: 3,
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: format465Spacing,
    minlength: 15,
    maxlength: 15,
    field_maxlength: 17,
    cvc_minlength: 4,
    cvc_maxlength: 4,
  },
  {
    type: 'jcb',
    pattern: /^35[2-8]/,
    format: format466Spacing,
    minlength: 15,
    maxlength: 16,
    field_maxlength: 18,
    cvc_minlength: 3,
    cvc_maxlength: 3,
  },
  {
    type: 'maestro',
    pattern: /^(5018|5020|5038|5893|6304|6759|676[123])/,
    format: format4444Spacing,
    minlength: 16,
    maxlength: 16,
    field_maxlength: 19,
    cvc_minlength: 3,
    cvc_maxlength: 3,
  },

  {
    type: 'diners',
    pattern: /^3(?:0[0-5]|[68][0-9])/,
    format: format464Spacing,
    minlength: 14,
    maxlength: 14,
    field_maxlength: 16,
    cvc_minlength: 3,
    cvc_maxlength: 3,
  },
];

export const UNKNOWN_CARD_TYPE = {
  type: 'card-unknown',
  pattern: /^[0-9]{14,19}$/,
  format: format4444Spacing,
  minlength: 14,
  maxlength: 16,
  field_maxlength: 19,
  cvc_minlength: 3,
  cvc_maxlength: 4,
};

export const getCardType = (cardNo, allowCardTypes = []) => {
  cardNo = cardNo.replace(/[^0-9]/g, '');
  if (!cardNo.length) {
    return UNKNOWN_CARD_TYPE;
  }
  for (const i in cardTypes) {
    if (allowCardTypes.length && !allowCardTypes.includes(cardTypes[i].type)) {
      continue;
    }
    if (cardNo.match(cardTypes[i].pattern)) {
      return cardTypes[i];
    }
  }
  return UNKNOWN_CARD_TYPE;
};

export const formatCardNumber = (cardNumber) => {
  cardNumber = cardNumber.replace(/[^0-9]+/g, '');
  if (!cardNumber.length) {
    return '';
  }
  const cardType = getCardType(cardNumber);
  cardNumber = cardNumber.substring(0, cardType.maxlength);
  return cardType.format(cardNumber);
};

export const formatCardCVC = (cvcNumber) => {
  return cvcNumber.replace(/[^0-9]+/g, '');
};

export const formatCardExpiry = (cardExpiry) => {
  return cardExpiry
    .replace(
      /[^0-9/]/g,
      '' 
    )
    .replace(
      /^([0-9]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2' 
    )
    .replace(
      /\/([ 0-9]+)\//g,
      '/$1' 
    )
    .replace(
      /\/*\//g,
      '/' 
    )
    .replace(
      /([0-9]{2})[0-9]/,
      '$1' 
    );
};

export const buildCardExpiry = (cardExpiry) => {
  const parts = cardExpiry.split('/');
  return { month: parts[0] || '', year: parts[1] || '' };
};

const SECOND_DAY_OF_EXPIRY_MONTH = 2;
export const isExpired = (year, month) => {
  const expiryYearInFour = new Date().getFullYear().toString().slice(0, 2) + year;
  const expiryDate = new Date(parseInt(expiryYearInFour), parseInt(month), SECOND_DAY_OF_EXPIRY_MONTH);
  return expiryDate < new Date();
};
