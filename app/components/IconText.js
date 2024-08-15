import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const {OSregular} = AppTheme.fonts;

const IconText = ({image, text}) => {
  return (
    <View
      style={{
        marginTop: RFValue(10),
      }}>
      <Image source={image} style={styles.icon} />
      <Text style={styles.iconSubtitle}>{text}</Text>
    </View>
  );
};

export default IconText;

const styles = StyleSheet.create({
  icon: {
    marginRight: RFValue(63),
    width: RFValue(23),
    marginBottom: RFValue(8),
    resizeMode: 'contain',
  },

  iconSubtitle: {
    /* marginRight: RFValue(27), */
    width: RFValue(70),
    fontFamily: OSregular,
    fontSize: RFValue(12),
  },
});
