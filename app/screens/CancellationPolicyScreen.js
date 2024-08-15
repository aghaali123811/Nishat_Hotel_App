import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity, Dimensions
} from 'react-native';
import Header from '../components/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import SettingsItem from '../components/SettingsItem';
import WhatsappFloating from '../components/WhatsappFloating';
import EditProfileField from '../components/EditProfileField';
import PrimaryButton from '../components/PrimaryButton';
import { updateProfile } from '../store/actions/AppActions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import PrimaryInputField from '../components/PrimaryInputField';
const { greyPrimary, greySecondary, dark } = AppTheme.colors;
const { OSregular, OSsemiBold } = AppTheme.fonts;

const data = [
  'Check-in time is 1400 hours.',
  'Check-out time is 1200 hours.',
  'Face Mask is mandatory in all public areas of the hotel.',
  'Returnable deposit of Rs.5000 per room per night is essential at the time of check in along with room rate and taxes.',
  'No weapons are allowed in the parameter and premises of hotel, if found entry will be restricted.',
  'CNIC of all the domestic guests and Passport with valid visa for foreign guests staying is mandatory as per Government’s policy.',
  'Non-refundable reservation: 10% to 15% discount will be given and card will be charged immediately. This booking cannot be cancelled or modified. Hotel should have the option to change discount for 10% or 15% when needed.',
  'Flexible reservation: Card will not be charged upon reservation, only card details will be taken to confirm the reservation and it will be charged upon check-in. This reservation can be cancelled or modified same day of arrival till 4pm.” Afterwards it can be charged manually through the card details provided on website.',
  'Rates quoted in USD will be calculated with the arrival day exchange rates. To fix the exchange rate please use “Pay Now”.',
  'Additional bank charges may applied.',
]
const cancellationPolicyScreen = (props) => {


  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <WhatsappFloating/>
      <ScrollView style={{}}>
        <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 40 }}>
          {
            data.map((item, index) => {
              return <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: '8%' }}>
                  <Text>{index + 1})</Text>
                </View>
                <View style={{ width: '92%' }}>
                  <Text>{item}</Text>
                </View>
              </View>
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(cancellationPolicyScreen);

const styles = StyleSheet.create({
  settingsHeader: {
    marginLeft: RFValue(16),
    marginTop: RFValue(17),
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(13),
    marginBottom: RFValue(12),
  },

  image: {
    width: RFValue(96),
    height: RFValue(96),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  phone: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: greySecondary,
  },

  name: {
    fontSize: RFValue(24),
    marginBottom: RFValue(3),
  },
  button: { marginTop: RFValue(20) },
  name: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: greySecondary,
  },

  subtitle: {
    color: dark,
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },
});
