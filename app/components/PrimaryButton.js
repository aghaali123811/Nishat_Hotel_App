/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import AppTheme from '../styles/AppTheme';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';
import {ActivityIndicator} from 'react-native-paper';

const {greySecondary} = AppTheme.colors;

const PrimaryButton = ({
  onPress,
  width = '',
  label,
  disabled,
  style,
  loading,
  ...props
}) => {

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          marginBottom: Platform.OS === 'android' ? RFValue(10) : RFValue(10),
          marginHorizontal: RFValue(12),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: '90%',
          // width:
          //   width === ''
          //     ? Platform.OS == 'android'
          //       ? '100%'
          //       : RFValue(310)
          //     : width,
          height: RFValue(48),
          backgroundColor: disabled ? '#a1a1a1' : Themes[props.app.branch],
          flexDirection: 'row',
          ...style,
        }}>
        {loading && (
          <ActivityIndicator color="white" style={{marginRight: '5%'}} />
        )}

        <Text style={styles.btnlabel}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(PrimaryButton);

const styles = StyleSheet.create({
  btnlabel: {
    color: 'white',
    fontSize: RFValue(17),
    fontFamily: 'OpenSans-Semibold',
  },
});
