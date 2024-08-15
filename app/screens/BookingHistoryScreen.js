/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {connect} from 'react-redux';
import BookingsComponent from '../components/BookingsComponent';
import WhatsappFloating from '../components/WhatsappFloating';

const BookingHistoryScreen = ({navigation, bookings, route, ...props}) => {
  return (
    <View>
      <WhatsappFloating/>
      <BookingsComponent bookings={bookings} />
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(BookingHistoryScreen);

const styles = StyleSheet.create({});
