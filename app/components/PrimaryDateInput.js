/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import * as Animatable from 'react-native-animatable';
import TextStyles from '../styles/TextStyles';
import DatePicker from 'react-native-datepicker';
import {TextInput} from 'react-native-gesture-handler';

const {greyPrimary, greySecondary} = AppTheme.colors;
const currentDate = new Date();

const PrimaryDateInput = ({
  touched,
  error,
  onChange,
  value,
  secureTextEntry,
  placeholder,
  icon,
  style = {},
  onBlur,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <View
        style={[
          styles.container,
          style,
          {
            borderColor: focused ? greySecondary : greyPrimary,
            backgroundColor: focused ? 'white' : '#f7f7f7',
          },
        ]}>
        {/* 
        <View style={styles.leftRow}>
          <Image source={require('../assets/events.png')} style={styles.icon} />
        </View> */}
        <DatePicker
          onOpenModal={() => setFocused(true)}
          onCloseModal={() => setFocused(false) + onBlur()}
          style={styles.input}
          date={value}
          mode="date"
          placeholder={placeholder}
          format="MM-DD-YYYY"
          showIcon={false}
          minDate={currentDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              borderWidth: 0,
              // width: '100%',
            },
            placeholderText: {
              alignSelf: 'flex-start',
              ...TextStyles.body2GreyRegularLeft,
            },
            dateText: {
              alignSelf: 'flex-start',
              ...TextStyles.body2GreyRegularLeft,
            },
          }}
          onDateChange={(date) => {
            setFocused(false);
            onChange(date);
            onBlur();
          }}
        />
        {/* Hidden field added to match heights of other input fields */}
        <TextInput
          value={value}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          placeholderTextColor={AppTheme.colors.scrimsDarker60}
          style={styles.hiddenInput}
        />
      </View>
      {touched && error && !value && (
        <Animatable.Text animation="bounceIn" style={styles.error}>
          {error}
        </Animatable.Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: RFValue(18),
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: RFValue(10),
    alignItems: 'center',
    borderWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'rgb(199,202,209)',
  },
  icon: {
    width: RFValue(23),
    height: RFValue(23),
  },
  input: {
    marginLeft: '5%',
    ...TextStyles.body2GreyRegularLeft,
    flex: 1,
  },
  error: {
    color: 'darkred',
    marginTop: '2%',
    marginLeft: '2%',
    fontSize: RFValue(12),
  },
  hiddenInput: {
    opacity: 0,
    fontSize: RFValue(14),
    color: AppTheme.colors.scrimsDarker60,
    paddingVertical: RFValue(12),
    width: 1,
  },
});
export default PrimaryDateInput;
