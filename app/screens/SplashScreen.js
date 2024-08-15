/* eslint-disable react-native/no-inline-styles */
import React, { } from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import Routes from '../navigations/Routes';
// import LottieView from 'lottie-react-native';
import AppTheme from '../styles/AppTheme';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
const { PFbold, OSsemiBold } = AppTheme.fonts;
const { deviceHeight, deviceWidth } = AppTheme.metrics;

const SplashScreen = (props) => {
  setTimeout(() => {
    props.navigation.replace(Routes.Onboarding);
  }, 2500);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
        
     
      {/*       <LottieView
        source={require('../assets/loader-ring.json')}
        autoPlay
        loop
        style={{width: '100%', position: 'absolute'}}
      /> */}
      <Image source={require('../assets/t_logo.png')} />

      {/* <Text style={styles.welcome}>WELCOME TO NISHAT HOTEL</Text>
      <Text style={styles.vision}>{'A NEW VISION OF\nLUXURY'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: RFValue(16),
    position: 'absolute',
    color: '#fff',
    fontFamily: OSsemiBold,
    top: '36%',
  },

  vision: {
    fontSize: RFValue(35),
    position: 'absolute',
    color: '#fff',
    fontFamily: PFbold,
    top: '40%',
    textAlign: 'center',
  },
});

export default SplashScreen;
