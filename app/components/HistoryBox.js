import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {greyPrimary, greySecondary} = AppTheme.colors;
const {PFregular, PFbold, OSregular, OSsemiBold} = AppTheme.fonts;

const HistoryBox = ({item}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: item.bgColor ? item.bgColor : undefined,
      }}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.timeStamp}</Text>
      </View>

      <Text style={styles.points}>{item.points}</Text>
    </View>
  );
};

export default HistoryBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(10),
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
  },

  name: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(15),
  },

  time: {
    color: greySecondary,
    fontSize: RFValue(12),
    marginTop: RFValue(4),
  },

  points: {
    marginTop: RFValue(10),
    fontFamily: OSsemiBold,
    fontSize: RFValue(12),
  },
});
