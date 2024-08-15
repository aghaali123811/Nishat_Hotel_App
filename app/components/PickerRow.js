/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import { connect } from 'react-redux';
import { Themes } from '../store/utils/branchData';
import moment from 'moment';

const { greyPrimary } = AppTheme.colors;
const { PFregular, OSregular } = AppTheme.fonts;

const PickerRow = ({ refer, calendarRef, dates, guests, ...props }) => {
  return (
    <View style={styles.pickerRow}>
      <View style={styles.pickDatesRow}>
        <TouchableOpacity
          style={styles.checkin}
          onPress={() => {
            if (props?.setShowCalendar) {
              props?.setShowCalendar(true);
            }
            calendarRef.current.snapTo(0)
          }}>
          <Text style={styles.selectorText}>CHECK IN</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.date}>
              {dates.startDate
                ? moment(dates.startDate).format('DD') + ' '
                : ''}
            </Text>
            <Text style={styles.month}>
              {dates.startDate
                ? moment(dates.startDate).format('MMM') +
                ' ' +
                moment(dates.startDate).format('YYYY')
                : ''}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => {
            if (props?.setShowCalendar) {
              props?.setShowCalendar(true);
            }
            calendarRef.current.snapTo(0)
          }}>
          <Text style={styles.selectorText}>CHECK OUT</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.date}>
              {dates.startDate ? moment(dates.endDate).format('DD') + ' ' : ''}
            </Text>
            <Text style={styles.month}>
              {dates.startDate
                ? moment(dates.endDate).format('MMM') +
                ' ' +
                moment(dates.endDate).format('YYYY')
                : ''}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={styles.guestContainer}
        onTouchEnd={() => {
          if (props?.setShowGuests) {
            props?.setShowGuests(true)
          }
         
          refer.current.snapTo(0)
        }}>
        <Text style={styles.selectorText}>GUESTS</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...styles.date,
              textAlign: 'center',
            }}>
            {guests < 10 ? `0${guests}` : guests}
          </Text>
          <Image
            source={require('../assets/cdown_black.png')}
            style={{
              marginLeft: RFValue(3),
              width: RFValue(26),
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(PickerRow);

const styles = StyleSheet.create({
  checkin: {
    // marginRight: '6%',
  },

  selectorText: {
    marginBottom: '9%',
    color: 'rgb(129,129,129)',
    fontFamily: OSregular,
  },

  date: {
    marginTop: '-10%',
    fontFamily: PFregular,
    fontSize: RFValue(20),
  },

  month: {
    fontFamily: OSregular,
    fontSize: RFValue(13),
  },

  pickDatesRow: {
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'space-between',
    width: '66%',
  },

  pickerRow: {
    marginTop: '-3.1%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
    paddingBottom: RFValue(2),
  },

  guestContainer: {
    marginBottom: '2%',
    paddingLeft: '5%',
    paddingTop: '2%',
    borderLeftWidth: 1,
    borderLeftColor: greyPrimary,
    width: '33%',
  },
});
