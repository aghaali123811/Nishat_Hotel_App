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

import {forgotPassword} from '../store/actions/AppActions';
import {connect} from 'react-redux';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary, profileBackground} = AppTheme.colors;
let count;

const ForgotPasswordBottomSheet = ({refer, ...props}) => {
  useEffect(() => {
    if (props.app.loadedSignup) {
      refer.current.snapTo(1);
    }
  }, [props.app]);

  return (
    <View style={styles.container}>
        <Formik
          validateOnMount={true}
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => {}}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .required('Email is required')
              .email('Invalid email'),
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
                <Text style={styles.text}>
                  Please enter your email to reset the password
                </Text>
                <PrimaryInputField
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  onBlur={() => setFieldTouched('email')}
                  touched={touched.email}
                  error={errors.email}
                />

                <PrimaryButton
                  disabled={!isValid || props.app.loadingForgotPassword}
                  label="Send Link"
                  onPress={() => props.forgotPassword(values)}
                  style={styles.button}
                  loading={props.app.loadingForgotPassword}
                />
              </>
            );
          }}
        </Formik>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {forgotPassword};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordBottomSheet);

const styles = StyleSheet.create({
  container: {
    backgroundColor: profileBackground,
    height: '100%',
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
    fontSize: RFValue(15.5),
    marginHorizontal: RFValue(18),
    marginVertical: RFValue(5),
  },
  button: {
    marginTop: RFValue(16),
  },
});
