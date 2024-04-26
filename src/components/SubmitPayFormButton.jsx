import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { validateAllInputs } from '../utils/validators';
import { getPayButtonStyles } from '../services/style-drawer';
import { useSDK } from '../SDKSharedContext';

const SubmitPayFormButton = ({ title, validationErrors, setValidationErrors }) => {
  const { options, isSubmitting, cardDetails, handleSubmit } = useSDK();

  const styles = StyleSheet.create({
    ...getPayButtonStyles(options.styleProps),
  });

  const handlePress = async () => {
    const foundErrors = validateAllInputs(cardDetails);
    if (Object.keys(foundErrors).length) {
      setValidationErrors({ ...validationErrors, ...foundErrors });
      return;
    }
    await handleSubmit(cardDetails);
  };

  return (
    <View style={styles.container}>
      {isSubmitting ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          style={[styles.container, styles.button]}
          activeOpacity={0.3}
          onPress={handlePress}
          accessibilityLabel="Submit the Pay Form"
          testID="pay-button"
        >
          <Text style={styles.buttonText}>{title.length ? title : 'Pay'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SubmitPayFormButton;
