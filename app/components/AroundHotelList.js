import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';

const {PFregular} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;
const experiencesImg = [
  {
    img: require('../assets/fineDining.png'),
    text: 'Restaurants',
  },

  {
    img: require('../assets/fineDining.png'),
    text: 'Pool',
  },

  {
    img: require('../assets/fineDining.png'),
    text: 'Lounge Bar',
  },

  {
    img: require('../assets/fineDining.png'),
    text: 'Gym',
  },

  {
    img: require('../assets/fineDining.png'),
    text: 'Gym',
  },
];

const AroundHotelList = () => {
  return (
    <ScrollView
      horizontal={true}
      style={{
        marginLeft: RFValue(15),
        marginBottom: RFValue(40),
      }}>
      {experiencesImg.map((i) => (
        <View style={styles.experienceItem} key={Math.random()}>
          <Image
            source={i.img}
            style={{height: RFValue(179), width: RFValue(122)}}
          />
          <Text style={styles.bottomText}>{i.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AroundHotelList;

const styles = StyleSheet.create({
  bottomTextContainer: {
    backgroundColor: greyPrimary,
    /* bottom: RFValue(5), */
    opacity: 0.85,
    /* height: RFValue(36), */
    justifyContent: 'center',
    /* position: 'absolute', */
  },

  bottomText: {
    fontFamily: PFregular,
    fontSize: RFValue(17),
    marginLeft: RFValue(7),
    color: '#fff',
    position: 'absolute',
    bottom: RFValue(15),
  },

  experienceItem: {
    marginRight: RFValue(10),
    flex: 1,
  },
});
