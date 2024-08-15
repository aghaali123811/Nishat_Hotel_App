import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from '../utils/DateRangerPIcker/ComposePicker';
import PrimaryButton from './PrimaryButton';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
const DateRangeSelector = ({setDateRange}) => {
  return (
    <View style={{flexGrow: 1, height: '100%', backgroundColor: 'white'}}>
      <DatePicker
        customStyles={{
          placeholderText: {fontSize: 20}, // placeHolder style
          headerStyle: {backgroundColor: 'red', display: 'none'}, // title container style
          headerMarkTitle: {color: 'white'}, // title mark style
          headerDateTitle: {color: 'white'}, // title Date style
          contentInput: {}, //content text container style
          contentText: {}, //after selected text Style
        }} // optional
        allowFontScaling={false} // optional
        placeholder={'asdf'}
        mode={'range'}
        customButton={(onPress) => (
          <TouchableOpacity onPress={onPress}>
            <Text>Done</Text>
          </TouchableOpacity>
        )}
        onConfirm={(params) => {
          console.log('params',params)
          setDateRange(params);
        }}
        renderBottom={(onConfirm, otherData) => {
          return (
            <View style={styles.bottomContainer}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.checkInOut}>CHECK IN</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.checkInOutDate}>
                      {otherData.startDate &&
                        moment(otherData.startDate).format('DD')}
                    </Text>
                    <Text style={styles.date}>
                      {otherData.startDate &&
                        moment(otherData.startDate).format('MMM') +
                          '\n' +
                          moment(otherData.startDate).format('YYYY')}
                    </Text>
                  </View>
                </View>
                <View style={styles.col}>
                  <Text style={styles.checkInOut}>CHECK OUT</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.checkInOutDate}>
                      {otherData.endDate &&
                        moment(otherData.endDate).format('DD')}
                    </Text>
                    <Text style={styles.date}>
                      {otherData.endDate &&
                        moment(otherData.endDate).format('MMM') +
                          '\n' +
                          moment(otherData.endDate).format('YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              <PrimaryButton label="APPLY DATES" onPress={onConfirm} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: -4},
    shadowOpacity: 0.2,
    left: 0,
    right: 0,
    padding: '4%',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  col: {
    flex: 1,
  },
  checkInOut: {
    fontFamily: 'OpenSans',
    fontSize: RFValue(13),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'rgb(129, 129, 129)',
  },
  checkInOutDate: {
    fontFamily: AppTheme.fonts.PFregular,
    fontSize: RFValue(23),
    color: 'rgb(20, 20, 20)',
  },
  date: {
    fontFamily: AppTheme.fonts.PFregular,
    fontSize: RFValue(13),
    color: 'rgb(20, 20, 20)',
    margin: '4%',
  },
});

export default DateRangeSelector;
