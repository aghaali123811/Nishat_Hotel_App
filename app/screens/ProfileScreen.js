import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import WhatsappFloating from '../components/WhatsappFloating';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import SettingsItem from '../components/SettingsItem';
import Routes from '../navigations/Routes';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';

const {greyPrimary, greySecondary, greyLight, profileBackground} =
  AppTheme.colors;
const {OSregular} = AppTheme.fonts;
const settingsList = [
  {
    icon: require('../assets/edit.png'),
    name: 'Edit Profile',
    subtitle: 'Update and modify your profile',
    type: 1,
  },
  {
    icon: require('../assets/icPrivacy.png'),
    name: 'Password',
    subtitle: 'Change your password',
    type: 2,
  },
  {
    icon: require('../assets/icNotificaion.png'),
    name: 'Notifications',
    subtitle: 'Change your notification settings',
    type: 3,
  },
];

const ProfileScreen = ({navigation, ...props}) => {
  // console.log('USER', props.app.user);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(props.app.user);
    (async () => {
      // requestUserPermission();
    })();
  }, [props.app.user]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
    }
  };

  const getFcmToken = async () => {
    // const fcmToken = await messaging().getToken();
    // if (fcmToken) {
    //   console.log(fcmToken);
    // } else {
    //   console.log('Failed', 'No token received');
    // }
  };

  return (
    <View style={{height: '100%'}}>
      <WhatsappFloating/>
      <Header
        title="My Account"
        rightIcon={require('../assets/icNotificaion.png')}
        rightOnPress={() => navigation.navigate(Routes.Notifications)}
      />
      {/* {console.log('USER PROFILE', user)} */}
      <View
        style={{
          flexDirection: 'row',
          padding: RFValue(16),
          backgroundColor: profileBackground,
          marginTop: RFValue(16),
          alignItems: 'center',
        }}>
        <Image source={user?.image_upload ? {uri: user?.image_upload} : require('../assets/users.png')} style={styles.image} />

        <View style={{marginLeft: RFValue(16)}}>
          <Text style={styles.name}>{user ? user.first_name : ''}</Text>
          <Text style={styles.phone}>{user ? user.telephone : ''}</Text>
        </View>
      </View>

      <View
        style={{
          height: 0.7,
          backgroundColor: greyLight,
        }}
      />

      <Text style={styles.settingsHeader}>SETTINGS</Text>

      <FlatList
        style={{
          borderTopWidth: 1,
          borderTopColor: greyPrimary,
          marginHorizontal: RFValue(16),
        }}
        data={settingsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <SettingsItem item={item} user={user} navigation={navigation} />
        )}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.Home)}
          style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/icHome.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.MyBookings)}
          style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/icBookings.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/icProfile.png')}
          style={{...styles.navIcon, tintColor: 'black'}}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  bottomNav: {
    width: '70%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 49,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    backgroundColor:
      Platform.OS == 'android' ? AppTheme.colors.profileBackground : 'white',
  },
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
    alignSelf: 'center',
  },
  navIcon: {
    width: RFValue(24),
    height: RFValue(24),
    justifyContent: 'center',
    alignSelf: 'center',
    tintColor: 'grey',
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
