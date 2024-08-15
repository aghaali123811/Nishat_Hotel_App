import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  ActivityIndicator, Dimensions
} from 'react-native';
import RoomDetailBox from '../components/RoomDetailBox';
import WhatsappFloating from '../components/WhatsappFloating';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import Routes from '../navigations/Routes';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Rooms, Themes } from '../store/utils/branchData';
import { getAllRooms } from '../store/actions/AppActions';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import BookNowContainer from '../components/BookNowContainer';
import BottomSheetHelper from '../helpers/BottomSheetHelper';
import AppTheme from '../styles/AppTheme';
import CustomeModel from '../components/CustomeModel';
import CurrencyConverter from '../components/CurrencyConverter';
import * as RootNav from '../navigations/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
const { greyPrimary, greySecondary, black } = AppTheme.colors;
const { PFregular, PFbold, OSregular, OSsemiBold } = AppTheme.fonts;
const { deviceHeight } = AppTheme.metrics;
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-community/async-storage';
const RenderItem = ({ item, navigation, totalGuest: totalGuests, reload, value, props }) => {
  const [rooms, setRooms] = useState(1);
  // const [value, setValue] = useState(value);

  // const getValue = useCallback(() => {
  //   if (item?.aptr_price?.length != null) {
  //     const value = item?.aptr_price?.split(',');
  //     console.log(value[0], 'Password')
  //     return value[0];
  //   } else {
  //     console.log(Number(item.aptr_price), 'Password2')
  //     return Number(item.aptr_price);
  //   }
  // }, []);

  // const getDiscount = () => {
  //   if (item?.aptr_discount_price?.length != null) {
  //     const value = item?.aptr_discount_price.split(',');
  //     return value[0];
  //   } else {
  //     return Number(item?.aptr_discount_price);
  //   }
  // };
  const onPress = () => {
    BottomSheetHelper.openNextTime() +
      navigation.navigate(Routes.RoomDetail, { room: item, totalGuests })
  };

  return (
    <>
      <RoomDetailBox
        room={item}
        setNoOfRooms={setRooms}
        NoOfRooms={rooms}
        screenName="RoomScreen"
      />
      <PrimaryButton
        onPress={onPress}
        label="View Details"
      />
    </>
  );
};

const RoomsScreen = ({ navigation, ...props }) => {
  // console.log('branch -> ', props.app.branch);

  // console.log('props.app.isLoggedIn -> ', props.app.isLoggedIn);

  // console.log('user data -> ', props.app.user);

  let hotel_id = props.app.branch == 'Nishat Johar Town' ? 2 : 1;

  const [showLoader, setShowLoader] = useState(true);
  const [rooms, setRooms] = useState(
    props.app.allRooms ? props.app.allRooms : [],
  );
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState('USD');
  const [email, setEmail] = useState('');

  // console.log('Rooms Screen -> ', props.app.allRooms);
  useEffect(() => {
    (async () => {
      let data = (await AsyncStorage.getItem('user')) || {};
      if (Object.keys(data).length > 0) {
        data = JSON.parse(data);
        setEmail(data.user_email);
        getRooms(data.user_email)
      } 
    })();
    getRooms()

  }, [hotel_id]);

  const getRooms = async (userEmail) => {
    let hotel_id = props.app.branch == 'Nishat Johar Town' ? 2 : 1;
    props.getAllRooms(hotel_id,userEmail ?? email).then(() => {

    });
  }

  // const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   setModalVisible(modalVisible);
  // }, [props.app.isOpen]);


  useEffect(() => {
    setRooms(props.app.allRooms ? props.app.allRooms : []);
  }, [props.app.allRooms, hotel_id]);

  return (
    <>
    <WhatsappFloating/>
      {/* <ScrollView> */}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{ marginLeft: RFValue(10) }} onPress={() => RootNav.toggleDrawer()}>
            <Image source={require('../assets/menu.png')} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { marginRight: RFValue(10) }]}>Rooms</Text>
          <Text style={styles.headerTitle}>      </Text>

          {/* <CurrencyConverter
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            branchTheme={Themes[props.app.branch]}
          /> */}
        </View>
        {/* <Header title="Rooms" marginLeft={RFValue(105)} /> */}
        {/* <Image style={styles.topBg} source={require('../assets/bg4.png')} /> */}
        <BranchSelector />

        {!props.app.isLoggedIn ? (
          <View style={styles.infoMessageView}>
            <Text onPress={()=>{navigation.navigate(Routes.LoginScreen)}} style={styles.infoMessageText}>
              Sign-in to unlock special deals and discount
            </Text>
          </View>
        ) : (
          <></>
        )}

        {
          /*props.app.loadingGetRooms ||*/ showLoader && (
            <CustomeModel modalVisible={showLoader} />
          )
        }

        {rooms?.length == 0 && !showLoader ? (
          <Text style={[styles.toastText, { marginTop: Dimensions.get('window').height / 2 - 100 }]}>No rooms available</Text>
        ) : (

          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                reload={open}
                navigation={navigation}
                totalGuests
                value={value}
                props={props}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />

        )}
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { getAllRooms };
const memoizeRoomsScreen = memo(RoomsScreen)
export default connect(mapStateToProps, mapDispatchToProps)(memoizeRoomsScreen);

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
    fontSize: RFValue(15),
    fontWeight: '600',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  branchselector: {
    borderBottomWidth: 1,
    borderBottomColor: greyPrimary,
    marginHorizontal: '5%',
    marginVertical: '3%',
    paddingBottom: '3%',
  },

  hotelTxt: {
    height: 18,
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

  topBg: {
    width: AppTheme.metrics.deviceWidth,
    height: AppTheme.metrics.deviceHeight * 0.45,
    marginTop: RFValue(16),
  },

  toastText: {
    color: '#e74c3c',
    textAlign: 'center',
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },

  infoMessageView: {
    justifyContent: 'center',
    backgroundColor: '#fffaeb',
  },

  infoMessageText: {
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
  },
});
