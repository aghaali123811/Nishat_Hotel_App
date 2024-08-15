import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {greyPrimary, greySecondary} = AppTheme.colors;
const {OSsemiBold, OSregular} = AppTheme.fonts;
const rooms = [
  {
    roomType: 'Deluxe Room',
    dates: '24 Jan 2020  -  27 Jan 2020',
    image: require('../assets/deluxeRooms.png'),
  },
  {
    roomType: 'Executive Room',
    dates: '7 Jan 2020  -  11 Jan 2020',
    image: require('../assets/deluxeRooms.png'),
  },
  {
    roomType: 'Platinum Room',
    dates: '2 Jan 2020  -  3 Jan 2020',
    image: require('../assets/deluxeRooms.png'),
  },
];

const ListItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.roomImage} />

      <View style={styles.textContainer}>
        <Text style={styles.roomType}>{item.roomType}</Text>
        <Text style={styles.dates}>{item.dates}</Text>
      </View>
    </View>
  );
};

const HistoryScreen = () => {
  return (
    <FlatList
      data={rooms}
      keyExtractor={() => Math.random().toString()}
      renderItem={({item}) => <ListItem item={item} />}
    />
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: RFValue(15),
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
  },

  roomImage: {
    height: RFValue(47),
    width: RFValue(47),
  },

  textContainer: {
    marginLeft: RFValue(15),
    marginTop: RFValue(2),
  },

  roomType: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(15),
    marginBottom: RFValue(3),
  },

  dates: {
    color: greySecondary,
    fontFamily: OSsemiBold,
    fontSize: RFValue(12),
  },
});
