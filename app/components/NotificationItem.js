/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';
import moment from 'moment';

const {deviceWidth} = AppTheme.metrics;
const {OSsemiBold, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;
const date = new Date();
const currentYear = date.getFullYear();

const NotificationItem = ({item, ...props}) => {
  let icon;

  const WhiteBg = item.bgColor === 'white';

  if (item.type === 'confirmation') {
    icon = WhiteBg
      ? require('../assets/calendar_black.png')
      : require('../assets/calendar.png');
  }
  //
  else if (item.type === 'rewards') {
    icon = require('../assets/rewards.png');
  }
  //
  else if (item.type === 'announcement') {
    icon = require('../assets/announcement.png');
  }
  //
  else if (item.type === 'info') {
    icon = require('../assets/info.png');
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: item.bgColor}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/calendar_black.png')}
          style={{...styles.icon}}
        />
        <View>
          <Text
            style={{
              color: 'rgb(20,20,20)',
              fontFamily: WhiteBg ? OSregular : OSsemiBold,
              paddingRight: RFValue(45),
              marginBottom: RFValue(3),
              fontSize: RFValue(14),
            }}>
            {item.data.message}
          </Text>
          <Text style={{color: greySecondary}}>
            {moment(item.created_at).format('MMM DD YYYY HH:mm a')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(NotificationItem);

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(20),
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
  },

  icon: {
    width: RFValue(25),
    height: RFValue(25),
    marginRight: RFValue(20),
  },
});
