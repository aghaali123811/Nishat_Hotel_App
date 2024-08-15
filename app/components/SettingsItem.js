import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';
import Routes from '../navigations/Routes';

const {greyPrimary, greySecondary} = AppTheme.colors;
const {OSsemiBold, OSregular} = AppTheme.fonts;

const SettingsItem = ({item, user, navigation, ...props}) => {
  const handleItemClick = () => {
    switch (item.type) {
      case 1:
        navigation.navigate(Routes.EditProfile, {user});
        break;
      case 2:
        navigation.navigate(Routes.ChangePassword, {user});
        break;
      case 3:
        navigation.navigate(Routes.NotificationSetting);
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleItemClick()}
      style={styles.container}
      activeOpacity={0.5}>
      <Image
        source={item.icon}
        style={{...styles.icon, tintColor: Themes[props.app.branch]}}
      />

      <View style={{marginTop: -5}}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <Image source={require('../assets/cright.png')} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(SettingsItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(17),
    paddingVertical: RFValue(16),
    backgroundColor: 'white',
    borderBottomColor: greyPrimary,
    borderBottomWidth: 1,
  },

  icon: {
    width: RFValue(20),
    height: RFValue(20),
    marginTop: RFValue(7),
    marginRight: RFValue(19),
  },

  name: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(16),
  },

  subtitle: {
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(11),
    marginTop: RFValue(3),
  },

  arrow: {
    position: 'absolute',
    right: RFValue(18),
    top: RFValue(20),
    width: RFValue(25),
    height: RFValue(25),
  },
});
