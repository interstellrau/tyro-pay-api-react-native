function ThreeDSecureAuthRequest(colorDepth, javaEnabled, javascriptEnabled, language, screenHeight, screenWidth, timezone, userAgent) {
  this.colorDepth = colorDepth;
  this.javaEnabled = javaEnabled;
  this.javascriptEnabled = javascriptEnabled;
  this.language = language;
  this.screenHeight = screenHeight;
  this.screenWidth = screenWidth;
  this.timezone = timezone;
  this.userAgent = userAgent;
}

module.exports = { ThreeDSecureAuthRequest };
