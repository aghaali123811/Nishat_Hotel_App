import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Header from '../components/Header';
import WhatsappFloating from '../components/WhatsappFloating';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import SettingsItem from '../components/SettingsItem';
import NotificationSettingItem from '../components/NotificationSettingItem';
import AsyncStorage from '@react-native-community/async-storage';

const { greyPrimary, greySecondary, greyLight, profileBackground } = AppTheme.colors;
const { OSregular } = AppTheme.fonts;

const defaultSettingsList = [
  {
    name: 'Bookings',
    subtitle: 'Reservations and bookings',
    type: 1,
    toggle: false,
    index: 0
  },
  {
    name: 'Rewards',
    subtitle: 'Loyalty cards benefits, card balance',
    type: 2,
    toggle: false,
    index: 1
  },
  {
    name: 'Weekly Newsletter',
    subtitle: 'News, updates and announcements',
    type: 3,
    toggle: false,
    index: 2
  },
  {
    name: 'Discounts',
    subtitle: 'Member deals, discounts and offers',
    type: 4,
    toggle: true,
    index: 3
  },

];

const NotificationSettingScreen = ({ navigation }) => {

  const [settingsList, setSettingsList] = useState([])

  useEffect(() => {
    setSettings()
  }, [])

  const setSettings = async () => {
    let settings = await AsyncStorage.getItem('settingsList');
    if (settings) {
      setSettingsList(JSON.parse(settings));
    } else {
      setSettingsList(defaultSettingsList);
    }
  }
  const toggleSwitch = (index) => {
    let newSettings = [...settingsList];
    newSettings[index].toggle = !newSettings[index].toggle;
    setSettingsList(newSettings);

  }
  useEffect(() => {
    setInDb()
  }, [settingsList])
  const setInDb = async () => {
    if (settingsList.length)
      await AsyncStorage.setItem('settingsList', JSON.stringify(settingsList));

  }
  return (
    <View>
      <WhatsappFloating/>
      <FlatList
        style={{
          marginHorizontal: RFValue(16)
        }}
        data={settingsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <NotificationSettingItem toggleSwitch={toggleSwitch} item={item} navigation={navigation} />}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingsHeader: {
    marginLeft: RFValue(16),
    marginTop: RFValue(17),
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(13),
    marginBottom: RFValue(12),
  },

  image: {
    width: RFValue(64),
    height: RFValue(64),
    justifyContent: 'center',
    alignSelf: 'center'
  },

  phone: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: greySecondary,
  },

  name: {
    fontSize: RFValue(24),
    marginBottom: RFValue(3),
  },
});

export default NotificationSettingScreen;
