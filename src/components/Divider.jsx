import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDividerStyles } from '../services/style-drawer';
import { useSDK } from '../SDKSharedContext';

const Divider = ({ text }) => {
  const { options } = useSDK();
  const styles = StyleSheet.create({
    ...getDividerStyles(options.styleProps),
  });

  return (
    <View style={styles.dividerWrapper}>
      <View style={styles.line} />
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default Divider;
