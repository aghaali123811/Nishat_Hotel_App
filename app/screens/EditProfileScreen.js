import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import WhatsappFloating from '../components/WhatsappFloating';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import SettingsItem from '../components/SettingsItem';
import EditProfileField from '../components/EditProfileField';
import PrimaryButton from '../components/PrimaryButton';
import { updateProfile } from '../store/actions/AppActions';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import PrimaryInputField from '../components/PrimaryInputField';
const { greyPrimary, greySecondary, dark } = AppTheme.colors;
const { OSregular, OSsemiBold } = AppTheme.fonts;

const editProfileScreen = (props) => {
  const { user } = props.route.params;
  const {
    user_id,
    first_name,
    last_name,
    user_email,
    telephone,
    address,
    city,
    state,
    country,
    zip,
    where_did_you_hear_about_us,
  } = user;
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [phone, setPhone] = useState(telephone);
  const [email] = useState(user_email);
  const [userCity, setCity] = useState(city);
  const [userState, setUserState] = useState(state);
  const [userCountry, setCountry] = useState(country);
  const [zipCode, setZip] = useState(zip);
  const [userAddress, setAddress] = useState(address);
  const [image, setImage] = useState(user?.image_upload);
  const formRef = useRef();
  const handleUpdateProfile = (payload) => {
       props.updateProfile({
        firstName:payload.firstName,
        lastName:payload.lastName,
        phone:payload.phone,
        userCity:payload.userCity,
        userState:payload.userState,
        userCountry:payload.userCountry,
        zipCode:payload.zipCode,
        userAddress:payload.userAddress,
        user_id,
        where_did_you_hear_about_us,
        image,
      });
    // console.log('submit', payload);
    // console.log('dsafsadf', formRef.current);
    // console.log('Image', image);
    // if (image == '') {
    //   alert('Please upload profile picture')
    // } else {
   
    // }

  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.1,
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response); // update the local state, this will rerender your TomarFoto component with the photo uri path.
      if (response?.didCancel) {
        setImage(user.image_upload);
      } else if (response?.assets?.length == 1) {
        setImage(response.assets[0].uri);
      } else if (response.error) {
        alert('Error ', error);
      }
    });
  };

  const showEditableProfileField = [
    { label: 'First Name', value: firstName, setValue: setFirstName, keyboardType: '' },
    { label: 'Last Name', value: lastName, setValue: setLastName, keyboardType: '' },
    { label: 'Email', value: email, isFocusable: false, keyboardType: '' },
    { label: 'Phone', value: phone, setValue: setPhone, keyboardType: 'number-pad' },
    { label: 'Address', value: userAddress, setValue: setAddress, keyboardType: '' },
    { label: 'City', value: userCity, setValue: setCity, keyboardType: '' },
    { label: 'State', value: userState, setValue: setUserState, keyboardType: '' },
    { label: 'Country', value: userCountry, setValue: setCountry, keyboardType: '' },
    { label: 'Zip', value: zipCode, setValue: setZip, keyboardType: 'number-pad' },
  ];

  return (
    <View>
      <WhatsappFloating/>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: RFValue(16),
          }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={image ? { uri: image } : require('../assets/users.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()}>
            <View
              style={{
                marginLeft: RFValue(16),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/icUpload.png')}
                style={{ width: RFValue(21), height: RFValue(21) }}
              />
              <Text
                style={{
                  fontFamily: OSregular,
                  fontSize: RFValue(13),
                  color: dark,
                  marginLeft: RFValue(8),
                }}>
                Upload
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: greyPrimary,
            marginHorizontal: RFValue(16),
          }}>
          <Formik
            innerRef={formRef}
            validateOnMount={true}
            initialValues={{
              firstName,
              lastName,
              email,
              phone,
              userCity,
              userState,
              userCountry,
              zipCode,
              userAddress,
            }}
            validationSchema={yup.object().shape({
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
              email: yup
                .string()
                .required('Email is required')
                .email('Invalid email'),

              phone: yup.string().required('Phone number is required'),
              userAddress: yup.string().required('Address is required'),
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
                  {/* {showEditableProfileField.map((item, index) => {
                    return (
                     <EditProfileField
                        label={item?.label}
                        value={item?.value}
                        setValue={item?.setValue}
                        isFocusable={item?.isFocusable}
                        keyboardType={item.keyboardType}
                      />
                    );
                  })
                  } */}
                  <EditProfileField
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder="First Name *"
                    onBlur={() => setFieldTouched('firstName')}
                    touched={touched.firstName}
                    error={errors.firstName}
                    label={'First Name'}
                  />
                  <EditProfileField
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    placeholder="Last Name *"
                    onBlur={() => setFieldTouched('lastName')}
                    touched={touched.lastName}
                    error={errors.lastName}
                    label={'Last Name'}
                  />
                  <EditProfileField
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    value={values.email.trim()}
                    onChangeText={handleChange('email')}
                    placeholder="Email *"
                    onBlur={() => setFieldTouched('email')}
                    touched={touched.email}
                    error={errors.email}
                    label={'Email'}
                  />
                  <EditProfileField
                    keyboardType="number-pad"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    placeholder="Phone *"
                    onBlur={() => setFieldTouched('phone')}
                    touched={touched.phone}
                    error={errors.phone}
                    maxLength={11}
                    label={'Phone'}
                  />
                  <EditProfileField
                    value={values.userAddress}
                    onChangeText={handleChange('userAddress')}
                    placeholder="Address *"
                    onBlur={() => setFieldTouched('userAddress')}
                    touched={touched.userAddress}
                    error={errors.userAddress}
                    label={'Address'}
                  />

                  <EditProfileField
                    value={values.userCity}
                    onChangeText={handleChange('userCity')}
                    placeholder="City"
                    onBlur={() => setFieldTouched('userCity')}
                    touched={touched.userCity}
                    error={errors.userCity}
                    label={'City'}
                  />
                  <EditProfileField
                    value={values.userState}
                    onChangeText={handleChange('userState')}
                    placeholder="State"
                    onBlur={() => setFieldTouched('userState')}
                    touched={touched.userState}
                    error={errors.userState}
                    label={'State'}
                  />
                  <EditProfileField
                    value={values.userCountry}
                    onChangeText={handleChange('userCountry')}
                    placeholder="Country"
                    onBlur={() => setFieldTouched('userCountry')}
                    touched={touched.userCountry}
                    error={errors.userCountry}
                    label={'Country'}
                  />
                  <EditProfileField
                    keyboardType="number-pad"
                    value={values.zipCode}
                    onChangeText={handleChange('zipCode')}
                    placeholder="Zip code"
                    onBlur={() => setFieldTouched('zipCode')}
                    touched={touched.zipCode}
                    error={errors.zipCode}
                    label={'Zip'}
                  />

                  <PrimaryButton
                    label="Update"
                    onPress={() => handleUpdateProfile(values)}
                    style={styles.button}
                    disabled={!isValid || props.app.loadingUpdateProfile}
                    loading={props.app.loadingUpdateProfile}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(editProfileScreen);

const styles = StyleSheet.create({
  settingsHeader: {
    marginLeft: RFValue(16),
    marginTop: RFValue(17),
    color: greySecondary,
    fontFamily: OSregular,
    fontSize: RFValue(13),
    marginBottom: RFValue(12),
  },

  image: {
    width: RFValue(96),
    height: RFValue(96),
    justifyContent: 'center',
    alignSelf: 'center',
  },

  phone: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: greySecondary,
  },

  name: {
    fontSize: RFValue(24),
    marginBottom: RFValue(3),
  },
  button: { marginTop: RFValue(20) },
  name: {
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: greySecondary,
  },

  subtitle: {
    color: dark,
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },
});
