/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[{
        marginVertical: RFValue(16),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
          // width === ''
          //   ? Platform.OS == 'android'
          //     ? '90%'
          //     : RFValue(348)
          //   : width,
        height: RFValue(48),
        borderColor: Themes[props.app.branch],
        borderWidth: 2,
        flexDirection: 'row',
        ...style,
      },props?.containerStyle]}>
      {loading && (
        <ActivityIndicator color="white" style={{marginRight: '5%'}} />
      )}
      <Text style={[styles.btnlabel,props?.lableStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(PrimaryButton);

const styles = StyleSheet.create({
  btnlabel: {
    fontSize: RFValue(17),
    fontFamily: 'OpenSans-Semibold',
  },
});
