import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import AppTheme from '../styles/AppTheme';
import {RFValue} from 'react-native-responsive-fontsize';
import PrimaryInputField from '../components/PrimaryInputField';
import PrimaryButton from '../components/PrimaryButton';
import SimpleButton from '../components/SimpleButton';
import {login} from '../store/actions/AppActions';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import Routes from '../navigations/Routes';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
const {PFregular, OSregular} = AppTheme.fonts;

const LoginScreen = ({navigation, ...props}) => {
  const handleSubmit = (values) => {
    props.login(values, () => {
      // navigation.navigate(Routes.Profile);
      navigation.reset({
        index: 0,
        routes: [{name: Routes.Profile}],
      });
    });
  };

  return (
    <>
      <Header title="Login" marginLeft={RFValue(100)} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{justifyContent: 'center', flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validateOnMount={true}
              onSubmit={(values) => handleSubmit(values)}
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
                      value={values.email}
                      autoCapitalize={'none'}
                      keyboardType={'email-address'}
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
                      secureTextEntry
                      error={errors.password}
                    />
                    <PrimaryButton
                      label="Login"
                      onPress={handleSubmit}
                      style={styles.button}
                      disabled={!isValid || props.app.loadingLogin}
                      loading={props.app.loadingLogin}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(Routes.ForgetPassword)
                      }>
                      <Text style={styles.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <SimpleButton
                      label="Create Account"
                      onPress={() => navigation.navigate(Routes.Signup)}
                      style={{marginTop: RFValue(25)}}
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

const mapDispatchToProps = {login};

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
});
