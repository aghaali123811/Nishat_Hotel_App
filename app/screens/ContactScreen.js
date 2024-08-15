import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform, Image, TouchableOpacity, Linking
} from 'react-native';
import Header from '../components/Header';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import PrimaryInputField from '../components/PrimaryInputField';
import WhatsappFloating from '../components/WhatsappFloating';
import PrimaryButton from '../components/PrimaryButton';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Routes from '../navigations/Routes';
import axios from 'axios';
import API from '../utils/API'
import REQUESTS from '../utils/Request';
const { PFregular, OSregular } = AppTheme.fonts;
import { FloatingAction } from "react-native-floating-action";

const actions = [
  {
    text: "Johar Town Banquet Reservations",
    name: "923008540897",
    position: 1,
    buttonSize:0
   
  },
  {
    text: "Johar Town Room Reservations",
    position: 2,
    name:'923008541237',
    buttonSize:0
  },
  {
    text: "Gulberg Banquet Reservations",
    position: 3,
    name:'923321494937',
    buttonSize:0
  },
  {
    text: "Gulberg Room Reservations",
    position: 4,
    name:'923349477774',
    buttonSize:0
  }
];

const ContactScreen = ({ navigation }) => {
  // const refName = useRef();
  const refEmail = useRef();
  const refNumber = useRef();
  const refMessage = useRef();

  const handleSubmit = async (values, resetForm) => {
    console.log('Contact Form Values -> ', values);
    let hotel_id = 1;
    const formValues = { ...values, hotel_id };
    console.log('Contact Form Values1 -> ', formValues);
    // values.fullName = '',
    // values.email = '',
    // values.phoneNo = '',
    // values.message = ''
    // setTimeout(()=>{
    //   navigation.navigate(Routes.Home);
    // }, 500)
    try {
      const response = await REQUESTS.postRequest(API.contactUs(), formValues);
      console.log('responseresponseresponseresponse', response);
      resetForm({
        full_name: '',
        email: '',
        phone: '',
        message: '',
      });
      alert('Successfully Submitted ');
    } catch (error) {
      console.log('errorerrorerrorerrorerrorerror', error);
      alert('Something went wrong.');
    }
  };
  const openlink = async (link) => {
    await Linking.openURL(link);
  }

  return (
    <>
      <Header title="Contact Us" marginLeft={RFValue(97)} />
<WhatsappFloating/>
      <ScrollView style={{ marginTop: RFValue(15) }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => openlink('https://www.instagram.com/the_nishat/')}>
              <Image source={require('../assets/instagram.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openlink('https://www.facebook.com/thenishathotel/')}>
              <Image source={require('../assets/facebook.png')} style={{ marginLeft: 20, width: 40, height: 40 }} resizeMode={'contain'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openlink('https://www.youtube.com/channel/UCrFKIKFMzNVMCBpAcv60pVA')}>
              <Image source={require('../assets/youtube.png')} style={{ marginLeft: 20, width: 40, height: 40 }} resizeMode={'contain'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openlink('https://www.linkedin.com/company/nishat-hotels-&-properties-limited')}>
              <Image source={require('../assets/linkedin.png')} style={{ marginLeft: 20, width: 40, height: 40 }} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
          <Text
            style={{ color: 'gray', marginLeft: 16, fontSize: 13, marginTop: 8 }}>
            CALL US
          </Text>

          <Text style={styles.desc}>+92 42 111 646 835</Text>
          <Text
            style={{ color: 'gray', marginLeft: 16, fontSize: 13, marginTop: 8 }}>
            RESERVATIONS
          </Text>

          <Text style={styles.desc}>reservationsj@nishathotel.com</Text>
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 10,
              borderBottomColor: AppTheme.colors.greyPrimary,
              borderBottomWidth: 1,
            }}></View>
          <Text style={styles.Heading}>We’d love to hear from you!</Text>
          <Formik
            initialValues={{
              full_name: '',
              email: '',
              phone: '',
              message: '',
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
              // resetForm({
              //   full_name: '',
              //   email: '',
              //   phone: '',
              //   message: '',
              // });
            }}
            validationSchema={yup.object().shape({
              full_name: yup
                .string()
                .required('Full name is required')
                .matches(/[a-z]/, 'Please enters letters only'),
              email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),
              phone: yup
                .number()
                .required('Phone number is required')
                .typeError('Must be numbers')
                .min(999999999, 'Not enough digits')
                .max(9999999999, 'Maximum digit limit reached'),
              message: yup.string().required('Message is required'),
            })}>
            {({
              onReset,
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
              setFieldValue,
              isValid,
            }) => {
              return (
                <>
                  <PrimaryInputField
                    // ref={refName}
                    value={values.full_name}
                    onChangeText={handleChange('full_name')}
                    placeholder="Full Name *"
                    onBlur={() => setFieldTouched('full_name')}
                    touched={touched.full_name}
                    error={errors.full_name}
                    returnKeyType="next"
                    onSubmit={() => refEmail.current.focus()}
                  />
                  <PrimaryInputField
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    ref={refEmail}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email *"
                    onBlur={() => setFieldTouched('email')}
                    touched={touched.email}
                    error={errors.email}
                    returnKeyType="next"
                    onSubmit={() => refNumber.current.focus()}
                  />

                  <PrimaryInputField
                    keyboardType={'phone-pad'}
                    ref={refNumber}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    placeholder="Phone # *"
                    onBlur={() => setFieldTouched('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    returnKeyType="next"
                    onSubmit={() => refMessage.current.focus()}
                  />

                  <PrimaryInputField
                    ref={refMessage}
                    value={values.message}
                    onChangeText={handleChange('message')}
                    placeholder="How can we help you?"
                    onBlur={() => setFieldTouched('message')}
                    touched={touched.message}
                    error={errors.message}
                    multiline={true}
                  />
                  <PrimaryButton
                    label="Submit"
                    onPress={handleSubmit}
                    style={{ marginTop: RFValue(70) }}
                  />
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default ContactScreen;
const styles = StyleSheet.create({
  Heading: {
    fontSize: RFValue(24),
    marginVertical: RFValue(16),
    paddingHorizontal: RFValue(15),
  },

  desc: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    marginBottom: RFValue(10),
    paddingHorizontal: RFValue(15),
  },
});
