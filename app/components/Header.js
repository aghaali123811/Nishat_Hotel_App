/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import * as RootNav from '../navigations/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import Routes from '../navigations/Routes';
const { OSsemiBold } = AppTheme.fonts;

const Header = ({ rightIcon = '', title = '', rightOnPress = undefined }) => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginTop: RFValue(16),
      }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{}} onPress={() => RootNav.toggleDrawer()}>
          <Image source={require('../assets/menu.png')} />
        </TouchableOpacity>
      </View>
      <Text style={{ ...styles.title, textAlign: 'center' }}>{title}</Text>

      {rightIcon !== '' ? (
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={rightOnPress}
          >
            <Image source={rightIcon} />
          </TouchableOpacity>
        </View>
      ) : <View style={{ flex: 1 }} />}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(16),
    flex: 1,
  },
});
