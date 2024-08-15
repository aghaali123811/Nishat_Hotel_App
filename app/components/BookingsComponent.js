/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import BookingItem from './BookingItem'

const { OSregular } = AppTheme.fonts;

const BookingsComponent = ({ bookings, canCancel = false,navigation }) => {

  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={bookings}
        renderItem={({ item }) => (
          <BookingItem data={item} canCancel={canCancel} navigation={navigation} />
        )}
      />
      {bookings.length == 0 && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: RFValue(24), fontFamily: OSregular }}>No Booking</Text>
      </View>}
    </View>
  );
};

export default BookingsComponent;

const styles = StyleSheet.create({
  container: {

  },

});
