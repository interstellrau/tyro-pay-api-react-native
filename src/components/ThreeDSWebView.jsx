import React from 'react';
import { Modal, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSDK } from '../SDKSharedContext';

const { height, width } = Dimensions.get('window');

const ThreeDSWebview = () => {
  const { threeDSCheck } = useSDK();

  return (
    <Modal visible={threeDSCheck.isTrue}>
      <WebView
        source={{
          uri: threeDSCheck.url,
        }}
        style={{ marginTop: 20, height, width }}
        javaScriptEnabled={true}
      />
    </Modal>
  );
};

export default ThreeDSWebview;
