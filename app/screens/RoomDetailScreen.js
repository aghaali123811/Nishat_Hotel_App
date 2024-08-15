import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar, ImageBackground, Image,
  TouchableOpacity,
  ActivityIndicator, SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import VideoSlider from '../components/VideoSlider';
import WhatsappFloating from '../components/WhatsappFloating';
import { FULFILLED } from '../store/utils/constants';
import AppTheme from '../styles/AppTheme';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import IconText from '../components/IconText';
import RoomsList from '../components/RoomsList';
import RoomDetailBox from '../components/RoomDetailBox';
import Header from '../components/Header';
import BookNowContainer from '../components/BookNowContainer';
import BookNowDetailComponent from '../components/BookNowDetailComponent';
import { connect, useDispatch } from 'react-redux';
import BottomSheetHeader from '../components/BottomSheetHeader';
import HotelBottomSheet from '../components/HotelBottomSheet';
import BottomSheetHelper from '../helpers/BottomSheetHelper';
import Routes from '../navigations/Routes';
import * as types from '../store/types';
import moment from 'moment';
import PickerRow from '../components/PickerRow';
import BottomSheet from 'reanimated-bottom-sheet';
import PrimaryButton from '../components/PrimaryButton';
import GuestBottomSheet from '../components/GuestBottomSheet';
import DateRangeSelector from '../components/DateRangeSelector';
import { getRoom, getAvailableSingleRoom } from '../store/actions/AppActions';
import CustomeModel from '../components/CustomeModel';
import { convertDollarToCurrentCurrency } from '../utils/helper'
const { PFbold, OSregular, PFregular, OSsemiBold } = AppTheme.fonts;
const { greyPrimary } = AppTheme.colors;
const { deviceWidth, deviceHeight } = AppTheme.metrics;
import { Themes } from '../store/utils/branchData';
import CurrencyConverter from '../components/CurrencyConverter';
import RNImage from '../utils/Image'
const RoomDetailScreen = ({ route, navigation, ...props }) => {
  const { room } = route.params;

  const hotelRef = React.createRef();
  const guestRef = React.createRef();
  const calendarRef = React.createRef();

  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: moment().format('YYYY/MM/DD'),
    endDate: moment().add(1, 'days').format('YYYY/MM/DD'),
  });
  const days = moment(dateRange.endDate).diff(dateRange.startDate, 'days');
  const [showLoader, setShowLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalGuests, setTotalGuests] = useState(1);
  const [currency, setCurrency] = useState('USD');

  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [creditCardDiscountedPrice, setCreditCardDiscountedPrice] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [canCheckRoomAlert, setCanCheckRoomAlert] = useState(false);

  const [guestInfo, setGuestInfo] = useState({ adult: 1, children: 0 });
  const _setDateRange = (params) => {
    setDateRange(params);
    calendarRef.current.snapTo(1);
  };

  const checkAvailability = () => {
    setShowLoader(true);
    const arrival = moment(dateRange.startDate).format('DD-MM-YYYY');
    const departure = moment(dateRange.endDate).format('DD-MM-YYYY');
    props
      .getAvailableSingleRoom(arrival, departure, room.id, room.hotel_id)
      .then(() => {
        setShowLoader(false);
      });
  };

  const onPress = () => {
    if (props.app.availableRoom[0].id == 18 && rooms > 1) {
      Alert.alert('Number of Rooms', 'Only one room is available');
    }
    else if (totalGuests > props.app.availableRoom[0].capacity * rooms) {
      Alert.alert('Number of Rooms', 'Please select more rooms');
    } else {
      let creditCardDiscount = (props?.app?.discount.length && props?.app?.discount[0].type == 'credit_card') ? parseFloat(props?.app?.discount[0].discount) : 0
      setCanCheckRoomAlert(false)
      navigation.navigate(Routes.GuestDetails, {
        room: props.app.availableRoom[0].aptr_name,
        roomImage: props.app.availableRoom[0].feature_image,
        guests: guestInfo,
        dates: dateRange,
        branch: props.app.branch,
        rooms: rooms,
        price: props.app.availableRoom[0]?.aptr_night_price,
        pricePerNights: props.app.availableRoom[0]?.aptr_discount_price,
        room_id: props.app.availableRoom[0].aptr_id,
        roomId: props.app.availableRoom[0].id,
        isPackage: false,
        packageAddons: [],
        isCreditCardDiscount: (creditCardDiscount > 0) ? true : false,
        creditCardDiscountPercentage: (creditCardDiscount > 0) ? creditCardDiscount : 0
      });
    }
  };

  const getPrice = async () => {
    try {
      return await convertDollarToCurrentCurrency(parseFloat(props.app.availableRoom[0].aptr_night_price.split(',')[0]), currency)
    } catch (e) {
      return await convertDollarToCurrentCurrency(parseFloat(props.app.availableRoom[0].aptr_night_price), currency)
    }

  }
  const getDiscountPrice = async () => {
    try {
      return await convertDollarToCurrentCurrency(parseFloat(props.app.availableRoom[0].aptr_discount_price.split(',')[0]), currency)

    } catch (e) {
      return await convertDollarToCurrentCurrency(parseFloat(props.app.availableRoom[0].aptr_discount_price), currency)

    }
  }
  const getCreditCardDiscountedPrice = async () => {
    let creditCardDiscount = (props?.app?.discount.length && props?.app?.discount[0].type == 'credit_card') ? parseFloat(props?.app?.discount[0].discount) : 0
    if (creditCardDiscount > 0) {
      let discountPrice = 0;
      try {
        discountPrice = parseFloat(props.app.availableRoom[0].aptr_discount_price.split(',')[0])
      } catch (e) {
        discountPrice = parseFloat(props.app.availableRoom[0].aptr_discount_price)
      }
      let percentage = creditCardDiscount / 100;
      let discountedAmount = discountPrice * percentage;
      try {
        return await convertDollarToCurrentCurrency(discountPrice - discountedAmount, currency)
      } catch {
        return await convertDollarToCurrentCurrency(discountPrice - discountedAmount, currency)
      }

    } else {
      return 0;
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (BottomSheetHelper.openSheet) {
      calendarRef.current.snapTo(0);
      setShowCalendar(true)
      BottomSheetHelper.notOpenNextTime();
    }
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({
        type: types.GET_AVAILABLE_ROOM + FULFILLED,
        payload: {
          availableRoom: [],
          discount: [],
          is_blackout: false
        },
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (props.app.availableRoom.length) {
      setPrices();
    }
  }, [props.app.availableRoom]);

  useEffect(() => {
    if (!props.app.availableRoom.length && canCheckRoomAlert) {
      Alert.alert('Availability', 'This room is not available on selected dates')
      setCanCheckRoomAlert(false)
    }
  }, [props.app.availableRoomChanged]);

  const setPrices = async () => {
    setLoading(true)
    let price = await getPrice();
    let discountedPrice = await getDiscountPrice();
    let creditCardDiscountedPrice = await getCreditCardDiscountedPrice();

    setPrice(price)
    setDiscountedPrice(discountedPrice)
    setCreditCardDiscountedPrice(creditCardDiscountedPrice)
    setTimeout(() => {
      setLoading(false)
    }, 500)

  }
  useEffect(() => {
    if (props.app.availableRoom.length) {
      setPrices();
    }
  }, [currency]);

  const setCurrencyy = (value) => {
    setLoading(true)
    setCurrency(value);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WhatsappFloating/>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrow_left.png')}
            style={{
              width: RFValue(20),
              height: RFValue(20),
              marginLeft: RFValue(10),
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Room Detail</Text>
        <CurrencyConverter
          open={open}
          setOpen={setOpen}
          value={currency}
          setValue={setCurrencyy}
          branchTheme={Themes[props.app.branch]}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(150) }}>

        <RNImage
          source={{ uri: room.feature_image }}
          style={{ width: '100%', height: 229, paddingTop: 30, alignItems: "flex-end" }}
        />
        <View style={{ marginTop: 12 }}></View>
        <PickerRow
          refer={guestRef}
          calendarRef={calendarRef}
          dates={dateRange}
          guests={totalGuests}
          setShowCalendar={setShowCalendar}
          setShowGuests={setShowGuests}
        />

        <Text style={styles.Headings}>{room.aptr_name}</Text>

        <View style={{ flexDirection: 'row', paddingLeft: RFValue(16) }}>
          <IconText
            image={require('../assets/users_black.png')}
            text={room.capacity + ' Guests'}
          />
          <IconText
            image={require('../assets/bed.png')}
            text={room.no_of_bedrooms + ' Bedroom'}
          />
          <IconText
            image={require('../assets/bathroom.png')}
            text={room.no_of_bathrooms + 'Bathroom'}
          />
          <IconText
            image={require('../assets/area.png')}
            text={room.covered_area}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: RFValue(8),
            marginTop: RFValue(20),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.add}> Select Rooms: </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => (rooms > 1 ? setRooms(rooms - 1) : undefined)}>
              <Image
                source={require('../assets/mins.png')}
                style={styles.btn}
              />
            </TouchableOpacity>

            <Text style={styles.numberOfRooms}>{rooms}</Text>

            <TouchableOpacity onPress={() => setRooms(rooms < 3 ? rooms + 1 : rooms)}>
              <Image
                source={require('../assets/plus.png')}
                style={styles.btn}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>{room.complete_description}</Text>
        <Text style={styles.HeadingSecondary}>Similar Rooms</Text>
        <RoomsList
          marginLeft={RFValue(20)}
          roomException={room.id}
          navigation={navigation}
        />
        {showLoader && <CustomeModel modalVisible={showLoader} />}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          backgroundColor: 'white',
          width: deviceWidth,
          paddingTop: 10
        }}>
        {
          (props.app.availableRoom.length == 0) ?
            <View style={{ marginTop: 10 }}>
              <PrimaryButton
                label="CHECK AVAILABILITY"
                onPress={() => { setCanCheckRoomAlert(true); checkAvailability() }}
                width={Platform.OS === 'android' ? RFValue(322) : RFValue(308)}
              />
            </View> : null

        }
        {
          (props.app.availableRoom.length) ?
            <View style={styles.bottomContainer}>
              {
                (!isLoading) ? <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, justifyContent: 'center', paddingVertical: 5 }}>
                  {
                    (price != discountedPrice) ?
                      <View>
                        <Text style={{ fontSize: RFValue(15) }}>{currency} {discountedPrice}</Text>
                        <Text style={{ fontSize: RFValue(10), textDecorationLine: 'line-through' }}>{currency} {price}</Text>
                      </View> :
                      <View>
                        <Text style={{ fontSize: RFValue(17) }}>{currency} {price}</Text>
                      </View>
                  }
                  {(creditCardDiscountedPrice != 0) &&
                    <View style={{ marginTop: 5 }}>
                      <Text style={{ fontSize: RFValue(13), fontWeight: '400' }}>{currency} {creditCardDiscountedPrice.toFixed(2)}</Text>
                      <Text style={{ fontSize: RFValue(9), marginTop: -5 }}>Pay with credit card</Text>
                    </View>
                  }
                </View> : <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 20, justifyContent: 'center', paddingVertical: 5 }}>
                  <ActivityIndicator size={45} color={'black'} />
                </View>
              }

              <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.bookNow}>BOOK NOW</Text>
              </TouchableOpacity>
            </View> : null

        }
      </View>
      {showCalendar && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => calendarRef.current.snapTo(1)}
        />
      )}
      {showGuests && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => guestRef.current.snapTo(1)}
        />
      )}
      {/* <BottomSheet
        ref={hotelRef}
        initialSnap={1}
        snapPoints={[RFPercentage(25), 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Select Hotel" refer={hotelRef} />
        )}
        renderContent={() => <HotelBottomSheet refer={hotelRef} />}
        onOpenStart={() => setShowHotels(true)}
        onCloseEnd={() => setShowHotels(false)}
      /> */}

      <BottomSheet
        ref={guestRef}
        initialSnap={1}
        snapPoints={[AppTheme.metrics.deviceHeight * 0.45, -100]}
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
          snapPoints={[AppTheme.metrics.deviceHeight * 0.9, -100]}
          // renderHeader={() => (
          //   <BottomSheetHeader
          //     title="Select your date of stay"
          //     refer={calendarRef}
          //   />
          // )}
          renderContent={() => (
            <View
              // bounces={false}
              // contentContainerStyle={{ backgroundColor: 'red',}}
              style={{ height: deviceHeight * 0.91, paddingTop: 50, justifyContent: 'center' }}
            >
              <DateRangeSelector setDateRange={_setDateRange} />
            </View>
          )}
          onOpenStart={() => setShowCalendar(true)}
          onCloseEnd={() => {
            setShowCalendar(false);
            setCanCheckRoomAlert(true)
            checkAvailability()
          }}
        />
      }
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { getRoom, getAvailableSingleRoom };

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetailScreen);

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
    marginRight: '-15%',
    fontSize: RFValue(15),
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 100, marginTop: 15,
  },
  Headings: {
    fontFamily: PFbold,
    fontSize: RFValue(35),
    marginTop: RFValue(8),
    marginHorizontal: RFValue(17),
  },

  icon: {
    marginRight: RFValue(63),
    width: RFValue(23),
  },

  iconSubtitle: {
    marginRight: RFValue(27),
    fontFamily: OSregular,
    fontSize: RFValue(12),
  },

  description: {
    fontFamily: OSregular,
    marginHorizontal: '5%',
    fontSize: RFValue(14),
    marginVertical: '8%',
    color: 'rgb(44,44,44)',
  },
  HeadingSecondary: {
    fontFamily: PFregular,
    fontSize: RFValue(28),
    marginTop: RFValue(8),
    marginBottom: RFValue(16),
    marginHorizontal: RFValue(17),
  },

  btn: {
    marginHorizontal: RFValue(10),
  },

  number: {
    marginTop: RFValue(-14),
    marginHorizontal: RFValue(20),
    fontSize: RFValue(32),
    fontFamily: PFregular,
  },

  numberOfRooms: {
    marginTop: RFValue(-10),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(29),
    fontFamily: PFregular,
  },

  add: {
    marginRight: RFValue(6),
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: RFValue(7),
    marginBottom: RFValue(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: greyPrimary,
    justifyContent: 'space-between',
    minHeight: RFValue(60)
  },
  bookNow: {
    fontFamily: OSsemiBold,
    color: '#fff',
    fontSize: RFValue(16),
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
  },
});
