/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import moment from 'moment';

const {OSregular, PFregular, OSsemiBold} = AppTheme.fonts;
const {greySecondary} = AppTheme.colors;

const BookedRoomDetail = ({data}) => {
  console.log("guest details -> ", data.guests);
  const {adult, children} = data.guests;
  const {dates, room, roomImage} = data;
  const arrival = new Date(dates.startDate);
  const departure = new Date(dates.endDate);

  return (
    <>
      <View style={styles.container}>
        <Image source={{uri: roomImage}} style={styles.image} />

        <View style={{marginLeft: RFValue(15)}}>
          <Text style={styles.roomType}>{room}</Text>

          <Text style={styles.branch}>{data.branch}</Text>

          <View style={{flexDirection: 'row', paddingVertical: RFValue(3)}}>
            <Image
              source={require('../assets/calendar.png')}
              style={{marginRight: RFValue(8)}}
            />
            <Text>
              {moment(arrival).format('D MMM') +
                ' - ' +
                moment(departure).format('D MMM')}
            </Text>
          </View>

          <View style={{flexDirection: 'row', paddingVertical: RFValue(3)}}>
            <Image
              source={require('../assets/users.png')}
              style={{marginRight: RFValue(8)}}
            />
            <Text style={{marginRight: RFValue(15)}}>{Number(adult) + ' adults'}</Text>
            <Image
              source={require('../assets/child.png')}
              style={{marginRight: RFValue(8)}}
            />

            <Text>{Number(children) + ' children'}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 0.7,
          backgroundColor: greySecondary,
          marginHorizontal: RFValue(20),
        }}
      />
    </>
  );
};

export default BookedRoomDetail;

const styles = StyleSheet.create({
  container: {
    padding: RFValue(20),
    flexDirection: 'row',
  },

  image: {
    width: RFValue(100),
    height: RFValue(100),
  },

  branch: {
    fontFamily: OSregular,
    fontSize: RFValue(14),
    color: greySecondary,
    marginVertical: RFValue(3),
  },

  roomType: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(14),
    paddingRight: RFValue(85),
  },
});
