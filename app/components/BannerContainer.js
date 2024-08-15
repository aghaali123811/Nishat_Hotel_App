/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Themes } from '../store/utils/branchData';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const BannerContainer = ({ children, ...props }) => {
  return (
    <SafeAreaView>
      {children}
      <View
        style={{
          position: 'absolute',
          top: 0,
          paddingTop: RFValue(40),
          // left: RFValue(117),
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          backgroundColor: Themes[props.app.branch],
          width: '16%',
          height: RFValue(140),
          alignSelf: 'center',
        }}>
        <Image source={require('../assets/shape.png')} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(BannerContainer);
