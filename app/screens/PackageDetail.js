import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  RFValue,
  RFPercentage,
  PFregular,
} from 'react-native-responsive-fontsize';
import FastImage from '../utils/Image'
import { SvgUri } from 'react-native-svg';
import AppTheme from '../styles/AppTheme';
import { getPackagesDetails } from '../store/actions/AppActions';
import Header from '../components/Header';
import { connect, useDispatch } from 'react-redux';
import PickerRow from '../components/PickerRow';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import GuestBottomSheet from '../components/GuestBottomSheet';
import DateRangeSelector from '../components/DateRangeSelector';
import { getRoom, getPackageDetail } from '../store/actions/AppActions';
import moment from 'moment';
import BookNowContainer from '../components/BookNowContainer';
import Routes from '../navigations/Routes';
import CustomeModel from '../components/CustomeModel';
import axios from 'axios';
import API from '../utils/API';
import RenderHtml from 'react-native-render-html';
const { PFbold, OSregular } = AppTheme.fonts;

const PackageDetail = ({ route, navigation, ...props }) => {
  console.log('PackageDetails ---> ', props.app?.packageDetails);
  console.log('message --> ', props.app?.message);
  const { item } = route.params;
  console.log('Package --> ', item);
  let DATA = [item];
  // console.log("props.app?.availablePackages?.length", props.app?.availablePackages?.length);
  // if(props.app?.availablePackages?.length > 0){
  //   DATA = packageData.map((item, index) => {
  //     // console
  //     return item;
  //   });
  // }
  console.log("DATA => ", DATA);
  const guestRef = React.createRef();
  const calendarRef = React.createRef();
  const [dateRange, setDateRange] = useState({
    startDate: moment().format('YYYY/MM/DD'),
    endDate: moment().add(1, 'days').format('YYYY/MM/DD'),
  });
  const [rooms, setRooms] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [totalGuests, setTotalGuests] = useState(1);
  const [guestInfo, setGuestInfo] = useState({ adult: 1, children: 0 });
  const [showGuests, setShowGuests] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const _setDateRange = (params) => {
    setDateRange(params);
    calendarRef.current.snapTo(1);
  };

  // console.log('days ====| ', moment(endDate).diff(startDate, 'days'));
  const days = moment(dateRange.endDate).diff(dateRange.startDate, 'days');

  const onPress = async () => {
    // console.log(API.packageAvailability());
    try {
      setShowLoader(true);
      console.log('yyyyy', `${API.packageAvailability()}?package_id=${props.app.packageDetails.id}&hotel_id=${props.app.packageDetails.hotel_id}&arrival=${dateRange.startDate}&departure=${dateRange.endDate}`)
      const response = await axios.get(`${API.packageAvailability()}?package_id=${props.app.packageDetails.id}&hotel_id=${props.app.packageDetails.hotel_id}&arrival=${dateRange.startDate}&departure=${dateRange.endDate}`);
      setShowLoader(false);
      console.log("Response 1 ", response);
      console.log("Rsponse 2 ", response.data);
      console.log(response.data.data.packages.length);
      const { packages } = response.data.data;
      if (packages.length == 0) {
        Alert.alert("Alert!", "Package not available");
      } else {
        if (rooms === 0) {
          Alert.alert('Alert!', 'Please select at least 1 room');
        } else if (guestInfo.adult > packages[0].capacity * rooms) {
          Alert.alert(
            'Alert!',
            'Number of guests exceeds allowed limit',
          );
        } else {
          console.log('packages[0]packages[0]packages[0]', packages[0])
          navigation.navigate(Routes.GuestDetails, {
            room: packages[0].name,
            roomImage: packages[0].feature_image,
            guests: guestInfo,
            dates: dateRange,
            branch: props.app.branch,
            rooms: rooms,
            price: packages[0].actual_price,
            pricePerNights: Number(packages[0].discount_price),
            room_id: packages[0].room_id,
            roomId: packages[0].room_id,
            isPackage: true,
            packageAddons: props.app?.packageDetails?.package_adons,
          });
        }
      }
    } catch (error) {
      setShowLoader(false);
      console.log(error);
      Alert.alert("Warning", "Something want wrong");
    }
    // if (rooms === 0) {
    //   Alert.alert('Number of Rooms', 'Please select number of rooms you need');
    // } else if (guestInfo.adult > packageData.capacity * rooms) {
    //   Alert.alert(
    //     'Number of Rooms',
    //     'Please select more rooms 2 or 3 guests are allowed in one room',
    //   );
    // } else {
    //   navigation.navigate(Routes.GuestDetails, {
    //     room: DATA[0].name,
    //     roomImage: DATA[0].feature_image,
    //     guests: guestInfo,
    //     dates: dateRange,
    //     branch: props.app.branch,
    //     rooms: rooms,
    //     price: DATA[0].actual_price,
    //     pricePerNights: DATA[0].actual_price,
    //     room_id: DATA[0].hotel_id,
    //     roomId: DATA[0].room_id,
    //     discountPercent: DATA[0].discount_applicable == null ? 0 : DATA[0].discount_applicable,
    //     packageData,
    //     item,
    //   });
    // }
  };

  useEffect(() => {
    setShowLoader(true);
    props.getPackageDetail(DATA[0].id, DATA[0].hotel_id)
      .then(() => {
        setShowLoader(false);
      });
  }, []);
  return (
    <>
      <ScrollView>
        <View>
          <View style={styles.dateSelectSection}>
            <PickerRow
              refer={guestRef}
              calendarRef={calendarRef}
              dates={dateRange}
              guests={totalGuests}
            />
          </View>
          {showLoader ? <CustomeModel modalVisible={showLoader} /> : <></>}
          {props.app?.packageDetails?.length == 0 && !showLoader ? (
            <Text style={styles.emptyMessage}>Package details not available</Text>
          ) : (
            <></>
          )}

          {props.app.packageDetails && !showLoader ? (
            <View>
              <Image
                source={{ uri: item.feature_image }}
                style={{ width: '100%', height: 170 }}
                resizeMode='contain'
              />
              <View style={styles.packageDetailContent}>
                {/* <Text style={styles.roomNameText}>
                {packageData[0].aptr_name}
              </Text> */}
                <Text style={styles.smaleTitleText}>{props.app.packageDetails.name}</Text>
                <Text style={[styles.smaleTitleText, { fontSize: 16 }]}>
                  USD {props.app.packageDetails.actual_price}
                </Text>
                <Text style={styles.packageDescription}>
                  {props.app.packageDetails.description}
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.smaleTitleText,{paddingBottom:5}]}>Package Services</Text>
                  {
                    props.app.packageDetails.package_services.map((item,index)=>{
                      let extention = item.services.image.split('.');
                      if (
                        extention[extention.length - 1] == 'svg' ||
                        extention[extention.length - 1] == 'SVG'
                      ) {
                        return (
                          <View style={styles.centered}>
                            <View style={{width:35}}>
                            <SvgUri marginRight={RFValue(7)} uri={item.services.image} />
                            </View>
                            <Text style={styles.detailTxt}>{item.services.title}</Text>
                          </View>
                        );
                      } else {
                        return (
                          <View style={styles.centered}>
                            <View style={{width:35}}>
                            <FastImage source={{ uri: item.services.image }} style={{ width: 20, height: 20, marginRight: RFValue(7) }} />
                            </View>
                            <Text style={styles.detailTxt}>{item.services.title}</Text>
                          </View>
                        );
                      }
                      
                    })
                  }
                 </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.smaleTitleText,{paddingBottom:5}]}>Package Features</Text>
                  <Text style={{ fontFamily: PFbold, fontSize: RFValue(12) }}>Capacity: <Text style={{ fontFamily: OSregular, fontSize: RFValue(12) }}>{props.app.packageDetails.capacity} Persons</Text></Text>
                  <Text style={{ fontFamily: PFbold, fontSize: RFValue(12) }}>Available For <Text style={{ fontFamily: OSregular, fontSize: RFValue(10) }}>{JSON.parse(props.app.packageDetails.days).join(', ')}</Text></Text>
                  <RenderHtml
                    contentWidth={'100%'}
                    source={{
                      html:props.app.packageDetails.highlights
                    }}
                  />
                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    // marginHorizontal: RFValue(8),
                    marginTop: RFValue(20),
                    marginBottom: RFValue(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.add}> Select Rooms: </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() =>
                        rooms > 1 ? setRooms(rooms - 1) : undefined
                      }>
                      <Image
                        source={require('../assets/mins.png')}
                        style={styles.btn}
                      />
                    </TouchableOpacity>

                    <Text style={styles.numberOfRooms}>{rooms}</Text>

                    <TouchableOpacity
                      onPress={() => setRooms(rooms < 3 ? rooms + 1 : rooms)}>
                      <Image
                        source={require('../assets/plus.png')}
                        style={styles.btn}
                      />
                    </TouchableOpacity>
                  </View>
                </View> */}

              </View>
              <BookNowContainer
                price={props.app?.packageDetails?.actual_price}
                showDiscountedPrice={true}
                discountedPrice={props.app?.packageDetails?.discount_price}
                showPrice={true}
                onPress={() => onPress()}
              />
              <View style={{marginTop:20}}/>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>

      {showGuests && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => guestRef.current.snapTo(1)}
        />
      )}

      {showCalendar && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => calendarRef.current.snapTo(1)}
        />
      )}

      <BottomSheet
        ref={guestRef}
        initialSnap={1}
        snapPoints={[AppTheme.metrics.deviceHeight * 0.48, 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Guest Details" refer={guestRef} />
        )}
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
          renderHeader={() => (
            <BottomSheetHeader
              title="Select your date of stay"
              refer={calendarRef}
            />
          )}
          /* enabledInnerScrolling={true} */
          renderContent={() => (
            <ScrollView
              bounces={false}
              contentContainerStyle={{ backgroundColor: 'red', flexGrow: 1 }}
              style={{ height: AppTheme.metrics.deviceHeight * 0.833 }}>
              <DateRangeSelector setDateRange={_setDateRange} />
            </ScrollView>
          )}
          onOpenStart={() => setShowCalendar(true)}
          onCloseEnd={() => setShowCalendar(false)}
        />
      }
    </>
  );
};
const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { getRoom, getPackageDetail };

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetail);

const styles = StyleSheet.create({

  dateSelectSection: {
    marginTop: 15,
    marginBottom: 0,
  },
  emptyMessage: {
    fontFamily: PFregular,
    fontSize: RFValue(14),
    textAlign: 'center',
    color: '#E21717',
  },
  packageDetailContent: {
    paddingHorizontal: 12,
  },
  roomNameText: {
    fontFamily: PFregular,
    fontSize: RFValue(25),
    paddingTop: 10,
  },
  smaleTitleText: {
    fontFamily: PFregular,
    fontSize: RFValue(20),
    paddingTop: 8,
  },
  packageDescription: {
    fontFamily: PFregular,
    fontSize: RFValue(14),
    paddingTop: 4,
  },
  add: {
    marginRight: RFValue(6),
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },
  btn: {
    marginHorizontal: RFValue(10),
  },
  numberOfRooms: {
    marginTop: RFValue(-4),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(25),
    fontFamily: PFregular,
  },
  centered: { flexDirection: 'row', alignItems: 'center', marginRight: 5,marginBottom:8 },
  detailTxt: {
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },
});
