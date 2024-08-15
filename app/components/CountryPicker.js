/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';
import Routes from '../navigations/Routes';

const CountryPicker = ({navigation, setFieldValue, value}) => {
  const [focused, setFocused] = useState(false);
  const {greyPrimary, greySecondary} = AppTheme.colors;
  const country = value.split('+++')[1];
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(Routes.Country, {setFieldValue})}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        backgroundColor: focused ? 'white' : '#f7f7f7',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: focused ? greySecondary : greyPrimary,
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(10),
        marginHorizontal: RFValue(18),
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text>{country ? country : 'Select country'}</Text>
      <Image source={require('../assets/cright.png')} />
    </TouchableOpacity>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({});
