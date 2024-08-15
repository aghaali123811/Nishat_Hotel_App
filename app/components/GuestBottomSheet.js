import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from './PrimaryButton';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;
let count;

const GuestBottomSheet = ({setGuestInfo, setTotalGuests, refer}) => {
  const [Adult, setAdult] = useState(1);
  const [Child, setChild] = useState(0);

  const setData = () => {
    setGuestInfo({adult: Adult, children: Child});
    setTotalGuests(Adult + Child);
    console.log("totalGuest in Guest Bottom Sheet => ", Adult+Child);
    refer.current.snapTo(1);
  };

  const childAge = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: RFValue(15),
        }}>
        <>
          <View style={styles.firstHorizontalContainer}>
            <View style={{width: '66%'}}>
              <Text style={styles.personType}>Adults</Text>
              <Text style={{color: AppTheme.colors.greySecondary}}>
                2 allowed per room
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flex: 3,
                width: '33%',
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setAdult(Adult > 1 ? Adult - 1 : Adult)}>
                <Image source={require('../assets/mins.png')} />
              </TouchableOpacity>

              <Text style={styles.number}>{Adult}</Text>

              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setAdult(Adult<3? Adult+1:Adult)}>
                <Image source={require('../assets/plus.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.secondHorizontalContainer}>
            <View style={{width: '66%'}}>
              <Text style={styles.personType}>Children</Text>
              <Text style={{color: AppTheme.colors.greySecondary}}>
                5 years or less
              </Text>
            </View>
            <View style={{flexDirection: 'row', flex: 3, width: '33%'}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setChild(Child > 0 ? Child - 1 : Child)}>
                <Image source={require('../assets/mins.png')} />
              </TouchableOpacity>

              <Text style={styles.number}>{Child}</Text>

              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setChild(Child<2? Child+1:Child)}>
                <Image source={require('../assets/plus.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>
      <View style={{paddingBottom: 15}}>
        <View
          style={{
            marginTop: 16,
            borderBottomColor: AppTheme.colors.greyPrimary,
            borderBottomWidth: 1,
          }}></View>
        <Text style={{...styles.personType, marginLeft: 16, marginVertical: 16}}>
          Note
        </Text>
        <Text
          style={{
            marginLeft: 16,
            marginBottom: 16,
            color: AppTheme.colors.greySecondary,
          }}>
          For any child above 5 years’ age, PKR 2000 will be charged as an extra
          bed cost.
        </Text>
        <PrimaryButton label="APPLY" onPress={setData} />
      </View>
      {/* add function in which setTotalGuests, setGuestsInfo and snapTo(1) is called. remove useEffect */}
    </View>
  );
};

export default GuestBottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: RFValue(19),
  },

  firstHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  secondHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(12),
  },

  number: {
    marginHorizontal: RFValue(16),
    fontSize: RFValue(22),
    flex: 1,
    textAlign: 'center',
  },

  personType: {fontSize: RFValue(18), fontFamily: OSregular},

  divider: {
    marginVertical: RFValue(18),
    height: 1,
    backgroundColor: greyPrimary,
  },

  ageHeading: {
    fontFamily: OSregular,
    color: greySecondary,
    marginBottom: RFValue(8),
  },

  age: {marginRight: RFValue(6), fontFamily: OSregular},
});
