import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Routes from '../navigations/Routes';
import SideMenu from '../components/SideMenu';
import { connect } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import RewardScreen from '../screens/RewardScreen';
import DiningScreen from '../screens/DiningScreen';
import CorporateScreen from '../screens/CorporateScreen';
import OffersScreen from '../screens/OffersScreen';
import ContactScreen from '../screens/ContactScreen';
import WellnessScreen from '../screens/WellnessScreen';
import BanquetsScreen from '../screens/BanquetsScreen';
import RoomsScreen from '../screens/RoomsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import DiningDetailsScreen from '../screens/DiningDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import MyBookings from '../screens/MyBookingsScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingScreen from '../screens/UpcomingScreen';
import HistoryScreen from '../screens/HistoryScreen';
import TabBar from '../components/TabBar';
import AppTheme from '../styles/AppTheme';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import SelectRoomsScreen from '../screens/SelectRoomsScreen';
import { Image, View, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import GuestDetailScreen from '../screens/GuestDetailScreen';
import PaymentDetailScreen from '../screens/PaymentDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CancellationPolicyScreen from '../screens/CancellationPolicyScreen';
import CancelBookingScreen from '../screens/CancelBookingScreen';
import Animated from 'react-native-reanimated';
import ShadowLayers from '../components/ShadowLayers';
import { Themes } from '../store/utils/branchData';
import STORE from '../store';
import CountryScreen from '../screens/CountryScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotificationSettingScreen from '../screens/NotificationSettingScreen';
import WebViewScreen from '../screens/WebViewScreen';
import TestScreen from '../components/TestScreen';
import BookingCompletedScreen from '../screens/BookingCompletedScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PackagesScreen from '../screens/PackagesScreen';
import PackageDetail from '../screens/PackageDetail';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useSelector, useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const dinning_offers = 'https://nishathotels.com/dining-offers/johar-town/?hide_header=1';
const loyalty_card = 'https://nishathotels.com/loyalty-card/?hide_header=1';
const paynowUrl = 'https://nishathotels.com/pay-now/?hide_header=1';
const diningUrl = 'https://nishathotels.com/dining/johar-town/?hide_header=1';
const catteringUrl = 'https://nishathotels.com/catering/johar-town/?hide_header=1';
const banquetsUrl = 'https://nishathotels.com/banquets/johar-town/?hide_header=1';
const wellnessUrl = 'https://nishathotels.com/well-ness/johar-town/?hide_header=1';
const corporateUrl = 'https://nishathotels.com/corporate/johar-town/?hide_header=1';
const packagesUrl = 'https://nishathotels.com/packages/johar-town/?hide_header=1';

const diningUrlg = 'https://nishathotels.com/dining/gulberg/?hide_header=1';
const dinning_offersg = 'https://nishathotels.com/dining-offers/gulberg/?hide_header=1';
const paynowUrlg = 'https://nishathotels.com/pay-now/?hide_header=1';
const catteringUrlg = 'https://nishathotels.com/catering/gulberg/?hide_header=1';
const banquetsUrlg = 'https://nishathotels.com/banquets/gulberg/?hide_header=1';
const wellnessUrlg = 'https://nishathotels.com/well-ness/gulberg/?hide_header=1';
const corporateUrlg = 'https://nishathotels.com/corporate/gulberg/?hide_header=1';
const packagesUrlg = 'https://nishathotels.com/packages/gulberg/?hide_header=1';

const BookingTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name={Routes.Upcoming} component={UpcomingScreen} />
      <Tab.Screen name={Routes.History} component={HistoryScreen} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: '#fff' },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Image
            source={require('../assets/cleft_black.png')}
            style={{ marginLeft: Platform.OS === 'ios' ? RFValue(10) : 0 }}
          />
        ),
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.Splash}
        component={SplashScreen}
      />
    

      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.Onboarding}
        component={OnboardingScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={'Home2'}
        component={DrawerNav}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Explore'}
        component={DrawerNav}
      />

      <Stack.Screen
        name={Routes.Notifications}
        component={NotificationsScreen}
      />
      <Stack.Screen name={Routes.PackageDetail} component={PackageDetail} options={{ title: 'Package Detail' }} />

      <Stack.Screen
        name={Routes.SelectRooms}
        component={SelectRoomsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={Routes.WebViewScreen} component={WebViewScreen} />

      <Stack.Screen
        name={Routes.RoomDetail}
        component={RoomDetailScreen}
        options={{
          headerTransparent: /* Platform.OS === 'android' ? true : false */ true,
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View />
          ),
        }}
      />

      <Stack.Screen
        name={Routes.DiningDetails}
        component={DiningDetailsScreen}
      />
      <Stack.Screen name={Routes.GuestDetails} component={GuestDetailScreen} />
      <Stack.Screen
        name={Routes.PaymentDetails}
        component={PaymentDetailScreen}
      />

      <Stack.Screen
        name={Routes.BookingCompletedScreen}
        component={BookingCompletedScreen}
        options={{
          headerTransparent: /* Platform.OS === 'android' ? true : false */ true,
          title: '',
          headerBackTitleVisible: false,
          headerBackImage: () => <></>,
        }}
      />
      <Stack.Screen name={Routes.EditProfile} component={EditProfileScreen} />
      <Stack.Screen name={Routes.CancellationPolicy} component={CancellationPolicyScreen} />
      <Stack.Screen name={Routes.cancelBooking} component={CancelBookingScreen} />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={Routes.NotificationSetting}
        component={NotificationSettingScreen}
      />
      <Stack.Screen name={Routes.Signup} component={SignupScreen} />
      <Stack.Screen
        name={Routes.ForgetPassword}
        component={ForgotPasswordScreen}
      />
      {/* <Stack.Screen name={Routes.Home} component={HomeScreen} /> */}
      <Stack.Screen name={Routes.Country} component={CountryScreen} />
    </Stack.Navigator>
  );
};

