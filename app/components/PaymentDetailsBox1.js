/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {OSsemiBold, PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;

const PaymentDetailsBox1 = ({rooms, roomCost, setTotal}) => {
  const priceStr = (roomCost * rooms).toString();
  return (
    <>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: RFValue(20),
          paddingTop: RFValue(12),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/bed.png')}
            style={{...styles.image, tintColor: greySecondary}}
          />

          <Text style={styles.service}>{rooms + ' Rooms'}</Text>
        </View>
        <Text>
          {'PKR    ' +
            (priceStr.length > 1
              ? priceStr.slice(0, 2) + ',' + priceStr.slice(2, priceStr.length)
              : priceStr)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: RFValue(20),
          paddingVertical: RFValue(8),
          borderBottomWidth: 1,
          borderBottomColor: greyPrimary,
        }}
      />
      {/*  <Image source={require('../assets/matress.png')} style={styles.image} />
        <Text style={styles.service2}>1 Mattress</Text>
        <Text>{'PKR    2,000'}</Text>
      </View> */}
    </>
  );
};

export default PaymentDetailsBox1;

const styles = StyleSheet.create({
  image: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: RFValue(10),
  },

  service: {
    /* marginRight: RFValue(164), */
    fontFamily: OSregular,
    fontSize: RFValue(13),
  },

  service2: {
    marginRight: RFValue(153),
    fontFamily: OSregular,
    fontSize: RFValue(13),
  },
});
