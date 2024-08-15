import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Header from '../components/Header';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';
import PrimaryInputField from '../components/PrimaryInputField';
import PrimaryButton from '../components/PrimaryButton';
import SimpleButton from '../components/SimpleButton';
import {forgotPassword} from '../store/actions/AppActions';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import Routes from '../navigations/Routes';

const {PFregular, OSregular} = AppTheme.fonts;

const LoginScreen = ({navigation, ...props}) => {
  const handleSubmit = (values) => {
    props.forgotPassword(values, () => {
      navigation.navigate(Routes.LoginScreen);
    });
  };

  return (
    <>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ justifyContent: 'center', flex: 1,paddingHorizontal:10 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Formik
          validateOnMount={true}
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => handleSubmit(values)}
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
                  value={values.email}
                  keyboardType={'email-address'}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  onBlur={() => setFieldTouched('email')}
                  touched={touched.email}
                  error={errors.email}
                />

                <PrimaryButton
                  disabled={!isValid || props.app.loadingForgotPassword}
                  label="Send Link"
                  onPress={() => handleSubmit()}
                  style={styles.button}
                  loading={props.app.loadingForgotPassword}
                />
              </>
            );
          }}
        </Formik>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {forgotPassword};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
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
    fontSize: RFValue(15.5),
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
});
