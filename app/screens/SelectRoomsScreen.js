import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
  Modal,
  Pressable,
  Platform, Dimensions
} from 'react-native';
import RoomDetailBox from '../components/RoomDetailBox';
import Routes from '../navigations/Routes';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import SubHeaderBox from '../components/SubHeaderBox';
import moment from 'moment';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BookNowComponent from '../components/BookNowComponent';
import { Rooms } from '../store/utils/branchData';
import { connect, useDispatch } from 'react-redux';
import { getRooms, getAvailableRooms } from '../store/actions/AppActions';
import { Themes } from '../store/utils/branchData';
import { ActivityIndicator } from 'react-native-paper';
import * as types from '../store/types';
import { FULFILLED, PENDING, REJECTED } from '../store/utils/constants';
import CustomeModel from '../components/CustomeModel';
import WhatsappFloating from '../components/WhatsappFloating';
import DropDownPicker from 'react-native-dropdown-picker';
import CurrencyConverter from '../components/CurrencyConverter';
import { convertDollarToCurrentCurrency } from '../utils/helper'
const { deviceWidth } = AppTheme.metrics;
const { OSregular } = AppTheme.fonts;
const { colors } = AppTheme;

const SelectRoomsScreen = ({ route, navigation, ...props }) => {
  const { branch, dates, totalGuests, guests } = route.params;

  const hotel_id = props.app.branch == 'Nishat Johar Town' ? 2 : 1;

  const startDate = dates.startDate ? moment(dates.startDate).format('DD') + ' ' : '';
  const startMonth = dates.startDate ? moment(dates.startDate).format('MMM') : '';
  const endDate = dates.endDate ? moment(dates.endDate).format('DD') + ' ' : '';
  const endMonth = dates.endDate ? moment(dates.endDate).format('MMM') : '';

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('USD');
  const [showHorizontalBar, setShowHorizontalBar] = useState(false);
  const [disable, setDisable] = useState(false);
  const [showLoader, setShowLoader] = useState(true);


  const dispatch = useDispatch();

  const RenderItem = ({ item, navigation, guests, dates, branch, is_blackout, creditCardDiscount }) => {
    const [rooms, setRooms] = useState(1);
    const onPress = () => {
      if (rooms === 0) {
        Alert.alert(
          'Number of Rooms',
          'Please select number of rooms you need',
        );
      } else if (guests.adult > item.capacity * rooms) {
        Alert.alert('Number of Rooms','Please select more rooms 2 or 3 guests are allowed in one room');
      } else {
      
        navigation.navigate(Routes.GuestDetails, {
          room: item.aptr_name,
          roomImage: item.feature_image,
          isPackage: false,
          guests: guests,
          dates: dates,
          branch: branch,
          rooms: rooms,
          price: item.aptr_night_price,
          pricePerNights: item.aptr_discount_price,
          room_id: item.aptr_id,
          roomId: item.id,
          packageAddons: [],
          isCreditCardDiscount: (creditCardDiscount > 0) ? true : false,
          creditCardDiscountPercentage: (creditCardDiscount > 0) ? creditCardDiscount : 0
        });
      }
    };
    const getPrice = async () => {
      try {
        return await convertDollarToCurrentCurrency(parseFloat(item.aptr_night_price.split(',')[0]), value)
      } catch (e) {
        return await convertDollarToCurrentCurrency(parseFloat(item.aptr_night_price), value)
      }

    }
    const getDiscountPrice = async () => {
      try {
        return await convertDollarToCurrentCurrency(parseFloat(item.aptr_discount_price.split(',')[0]), value)
      } catch (e) {
        return await convertDollarToCurrentCurrency(parseFloat(item.aptr_discount_price), value)
      }

    }
    const getCreditCardDiscountedPrice = async () => {
      if (creditCardDiscount > 0) {
        let discountPrice = 0;
        try {
          discountPrice = parseFloat(item.aptr_discount_price.split(',')[0])
        } catch (e) {
          discountPrice = parseFloat(item.aptr_discount_price)
        }
        let percentage = creditCardDiscount / 100;
        let discountedAmount = discountPrice * percentage;
        try {
          return await convertDollarToCurrentCurrency(discountPrice - discountedAmount, value)
        } catch {
          return await convertDollarToCurrentCurrency(discountPrice - discountedAmount, value)
        }

      } else {
        return 0;
      }
    }


    return (
      <>
        <RoomDetailBox room={item} setNoOfRooms={setRooms} NoOfRooms={rooms} />
        <BookNowComponent
          price={getPrice}
          discountedPrice={getDiscountPrice}
          onPress={onPress}
          currency={value}
          creditCardDiscountedPrice={getCreditCardDiscountedPrice}
        />
      </>
    );
  };

  useEffect(() => {
    setShowLoader(props.app.loadingGetAvailable);
  }, [props.app.loadingGetAvailable]);

  useEffect(() => {
    const arrival = moment(dates.startDate).format('DD-MM-YYYY');
    const departure = moment(dates.endDate).format('DD-MM-YYYY');

    const unsubscribe = navigation.addListener('focus', () => {
      props.getAvailableRooms(arrival, departure, hotel_id).then(() => {
        setShowHorizontalBar(true)
        setDisable(true);
      });
    });
    const unsubscribe2 = navigation.addListener('blur', () => {
      dispatch({
        type: types.GET_AVAILABLE_ROOMS + FULFILLED,
        payload: {
          available: [],
          discount: [],
          is_blackout: false
        },
      });
      setDisable(false);
    });
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

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
        <Text style={styles.headerTitle}>{Routes.SelectRooms}</Text>
        <CurrencyConverter
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          branchTheme={Themes[props.app.branch]}
        />
      </View>

      {(props.app?.available?.length && showHorizontalBar) ?
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: RFValue(8) }}
          style={{ marginVertical: RFValue(6), height: 50 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <SubHeaderBox text={branch} />
          <SubHeaderBox
            text={
              startDate + ' ' + startMonth + ' - ' + endDate + ' ' + endMonth
            }
          />
          <SubHeaderBox text={totalGuests + ' Guests'} />
        </ScrollView> : null
      }

      {props.app.errorGetAvailable && (
        <>
          <Text
            style={{
              color: 'red',
              fontFamily: OSregular,
              fontSize: RFValue(14),
              textAlign: 'center',
              paddingHorizontal: RFValue(15),
            }}>
            Cannot load available rooms...
          </Text>
          <Text
            style={{
              color: 'red',
              fontFamily: OSregular,
              fontSize: RFValue(14),
              textAlign: 'center',
              paddingHorizontal: RFValue(15),
            }}>
            Please check your internet connection!
          </Text>
        </>
      )}
      {!props.app.loadingGetAvailable &&
        !props.app.errorGetAvailable &&
        props.app?.available?.length === 0 &&
        disable ? (
        <Text
          style={{
            color: 'red',
            fontFamily: OSregular,
            fontSize: RFValue(14),
            textAlign: 'center',
            paddingHorizontal: RFValue(15),
            marginTop: Dimensions.get('window').height / 2
          }}>
          Sorry! No room found
        </Text>
      ) : null}

      <FlatList
        contentContainerStyle={{ paddingBottom: RFValue(90) }}
        ListHeaderComponent={() =>
          props.app
            .loadingGetAvailable ? (
            <CustomeModel modalVisible={showLoader} />
          ) : null
        }
        data={props.app?.loadedGetAvailable ? props.app?.available : []}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            navigation={navigation}
            guests={guests}
            branch={props.app.branch}
            dates={dates}
            is_blackout={props?.app?.is_blackout}
            creditCardDiscount={(props?.app?.discount.length && props?.app?.discount[0].type == 'credit_card') ? parseFloat(props?.app?.discount[0].discount) : 0}
          />
        )}
        keyExtractor={(item) => Math.random().toString()}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { getRooms, getAvailableRooms };

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoomsScreen);

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
    marginRight: '-20%',
    fontSize: RFValue(15),
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 100,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    top: 0,
    width: deviceWidth,
    height: RFValue(47),
    backgroundColor: '#fff',
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(10),
    borderBottomWidth: RFValue(1),
    borderBottomColor: '#ddd',
  },
  currencyIcon: {
    width: 25,
    height: 25,
    resizeMode: 'stretch',
  },
});
