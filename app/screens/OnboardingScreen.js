/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Platform, StatusBar} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import AppTheme from '../styles/AppTheme';
import Routes from '../navigations/Routes';
import {connect} from 'react-redux';
import {Themes} from '../store/utils/branchData';
import {changeBranch, saveUserSession} from '../store/actions/AppActions';
import AsyncStorage from '@react-native-community/async-storage';

const OnboardingScreen = ({navigation, ...props}) => {
  const chooseBranch = (branch) => {
    props.changeBranch(branch);
   navigation.navigate('Explore'); 
  };

  useEffect(() => {
    (async () => {
      let isLoggedIn = false;
      let userSession = (await AsyncStorage.getItem('isLoggedIn')) || '{}';
      userSession = JSON.parse(userSession);
      if (Object.keys(userSession).length > 0) {
        isLoggedIn = true;
        let data = (await AsyncStorage.getItem('user')) || '{}';
        data = JSON.parse(data);
        if (Object.keys(data).length > 0) {
          props.saveUserSession(isLoggedIn, data);
        }
      }
    })();
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableHighlight
        onPress={() => chooseBranch('Nishat Gulberg')}
        style={{top: -2}}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/logoGulberg.png')}
            style={styles.logo}
          />
          <Image
            source={require('../assets/group.png')}
            resizeMode="cover"
            style={styles.bg}
          />
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => chooseBranch('Nishat Johar Town')}
        style={{marginTop: '0.3%'}}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/logoEmporium.png')}
            style={styles.logo}
          />
          <Image source={require('../assets/group2.png')} style={styles.bg} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {changeBranch, saveUserSession};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  bg: {
    width: AppTheme.metrics.deviceWidth,
    height:
      AppTheme.metrics.deviceHeight / 2 +
      (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
  },
});
