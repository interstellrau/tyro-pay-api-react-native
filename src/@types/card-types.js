const CardTypeNames = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex',
  JCB: 'jcb',
  MAESTRO: 'maestro',
  DINERS: 'diners',
};

const CardImageNames = {
  UNKNOWN: 'card-unknown',
  PREVIEW: 'card-preview',
  CVV: 'card-cvv',
  ERROR: 'card-error',
};

function CardDetails(nameOnCard, number, expiry, securityCode) {
  this.nameOnCard = nameOnCard;
  this.number = number;
  this.expiry = expiry;
  this.securityCode = securityCode;
}

function CardExpiry(month, year) {
  this.month = month;
  this.year = year;
}

function CardType(type, pattern, format, minlength, maxlength, field_maxlength, cvc_minlength, cvc_maxlength) {
  this.type = type;
  this.pattern = pattern;
  this.format = format;
  this.minlength = minlength;
  this.maxlength = maxlength;
  this.field_maxlength = field_maxlength;
  this.cvc_minlength = cvc_minlength;
  this.cvc_maxlength = cvc_maxlength;
}

module.exports = { CardTypeNames, CardImageNames, CardDetails, CardExpiry, CardType };
