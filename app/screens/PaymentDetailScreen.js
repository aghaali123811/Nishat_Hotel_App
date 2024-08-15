import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import BookedRoomDetail from '../components/BookedRoomDetail';
import PaymentDetailsBox2 from '../components/PaymentDetailsBox2';
import PrimaryButton from '../components/PrimaryButton';
import { bookRoom, getAddOns } from '../store/actions/AppActions';
import { Themes } from '../store/utils/branchData';
import AppTheme from '../styles/AppTheme';
import CustomeModel from '../components/CustomeModel';
// import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { RadioButton } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import PrimaryInputField from '../components/PrimaryInputField';
import { convertDollarToCurrentCurrency, convertPkrToDollar } from '../utils/helper'
import Routes from '../navigations/Routes';
const { OSsemiBold, PFregular, OSregular } = AppTheme.fonts;
const {
  greyPrimary,
  greySecondary,
  greyLight,
  pink,
  pinkLight,
  green,
  dark,
  profileBackground,
} = AppTheme.colors;
const { deviceHeight, deviceWidth } = AppTheme.metrics;


const PaymentDetailScreen = ({ navigation, route, ...props }) => {
  const { data } = route.params;
  console.log('props.app.addOns -> ', props.app.addOns);
  console.log('datadatadatadatadata', 'data');
  // console.log('hide cash on arrival booking', props.app.is_blackout);
  const instantBookingInstructions = (data.isCreditCardDiscount) ? `Get ${data.creditCardDiscountPercentage}% discount for instant payment without waiting for host approval. This booking is non-refundable and cannot be canceled or changed. Additional bank charges may applied.` : 'This booking is non-refundable and cannot be canceled or changed. Additional bank charges may applied.';
  const [showAndicator, setShowAndicatore] = useState(false);
  const [messageText, setMessageText] = useState('Invalid discount code');
  const [discountCard, setDiscountCard] = useState('');
  const [showMessageText, setShowMessageText] = useState(false);
  const cardBoxRef = React.useRef(null);
  const [showCardBox, setShowCardBox] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoaing] = useState(false);
  const [discountCodeDiscount, setDiscountCodeDiscount] = useState(0)

  const [cashArrival, setCashArrival] = useState(props.app?.is_blackout);
  const [termsChecked, setTermsChecked] = useState(false);
  const [cancelPolicyChecked, setCancelPolicyChecked] = useState(false);
  const [matress, setMattress] = useState(false);
  const [babyCot, setBabyCot] = useState(false);
  const [hiTea, setHiTea] = useState(false);
  const [isInstantBooking, setInstantBooking] = useState(false);
  const [paymentType, setPaymentType] = useState(3);

  const [matressInfo, setMatressInfo] = useState({});
  const [hiTeaInfo, setHiTeaInfo] = useState({});
  const [hiTeaPrice, setHiTeaPrice] = useState(0);

  const [noOfGuest, setNoOfGuest] = useState(1);
  const [noOfHiTea, setNoOfHiTea] = useState(1);
  const [fcmToken, setFcmToken] = useState('');

  const [subTotal, setSubTotal] = useState(data.subTotal);
  const [total, setTotal] = useState(0);
  const [taxPrice, setTexPrice] = useState(0);

  const [packagesAddons, setPackagesAddons] = useState(
    data.packageAddons?.length > 0 ? data.packageAddons : [],
  );

  let matress_subTotal = data.subTotal;

  console.log('Data ===|| ', data);
  const { firstName, lastName, email, address, phone } = data;
  console.log('data.loyalty_card_status ===||', data.loyalty_card_status);
  console.log('data.isPackage ===|| ', data.isPackage);
  console.log('data.total ===|| ', total);
  console.log('data.subTotal ===|| ', subTotal);
  console.log('TaxPrice ===||', taxPrice);
  console.log('priceParNight ===|| ', data.priceNight);
  console.log(
    'Number(subTotal)+Number(hiTeaPrice)+Number(taxPrice) => ',
    Number(subTotal + hiTeaPrice) +
    Number(((subTotal + hiTeaPrice) * 16) / 100),
  );

  let AddOnsArr = [];
  packagesAddons.map((item, ind) => {
    if (item.isChecked) {
      AddOnsArr.push({ id: ind, addons_id: item.addons_id });
    }
  });
  console.log('useEffect |=>', AddOnsArr);

  const arrival = new Date(data.startDate);
  const departure = new Date(data.endDate);
  const diffTime = Math.abs(departure - arrival);
  const noOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const accountInfo = [
    'Account Title: Nishat Hotels and Properties Limited',
    'A/C# 0077815281000078',
    'IBAN # PK95MUCB0077815281000078',
    'Bank Name: MCB Limited Emporium Mall Branch',
    'Branch Code: 1762',
    'Bank swift code: MUCBPKKA',
  ];

  useEffect(() => {
    props.getAddOns();
    // requestUserPermission();
  }, []);

  useEffect(() => {
    let priceArr; // = total;
    priceArr = packagesAddons.map((item, ind) => {
      return item.isChecked ? (item.adons.price > 0 ? item.adons.price : 0) : 0;
    });
    console.log('priceArr |=> ', priceArr);
    let totalArr = 0;
    priceArr.map((item) => {
      totalArr = totalArr + parseInt(item);
    });
    console.log('Sum Price |=>', totalArr);
    setSubTotal(Number(data.subTotal) + Number(totalArr));
  }, [packagesAddons]);

  useEffect(() => {
    if (props.app.addOns?.length > 1) {
      let price = props.app.addOns[1].price;
      console.log('useEffect Price ==| ', subTotal);
      console.log('useEffect Price ==| ', price);
      console.log('useEffect Price ==| ', hiTea);
      setHiTeaInfo({
        price: props.app?.addOns[1]?.price,
        quantity: noOfGuest * noOfHiTea,
        days: noOfDays,
        isHiTea: hiTea,
      });
      if (hiTea) {
        // console.log("=>", Number(subTotal)+(Number(price) * Number(noOfGuest) * Number(noOfHiTea)));
        let totalPricee = Number(price) * Number(noOfGuest) * Number(noOfHiTea);
        console.log('totalPricee |=>', totalPricee);
        setHiTeaPrice(totalPricee);
        // setSubTotal(Number(subTotal)+totalPricee/*(Number(price) * Number(noOfGuest) * Number(noOfHiTea))*/);
        // matress_subTotal = Number(subTotal)+(Number(price) * Number(noOfGuest) * Number(noOfHiTea));
      } else {
        // console.log("=>", Number(subTotal)-(Number(price) * Number(noOfGuest) * Number(noOfHiTea)));
        let totalPricee = Number(price) * Number(noOfGuest) * Number(noOfHiTea);
        console.log('totalPricee |=>', totalPricee);
        setHiTeaPrice(0);
        setNoOfGuest(1);
        setNoOfHiTea(1);
        // setSubTotal(Number(subTotal)- totalPricee/*(Number(price) * Number(noOfGuest) * Number(noOfHiTea))*/);
        // matress_subTotal = Number(subTotal)-(Number(price) * Number(noOfGuest) * Number(noOfHiTea));
      }
    }
  }, [hiTea, noOfHiTea, noOfGuest]);

  const toggleSwitch = () => {
    setDiscountCodeDiscount(0)
    if (isInstantBooking) {
      setPaymentType(3);
      setSubTotal(data.subTotal)
    }
    else {
      setPaymentType(1);
      if (data.subTotalWithCreditCard > 0)
        setSubTotal(data.subTotalWithCreditCard)
    }
    setInstantBooking(!isInstantBooking);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('FCM TOKEN', fcmToken);
    if (fcmToken) {
      setFcmToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const placeBooking = async () => {
    setLoaing(true)
    let total_price = Math.floor(Number(subTotal + hiTeaPrice) + Number(((subTotal + hiTeaPrice) * 16) / 100));
    let total_price_pkr = await convertDollarToCurrentCurrency(total_price, 'PKR')

    const obj = {
      country: data.country,
      room_id: data.room_id,
      rooms: data.rooms,
      arrival: moment(route.params.data.startDate).format('DD-MM-YYYY'),
      departure: moment(route.params.data.endDate).format('DD-MM-YYYY'),
      people: data.guests.adult + data.guests.children,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      city: data.city,
      postal_code: data.zip,
      address: data.address,
      number: data.phone,
      roomId: data.roomId,
      room_rate: data.price,
      // pricePerNights: data.priceNight,
      // sub_total: Number(subTotal + hiTeaPrice),
      // tax_price: Number(((subTotal + hiTeaPrice) * 16) / 100),
      total_price,
      total_price_pkr,
      title: data.title,
      user_agent: data.user_agent,
      // fcm_token:
      //   'f5yp4dN-Q1aRTeAAxI0Xjb:APA91bFZR0xmDiOhENdn9Ag4Z7lS4u9Mydcl6z4rsvMol8p-NQGRcvrjyaeImUBQQ2ST8zQ2mV-3Jt4fnNpPxr3Z5ksOH47aTV8TjTOz_B7z42Bw3wnlJDYrZJx22RfXDyY6gmN6zgw8',
      // device_token: DeviceInfo.getUniqueId(),
      hotel_id: props.app.branch == 'Nishat Gulberg' ? 1 : 2,
      booking_type: paymentType === 1 ? 'mcb' : paymentType === 2 ? 'bt' : 'coa',
      child: 1,
      user_id: data.user_id,
      matress: {
        status: matress ? 1 : 0,
        qty: matress ? 1 : 0,
        days: matress ? noOfDays : 0,
      },
      baby_cot: {
        status: babyCot ? 1 : 0,
        qty: babyCot ? 1 : 0,
        days: babyCot ? noOfDays : 0,
      },
      hi_tea: {
        status: hiTea ? 1 : 0,
        qty: hiTea ? noOfGuest : 0,
        days: hiTea ? noOfHiTea : 0,
      },
      discount_code: data?.coupon,
      app_user_email: data.email,
      // matressInfo: matressInfo,
      // hiTeaInfo: hiTeaInfo,
      // isInstantBooking: isInstantBooking,
      // is_package: data.isPackage ? 1 : 0,
      // package_id: data.isPackage ? data.roomId : 0,
      // loyalty_card_status: data.loyalty_card_status,
      // loyalty_discount: data.loyalty_discount,
      // loyalty_card_number: data.loyalty_card_number,
      // loyalty_guest_name: data.loyalty_guest_name,
      // loyalty_card_type: data.loyalty_card_type,
      // loyalty_card_code: data.loyalty_card_code,
    };
    let addon_id = 'addon_id';
    AddOnsArr.map((item, ind) => (obj[addon_id + `[${ind}]`] = item.addons_id)); //obj1.addon_id[`${ind}`] = item.addons_id
    // console.log('obj1===||', obj);
    // console.log('paymentType->', paymentType);
    // props.bookRoom(obj);
    // if (paymentType == 1) {
    //   cardBoxRef.current.snapTo(0);
    // } else {
    //   props.bookRoom(obj);
    // }
    console.log('yasirobj', obj);
    props.bookRoom(obj);
  };

  const handleCheckPress = (item) => {
    let arr = [...packagesAddons];
    const findIndex = arr.findIndex((itm) => item.id == itm.id);
    arr[findIndex].isChecked = !arr[findIndex].isChecked;
    setPackagesAddons(arr);
    console.log('packagesAddons |===>', packagesAddons);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.checkBoxView}>
        <View style={{ flexDirection: 'row' }}>
          <Checkbox.Android
            color={Themes[props.app.branch]}
            style={{ width: 2, height: 2 }}
            status={item.isChecked ? 'checked' : 'unchecked'}
            onPress={() => handleCheckPress(item)}
          />
          <Text style={styles.checkBoxLabel}>{item.adons.title}</Text>
        </View>
        <Text style={styles.infoText}>
          {item.adons.price == '0' ? 'Free' : 'PKR. ' + item.adons.price}
        </Text>
      </View>
    );
  };

  const handleCardSubmit = () => {
    Alert.alert('Alert', 'Success');
    cardBoxRef.current.snapTo(1);
  };
  const onPressDiscountCard = async () => {
    setShowAndicatore(true)
    const response = await axios.get(
      `https://nishathotels.jt.crewlogix.com/api/v3/get-discount?discount_code=${discountCard}`,
    );
    setShowAndicatore(false)

    if (response.data.V_MESSAGE == 'SUCCESS') {
      let amountInDollar = await convertPkrToDollar(response.data.DISC_RATE_AMT)
      setSubTotal(subTotal - amountInDollar)
      setDiscountCodeDiscount(amountInDollar);
    } else {
      setShowMessageText(true);
    }
    console.log('responseresponseresponse', response.data)
    // const { data } = response;
  }
  const renderContent = () => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        height: 500,
      }}>
      <View style={{ width: '95%', margin: '2%' }}>
        <CreditCardInput onChange={(e) => console.log(e)} />
        <View>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 15,
              fontSize: 16,
              fontWeight: '700',
            }}>
            Cardholder Name
          </Text>
          <PrimaryInputField
            value={userName}
            onChangeText={(e) => setUserName(e)}
            onBlur={() => null}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PrimaryButton label="Next" onPress={handleCardSubmit} />
        </View>
      </View>
    </View>
  );

