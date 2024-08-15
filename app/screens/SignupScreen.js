import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import PrimaryInputField from '../components/PrimaryInputField';
import PrimaryButton from '../components/PrimaryButton';
import SimpleButton from '../components/SimpleButton';
import { signup } from '../store/actions/AppActions';
import { connect } from 'react-redux';
import { Checkbox } from 'react-native-paper';
import { Themes } from '../store/utils/branchData';
import { Formik } from 'formik';
import * as yup from 'yup';
import Routes from '../navigations/Routes';

const { PFregular, OSregular } = AppTheme.fonts;

const SignupScreen = ({ navigation, ...props }) => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [cancelPolicyChecked, setCancelPolicyChecked] = useState(false);
  const handleSubmit = (values) => {
    // console.log('Values', values);
    props.signup(values, () => {
      alert('User Registered Successfully');
      navigation.navigate(Routes.LoginScreen);
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* <Text style={styles.Heading}>Create Account</Text> */}
        <ScrollView style={{ flexGrow: 1 }}>
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
                  (val) => val?.length > 1, //checking min length 2
                ),
              lastName: yup
                .string()
                .required('Last name is required')
                .test(
                  'len',
                  'Minimum two characters required',
                  (val) => val?.length > 1, //checking min length 2
                ),
              phone: yup.string().required('Phone number is required'),
              address: yup.string().required('Address is required'),
              //city: yup.string().required('City is required'),
              //state: yup.string().required('State is required'),
              // country: yup.string().required('Country is required'),
              //zipCode: yup.string().required('zip Code is required'),
              password: yup.string().required('Password is required'),
              confirmPassword: yup
                .string()
                .required('Confirm Password is required')
                .oneOf([yup.ref('password'), null], 'Password does not match'),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
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
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    value={values.email.trim()}
                    onChangeText={handleChange('email')}
                    placeholder="Email *"
                    onBlur={() => setFieldTouched('email')}
                    touched={touched.email}
                    error={errors.email}
                  />
                  <PrimaryInputField
                    keyboardType="number-pad"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    placeholder="Mobile*"
                    onBlur={() => setFieldTouched('phone')}
                    touched={touched.phone}
                    error={errors.phone}
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
                    placeholder="City"
                    onBlur={() => setFieldTouched('city')}
                    touched={touched.city}
                    error={errors.city}
                  />
                  <PrimaryInputField
                    value={values.state}
                    onChangeText={handleChange('state')}
                    placeholder="State"
                    onBlur={() => setFieldTouched('state')}
                    touched={touched.state}
                    error={errors.state}
                  />
                  <PrimaryInputField
                    value={values.country}
                    onChangeText={handleChange('country')}
                    placeholder="Country"
                    onBlur={() => setFieldTouched('country')}
                    touched={touched.country}
                    error={errors.country}
                  />
                  <PrimaryInputField
                    keyboardType="number-pad"
                    value={values.zipCode}
                    onChangeText={handleChange('zipCode')}
                    placeholder="Zipcode"
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

                  <View
                    style={{
                      ...styles.termsContainer,
                      marginTop: RFValue(20),
                    }}>
                    <Checkbox.Android
                      color={Themes[props.app.branch]}
                      style={{ width: 2, height: 2 }}
                      status={termsChecked ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setTermsChecked(termsChecked ? false : true)
                      }
                    />
                    <Text style={styles.terms}>
                      I have read and agree to the{' '}
                      <Text
                        style={styles.link}
                        onPress={() =>
                          Linking.openURL(
                            'https://nishathotels.com/terms-conditions',
                          )
                        }>
                        Terms & Conditions
                      </Text>{' '}
                      and{' '}
                      <Text
                        style={styles.link}
                        onPress={() =>
                          Linking.openURL(
                            'https://nishathotels.com/terms-conditions',
                          )
                        }>
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>

                  <View style={{ ...styles.termsContainer, marginTop: RFValue(8) }}>
                    <Checkbox.Android
                      color={Themes[props.app.branch]}
                      style={{ width: 2, height: 2 }}
                      status={cancelPolicyChecked ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setCancelPolicyChecked(
                          cancelPolicyChecked ? false : true,
                        )
                      }
                    />
                    <Text style={styles.terms}>
                      I agree to the{' '}
                      <Text
                        style={styles.link}
                        onPress={() =>
                          navigation.navigate(Routes.CancellationPolicy)
                        }>
                        Cancellation Policy
                      </Text>
                    </Text>
                  </View>

                  <PrimaryButton
                    label="Create Account"
                    onPress={() => handleSubmit(values)}
                    style={{ marginTop: RFValue(16) }}
                    disabled={!isValid || props.app.loadingSignup || !termsChecked || !cancelPolicyChecked}
                    loading={props.app.loadingSignup}
                  />
                  <View style={{ marginTop: 20 }} />
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
const styles = StyleSheet.create({
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
    marginTop: RFValue(25),
  },

  desc: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    marginBottom: RFValue(10),
    paddingHorizontal: RFValue(15),
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
});
