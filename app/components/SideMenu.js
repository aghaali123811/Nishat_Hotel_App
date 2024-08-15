import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';

// import {logout} from '../store/actions/ProfileActions';
import { connect } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import Routes from '../navigations/Routes';
// import AppTheme from '../styles/AppTheme';
import { Themes } from '../store/utils/branchData';
import AsyncStorage from '@react-native-community/async-storage';
import { saveUserSession } from '../store/actions/AppActions';

const SideMenu = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const handleLogOut = () => {
    AsyncStorage.clear();
    props.navigation.closeDrawer();
    alert('You are logged out successfully')
    props.navigation.navigate(Routes.Home);
    props.saveUserSession(false, null);

  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: Themes[props.app.branch] }}>
      <DrawerItem
        label={Routes.Home}
        onPress={() => props.navigation.navigate(Routes.Home)}
        labelStyle={styles.labelStyle}
        style={{ marginTop: RFValue(30) }}
        icon={() => (
          <Image
            style={{ tintColor: 'white' ,width:25,height:25}}
            source={require('../assets/icHome.png')}
          />
        )}
      />

      <DrawerItem
        label={Routes.Explore}
        onPress={() => props.navigation.navigate(Routes.Explore)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/home.png')}
          />
        )}
      />

      <DrawerItem
        label={Routes.Rooms}
        onPress={() => props.navigation.navigate(Routes.Rooms)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white' ,width:25,height:25}}
            source={require('../assets/icBed.png')}
          />
        )}
      />

      <DrawerItem
        label={Routes.Dining}
        onPress={() => props.navigation.navigate(Routes.Dining)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white' ,width:25,height:25}}
            source={require('../assets/icDining.png')}
          />
        )}
      />

      <DrawerItem
        label={Routes.Wellness}
        onPress={() => props.navigation.navigate(Routes.Wellness)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white' ,width:25,height:25}}
            source={require('../assets/icGym.png')}
          />
        )}
      />

      <DrawerItem
        label={Routes.Banquets}
        onPress={() => props.navigation.navigate(Routes.Banquets)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/icFood.png')}
          />
        )}
      />
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={{ marginLeft: 18, flexDirection: 'row', marginVertical: 10 }} >
        <Image
          style={{ tintColor: 'white' ,width:25,height:25}}
          source={require('../assets/icStar.png')}
        />
        <Text style={{ color: 'white', fontSize: RFValue(16), marginLeft: 32 }}>Offers</Text>
      </TouchableOpacity>
      {
        isOpen && <View style={{ marginLeft: 50 }}>
          <DrawerItem
            style={{ marginTop: 10,marginLeft:18}}
            label={'Packages'}
            onPress={() => {
              setIsOpen(false)
              props.navigation.navigate(Routes.Packages)
            }}
            labelStyle={styles.subLabelStyle}
          />
          <DrawerItem
            style={{ marginTop: -15,marginLeft:18, }}
            label={Routes.loyalty_card}
            onPress={() => {
              setIsOpen(false)
              props.navigation.navigate(Routes.loyalty_card)
            }}
            labelStyle={styles.subLabelStyle}
          />
          <DrawerItem
            style={{ marginTop: -15,marginLeft:18}}
            label={Routes.dinning_offers}
            onPress={() => {
              setIsOpen(false)
              props.navigation.navigate(Routes.dinning_offers)
            }}
            labelStyle={styles.subLabelStyle}
          />
        </View>
      }


      <DrawerItem
        label={Routes.Cattering}
        onPress={() => props.navigation.navigate(Routes.Cattering)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white' ,width:25,height:25}}
            source={require('../assets/icCattering.png')}
          />
        )}
      />
       <DrawerItem
        label={Routes.Blogs}
        onPress={() => props.navigation.navigate(Routes.Blogs)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
          
          style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/blog.png')}
          />
        )}
      />
      <DrawerItem
        label={Routes.Paynow}
        onPress={() => props.navigation.navigate(Routes.Paynow)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/pay.png')}

          />
        )}
      />

      <DrawerItem
        label={Routes.Corporate}
        onPress={() => props.navigation.navigate(Routes.Corporate)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/icLounge.png')}
          />
        )}
      />



      {/* <DrawerItem
        label={Routes.LoyaltyCard}
        onPress={() => props.navigation.navigate(Routes.LoyaltyCard)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{tintColor: 'white'}}
            source={require('../assets/icStar.png')}
          />
        )}
      /> */}

      <DrawerItem
        label={Routes.Contact}
        onPress={() => props.navigation.navigate(Routes.Contact)}
        labelStyle={styles.labelStyle}
        icon={() => (
          <Image
            style={{ tintColor: 'white',width:25,height:25 }}
            source={require('../assets/icPhone.png')}
          />
        )}
      />

      <View style={styles.divider} />

      {/*       <DrawerItem
        label={Routes.Profile}
        onPress={() => props.navigation.navigate(Routes.Profile)}
        labelStyle={styles.labelStyle}
      />

      <DrawerItem
        label={Routes.MyBookings}
        onPress={() => props.navigation.navigate(Routes.MyBookings)}
        labelStyle={styles.labelStyle}
      />

      <DrawerItem
        label={Routes.Rewards}
        onPress={() => props.navigation.navigate(Routes.Rewards)}
        labelStyle={styles.labelStyle}
      /> */}
      {!props.app.isLoggedIn && (
        <DrawerItem
          label={'Login'}
          onPress={() => {
            props.navigation.navigate(Routes.LoginScreen);
          }}
          labelStyle={styles.labelStyle}
          icon={() => (
            <Image
              style={{ tintColor: 'white',width:25,height:25 }}
              source={require('../assets/icProfile.png')}
            />
          )}
        />
      )}
      {props.app.isLoggedIn && (
        <DrawerItem
          label={'My Account'}
          onPress={() => props.navigation.navigate(Routes.Profile)}
          labelStyle={styles.labelStyle}
          icon={() => (
            <Image
              style={{ tintColor: 'white' ,width:25,height:25}}
              source={require('../assets/icProfile.png')}
            />
          )}
        />
      )}
      {props.app.isLoggedIn && (
        <DrawerItem
          label={'My Bookings'}
          onPress={() => props.navigation.navigate(Routes.MyBookings)}
          labelStyle={styles.labelStyle}
          icon={() => (
            <Image
              style={{ tintColor: 'white',width:25,height:25 }}
              source={require('../assets/icBookings.png')}
            />
          )}
        />
      )}

      {props.app.isLoggedIn && (
        <>
          <View style={styles.divider} />
          <DrawerItem
            label={'Logout'}
            onPress={() => handleLogOut()}
            labelStyle={styles.labelStyle}
            icon={() => (
              <Image
                style={{ tintColor: 'white',width:25,height:25 }}
                source={require('../assets/icLogout.png')}
              />
            )}
          />
        </>
      )}
      {/* <Text style={styles.logout}> Logout </Text> */}
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { saveUserSession };

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },

  logout: {
    marginLeft: '7%',
    marginTop: '6%',
    fontSize: RFValue(17),
    color: 'white',
    marginBottom: RFValue(30),
  },

  labelStyle: {
    color: 'white',
    fontSize: RFValue(16),
  },
  subLabelStyle: {
    color: 'white',
    fontSize: RFValue(16),
    width: '100%'
  },

  divider: {
    height: 1,
    backgroundColor: 'white',
    width: RFValue(190),
    marginLeft: RFValue(18),
    marginVertical: RFValue(20),
  },
});
