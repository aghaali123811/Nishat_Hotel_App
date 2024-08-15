import React, {useState, useCallback, useEffect} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import TextStyles from '../styles/TextStyles';
import AppTheme from '../styles/AppTheme';
import {useFocusEffect} from '@react-navigation/native';
import UpcomingBookingsScreen from './UpcomingBookingsScreen';
import BookingHistoryScreen from './BookingHistoryScreen';
import HeaderWithBanner from '../components/HeaderWithBanner';
import WhatsappFloating from '../components/WhatsappFloating';
import Header from '../components/Header';
import Routes from '../navigations/Routes';
import {RFValue} from 'react-native-responsive-fontsize';
import {getBookings} from '../store/actions/AppActions';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const MyBookingsScreen = ({navigation, ...props}) => {
  const [index, setIndex] = useState(0);
  const [upComingBookings, setUpComingBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  const routes = [
    {key: 'upcoming', title: 'Upcoming'},
    {key: 'history', title: 'History'},
  ];

  useFocusEffect(
    useCallback(() => {
      StatusBar.setHidden(true);
      setIndex(0);
      props.getBookings(props.app.user.user_id);
      return () => {
        setIndex(0);
      };
    }, []),
  );

  useEffect(() => {
    if (props.app.bookings) {
      console.log('user my booking screen = ', props.app.bookings);
      setUpComingBookings(props.app.bookings.upcoming); //upcoming
      setBookingHistory(props.app.bookings.history); //history
    }
  }, [props.app.bookings]);

  const _handleIndexChange = (props, index) => {
    setIndex(index);
  };

  const _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <SafeAreaView>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            // const opacity = props.position.interpolateNode({
            //   inputRange,
            //   outputRange: inputRange.map((inputIndex) =>
            //     inputIndex === i ? 1 : 0.5,
            //   ),
            // });
            return (
              <TouchableOpacity style={{flex: 1}} onPress={() => setIndex(i)}>
                <View style={{...styles.tabItem}}>
                  <Animated.Text
                    style={{
                      // opacity,
                      color: 'black',
                      ...styles.BUTTON_WHITE_CENTER,
                    }}>
                    {route.title}
                  </Animated.Text>
                </View>
                <View>
                  <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      borderBottomColor: AppTheme.colors.greyLight,
                      borderBottomWidth: 2,
                    }}></View>
                  <View
                    style={{
                      position: 'absolute',
                      width: '80%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderBottomColor: index == i ? 'black' : 'white',
                      borderBottomWidth: index == i ? 2 : 0,
                    }}></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  };

  const _renderScene = SceneMap({
    upcoming: () => (
      <UpcomingBookingsScreen
        navigation={navigation}
        bookings={upComingBookings}
      />
    ),
    history: () => (
      <BookingHistoryScreen navigation={navigation} bookings={bookingHistory} />
    ),
  });

  return (
    <>
    <WhatsappFloating/>
      <Header
        title="My Bookings"
        rightIcon={require('../assets/icNotificaion.png')}
        rightOnPress={() => navigation.navigate(Routes.Notifications)}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={_renderScene}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
        swipeEnabled={false}
      />
      {props.app.loadingGetBookings && (
        <ActivityIndicator
          color="black"
          style={{width: '100%', height: '82%'}}
        />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => navigation.navigate(Routes.Home)}>
          <Image
            source={require('../assets/icHome.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/icBookings.png')}
            style={{...styles.navIcon, tintColor: 'black'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.Profile)}
          style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/icProfile.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {getBookings};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: AppTheme.colors.BASIC_BLACK,
  },
  tabItem: {
    alignItems: 'center',
    padding: 16,
  },
  BUTTON_WHITE_CENTER: {
    //fontFamily: 'SFUIDisplay-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'black',
  },

  bottomNav: {
    width: '70%',
    height: 50,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 49,
    paddingHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    backgroundColor:
      Platform.OS == 'android' ? AppTheme.colors.profileBackground : 'white',
  },

  navIcon: {
    width: RFValue(24),
    height: RFValue(24),
    justifyContent: 'center',
    tintColor: 'grey',
  },
});
