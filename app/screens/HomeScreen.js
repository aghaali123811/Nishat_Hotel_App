/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from '../components/PrimaryButton';
import RoomsList from '../components/RoomsList';
import ExperiencesList from '../components/ExperiencesList';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import HotelBottomSheet from '../components/HotelBottomSheet';
import PickerRow from '../components/PickerRow';
import GuestBottomSheet from '../components/GuestBottomSheet';
import LoginBottomSheet from '../components/LoginBottomSheet';
import SignupBottomSheet from '../components/SignupBottomSheet';
import WhatsappFloating from '../components/WhatsappFloating';

import Routes from '../navigations/Routes';
import BannerContainer from '../components/BannerContainer';
import DateRangeSelector from '../components/DateRangeSelector';
import { connect } from 'react-redux';
import BottomSheetHelper from '../helpers/BottomSheetHelper';
import moment from 'moment';
import { Themes } from '../store/utils/branchData';

const { greyPrimary, greySecondary, black } = AppTheme.colors;
const { PFregular, PFbold, OSregular } = AppTheme.fonts;
const { deviceWidth, deviceHeight } = AppTheme.metrics;

const hotelRef = React.createRef();
const guestRef = React.createRef();
const calendarRef = React.createRef();

const HomeScreen = ({ navigation, route, ...props }) => {
  const [showHotels, setShowHotels] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: moment().format('YYYY/MM/DD'),
    endDate: moment().add(1, 'days').format('YYYY/MM/DD'),
  });
  const [totalGuests, setTotalGuests] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ adult: 1, children: 0 });
  const sheetRef = React.createRef();

  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  useEffect(() => {
    console.log('props1234', props)
    setModalVisible(modalVisible);
  }, [props.app.isOpen]);

  const _setDateRange = (params) => {
    setDateRange(params);
    calendarRef.current.snapTo(1);

    // setTimeout(() => {
    //   guestRef.current.snapTo(0);
    // }, 500);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (BottomSheetHelper.openSheet) {
        calendarRef.current.snapTo(0);
        BottomSheetHelper.notOpenNextTime();
      }
      return unsubscribe;
    });
  }, [navigation]);

  return (
    <View>
      <WhatsappFloating/>
      <ScrollView bounces={false}>
        {props.app.isLoggedIn ? (
          <Header
            title="Welcome"
            rightIcon={require('../assets/icNotificaion.png')}
            rightOnPress={() => navigation.navigate(Routes.Notifications)}
          />
        ) : (
          <Header title="Welcome" />
        )}

        <Image style={styles.topBg} source={(props.app.branch == 'Nishat Gulberg') ? require('../assets/gulbg.png') : require('../assets/jtbg.png')} />

        <TouchableOpacity
          style={styles.branchselector}
          onPress={() => hotelRef.current.snapTo(0)}
          activeOpacity={0.4}>
          <Text style={styles.hotelTxt}>SELECT HOTEL</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.branchTxt}>{props.app.branch}</Text>
            <Image
              style={{ tintColor: Themes[props.app.branch] }}
              source={require('../assets/home.png')}
            />
          </View>
        </TouchableOpacity>

        <PickerRow
          refer={guestRef}
          calendarRef={calendarRef}
          dates={dateRange}
          guests={totalGuests}
        />

        <PrimaryButton
          label="CHECK AVAILABILITY"
          onPress={() =>
            navigation.navigate(Routes.SelectRooms, {
              branch: props.app.branch,
              dates: dateRange,
              guests: guestInfo,
              totalGuests: totalGuests,
            })
          }
          width={RFValue(320)}
        />

        <View style={styles.divider} />

        <Text style={styles.Headings}>
          {"Your Ultimate 5-Star Hotels in Lahore"}
        </Text>
        <Text
          style={{
            fontFamily: OSregular,
            marginHorizontal: '5%',
            fontSize: RFValue(14),
            marginTop: RFValue(16),
          }}>
          The Nishat Hotels exemplify exquisite luxury. Our story begins with the historic St James' Hotel
          and Club, established in 1892 Mayfair, London. This five-star hotel was formerly a club with
          members as illustrious as Winston Churchill, Henry James, and Ian Fleming. Expertly designed
          by an international team of architects, it is home to 60 luxurious guest rooms and suites, many
          with balconies and rooftop views of St. James' Park.
        </Text>
        {(!seeMore) && <TouchableOpacity activeOpacity={1} onPress={() => setSeeMore(true)} style={{ alignSelf: 'center', paddingHorizontal: 5, paddingVertical: 3, backgroundColor: Themes[props.app.branch], marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 10 }}>{'See more >>'}</Text>
        </TouchableOpacity>}

        {
          (seeMore) && <Text
            style={{
              fontFamily: OSregular,
              marginHorizontal: '5%',
              fontSize: RFValue(14),
              marginTop: RFValue(16),
            }}>
            In Lahore, The Nishat Group operates two hotels - A luxury boutique hotel at Nishat Gulberg,
            established in 2015, and the sprawling Nishat Hotel and Emporium Mall in Johar Town,
            established in 2017. The Gulberg property is a jewel in the heart of Lahore's central upscale
            neighborhood, providing instant access to a world of shopping and restaurants for which the city
            of Lahore is famous.
          </Text>
        }
        {
          (seeMore) && <Text
            style={{
              fontFamily: OSregular,
              marginHorizontal: '5%',
              fontSize: RFValue(14),
              marginTop: RFValue(16),
            }}>
            The Johar Town hotel property is a corporate dream come true, with many facilities, including
            meeting rooms and banquet halls, and it is an ideal location for curating corporate retreats in an
            urban setting. What is more, the Emporium Mall that stands next to the hotel boasts many
            accolades, including being Pakistan's largest mall and home to the most extensive food court in
            the country. {'\n\n'}The complex, spread over 2.75 million square feet, is also home to the largest
            indoor amusement park in Pakistan and the biggest cinema in the country, comprising 9
            screens offering you the maximum value of any entertainment venue.
          </Text>
        }
        {(seeMore) && <TouchableOpacity activeOpacity={1} onPress={() => setSeeMore(false)} style={{ alignSelf: 'center', paddingHorizontal: 5, paddingVertical: 3, backgroundColor: Themes[props.app.branch], marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 10 }}>{'See less <<'}</Text>
        </TouchableOpacity>}
        <Text style={styles.Headings}>
          {'Your Private Leisure Retreats'}
        </Text>
        <Text
          style={{
            fontFamily: OSregular,
            marginHorizontal: '5%',
            fontSize: RFValue(14),
            marginVertical: RFValue(16),
          }}>
          Choose amongst our premium rooms and suites designed with your comfort in mind. Our unique design ethos and attention to detail will guarantee you a memorable stay.
        </Text>


        <View style={{ paddingHorizontal: '4%' }}>
          <RoomsList navigation={navigation} />
        </View>

        <Text style={{ ...styles.Headings, marginBottom: RFValue(8) }}>
          Restaurants
        </Text>

        <ExperiencesList navigation={navigation} isExperience={false} />
        <Text style={{ ...styles.Headings, marginBottom: RFValue(8) }}>
          Experiences
        </Text>

        <ExperiencesList navigation={navigation} isExperience={true} />
      </ScrollView>
      {showGuests && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => guestRef.current.snapTo(1)}
        />
      )}

      {showHotels && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => hotelRef.current.snapTo(1)}
        />
      )}

      {showCalendar && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => calendarRef.current.snapTo(1)}
        />
      )}

      <BottomSheet
        ref={hotelRef}
        initialSnap={1}
        snapPoints={[RFPercentage(18), 0]}
        // renderHeader={() => (
        //   <BottomSheetHeader title="Select Hotel" refer={hotelRef} />
        // )}
        renderContent={() => <HotelBottomSheet refer={hotelRef} />}
        onOpenStart={() => setShowHotels(true)}
        onCloseEnd={() => setShowHotels(false)}
      />

      <BottomSheet
        ref={guestRef}
        initialSnap={1}
        snapPoints={[deviceHeight * 0.48, 0]}
        // renderHeader={() => (
        //   <BottomSheetHeader title="Guest Details" refer={guestRef} />
        // )}
        renderContent={() => (
          <GuestBottomSheet
            refer={guestRef}
            setTotalGuests={setTotalGuests}
            setGuestInfo={setGuestInfo}
          />
        )}
        onOpenStart={() => setShowGuests(true)}
        onCloseEnd={() => setShowGuests(false)}
      />
      {
        <BottomSheet
          ref={calendarRef}
          initialSnap={1}
          snapPoints={[AppTheme.metrics.deviceHeight * 0.9, 0]}
          // renderHeader={() => (
          //   <BottomSheetHeader
          //     title="Select your date of stay"
          //     refer={calendarRef}
          //   />
          // )}
          /* enabledInnerScrolling={true} */
          renderContent={() => (
            <ScrollView
              bounces={false}
              contentContainerStyle={{ backgroundColor: 'red', flexGrow: 1 }}
              style={{ height: deviceHeight * 0.833 }}>
              <DateRangeSelector setDateRange={_setDateRange} />
            </ScrollView>
          )}
          onOpenStart={() => setShowCalendar(true)}
          onCloseEnd={() => setShowCalendar(false)}
        />
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBg: {
    resizeMode: 'stretch',
    width: '100%', //AppTheme.metrics.deviceWidth,
    height: deviceHeight * 0.35,
    marginTop: RFValue(16),
  },

  branchselector: {
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
    marginHorizontal: '5%',
    marginVertical: '3%',
    paddingBottom: '3%',
  },

  hotelTxt: {
    height: RFValue(20),
    fontFamily: OSregular,
    fontSize: RFValue(13),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: greySecondary,
  },

  branchTxt: {
    fontFamily: PFregular,
    fontSize: RFValue(21),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#141414',
  },

  divider: {
    backgroundColor: '#bbc',
    height: 1.2,
  },

  Headings: {
    fontFamily: OSregular,
    fontSize: RFValue(32),
    marginHorizontal: '4%',
    marginTop: '6%',
    marginBottom: RFValue(4),
    color: black,
  },

  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
  },
});
const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
