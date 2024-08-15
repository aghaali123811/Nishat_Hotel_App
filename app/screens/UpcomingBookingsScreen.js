/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import HeaderWithBanner from '../components/HeaderWithBanner';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from '../components/PrimaryButton';
import Routes from '../navigations/Routes';
import * as reactRedux from 'react-redux';
import moment from 'moment';
import {Themes} from '../store/utils/branchData';
// import {useFocusEffect} from '@react-navigation/native';
import BookingsComponent from '../components/BookingsComponent';
import {getBookings} from '../store/actions/AppActions';

const UpcomingBookingsScreen = ({navigation, bookings, route, ...props}) => {
  // console.log("UpcomingBookingsScreen", bookings);
  
  // useEffect(() => {
    // props.getBookings(227);
  // }, []);

  return (
    <>
      <View>
        <BookingsComponent bookings={bookings} canCancel={true} navigation={navigation} />
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {getBookings};

export default reactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpcomingBookingsScreen);

const styles = StyleSheet.create({});
