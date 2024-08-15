import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import * as yup from 'yup';
import BookedRoomDetail from '../components/BookedRoomDetail';
import PaymentDetailsBox2 from '../components/PaymentDetailsBox2';
import PrimaryButton from '../components/PrimaryButton';
import PrimaryInputField from '../components/PrimaryInputField';
import WhatsappFloating from '../components/WhatsappFloating';
import SimpleButton from '../components/SimpleButton';
import Routes from '../navigations/Routes';
import { bookRoom } from '../store/actions/AppActions';
import AppTheme from '../styles/AppTheme';
import {  convertPkrToDollar } from '../utils/helper'

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import CustomeModel from '../components/CustomeModel';
import ForgotPasswordBottomSheet from '../components/ForgotPasswordBottomSheet';
import LoginBottomSheet from '../components/LoginBottomSheet';
import SignupBottomSheet from '../components/SignupBottomSheet';
import { useKeyboard } from '@react-native-community/hooks';
const { deviceHeight, deviceWidth } = AppTheme.metrics;
/* for title
Mr -> 010040010001
Mrs -> 010040010002
Miss -> 010040020011 */

const { OSsemiBold, PFregular } = AppTheme.fonts;
const { greyPrimary } = AppTheme.colors;


const GuestDetailScreen = ({ route, navigation, ...props }) => {
  const keyboard = useKeyboard();
  const formRef = useRef();
  const refFName = useRef();
  const refLName = useRef();
  const refEmail = useRef();
  const refPhone = useRef();
  const refAddress = useRef();
  const refCity = useRef();
  const refState = useRef();
  const refCountry = useRef();
  const refZipCode = useRef();
  const loginRef = useRef(null);
  // const signupRef = useRef(null);
  // const forgotPasswordRef = useRef(null);
  const [editableField, setEditableField] = useState(true);

  const { startDate, endDate } = route.params.dates;
  const {
    guests,
    pricePerNights,
    price,
    priceWithCreditCardDiscount,
    rooms,
    packageAddons,
    isPackage,
    room_id,
    roomId,
    isCreditCardDiscount,
    creditCardDiscountPercentage
  } = route.params;
  const days = moment(endDate).diff(startDate, 'days');
  const [time, setTime] = useState(new Date());
  const [newTime, setNewTime] = useState('');
  const [open, setOpen] = useState(false);
  const [roomsCount, setRoomsCount] = useState(rooms);
  const [isDialogShown, setShowDialog] = useState(false);
  const [user, setUser] = useState({});
  const [user_id, setUserId] = useState(undefined);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userFirstName, setFirstName] = useState('');
  const [userLastName, setLastName] = useState('');
  const [userPhone, setPhone] = useState('');
  const [userAddress, setAddress] = useState('');
  const [userCountry, setCountry] = useState('');
  const [userCity, setCity] = useState('');
  const [userState, setState] = useState('');
  const [userZip, setZip] = useState('');
  const [convinient, setConvinient] = '';
  const [userEmail, setEmail] = useState('');
  const [loyatyCard, setLoyatyCard] = useState('');
  const [coupon, setCoupon] = useState('');
  const [messageText, setMessageText] = useState('');
  const [showMessageText, setShowMessageText] = useState(false);
  const [showAndicator, setShowAndicatore] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [card_status, setCardStatus] = useState('INVALID');
  const [cardData, setCardData] = useState({});
  const [cardIsValid, setCardIsValid] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [goHeight, setGoHeight] = useState(0.5)
  const [isDiscount,setIsDiscount] = useState(false)
  const [discountData,setDiscountData] = useState({})
  let priceNight = 0;


  // const getSubTotal = () => {
  //   if (typeof pricePerNights == 'string') {
  //     const priceArr = route.params.pricePerNights?.split(',');
  //     priceNight = priceArr[0];
  //     let sum = 0;
  //     for (let i = 0; i < priceArr?.length; i++) {
  //       sum += parseInt(priceArr[i]);
  //     }
  //     return sum * rooms;
  //   } else {
  //     priceNight = pricePerNights;
  //     let totalPrice = pricePerNights * days;
  //     return totalPrice * rooms;
  //   }
  // };

  useEffect(() => {
    (async () => {
      let data = (await AsyncStorage.getItem('user')) || {};
      if (Object.keys(data).length > 0) {
        setLoggedIn(true);
        data = JSON.parse(data);
        setFirstName(data.first_name ? data.first_name : '');
        setLastName(data.last_name ? data.last_name : '');
        setPhone(data.telephone);
        setAddress(data.address ? data.address : '');
        setCountry(data.country);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
        setEmail(data.user_email);
        setUserId(data.user_id);

        formRef.current.setFieldValue('firstName', data.first_name)
        formRef.current.setFieldValue('lastName', data.last_name)
        formRef.current.setFieldValue('email', data.user_email)
        formRef.current.setFieldValue('phone', data.telephone)
        formRef.current.setFieldValue('city', data.city)
        formRef.current.setFieldValue('state', data.state)
        formRef.current.setFieldValue('zip', data.zip)
        formRef.current.setFieldValue('address', data.address)
        formRef.current.setFieldValue('country', data.country)


      } else {
        formRef.current.handleSubmit()
      }
    })();

    return () => {
      setLoggedIn();
      setUser();
      setFirstName();
      setLastName();
      setPhone();
      setAddress();
      setCountry();
      setCity();
      setState();
      setZip();
      setEmail();
      setEditableField();
    }
  }, []);

  useEffect(() => {
    if (props.app.isLoggedIn) {
      setLoggedIn(true);
      setUser(props.app.user);
      let updatedUser = props.app.user;
      setFirstName(updatedUser.first_name);
      setLastName(updatedUser.last_name);
      setPhone(updatedUser.telephone);
      setAddress(updatedUser.address);
      setCountry(updatedUser.country);
      setCity(updatedUser.city);
      setState(updatedUser.state);
      setZip(updatedUser.zip);
      setEmail(updatedUser.user_email);
      setEditableField(true);


      formRef.current.setFieldValue('firstName', updatedUser.first_name)
      formRef.current.setFieldValue('lastName', updatedUser.last_name)
      formRef.current.setFieldValue('email', updatedUser.user_email)
      formRef.current.setFieldValue('phone', updatedUser.telephone)
      formRef.current.setFieldValue('city', updatedUser.city)
      formRef.current.setFieldValue('state', updatedUser.state)
      formRef.current.setFieldValue('zip', updatedUser.zip)
      formRef.current.setFieldValue('address', updatedUser.address)
      formRef.current.setFieldValue('country', updatedUser.country)
    }
    return () => {
      setLoggedIn();
      setUser();
      setFirstName();
      setLastName();
      setPhone();
      setAddress();
      setCountry();
      setCity();
      setState();
      setZip();
      setEmail();
      setEditableField();
    }
  }, [props.app.user]);

  const onPressApplyCard = async () => {
    if (loyatyCard.length == 0) {
      setMessageText('Please fill the field');
      setShowMessageText(true);
    } else {
      setShowMessageText(false);
      try {
        setShowAndicatore(true);
        const response = await axios.get(
          `https://nishathotels.com/wp-json/api/check_loyalty/${loyatyCard}`,
        );
        setShowAndicatore(false);
        console.log('responseresponseresponse',response.data)
        const { data } = response;
        
        if (data.v_membership_type == 'Platinum Membership') {
          setDiscount(20);
          setIsValid(true);
        }
        if (data.v_membership_type == 'Golden Membership') {
          setDiscount(15);
          setIsValid(true);
        }
        if (data.v_conf == 'VALID') {
          setCardData(data);
          setCardIsValid(true);
          setCardStatus('VALID');
          setEditableField(false);
          setShowMessageText(false);
          setFirstName(data.v_guest_fname);
          setLastName(data.v_guest_lname);
          setPhone(data.v_guest_contact);
          setAddress(data.v_guest_addess);
          setCountry(data.v_guest_countary);
          setEmail(data.v_guest_email);


          formRef.current.setFieldValue('firstName', data.v_guest_fname)
          formRef.current.setFieldValue('lastName', data.v_guest_lname)
          formRef.current.setFieldValue('phone', data.v_guest_contact)
          formRef.current.setFieldValue('address', data.v_guest_addess)
          formRef.current.setFieldValue('country', data.v_guest_countary)
        }
        if (data.v_conf == 'INVALID') {
          setMessageText('Sorry! loyality card number is invalid');
          setCardStatus('INVALID');
          setShowMessageText(true);
          setEditableField(true);
        }
      } catch (error) {
        setShowAndicatore(false);
      }
    }
  };

  const onPressDiscountCard = async () => {
    console.log('discount',coupon)
    const response = await axios.get(
      // `https://nishat.dev.crewlogix.com/wp-json/get-discount?discount_code=${discount}`,
      `https://nishathotels.jt.crewlogix.com/api/v3/get-discount?discount_code=${coupon}`
    ); 
    let amountInDollar = await convertPkrToDollar(response.data?.DISC_RATE_AMT) 
    setDiscountData({
      ...response.data,
      DISC_RATE_AMT:amountInDollar
    })
    console.log('discount response >>>>>>>', response.data);
  }

  // const sub = typeof pricePerNights === 'number' ? pricePerNights * days * rooms : getSubTotal();
  // const tax = sub * 0.16;

  // const actualSubtotal = (price) => {
  //   if (typeof price == 'string') {
  //     const priceArr = price?.split(',');
  //     let sum = 0;
  //     sum = parseInt(priceArr[0]) * days;
  //     let discountPrice = sum * rooms;
  //     if (discount > 0) {
  //       discountPrice = discountPrice - (discountPrice * discount) / 100;
  //     }
  //     return discountPrice;
  //   } else {
  //     let totalPrice = price * rooms;
  //     if (discount > 0) {
  //       totalPrice = totalPrice - (totalPrice * discount) / 100;
  //     }
  //     return totalPrice;
  //   }
  // };

  const getSubTotalYasir = () => {
    let subTotalToReturn = 0;
    if (cardIsValid) {
      let total_amount = giveAmountSumWithDaysAndRooms(price);
      if (discount > 0)
        subTotalToReturn = total_amount - (total_amount * discount) / 100;
      else
        subTotalToReturn = total_amount
    } else {
      subTotalToReturn = giveAmountSumWithDaysAndRooms(pricePerNights);
    }

    return parseInt(subTotalToReturn);
  }
  const getSubTotalWithCreditCard = () => {
    if (isCreditCardDiscount && !cardIsValid) {
      let total_amount = giveAmountSumWithDaysAndRooms(pricePerNights);
      return parseInt(total_amount - (total_amount * creditCardDiscountPercentage) / 100);
    } else {
      return 0
    }
  }
  const giveAmountSumWithDaysAndRooms = (amount) => {
    if (typeof amount == 'string') {
      const amountArr = amount?.split(',');
      let sum = 0;
      for (let i = 0; i < amountArr?.length; i++) {
        sum += parseFloat(amountArr[i]);
      }
      return sum * rooms;
    } else {
      return amount * days * rooms;
    }
  }
  const handleSubmit = (values) => {
    if (formRef.current) {
      const { email, title } = formRef.current.values;

      formRef.current.validateForm();
      if (Object.keys(formRef.current?.errors).length > 0) {
        //alert('All Fields are required');
      } else {
        let addOns = packageAddons.map((element) => ({
          ...element,
          isChecked: false,
        }));
        console.log('....mmm...', formRef.current?.errors)
        console.log('data.....', {
          ...route.params,
          user_id: user_id,
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          phone: userPhone,
          address: userAddress,
          city: userCity,
          zip: userZip,
          state: userState,
          isPackage,
          room_id,
          roomId,
          title,
          guests,
          startDate,
          endDate,
          country: userCountry,
          priceNight: priceNight,
          loyalty_card_status: card_status,
          loyalty_discount: cardIsValid ? discount : 0,
          loyalty_card_number: cardIsValid ? cardData.v_membership_code : '',
          loyalty_guest_name: cardIsValid
            ? `${cardData.v_guest_fname} ${cardData.v_guest_lname}`
            : '',
          loyalty_card_type: cardIsValid ? cardData.v_membership_type : '',
          loyalty_card_code: cardIsValid ? cardData.v_membership_code : '',
          subTotal: getSubTotalYasir(),//isValid ? actualSubtotal(price) : sub,
          subTotalWithCreditCard: getSubTotalWithCreditCard(),//isValid ? actualSubtotal(price) : sub,
          days,
          cardIsValid,
          creditCardDiscountPercentage,
          isCreditCardDiscount,
          packageAddons: addOns,
          user_agent: Platform.OS === 'iOS' ? 'iOS' : 'Android',
        })
        navigation.navigate(Routes.PaymentDetails, {
          data: {
            ...route.params,
            user_id: user_id,
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            phone: userPhone,
            address: userAddress,
            city: userCity,
            zip: userZip,
            state: userState,
            isPackage,
            room_id,
            roomId,
            title,
            guests,
            startDate,
            endDate,
            country: userCountry,
            priceNight: priceNight,
            loyalty_card_status: card_status,
            loyalty_discount: cardIsValid ? discount : 0,
            loyalty_card_number: cardIsValid ? cardData.v_membership_code : '',
            loyalty_guest_name: cardIsValid
              ? `${cardData.v_guest_fname} ${cardData.v_guest_lname}`
              : '',
            loyalty_card_type: cardIsValid ? cardData.v_membership_type : '',
            loyalty_card_code: cardIsValid ? cardData.v_membership_code : '',
            subTotal: getSubTotalYasir(),//isValid ? actualSubtotal(price) : sub,
            subTotalWithCreditCard: getSubTotalWithCreditCard(),//isValid ? actualSubtotal(price) : sub,
            days,
            cardIsValid,
            creditCardDiscountPercentage,
            isCreditCardDiscount,
            packageAddons: addOns,
            user_agent: Platform.OS === 'iOS' ? 'iOS' : 'Android',
            coupon: coupon,
            discountData
          },
        });

      }
    }


  };

  return (
    <View style={{flex:1,width:'100%',height:'100%'}}>
    <WhatsappFloating/>
      <KeyboardAwareScrollView style={{ marginBottom: RFValue(64) }}>
      
        <View
          pointerEvents={isDialogShown ? 'none' : 'auto'}
          backgroundColor={isDialogShown ? 'lightgrey' : 'white'}>
          <BookedRoomDetail data={route.params} />
          {/* <PaymentDetailsBox2
            rooms={rooms}
            roomsCount={roomsCount}
            days={days}
            discount={discount}
            tax={tax.toString()}
            subTotal={sub.toString()}
            isDialogShown={isDialogShown}
          /> */}
          {!isLoggedIn && (
            <SimpleButton
              label="Login To Book Fast"
              onPress={() => {
                // signupRef.current.snapTo(1);
                // forgotPasswordRef.current.snapTo(1);
                loginRef.current.snapTo(0);
              }}
              style={{ marginTop: RFValue(16) }}
            />
          )}
          {!isPackage && (
            <View style={styles.lolyatyConatiner}>
              <Text style={styles.labelCardField}>Loyalty Card Holder?</Text>
              <View style={styles.fieldContainer}>
                <TextInput
                  style={styles.inputField}
                  onChangeText={(value) => setLoyatyCard(value)}
                  value={loyatyCard}
                  placeholder="Enter loyalty card"
                />
                <TouchableOpacity
                  onPress={onPressApplyCard}
                  style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>APPLY</Text>
                </TouchableOpacity>
              </View>
              {showMessageText && (
                <Text
                  style={[
                    styles.labelCardField,
                    { color: 'red', fontSize: 12, marginLeft: 1 },
                  ]}>
                  {messageText}
                </Text>
              )}
              {showAndicator && <CustomeModel modalVisible={showAndicator} />}
            </View>
          )}

{isLoggedIn &&
<View style={styles.lolyatyConatiner}>
              <Text style={styles.labelCardField}>Discount?</Text>
              <View style={styles.fieldContainer}>
                <TextInput
                  style={styles.inputField}
                  onChangeText={(value) => setCoupon(value)}
                  value={coupon}
                  placeholder="Enter coupon code"
                />

                <TouchableOpacity
                  onPress={onPressDiscountCard}
                  style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>APPLY</Text>
                </TouchableOpacity>
              </View>
              {discountData?.V_MESSAGE === 'SUCCESS' ?
              <Text style={{color:'green'}}>Discount Applied Successfully</Text>
              : discountData?.V_MESSAGE === 'INVALID' ?
              <Text style={{color:'red'}}>Invalid Code</Text> : null}
              {showMessageText && (
                <Text
                  style={[
                    styles.labelCardField,
                    { color: 'red', fontSize: 12, marginLeft: 1 },
                  ]}>
                  {messageText}
                </Text>
              )}
              {showAndicator && <CustomeModel modalVisible={showAndicator} />}
            </View>
}

          <Text style={styles.heading}>Guest Information</Text>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              city: '',
              state: '',
              zip: '',
              address: '',
              country: '',
              convinientTime: '',
              title: '010040010001'
            }}
            innerRef={formRef}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={yup.object().shape({
              title: yup.string().required('Gender title is required'),
              firstName: yup
                .string()
                .required('First name is required').min(2).max(20)
                .test(
                  'len',
                  'Minimum two characters required',
                  (val) => val?.length > 1,
                ),
              lastName: yup
                .string()
                .required('Last name is required').min(2).max(20)
                .test(
                  'len',
                  'Minimum two characters required',
                  (val) => val?.length > 1,
                ),
              email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),
              phone: yup.string().required('Phone number is required'),
              address: yup.string().required('Address is required'),
              city: yup.string().required('City is required'),
              zip: yup.string().required('Zip code is required'),
              country: yup.string().required('Country is required'),
              state: yup.string().required('State is required'),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldValue,
              setFieldTouched,
              touched,
            }) => {
              return (
                <>
                  <View style={styles.radioParent}>
                    <View style={styles.radio}>
                      <Text>Mr.</Text>

                      <RadioButton.Android
                        color="rgb(20, 103, 219)"
                        value="010040010001"
                        status={
                          values.title === '010040010001'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => setFieldValue('title', '010040010001')}
                      />

                      <Text style={{ marginLeft: RFValue(8) }}>Ms.</Text>
                      <RadioButton.Android
                        color="rgb(20, 103, 219)"
                        value="010040020011"
                        status={
                          values.title === '010040020011'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => setFieldValue('title', '010040020011')}
                      />

                      <Text style={{ marginLeft: RFValue(8) }}>Mrs.</Text>
                      <RadioButton.Android
                        color="rgb(20, 103, 219)"
                        value="010040010002"
                        status={
                          values.title === '010040010002'
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => setFieldValue('title', '010040010002')}
                      />
                    </View>
                    {formRef?.current?.values?.title == '' && <Text style={{ color: 'red' }}>Please select gender</Text>}
                  </View>

                  <PrimaryInputField
                    ref={refFName}
                    editable={editableField}
                    value={userFirstName}
                    onChange={(event) => setFirstName(event.nativeEvent.text)}
                    onChangeText={handleChange('firstName')}
                    placeholder="First name *"
                    onBlur={() => setFieldTouched('firstName')}
                    touched={touched.firstName}
                    error={errors.firstName}
                    returnKeyType="next"
                    onSubmit={() => refLName.current.focus()}
                  />
                  <PrimaryInputField
                    ref={refLName}
                    value={userLastName}
                    editable={editableField}
                    onChange={(event) => setLastName(event.nativeEvent.text)}
                    onChangeText={handleChange('lastName')}
                    placeholder="Last name *"
                    onBlur={() => setFieldTouched('lastName')}
                    touched={touched.lastName}
                    error={errors.lastName}
                    returnKeyType="next"
                    onSubmit={() => refEmail.current.focus()}
                  />
                  <PrimaryInputField
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    ref={refEmail}
                    value={userEmail?.trim()}
                    editable={true}
                    onChange={(event) => setEmail(event.nativeEvent.text)}
                    onChangeText={handleChange('email')}
                    placeholder="Email Address *"
                    onBlur={() => setFieldTouched('email')}
                    touched={touched.email}
                    error={errors.email}
                    returnKeyType="next"
                    onSubmit={() => refPhone.current.focus()}
                  />
                  <PrimaryInputField
                    ref={refPhone}
                    value={userPhone}
                    editable={true}
                    onChange={(event) => setPhone(event.nativeEvent.text)}
                    onChangeText={handleChange('phone')}
                    placeholder="Phone Number *"
                    onBlur={() => setFieldTouched('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    maxLength={11}
                    keyboardType="number-pad"
                    returnKeyType="next"
                    onSubmit={() => refAddress.current.focus()}
                  />
                  <PrimaryInputField
                    ref={refAddress}
                    value={userAddress}
                    editable={editableField}
                    onChange={(event) => setAddress(event.nativeEvent.text)}
                    onChangeText={handleChange('address')}
                    placeholder="Address"
                    onBlur={() => setFieldTouched('address')}
                    touched={touched.address}
                    error={errors.address}
                    returnKeyType="next"
                    onSubmit={() => refCity.current.focus()}
                  />

                  <PrimaryInputField
                    ref={refCity}
                    value={userCity}
                    editable={true}
                    onChange={(event) => setCity(event.nativeEvent.text)}
                    onChangeText={handleChange('city')}
                    placeholder="City"
                    onBlur={() => setFieldTouched('city')}
                    touched={touched.city}
                    error={errors.city}
                    returnKeyType="next"
                    onSubmit={() => refState.current.focus()}
                  />
                  <PrimaryInputField
                    ref={refState}
                    value={userState}
                    editable={true}
                    onChange={(event) => setState(event.nativeEvent.text)}
                    onChangeText={handleChange('state')}
                    placeholder="State"
                    onBlur={() => setFieldTouched('state')}
                    touched={touched.state}
                    error={errors.state}
                    returnKeyType="next"
                    onSubmit={() => refCountry.current.focus()}
                  />
                  <PrimaryInputField
                    ref={refCountry}
                    value={userCountry}
                    editable={true}
                    onChange={(event) => setCountry(event.nativeEvent.text)}
                    onChangeText={handleChange('country')}
                    placeholder="Country"
                    onBlur={() => setFieldTouched('country')}
                    touched={touched.country}
                    error={errors.country}
                    returnKeyType="next"
                    onSubmit={() => refZipCode.current.focus()}
                  />
                  {/* <CountryPicker
                    navigation={navigation}
                    setFieldValue={setFieldValue}
                    value={values.country}
                  /> */}

                  <PrimaryInputField
                    ref={refZipCode}
                    value={userZip}
                    editable={true}
                    onChange={(event) => setZip(event.nativeEvent.text)}
                    onChangeText={handleChange('zip')}
                    placeholder="Zip"
                    onBlur={() => setFieldTouched('zip')}
                    touched={touched.zip}
                    error={errors.zip}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <PrimaryInputField
                      editable={false}
                      value={newTime}
                      placeholder="Convenient Time"
                      onBlur={() => { }}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  {
                    (Platform.OS == 'ios') ? <DateTimePicker
                      mode="time"
                      isVisible={open}
                      date={time}
                      onConfirm={(time) => {
                        setOpen(false);
                        setNewTime(moment(time).format('LT').toString());
                        setTime(time);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    /> : <DatePicker
                      modal
                      mode="time"
                      open={open}
                      date={time}
                      onConfirm={(time) => {
                        setOpen(false);
                        setNewTime(moment(time).format('LT').toString());
                        setTime(time);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  }

                  {/* 
                <InputWithButton
                  value={values.coupon}
                  onChangeText={handleChange('coupon')}
                  placeholder="Coupon"
                  onBlur={() => setFieldTouched('coupon')}
                  touched={touched.coupon}
                  error={errors.coupon}
                /> */}
                </>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

      <View
        style={[
          styles.bottomContainer,
          {
            bottom:
              Platform.OS === 'android'
                ? 0
                : keyboard.keyboardShown
                  ? keyboard.keyboardHeight
                  : 0,
          },
        ]}>
        {/* <KeyboardAvoidingView */}
        {/* behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        <PrimaryButton
          label="Continue"
          disabled={false}
          onPress={handleSubmit}
        />
        {/* </KeyboardAvoidingView> */}
      </View>

      {isDialogShown && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => loginRef.current.snapTo(1)}
        />
      )}



      <BottomSheet
        enabledInnerScrolling={true}
        ref={loginRef}
        initialSnap={1}
        snapPoints={[AppTheme.metrics.deviceHeight * 0.5, 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Login" refer={loginRef} theme={props?.app?.branch} />
        )}
        renderContent={() => (
          <LoginBottomSheet
            refer={loginRef}
            onSignupClick={() => {
              loginRef.current.snapTo(1);
              navigation.navigate(Routes.Signup)
              // forgotPasswordRef.current.snapTo(1);
              // setTimeout(()=>{
              //   signupRef.current.snapTo(0);
              // },800)
            }}
            onForgotClick={() => {
              loginRef.current.snapTo(1);
              navigation.navigate(Routes.ForgetPassword)
              // signupRef.current.snapTo(1);
              // setTimeout(()=>{
              //   forgotPasswordRef?.current?.snapTo(0);
              // },800)
            }}
          />
        )}
        onOpenStart={() => setShowDialog(true)}
        onCloseEnd={() => setShowDialog(false)}
      />
      {/* <BottomSheet
        enabledInnerScrolling={true}
        ref={signupRef}
        initialSnap={1}
        snapPoints={[AppTheme.metrics.deviceHeight * 0.9, 1]}
        renderHeader={() => (
          <BottomSheetHeader title="Create Account" refer={signupRef} />
        )}
        renderContent={() => <SignupBottomSheet refer={signupRef} />}
        onOpenStart={() => setShowDialog(true)}
        onCloseEnd={() => setShowDialog(false)}
      /> */}

      {/* <BottomSheet
        enabledInnerScrolling={true}
        ref={forgotPasswordRef}
        initialSnap={1}
        snapPoints={[AppTheme.metrics.deviceHeight * 0.3, 1]}
        renderHeader={() => (
          <BottomSheetHeader title="Reset Password" refer={forgotPasswordRef} />
        )}
        renderContent={() => (
          <ForgotPasswordBottomSheet refer={forgotPasswordRef} />
        )}
        onOpenStart={() => setShowDialog(true)}
        onCloseEnd={() => setShowDialog(false)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(20),
    paddingTop: RFValue(5),
  },

  total: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(15),
  },

  priceArea: {
    backgroundColor: 'white',
    shadowColor: '#000',

    borderTopColor: greyPrimary,
    paddingBottom: RFValue(6),
  },

  heading: {
    fontSize: RFValue(24),
    fontFamily: PFregular,
    marginVertical: RFValue(10),
    marginLeft: RFValue(17),
  },

  bottomContainer: {
    position: 'absolute',
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    marginLeft: '5%',
    // borderTopWidth: 1,
    borderTopColor: greyPrimary,
  },

  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioParent: {
    marginLeft: RFValue(19),
  },
  lolyatyConatiner: {
    marginTop: RFValue(10),
    marginHorizontal: RFValue(20),
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
    width: '77%',
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

const mapDispatchToProps = { bookRoom };

export default connect(mapStateToProps, mapDispatchToProps)(GuestDetailScreen);
