/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import * as Animatable from 'react-native-animatable';
import PrimaryButton from './PrimaryButton';

const InputWithButton = ({
  touched,
  error,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  placeholder,
}) => {
  const {greyPrimary, greySecondary} = AppTheme.colors;
  const [focused, setFocused] = useState(false);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            ...styles.container,
            height: RFValue(48),
            marginTop: RFValue(15),
            width: RFValue(210),
            marginLeft: RFValue(18),
            borderColor: focused ? greySecondary : greyPrimary,
            borderWidth: 1,
            backgroundColor: focused ? 'white' : '#fff',
          }}>
          <TextInput
            value={value}
            onFocus={() => setFocused(true)}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={focused ? '#000' : undefined}
            onBlur={() => {
              onBlur();
              setFocused(false);
            }}
            secureTextEntry={secureTextEntry}
            style={styles.input}
          />
        </View>
        <PrimaryButton width={RFValue(110)} label="APPLY" />
      </View>

      {touched && error && (
        <Animatable.Text animation="bounceIn" style={styles.error}>
          {error}
        </Animatable.Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: RFValue(10),
    alignItems: 'center',
  },

  input: {
    fontSize: RFValue(14),
    color: '#000',
    paddingVertical: RFValue(10),
    flex: 1,
    paddingHorizontal: RFValue(15),
  },
  error: {
    color: 'darkred',
    marginTop: '2%',
    marginLeft: RFValue(18),
    fontSize: RFValue(12),
  },
});
export default InputWithButton;