const DrawerNav = (props) => {

  const store = STORE.getState().appReducer;
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, AppTheme.metrics.deviceWidth * 0.1],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const animatedStyle = {
    borderRadius,
    transform: [{ scale }, { translateX: translateX }],
  };

  return (
    <Drawer.Navigator
      edgeWidth={60}
      sceneContainerStyle={{
        backgroundColor: Themes[store.branch],
      }}
      drawerType="slide"
      overlayColor="transparent"
      drawerContent={(props) => {
        setProgress(props.progress);
        return <SideMenu {...props} />;
      }}>
      <Drawer.Screen name={Routes.Home} options={{ drawerLabel: 'Home' }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <HomeScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Explore} options={{ drawerLabel: 'Explore' }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <ExploreScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Rooms}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <RoomsScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Dining} initialParams={{ url: store.branch == 'Nishat Johar Town' ? diningUrl : diningUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.loyalty_card} initialParams={{ url: loyalty_card }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen name={Routes.Blogs} initialParams={{ url: 'https://nishathotels.com/blogs/?hide_header=1' }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen name={Routes.dinning_offers} initialParams={{ url: store.branch == 'Nishat Johar Town' ? dinning_offers : dinning_offersg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>


      <Drawer.Screen name={Routes.Paynow} initialParams={{ url: store.branch == 'Nishat Johar Town' ? paynowUrl : paynowUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Wellness} initialParams={{ url: store.branch == 'Nishat Johar Town' ? wellnessUrl : wellnessUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Banquets} initialParams={{ url: store.branch == 'Nishat Johar Town' ? banquetsUrl : banquetsUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name={Routes.Cattering}
        initialParams={{ url: store.branch == 'Nishat Johar Town' ? catteringUrl : catteringUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name={Routes.Corporate}
        initialParams={{ url: store.branch == 'Nishat Johar Town' ? corporateUrl : corporateUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Packages} initialParams={{ url: store.branch == 'Nishat Johar Town' ? packagesUrl : packagesUrlg }}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <PackagesScreen {...props} />
            {/* <WebViewScreen {...props} /> */}
          </ShadowLayers>
        )}
      </Drawer.Screen>

      {/* <Drawer.Screen name={Routes.LoyaltyCard} initialParams={{url: loyaltyCardUrl}}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen> */}
      {/* <Drawer.Screen name={Routes.Packages} initialParams={{url: packagesUrl}}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen name={Routes.LoyaltyCard} initialParams={{url: loyaltyCardUrl}}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <WebViewScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen> */}
      <Drawer.Screen name={Routes.LoginScreen}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <LoginScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen name={Routes.MyBookings}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <MyBookings {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      <Drawer.Screen name={Routes.Profile}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <ProfileScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
      {/*
      <Drawer.Screen name={Routes.MyBookings} options={{title: 'My Bookings'}}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <BookingTabs {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>

      <Drawer.Screen name={Routes.Rewards}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <RewardScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen> */}
      {/* <Drawer.Screen name={Routes.LoginScreen}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <LoginScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen> */}
      <Drawer.Screen name={Routes.Contact}>
        {(props) => (
          <ShadowLayers animatedStyle={animatedStyle}>
            <ContactScreen {...props} />
          </ShadowLayers>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const AppNavigation = ({ initialRouteName, ...props }) => {
  return <AppStack />;
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  currency: state.currencyReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
