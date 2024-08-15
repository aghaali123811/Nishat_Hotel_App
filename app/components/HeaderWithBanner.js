/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';
import * as RootNav from '../navigations/RootNavigation';
import Routes from '../navigations/Routes';
import { RFValue } from 'react-native-responsive-fontsize';

const HeaderWithBanner = ({ leftIcon = '', rightIcon = '', title = '' }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        marginBottom: '2%',
        paddingVertical: RFValue(8),
      }}>
      <TouchableOpacity
        style={{
          marginLeft: '5%' /* , marginTop: '4%' */,
          alignSelf: 'center',
        }}
        onPress={() => RootNav.toggleDrawer()}>
        <Image source={require('../assets/menu.png')} />
      </TouchableOpacity>
      <Text>{title}</Text>
      <TouchableOpacity
        onPress={() => RootNav.navigate(Routes.Notifications)}
        style={{ position: 'absolute', right: 20, alignSelf: 'center' }}>
        <Image source={require('../assets/notificaion.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderWithBanner;
