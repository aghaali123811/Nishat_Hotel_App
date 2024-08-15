/* import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {greyPrimary, greySecondary} = AppTheme.colors;
const {OSregular, PFregular} = AppTheme.fonts;

const UpcomingScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={require('../assets/room.png')} />

        <View style={styles.textContainer}>
          <View>
            <Text style={styles.branchName}>Nishat Johar Town</Text>
            <Text style={styles.roomType}>Deluxe Room</Text>
          </View>

          <View style={{flexDirection: 'row', marginVertical: RFValue(6)}}>
            <Image source={require('../assets/calendar.png')} />
            <Text style={styles.dates}>{'6 Mar  -  15 Mar'}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/users.png')} />
            <Text style={styles.peopleTxt}>1 Adult(s)</Text>

            <Image
              style={styles.children}
              source={require('../assets/child.png')}
            />
            <Text style={styles.peopleTxt}>2 Children</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: RFValue(15),
    borderBottomColor: greyPrimary,
    borderBottomWidth: 1,
  },

  textContainer: {
    marginHorizontal: RFValue(15),
  },

  branchName: {
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },

  roomType: {
    fontFamily: PFregular,
    fontSize: RFValue(23),
    marginTop: RFValue(-5),
    marginBottom: RFValue(7),
  },

  dates: {
    fontFamily: OSregular,
    fontSize: RFValue(14),
    marginLeft: RFValue(7),
    marginTop: RFValue(-2),
  },

  children: {
    marginLeft: RFValue(12),
  },

  peopleTxt: {
    marginLeft: RFValue(6),
  },
});
 */
