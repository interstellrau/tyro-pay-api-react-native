import { eventType } from '../utils/validators';
import React, { useState, forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { getImageSources } from '../services/style-drawer';
import { useSDK } from '../SDKSharedContext';
import CardPreview from './CardPreview';
import { defaultSupportedNetworks } from '../@types/default';

const InputField = forwardRef((props, ref) => {
  const { labelText, placeholderText, setText, img, error, validator, ...TextInputProps } = props;
  const { options, supportedNetworks } = useSDK();
  const [isFocus, setIsFocus] = useState(false);
  const styles = StyleSheet.create({
    ...getInputStyles(options.styleProps, {
      isFocus,
      isError: !!error,
    }),
  });
  const hasPhysicalLabel = options.styleProps.labelPosition !== 'FLOATING';
  const ImageElement = options.styleProps.showCardIcon !== false && img && getImageSources(img);

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldWrapper}>
        {hasPhysicalLabel && <Text style={styles.labelContainer}>{labelText}</Text>}
        <View style={[img && styles.imageWrapper, styles.inputWrapper]}>
          <TextInput
            accessibilityState={{ selected: isFocus }}
            style={[styles.textInput]}
            placeholder={!hasPhysicalLabel ? placeholderText : undefined}
            placeholderTextColor={styles.placeholder.color}
            onChangeText={setText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              validator(eventType.BLUR);
            }}
            ref={ref}
            {...TextInputProps}
          />
          {img && ImageElement && (
            <View style={styles.image}>
              <ImageElement />
            </View>
          )}
          {img === 'PREVIEW' && (
            <View style={styles.image}>
              <CardPreview supportedNetworks={supportedNetworks ?? defaultSupportedNetworks} />
            </View>
          )}
        </View>
        {options.styleProps.showErrorSpacing !== false && !error && (
          <Text testID={'error-spacer'} style={styles.errorSpacer}></Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
});

export default InputField;
