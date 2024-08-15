import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import AppTheme from '../styles/AppTheme';
import { RFValue } from 'react-native-responsive-fontsize';
import PrimaryInputField from '../components/PrimaryInputField';
import PrimaryButton from '../components/PrimaryButton';
import SimpleButton from '../components/SimpleButton';
import WhatsappFloating from '../components/WhatsappFloating';
import { changePassword } from '../store/actions/AppActions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Routes from '../navigations/Routes';
import { FloatingAction } from "react-native-floating-action";
import DraggableView from 'react-native-draggable-reanimated';

const actions = [
  {
    text: "Johar Town Banquet Reservations",
    name: "923008540897",
    position: 1,
    buttonSize: 0

  },
  {
    text: "Johar Town Room Reservations",
    position: 2,
    name: '923008541237',
    buttonSize: 0
  },
  {
    text: "Gulberg Banquet Reservations",
    position: 3,
    name: '923321494937',
    buttonSize: 0
  },
  {
    text: "Gulberg Room Reservations",
    position: 4,
    name: '923349477774',
    buttonSize: 0
  }
];
const { PFregular, OSregular } = AppTheme.fonts;

const passwordInstructions =
  'In order to protect your account make sure your password must contain one upper case letter, one number and at least 8 characters';

const ChangePasswordScreen = (props) => {
  const handleChangePassword = (values) => {
    const { user } = props.route.params;
    if (values.newPassword != values.confirmPassword) {
      alert('New password not matched with confirm password');
    } else {
      props.changePassword(
        {
          ...values,
          email: user.user_email,
          userId: user.user_id,
        },
        () => {
          console.log('SUCCEss');
          props.navigation.goBack();
        },
      );
    }
  };

  return (
    <>
      <WhatsappFloating />
      <ScrollView style={{ marginTop: RFValue(25), }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}>
          <Formik
            validateOnMount={true}
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={yup.object().shape({
              currentPassword: yup
                .string()
                .required('Current Password is required'),
              newPassword: yup.string().required('New Password is required').matches(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Number"
              ),
              confirmPassword: yup
                .string()
                .required('Confirm Password')
                .oneOf(
                  [yup.ref('newPassword'), null],
                  'Password does not match',
                ),
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
                    value={values.currentPassword}
                    onChangeText={handleChange('currentPassword')}
                    placeholder="Current Password"
                    onBlur={() => setFieldTouched('currentPassword')}
                    secureTextEntry={true}
                    touched={touched.currentPassword}
                    error={errors.currentPassword}
                  />
                  <Text style={styles.text}>{passwordInstructions}</Text>


                  <PrimaryInputField
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    placeholder="New Password"
                    onBlur={() => setFieldTouched('newPassword')}
                    touched={touched.newPassword}
                    secureTextEntry={true}
                    error={errors.newPassword}
                  />
                  <PrimaryInputField
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder="Confirm New Password"
                    onBlur={() => setFieldTouched('confirmPassword')}
                    touched={touched.confirmPassword}
                    secureTextEntry={true}
                    error={errors.confirmPassword}
                  />
                  <PrimaryButton
                    label="Update"
                    disabled={!isValid || props.app.loadingChangePassword}
                    initiallyDisabled={true}
                    onPress={() => {
                      handleChangePassword(values);
                    }}
                    style={styles.button}
                    loading={props.app.loadingChangePassword}
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

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { changePassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);

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
    marginTop: RFValue(16),
    color: AppTheme.colors.dark,
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
