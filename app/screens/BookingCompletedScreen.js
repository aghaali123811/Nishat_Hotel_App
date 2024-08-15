import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from '../components/PrimaryButton';
import SimpleButton from '../components/SimpleButton';
import WhatsappFloating from '../components/WhatsappFloating';
import Routes from '../navigations/Routes';
// import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
const {OSregular, OSBold, OSsemiBold} = AppTheme.fonts;
const {black, dark} = AppTheme.colors;

const BookingCompletedScreen = (props) => {
  console.log('BookingComplete===>', props.route.params);
  const {checkIn, checkOut, total, status, bookingNumber} = props.route.params;

  let bookingDetail = [
    {
      label: 'CHECK-IN:',
      value: moment(checkIn,'DD-MM-YYYY').format("MMM, DD YYYY"),
    },
    {
      label: 'CHECK-OUT:',
      value: moment(checkOut,'DD-MM-YYYY').format("MMM, DD YYYY"),
    },
    {
      label: 'TOTAL:',
      value: `USD. ${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    },
    {
      label: 'STATUS:',
      value: status,
    },
  ];

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(true);
    }
    props.navigation.setOptions({title: ''});

    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, [props.navigation]);

  return (
    <View>
      <ScrollView style={{marginBottom: RFValue(30)}}>
        <WhatsappFloating/>
        <View style={{alignItems: 'center', marginTop: RFValue(48)}}>
          <Image
            source={require('../assets/checked.png')}
            style={{width: RFValue(96), height: RFValue(96)}}
          />
          <Text
            style={{
              fontSize: 28,
              marginTop: RFValue(16),
              fontFamily: OSregular,
              color: black,
            }}>
            Thank You!
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: RFValue(16),
              textAlign: 'center',
              fontFamily: OSregular,
              color: dark,
            }}>
            We are pleased to inform you that your reservation request has been
            received and confirmed.{' '}
          </Text>

          <Text
            style={{
              fontSize: 22,
              marginTop: RFValue(32),
              fontFamily: OSregular,
              color: black,
            }}>
            Booking Details
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: RFValue(8),
              textAlign: 'center',
              fontFamily: OSregular,
              color: dark,
            }}>
            {' '}
            {`Your booking number: ${bookingNumber}`}{' '}
          </Text>
        </View>

        <View style={{marginTop: RFValue(18)}}>
          {bookingDetail.map((item) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: RFValue(16),
                  paddingVertical: RFValue(3),
                }}>
                <Text style={styles.semiBoldText}>{item.label}</Text>
                <Text style={styles.semiBoldText}> {item.value} </Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.instructions}>
          For stays of 4 nights, the {''}
          <Text onPress={()=> props.navigation.navigate(Routes.CancellationPolicy)} style={styles.link}>Cancellation Policy</Text> automatically
          applies.
        </Text>
        {/* {console.log('PROPS', props.app)} */}
        {props.app.isLoggedIn && (
          <PrimaryButton
            style={{marginTop: RFValue(24)}}
            label="My Bookings"
            onPress={() => props.navigation.navigate(Routes.MyBookings)}
          />
        )}
        <SimpleButton
          style={{marginTop: 8}}
          label="Go To Home"
          onPress={() => props.navigation.navigate(Routes.Home)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  semiBoldText: {
    fontSize: 14,
    fontFamily: OSsemiBold,
    color: dark,
  },
  link: {
    textDecorationLine: 'underline',
  },
  instructions: {
    fontSize: 16,
    marginTop: RFValue(32),
    marginHorizontal: RFValue(16),
    fontFamily: OSregular,
    color: dark,
  },
});

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingCompletedScreen);
