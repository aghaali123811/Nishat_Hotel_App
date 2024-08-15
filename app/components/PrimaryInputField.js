/* eslint-disable react-native/no-inline-styles */
import React, { useState, forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import * as Animatable from 'react-native-animatable';
import { number } from 'yup';
// import { RNImage } from '../utils/Image'
const PrimaryInputField = ({
  editable,
  keyboardType,
  autoCapitalize,
  touched,
  error,
  onChangeText,
  onBlur,
  value,
  secureTextEntry,
  placeholder,
  onChange,
  multiline = false,
  maxLength = 999,
  returnKeyType,
  onSubmit,
  pointerEvents,
  ...props
}, ref) => {
  const { greyPrimary, greySecondary } = AppTheme.colors;
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);
  return (
    <>
      <View
        style={{
          ...styles.container,
          marginHorizontal: RFValue(18),
          borderColor: focused ? greySecondary : greyPrimary,
          borderWidth: 1,
          // backgroundColor: focused ? 'white' : '#f7f7f7',
        }}>
        <>
          <TextInput
            autoCapitalize={autoCapitalize}
            editable={editable}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            multiline={multiline}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength}
            onSubmitEditing={onSubmit}
            blurOnSubmit={true}
            // placeholderTextColor={focused ? '#000' : undefined}
            onBlur={() => {
              onBlur();
              setFocused(true);
            }}
            secureTextEntry={isSecureTextEntry}
            style={{
              ...styles.input,
              height: multiline ? RFValue(160) : undefined,
              textAlignVertical: multiline ? 'top' : undefined,
              backgroundColor: !editable && pointerEvents !== 'none' ? '#f1f2f6' : '#ffffff',

            }}
            placeholderTextColor='grey'
            ref={ref}
            pointerEvents={pointerEvents}
          />
          {
            (secureTextEntry) && (<TouchableOpacity onPress={()=>{
              if(isSecureTextEntry)
              setIsSecureTextEntry(false)
            else
            setIsSecureTextEntry(true)
            }}><Image source={(isSecureTextEntry)?require('../assets/view_eye.png'):require('../assets/hide_eye.png')} style={{ marginHorizontal: 10, width: 20, height: 20, }} resizeMode='contain' /></TouchableOpacity>)
          }
        </>
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
    marginTop: '0%',
    marginLeft: RFValue(18),
    fontSize: RFValue(12),
  },
});
export default forwardRef(PrimaryInputField); // PrimaryInputField;
