/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import moment from 'moment';
import FastImage from '../utils/Image';
const { OSregular, PFregular, OSsemiBold } = AppTheme.fonts;
const { greySecondary, greyLight } = AppTheme.colors;
import SimpleButton from './SimpleButton';
import Routes from '../navigations/Routes';
const BookingItem = ({ data, canCancel,navigation}) => {

  console.log('datadatadata11', data.arrival, data.departure)
  const { get_room, arrival, departure, hotel_id } = data;
  const { aptr_name, background_image } = get_room;

  const arrivalDate = moment(arrival).format("MMM, DD YYYY")
  const departureDate = moment(departure).format("MMM DD, YYYY")

  return (
    <>
      <View style={styles.container}>
        <FastImage source={{ uri: background_image }} style={styles.image} />

        <View style={{ marginLeft: RFValue(16) }}>
          <Text style={styles.roomName}>{aptr_name}</Text>
          <Text style={styles.branch}>{(hotel_id == 1) ? 'Nishat Gulberg' : 'Nishat Johar Town'}</Text>
          <View style={{ flexDirection: 'row', marginTop: RFValue(7) }}>
            <Image
              source={require('../assets/calendar.png')}
              style={{ marginRight: RFValue(8) }}
            />
            <Text style={{ marginRight: RFValue(15) }}>{arrivalDate + " - " + departureDate}</Text>
          </View>
        </View>

      </View>
      <View style={{ paddingHorizontal: 20, width: 200, alignSelf: 'flex-end' }}>
        <SimpleButton
          label="Cancel Booking"
          lableStyle={{ fontSize: RFValue(10.5) }}
          containerStyle={{ marginVertical: RFValue(13), height: 40, borderWidth: 1 }}
          onPress={() => {
            navigation.navigate(Routes.cancelBooking,{data,navigation})
          }}
          style={{ marginTop: 0 }}
        />
      </View>
      <View
        style={{
          height: 0.7,
          backgroundColor: greyLight,
          marginHorizontal: RFValue(16),
        }}
      />
    </>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    padding: RFValue(16),
    flexDirection: 'row',
  },

  image: {
    width: RFValue(72),
    height: RFValue(48),
    justifyContent: 'center',
    alignSelf: 'center'
  },

  branch: {
    fontFamily: OSregular,
    fontSize: RFValue(12),
    color: greySecondary,
    /* marginBottom: RFValue(3), */
  },

  roomName: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(14),
    marginBottom: RFValue(3),
  },
});
