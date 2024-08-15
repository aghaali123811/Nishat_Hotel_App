import React, { memo } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Themes } from '../store/utils/branchData';

const {deviceHeight, deviceWidth} = AppTheme.metrics;
const {OSregular} = AppTheme.fonts;
const {greyPrimary} = AppTheme.colors;

const BottomSheetHeader = ({title, refer, fontSize, bold, theme}) => {
  return (
    <View style={[styles.bottomSheetHeader,{backgroundColor: Themes[theme]}]}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: OSregular,
          fontSize: fontSize? fontSize : RFValue(16),
          fontWeight: bold? bold : null,
          color: 'white'
        }}>
        {title}
      </Text>
      <View style={{position: 'absolute', right: 0}}>
        <TouchableOpacity
          onPress={() => refer.current.snapTo(1)}
          activeOpacity={0.6}>
          <Image
            source={require('../assets/close.png')}
            style={{
              tintColor: '#555',
              marginRight: RFValue(10),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(BottomSheetHeader);

const styles = StyleSheet.create({
  bottomSheetHeader: {
    flexDirection: 'row',
    height: RFValue(46),
    borderBottomWidth: 1,
    borderColor: greyPrimary,
    borderTopLeftRadius: RFValue(13),
    borderTopRightRadius: RFValue(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
