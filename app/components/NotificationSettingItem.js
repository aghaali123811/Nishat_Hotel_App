import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import { connect } from 'react-redux';
import Routes from '../navigations/Routes';
import AsyncStorage from '@react-native-community/async-storage';

const { greyPrimary, greySecondary, green, greyLight } = AppTheme.colors;
const { OSsemiBold, OSregular } = AppTheme.fonts;

const NotificationSettingItem = ({ item, navigation, ...props }) => {
  const [isEnabled, setIsEnabled] = useState(false);


  //const toggleSwitch = () => setIsEnabled((previousState) => !previousState);


  const handleItemClick = () => {
    switch (item.type) {
      case 1:
        // navigation.navigate(Routes.EditProfile);
        break;
      case 2:
        // navigation.navigate(Routes.ChangePassword);
        break;
      case 3:
        // navigation.navigate(Routes.NotificationSetting);
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleItemClick()}
      style={styles.container}
      activeOpacity={0.5}>
      <View style={{ marginTop: -5 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.arrow}>
        <Switch
          trackColor={{ false: greyLight, true: green }}
          thumbColor={'#ffffff'}
          ios_backgroundColor={greyLight}
          onValueChange={()=>props.toggleSwitch(item.index)}
          value={item.toggle}
        />
      </View>

      {/* <Image source={require('../assets/cright.png')} style={styles.arrow} /> */}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(NotificationSettingItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: RFValue(16),
    backgroundColor: 'white',
    borderBottomColor: greyPrimary,
    borderBottomWidth: 1,
  },

  name: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(14),
  },

  subtitle: {
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(12),
    marginTop: RFValue(3),
  },

  arrow: {
    position: 'absolute',
    right: RFValue(1),
    top: RFValue(20),
    width: RFValue(50),
    height: RFValue(25),
  },
});
