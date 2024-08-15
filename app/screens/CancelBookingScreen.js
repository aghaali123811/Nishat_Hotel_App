import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity, Dimensions
} from 'react-native';
import Header from '../components/Header';
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
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import SimpleButton from '../components/SimpleButton';
import axios from 'axios';
import API from '../utils/API';
import REQUESTS from '../utils/Request';
import CustomeModel from '../components/CustomeModel';
import WhatsappFloating from '../components/WhatsappFloating';
import { Alert } from 'react-native';
const data = [
  'Found a different accommodation option',
  'Change in the number or needs of travelers',
  'Personal reasons/Trip called off',
  "Made Booking for the same dates - canceled the ones I don't need",
  'Unable to travel due to restrictions related to coronavirus (COVID-19)',
  'Change of dates or destination',
  'None of the above',
]
const cancelBookingScreen = (props) => {
  const { get_room, arrival, departure, hotel_id, id } = props.route.params.data;
  const { aptr_name, background_image } = get_room;

  const arrivalDate = moment(arrival).format("MMM, DD YYYY")
  const departureDate = moment(departure).format("MMM DD, YYYY")
  const [reason, setReason] = useState('Found a different accommodation option')
  const [showLoader, setShowLoader] = useState(false)

  const cancelBooking = async () => {
    const formData = {
      id: id,
      reason: reason,
    };
    setShowLoader(true)
    const response = await REQUESTS.postRequest(
      API.cancelBooking(),
      formData,
      false
    );
    setShowLoader(false)
    if (response.success) {
      Alert.alert('Success!', response.message)
      props.navigation.goBack();
    } else {
      Alert.alert('Failed!', response.message)
    }
    console.log('response', response)
  }
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <WhatsappFloating/>
      <ScrollView style={{}}>
        {showLoader ? <CustomeModel modalVisible={showLoader} /> : <></>}
        <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 40 }}>
          <View style={styles.container}>
            <FastImage source={{ uri: background_image }} style={styles.image} />
            <View style={{ marginLeft: RFValue(16) }}>
              <Text style={styles.roomName}>{aptr_name}</Text>
              <Text style={styles.branch}>{(hotel_id == 1) ? 'Nishat Gulberg' : 'Nishat Johar Town'}</Text>
              <View style={{ flexDirection: 'row', marginTop: RFValue(7) }}>
                <Image
                  source={require('../assets/calendar.png')}
                  style={{ marginRight: RFValue(8) }}
                />
                <Text style={{ marginRight: RFValue(15) }}>{arrivalDate + " - " + departureDate}</Text>
              </View>
            </View>
          </View>
          {
            data.map((item, index) => {
              return <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity style={{ width: '8%' }} onPress={() => setReason(item)}>
                  <Image source={(reason == item) ? require('../assets/checked_radio.png') : require('../assets/unchecked.png')} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                <View style={{ width: '92%' }}>
                  <Text>{item}</Text>
                </View>
              </View>
            })
          }
          <View style={{ marginTop: 30 }} />
          <SimpleButton
            label="No, I don't want to cancel"
            lableStyle={{ fontSize: RFValue(10.5) }}
            containerStyle={{ marginVertical: RFValue(13), height: 40, borderWidth: 1 }}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ marginTop: 0 }}
          />
          <SimpleButton
            label="Yes, cancel this booking"
            lableStyle={{ fontSize: RFValue(10.5), color: 'white' }}
            containerStyle={{ marginVertical: RFValue(13), height: 40, backgroundColor: 'black', borderWidth: 1 }}
            onPress={() => cancelBooking()}
            style={{ marginTop: 0 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = { updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(cancelBookingScreen);

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
  container: {
    paddingTop: RFValue(16),
    flexDirection: 'row',
  },

  image: {
    width: RFValue(72),
    height: RFValue(48),
    justifyContent: 'center',
    alignSelf: 'center'
  },

  branch: {
    fontFamily: OSregular,
    fontSize: RFValue(12),
    color: greySecondary,
    /* marginBottom: RFValue(3), */
  },

  roomName: {
    fontFamily: OSsemiBold,
    fontSize: RFValue(14),
    marginBottom: RFValue(3),
  },
});
