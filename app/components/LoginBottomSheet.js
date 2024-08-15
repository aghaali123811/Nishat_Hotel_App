import React, {useState, useEffect, useCallback, memo} from 'react';

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

import PrimaryInputField from '../components/PrimaryInputField';
import SimpleButton from '../components/SimpleButton';

import {Formik} from 'formik';
import * as yup from 'yup';

import {login} from '../store/actions/AppActions';
import {connect} from 'react-redux';

import {useFocusEffect} from '@react-navigation/native';

const {PFregular, OSregular} = AppTheme.fonts;
const {greyPrimary, greySecondary} = AppTheme.colors;

const LoginBottomSheet = ({refer, onSignupClick, onForgotClick, ...props}) => {

  useFocusEffect(
    useCallback(() => {
      console.log('Bottom sheets');

      return () => {};
    }, []),
  );
  useEffect(() => {
    if (props.app.loadedLogin) {
      refer.current.snapTo(1);
    }
  }, [props.app]);

  const handleLogin = (values, resetForm) => {
    const {email, password} = values;
    if (email == '') {
      alert('Email field is required');
    } else if (password == '') {
      alert('Password is required');
    } else {
      props.login(values, () => {
        resetForm();
        console.log('On Success');
      });
    }
  };
  
  return (
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, {resetForm}) => {
            handleLogin(values, resetForm);
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .required('Email is required')
              .email('Invalid email'),
            password: yup.string().required('Password is required'),
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
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  value={values.email.trim()}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  onBlur={() => setFieldTouched('email')}
                  touched={touched.email}
                  error={errors.email}
                />
                <PrimaryInputField
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  onBlur={() => setFieldTouched('password')}
                  touched={touched.password}
                  secureTextEntry={true}
                  error={errors.password}
                />
                {/* gabavouvodda-2670a@yopmail.com */}
                <PrimaryButton
                  label="Login"
                  disabled={!isValid || props.app.loadingLogin}
                  onPress={() => handleSubmit(values)}
                  style={styles.button}
                  loading={props.app.loadingLogin}
                />
                <TouchableOpacity onPress={onForgotClick}>
                  <Text style={styles.text}>Forgot Password?</Text>
                </TouchableOpacity>
                <SimpleButton
                  label="Create Account"
                  style={{marginTop: RFValue(16)}}
                  onPress={onSignupClick}
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

const mapDispatchToProps = {login};
const memoizeLoginBottomSheet = memo(LoginBottomSheet)

export default connect(mapStateToProps, mapDispatchToProps)(memoizeLoginBottomSheet);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    fontSize: RFValue(16),
    marginLeft: RFValue(18),
  },
  button: {
    marginTop: RFValue(16),
  },
});
