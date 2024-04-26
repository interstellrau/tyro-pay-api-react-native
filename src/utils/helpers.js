const { height, width } = Dimensions.get('window');

const isAndroid = (os) => {
  return os === 'android';
};

const isiOS = (os) => {
  return os === 'ios';
};

const IOS_USER_AGENT_STRING =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1';
const ANDROID_USER_AGENT_STRING =
  'Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64 Build/TE1A.220922.021; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/103.0.5060.71 Mobile Safari/537.36';

const getUserAgent = (os) => {
  if (isAndroid(os)) {
    return ANDROID_USER_AGENT_STRING;
  } else {
    return IOS_USER_AGENT_STRING;
  }
};