{console.log('subTotalsubTotalsubTotal',subTotal,hiTeaPrice)}
  const renderTotalPrice = useMemo(()=>{
return (
  Number(subTotal + hiTeaPrice) +
  Number(((subTotal + hiTeaPrice) * 16) / 100)
).toString()
  },[subTotal,hiTeaPrice])

  return (
    <>
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <BookedRoomDetail data={data} />

        {/* <PaymentDetailsBox1 rooms={data.rooms} /> */}

        {/* <View style={styles.priceArea}>
        <View style={styles.priceContainer}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{'PKR    ' + getTotal()}</Text>
        </View>
      </View> */}
        <View>
          {/* {console.log("BRANCH", props.app.branch)} */}
          <Text style={styles.heading}>Guest Information</Text>
          {[firstName + ' ' + lastName, email, phone, address].map((item) => {
            return <Text style={styles.infoText}>{item}</Text>;
          })}
        </View>

        {packagesAddons.length > 0 && (
          <View>
            <Text style={{ ...styles.heading, marginTop: RFValue(20) }}>
              Let us know what you need
            </Text>

            <FlatList
              data={packagesAddons}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}

        {/* {packagesAddons.map((item, ind) => {
        console.log("item |--| ", item);
          return  <View style={styles.checkBoxView}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox.Android
                color={Themes[props.app.branch]}
                style={{ width: 2, height: 2, }}
                status={item[ind].value ? 'checked' : 'unchecked'}
                onPress={() => setchecked(item[ind].value ? false : true)}
              />
              <Text style={styles.checkBoxLabel}>{item[ind].title}</Text>
            </View>
            <Text style={styles.infoText}>{item[ind].price == "0" ? "Free" : "PKR. " + item[ind].price}</Text>
          </View>
        })}
      </View>}  */}

        {packagesAddons.length == 0 && props.app.addOns?.length > 0 && data.room != 'Winter Staycation' && (
          <View>
            <Text style={{ ...styles.heading, marginTop: RFValue(20) }}>
              Let us know what you need
            </Text>

            <View
              style={{
                ...styles.checkBoxView,
                backgroundColor: matress ? profileBackground : 'white',
                flex: 3,
              }}>
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <Checkbox.Android
                  color={Themes[props.app.branch]}
                  style={{ width: 2, height: 2 }}
                  status={matress ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setMattress(matress ? false : true);
                    setMatressInfo({
                      price: props.app.addOns[0].price,
                      quantity: 1,
                      days: noOfDays,
                      isMatress: !matress,
                    });
                    console.log('Matress isCheck ==> ', matress);
                    if (matress) {
                      console.log('=>', matress);
                      matress_subTotal =
                        Number(subTotal) -
                        Number(props.app.addOns[0].price * noOfDays);
                      setSubTotal(
                        Number(subTotal) -
                        Number(props.app.addOns[0].price * noOfDays),
                      );
                      console.log(
                        '=>Matress',
                        Number(subTotal) -
                        Number(props.app.addOns[0].price * noOfDays),
                      );
                    } else {
                      console.log('=>', matress);
                      matress_subTotal =
                        Number(subTotal) +
                        Number(props.app.addOns[0].price * noOfDays);
                      setSubTotal(
                        Number(subTotal) +
                        Number(props.app.addOns[0].price * noOfDays),
                      );
                      console.log(
                        '=>Matress',
                        Number(subTotal) +
                        Number(props.app.addOns[0].price * noOfDays),
                      );
                    }
                  }}
                />
                <Text style={styles.checkBoxLabel}>
                  {props.app.addOns[0].title}
                </Text>
              </View>
              <Text style={{ ...styles.infoText, flex: 1, textAlign: 'right' }}>
                {props.app.addOns[0].price == '0'
                  ? 'Free'
                  : 'USD. ' +
                  props.app.addOns[0].price.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ',',
                  )}
              </Text>
            </View>
            {props.app.addOns?.length > 2 && (
              <View
                style={{
                  ...styles.checkBoxView,
                  backgroundColor: babyCot ? profileBackground : 'white',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Checkbox.Android
                    color={Themes[props.app.branch]}
                    style={{ width: 2, height: 2 }}
                    status={babyCot ? 'checked' : 'unchecked'}
                    onPress={() => setBabyCot(babyCot ? false : true)}
                  />
                  <Text style={styles.checkBoxLabel}>
                    {props.app.addOns[2].title}
                  </Text>
                </View>
                <Text style={styles.infoText}>
                  {props.app.addOns[2].price == '0'
                    ? 'Free'
                    : 'USD. ' +
                    props.app.addOns[2].price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )}
                </Text>
              </View>
            )}
            {props.app.addOns?.length > 0 && (
              <View
                style={{
                  ...styles.hi_teaView,
                  backgroundColor: hiTea ? profileBackground : 'white',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox.Android
                      color={Themes[props.app.branch]}
                      style={{ alignSelf: 'center' }}
                      status={hiTea ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setHiTea(hiTea ? false : true);
                      }}
                    />
                    <Text style={styles.checkBoxLabel}>
                      {props.app.addOns[1].title}
                    </Text>
                  </View>
                  <Text style={styles.infoText}>
                    {props.app.addOns[1].price == '0'
                      ? 'Free'
                      : 'USD. ' +
                      props.app.addOns[1].price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                  </Text>
                </View>
                {hiTea && (
                  <>
                    <View style={styles.firstHorizontalContainer}>
                      <Text style={styles.numberOfGuest}>Number of Guest</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() =>
                            setNoOfGuest(
                              noOfGuest > 1 ? noOfGuest - 1 : noOfGuest,
                            )
                          }>
                          <Image source={require('../assets/mins.png')} />
                        </TouchableOpacity>

                        <Text style={styles.number}>{noOfGuest}</Text>
                        <TouchableOpacity
                          onPress={() => setNoOfGuest(noOfGuest + 1)}>
                          <Image source={require('../assets/plus.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.firstHorizontalContainer}>
                      <Text style={styles.numberOfGuest}>Days for Hi Tea</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() =>
                            setNoOfHiTea(
                              noOfHiTea > 1 ? noOfHiTea - 1 : noOfHiTea,
                            )
                          }>
                          <Image source={require('../assets/mins.png')} />
                        </TouchableOpacity>

                        <Text style={styles.number}>{noOfHiTea}</Text>

                        <TouchableOpacity
                          onPress={() => {
                            setNoOfHiTea(noOfHiTea + 1);
                          }}>
                          <Image source={require('../assets/plus.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
        )}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20 /*, borderTopWidth: 1.5, borderTopColor: 'lightgrey'*/,
          }}>
          <Text style={styles.branchName}>{props.app.branch}</Text>
          <Text style={styles.priceDetailTitle}>
            {data.days} x {data.room}
          </Text>
        </View>

        <PaymentDetailsBox2
          days={data.days}
          rooms={data.rooms}
          discount={0}
          actualPrice={(isInstantBooking && data.subTotalWithCreditCard > 0) ? data.subTotalWithCreditCard : data.subTotal}
          tax={(((subTotal + hiTeaPrice) * 16) / 100).toString()}
          subTotal={(Number(hiTeaPrice) + subTotal).toString() - data?.discountData?.DISC_RATE_AMT}
          total={
            data?.discountData?.V_MESSAGE === "SUCCESS" ?
            +renderTotalPrice - +data?.discountData?.DISC_RATE_AMT:
            renderTotalPrice}
          matressInfo={matressInfo}
          hiTeaInfo={hiTeaInfo}
          isInstantBooking={isInstantBooking}
          packagesAddons={packagesAddons}
          discountCodeDiscount={discountCodeDiscount + data?.discountData?.DISC_RATE_AMT}
        />
        <View style={styles.instantBookingView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: RFValue(24),
                fontFamily: OSregular,
                alignSelf: 'center',
              }}>
              Instant Booking
            </Text>
            <Switch
              trackColor={{ false: greyLight, true: green }}
              thumbColor={'#ffffff'}
              ios_backgroundColor={greyLight}
              onValueChange={toggleSwitch}
              value={isInstantBooking}
            />
          </View>

          {isInstantBooking && (
            <Text
              style={{
                ...styles.infoText,
                paddingLeft: 0,
                marginTop: RFValue(8),
              }}>
              {instantBookingInstructions}
            </Text>
          )}
        </View>
        {
          // isInstantBooking && <View style={styles.lolyatyConatiner}>
          //   {/* <Text style={styles.labelCardField}>Loyalty Card Holder?</Text> */}
          //   <View style={styles.fieldContainer}>
          //     <TextInput
          //       style={styles.inputField}
          //       onChangeText={(value) => { setDiscountCard(value); setShowMessageText(false) }}
          //       value={discountCard}
          //       placeholder="Enter discount code"
          //     />
          //     <TouchableOpacity
          //       onPress={onPressDiscountCard}
          //       style={styles.cardButton}>
          //       <Text style={styles.cardButtonText}>APPLY</Text>
          //     </TouchableOpacity>
          //   </View>
          //   {showMessageText && (
          //     <Text
          //       style={[
          //         styles.labelCardField,
          //         { color: 'red', fontSize: 12, marginLeft: 1 },
          //       ]}>
          //       {messageText}
          //     </Text>
          //   )}
          //   {showAndicator && <CustomeModel modalVisible={showAndicator} />}
          // </View>
        }


        <Text style={{ ...styles.heading, marginTop: RFValue(10) }}>
          Payment Options
        </Text>

        <View style={styles.paymentOptionsView}>
          <View
            style={{
              ...styles.radio,
              backgroundColor: paymentType == 1 ? profileBackground : 'white',
              borderBottomWidth: 1,
              borderColor: greyLight,
              opacity: isInstantBooking ? 1 : 0.3,
            }}>
            <RadioButton.Android
              color={Themes[props.app.branch]}
              disabled={!isInstantBooking}
              status={paymentType == 1 ? 'checked' : 'unchecked'}
              onPress={() => setPaymentType(1)}
            />
            <Text style={{ fontFamily: OSregular }}>Credit Card</Text>
          </View>
          <View
            style={{
              ...styles.radio,
              backgroundColor: paymentType == 2 ? profileBackground : 'white',
              alignItems: 'flex-start',
              borderBottomWidth: 1,
              borderColor: greyLight,
              opacity: isInstantBooking ? 0.3 : 1,
            }}>
            <RadioButton.Android
              color={Themes[props.app.branch]}
              disabled={isInstantBooking}
              status={paymentType == 2 ? 'checked' : 'unchecked'}
              onPress={() => {
                setPaymentType(2);
              }}
            />
            <View style={{ marginTop: RFValue(8) }}>
              <Text style={{ fontFamily: OSregular }}>Bank Transfer</Text>
              {paymentType == 2 && (
                <View style={{ marginTop: RFValue(8), paddingHorizontal: 15 }}>
                  {accountInfo.map((item) => {
                    return (
                      <Text
                        style={{
                          color: dark,
                          fontFamily: OSregular,
                          paddingVertical: RFValue(2),
                        }}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
          {!cashArrival && (
            <View
              style={{
                ...styles.radio,
                backgroundColor: paymentType == 3 ? profileBackground : 'white',
                opacity: isInstantBooking ? 0.3 : 1,
              }}>
              <RadioButton.Android
                color={Themes[props.app.branch]}
                disabled={isInstantBooking}
                status={paymentType == 3 ? 'checked' : 'unchecked'}
                onPress={() => {
                  setPaymentType(3);
                }}
              />
              <Text style={{ fontFamily: OSregular }}>Cash on Arrival</Text>
            </View>
          )}
        </View>

        <View style={{ ...styles.termsContainer, marginTop: RFValue(20), marginBottom: RFValue(20) }}>
          <Checkbox.Android
            color={Themes[props.app.branch]}
            style={{ width: 2, height: 2 }}
            status={termsChecked ? 'checked' : 'unchecked'}
            onPress={() => setTermsChecked(termsChecked ? false : true)}
          />
          <Text style={styles.terms}>
            I have read and agree to the{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://nishathotels.com/terms-conditions')
              }>
              Terms & Conditions
            </Text>{' '}
            and{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://nishathotels.com/terms-conditions')
              }>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <View style={{ ...styles.termsContainer, marginBottom: RFValue(30) }}>
          <Checkbox.Android
            color={Themes[props.app.branch]}
            style={{ width: 2, height: 2 }}
            status={cancelPolicyChecked ? 'checked' : 'unchecked'}
            onPress={() =>
              setCancelPolicyChecked(cancelPolicyChecked ? false : true)
            }
          />
          <Text style={styles.terms}>
            I agree to the{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate(Routes.CancellationPolicy)

              }>
              Cancellation Policy
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: Platform.OS === 'android' ? '90%' : '100%',
            marginLeft: Platform.OS === 'android' && '5%', marginBottom: 30
          }}>
          <PrimaryButton
            label="Checkout"
            disabled={!termsChecked || !cancelPolicyChecked || props.app.loadingBookRoom || (!props.app.loadingBookRoom && loading)}
            onPress={placeBooking}
            loading={props.app.loadingBookRoom || (!props.app.loadingBookRoom && loading)}
          />
        </View>
      </ScrollView>

      {showCardBox && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => cardBoxRef.current.snapTo(1)}
        />
      )}

      <BottomSheet
        ref={cardBoxRef}
        initialSnap={1}
        snapPoints={[deviceHeight * 0.65, 0]}
        // borderRadius={10}
        renderHeader={() => (
          <BottomSheetHeader
            title={`Total : ${String(
              Math.floor(
                Number(subTotal + hiTeaPrice) +
                Number(((subTotal + hiTeaPrice) * 16) / 100),
              ),
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} PKR`}
            refer={cardBoxRef}
            fontSize={20}
            bold="700"
          />
        )}
        renderContent={renderContent}
        onOpenStart={() => setShowCardBox(true)}
        onCloseEnd={() => setShowCardBox(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  app: state.appReducer,
});

const mapDispatchToProps = { bookRoom, getAddOns };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentDetailScreen);

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(20),
    paddingTop: RFValue(5),
  },

  checkBoxView: {
    width: '92%',
    marginTop: RFValue(8),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: RFValue(8),
    height: RFValue(44),
    borderColor: greyPrimary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  hi_teaView: {
    width: '92%',
    marginTop: RFValue(8),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(8),
    borderColor: greyPrimary,
    borderWidth: 1,
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  instantBookingView: {
    width: '92%',
    marginTop: RFValue(16),
    alignSelf: 'center',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
    borderColor: pink,
    borderWidth: 1,
    backgroundColor: pinkLight,
    borderRadius: RFValue(4),
  },
  IBSwitch: {
    position: 'absolute',
    right: RFValue(1),
    top: RFValue(20),
    width: RFValue(50),
    height: RFValue(25),
  },
  paymentOptionsView: {
    width: '92%',
    borderColor: greyPrimary,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  total: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(15),
  },
  infoText: {
    fontFamily: OSregular,
    fontSize: RFValue(13),
    paddingLeft: RFValue(16),
    marginVertical: RFValue(3),
  },
  checkBoxLabel: {
    fontFamily: OSregular,
    fontSize: RFValue(12),
    paddingLeft: RFValue(6),
    alignSelf: 'center',
  },

  priceArea: {
    backgroundColor: 'white',
    borderTopColor: greyPrimary,
    paddingBottom: RFValue(6),
  },

  heading: {
    fontSize: RFValue(22),
    fontFamily: OSregular,
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(16),
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: greyPrimary,
    backgroundColor: 'white',
  },

  terms: {
    /* textDecorationLine: 'underline', */
  },
  link: {
    textDecorationLine: 'underline',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    /* paddingRight: 12, */
    paddingLeft: RFValue(8),
    paddingRight: RFValue(50),
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(19),
  },

  firstHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: RFValue(16),
    paddingHorizontal: RFValue(8),
    marginBottom: RFValue(8),
  },

  secondHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFValue(12),
  },

  number: {
    marginHorizontal: RFValue(20),
    fontSize: RFValue(22),
  },

  numberOfGuest: { fontSize: RFValue(16), fontFamily: OSregular },

  divider: {
    marginVertical: RFValue(18),
    height: 1,
    backgroundColor: greyPrimary,
  },

  ageHeading: {
    fontFamily: OSregular,
    color: greySecondary,
    marginBottom: RFValue(8),
  },

  age: { marginRight: RFValue(6), fontFamily: OSregular },

  radio: {
    flexDirection: 'row',
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(6),
    alignItems: 'center',
  },

  branchName: {
    fontFamily: OSregular,
    fontSize: 18,
    color: 'grey',
  },

  priceDetailTitle: {
    fontFamily: OSregular,
    fontSize: 25,
    color: 'black',
  },

  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
  },
  lolyatyConatiner: {
    marginTop: RFValue(20),
    marginHorizontal: RFValue(15),
  },
  labelCardField: {
    fontSize: 17,
    marginBottom: 8,
    fontFamily: PFregular,
  },

  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    width: '78%',
    color: '#000',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRightWidth: 0,
    fontSize: RFValue(14),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
  },
  cardButton: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    fontSize: RFValue(14),
    paddingVertical: Platform.OS == 'android' ? RFValue(15) : RFValue(12.5),
    paddingHorizontal: RFValue(16),
    backgroundColor: 'black',
  },

  cardButtonText: {
    color: 'white',
  },
});
