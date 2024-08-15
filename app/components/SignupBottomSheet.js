import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import PrimaryButton from './PrimaryButton';

import PrimaryInputField from './PrimaryInputField';
import SimpleButton from './SimpleButton';

import {Formik} from 'formik';
import * as yup from 'yup';

import {signup} from '../store/actions/AppActions';
import {connect} from 'react-redux';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;
let count;

const SignupBottomSheet = ({setGuestInfo, setTotalGuests, refer, ...props}) => {
  useEffect(() => {
    if (props.app.loadedSignup) {
      refer.current.snapTo(1);
    }
  }, [props.app]);

  return (
    <ScrollView style={styles.container}>
          <Formik
            validateOnMount={true}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              country: '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              source: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={async (values, {resetForm}) => {
              props.signup(values, () => {
                console.log('onSuccess');
                resetForm();
              });
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),
              firstName: yup
                .string()
                .required('First name is required')
                .test(
                  'len',
                  'Minimum two characters required',
                  (val) => val?.length > 1,
                ),
              lastName: yup
                .string()
                .required('Last name is required')
                .test(
                  'len',
                  'Minimum two characters required',
                  (val) => val?.length > 1,
                ),
              phone: yup.string().required('Phone number is required'),

              address: yup.string().required('Address is required'),
              city: yup.string().required('City is required'),
              state: yup.string().required('State is required'),
              country: yup.string().required('Country is required'),
              zipCode: yup.string().required('zip Code is required'),
              password: yup.string().required('Password is required'),
              confirmPassword: yup
                .string()
                .required('Confirm Password is required')
                .oneOf([yup.ref('password')], 'Password does not match'),
            })}>
            {({
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
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder="First Name *"
                    onBlur={() => setFieldTouched('firstName')}
                    touched={touched.firstName}
                    error={errors.firstName}
                  />
                  <PrimaryInputField
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    placeholder="Last Name *"
                    onBlur={() => setFieldTouched('lastName')}
                    touched={touched.lastName}
                    error={errors.lastName}
                  />
                  <PrimaryInputField
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email *"
                    onBlur={() => setFieldTouched('email')}
                    touched={touched.email}
                    error={errors.email}
                  />
                  <PrimaryInputField
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    placeholder="Phone# *"
                    onBlur={() => setFieldTouched('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    keyboardType="number-pad"
                    maxLength={11}
                  />
                  <PrimaryInputField
                    value={values.address}
                    onChangeText={handleChange('address')}
                    placeholder="Address *"
                    onBlur={() => setFieldTouched('address')}
                    touched={touched.address}
                    error={errors.address}
                  />

                  <PrimaryInputField
                    value={values.city}
                    onChangeText={handleChange('city')}
                    placeholder="City *"
                    onBlur={() => setFieldTouched('city')}
                    touched={touched.city}
                    error={errors.city}
                  />
                  <PrimaryInputField
                    value={values.state}
                    onChangeText={handleChange('state')}
                    placeholder="State *"
                    onBlur={() => setFieldTouched('state')}
                    touched={touched.state}
                    error={errors.state}
                  />
                  <PrimaryInputField
                    value={values.country}
                    onChangeText={handleChange('country')}
                    placeholder="Country *"
                    onBlur={() => setFieldTouched('country')}
                    touched={touched.country}
                    error={errors.country}
                  />
                  <PrimaryInputField
                    value={values.zipCode}
                    onChangeText={handleChange('zipCode')}
                    placeholder="Zipcode *"
                    onBlur={() => setFieldTouched('zipCode')}
                    touched={touched.zipCode}
                    error={errors.zipCode}
                  />
                  <PrimaryInputField
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    placeholder="Password *"
                    onBlur={() => setFieldTouched('password')}
                    touched={touched.password}
                    error={errors.password}
                  />
                  <PrimaryInputField
                    value={values.confirmPassword}
                    secureTextEntry={true}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder="Confirm Password *"
                    onBlur={() => setFieldTouched('confirmPassword')}
                    touched={touched.confirmPassword}
                    error={errors.confirmPassword}
                  />
                  <PrimaryInputField
                    value={values.source}
                    onChangeText={handleChange('source')}
                    placeholder="Where did you hear from us?"
                    onBlur={() => setFieldTouched('source')}
                    touched={touched.source}
                    error={errors.source}
                  />

                  <PrimaryButton
                    label="Create Account"
                    onPress={() => handleSubmit(values)}
                    style={{marginTop: RFValue(16)}}
                    disabled={!isValid || props.app.loadingSignup}
                    loading={props.app.loadingSignup}
                  />
                </>
              );
            }}
          </Formik>
      {/* add function in which setTotalGuests, setGuestsInfo and snapTo(1) is called. remove useEffect */}
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {signup};

export default connect(mapStateToProps, mapDispatchToProps)(SignupBottomSheet);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // height: '100%',
    // flexGrow: 1
  },
  Heading: {
    fontFamily: PFregular,
    fontSize: RFValue(25),
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(15),
    textAlign: 'center',
  },
  text: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    marginLeft: RFValue(18),
  },
  button: {
    marginTop: RFValue(16),
  },
});
