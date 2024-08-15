import * as types from '../types';
import { FULFILLED, PENDING, REJECTED } from '../utils/constants';
import REQUESTS from '../../utils/Request';
import API from '../../utils/API';
import { Alert } from 'react-native';
import * as RootNav from '../../navigations/RootNavigation';
import Routes from '../../navigations/Routes';
import AsyncStorage from '@react-native-community/async-storage';

const totalCalculations = (formData) => {
  let updatedSubTotal = formData.total_price;
  console.log('updatedSubTotal <= ', updatedSubTotal);
  let updatedTax = formData.tax_price;
  console.log('updatedTax <= ', updatedTax);
  console.log('discount <= ', formData.discount);
  let discountAmount = formData.discount;
  console.log('discountAmount <= ', discountAmount);
  const { matressInfo, hiTeaInfo, isInstantBooking } = formData;
  const {
    isMatress,
    price: matressPrice,
    quantity: matressQuantity,
    days: matressDays,
  } = matressInfo;
  const {
    isHiTea,
    price: hiTeaPrice,
    quantity: hiTeaQuantity,
    days: hiTeaDays,
  } = hiTeaInfo;

  // if (isMatress) {
  //   updatedSubTotal =
  //     Number(updatedSubTotal) + Number(matressPrice * matressDays);
  //     console.log("Number(matressPrice * matressDays) <= ", Number(matressPrice * matressDays));
  // }

  if (isHiTea) {
    updatedSubTotal =
      Number(updatedSubTotal) + Number(hiTeaPrice * hiTeaQuantity);
  }

  // if (isInstantBooking) {
  //   discount = (Number(+updatedSubTotal) * 15) / 100;
  //   updatedSubTotal = updatedSubTotal - discount;
  // } else updatedTax = updatedSubTotal * 0.16;

  // updatedTax = updatedSubTotal * 0.16;
  // console.log("updatedTax + +updatedSubTotal <= ", updatedTax + +updatedSubTotal);
  return updatedSubTotal;
};
const bookRoom = (formData) => async (dispatch) => {
  const _formData = formData; 
  // console.log('_formData |=>', formData);
  const BOOKROOMURL = `${API.bookRoom()}?rooms=${_formData.rooms}&people=${_formData.people
    }&city=${_formData.city}&postal_code=${_formData.postal_code}&address=${_formData.address
    }&title=${_formData.title}&country=${_formData.country}&room_id=${_formData.room_id
    }&arrival=${_formData.arrival}&departure=${_formData.departure}&email=${_formData.email
    }&first_name=${_formData.first_name}&last_name=${_formData.last_name
    }&number=${_formData.number}&roomId=${_formData.roomId}&room_rate=${_formData.room_rate
    }&user_agent=${_formData.user_agent}&hi_tea[status]=${_formData.hi_tea.status
    }&hi_tea[days]=${_formData.hi_tea.days}&hi_tea[qty]=${_formData.hi_tea.qty
    }&booking_type=${_formData.booking_type}&hotel_id=${_formData.hotel_id
    }&child=${_formData.child}&user_id=${_formData.user_id}&matress[status]=${_formData.matress.status
    }&matress[qty]=${_formData.matress.qty}&matress[days]=${_formData.matress.days
    }&baby_cot[status]=${_formData.baby_cot.status}&baby_cot[qty]=${_formData.baby_cot.qty
    }&baby_cot[days]=${_formData.baby_cot.days}&total_price_pkr=${_formData.total_price_pkr}
  `;
  console.log('BOOKROOMURLBOOKROOMURL', BOOKROOMURL)

  dispatch({ type: types.BOOK_ROOM + PENDING });
  try {
    const response = await REQUESTS.postRequest(BOOKROOMURL);
    console.log('responseresponseresponse', response)
    if (response.result == 'SUCCESS' || response.status == 'success') {
      if (formData.booking_type === 'mcb') {
        const { session, booking_id, McbPageUrl, amount } = response;
        const sessionId = session.id;
        // Currency Conversion start
        // var myHeaders = new Headers();
        // myHeaders.append('apikey', 'sUzUG97slmIInsqOpujVYLmFv8HQkAgy');

        // var requestOptions = {
        //   method: 'GET',
        //   redirect: 'follow',
        //   headers: myHeaders,
        // };
        // const URL = `https://api.apilayer.com/exchangerates_data/convert?to=PKR&from=USD&amount=${amount}`;

        // const convertedAmount = await fetch(URL, requestOptions)
        //   .then((response) => response.json())
        //   .then((result) => {
        //     // console.log('check resultcurrency===>', result);
        //     return result;
        //   })
        //   .catch((error) => Alert.alert('error', error));

        // currency conversion end

        let newUrl = `${McbPageUrl}?sessionId=${sessionId}&orderId=${booking_id}&amount=${amount}&name=${formData.first_name}`;
        console.log('newURl===>', newUrl);
        RootNav.replace(Routes.WebViewScreen, {
          url: newUrl,
          isPayment: true,
          checkIn: formData.arrival,
          checkOut: formData.departure,
          total: amount,
        });
      } else {
        RootNav.replace(Routes.BookingCompletedScreen, {
          bookingNumber: response.data.VCONFNO,
          checkIn: formData.arrival,
          checkOut: formData.departure,
          status: 'confirmed',
          total: formData.total_price,
        });
      }
      dispatch({
        type: types.BOOK_ROOM + FULFILLED,
        payload: {
          response,
        },
      });
    } else {
      Alert.alert('Failed!', 'Something went wrong, Please try again.');
      dispatch({
        type: types.BOOK_ROOM + REJECTED,
        payload: error,
      });
    }
  } catch (error) {
    console.log('error in bookRoom', error);
    alert(error.data.message);
    console.log('error in booking', error.data.message);
    console.log(error.data);
    dispatch({
      type: types.BOOK_ROOM + REJECTED,
      payload: { error },
    });
  }
};

const getCountries = () => async (dispatch) => {
  dispatch({ type: types.GET_COUNTRIES + PENDING });
  try {
    const response = await REQUESTS.getRequest(API.countries());

    dispatch({
      type: types.GET_COUNTRIES + FULFILLED,
      payload: {
        countries: response,
      },
    });

    return response.data.country;
  } catch (error) {
    console.log('error in getCountries', error);
    dispatch({
      type: types.GET_COUNTRIES + REJECTED,
      payload: { error },
    });
  }
};

const getAddOns = () => async (dispatch) => {
  dispatch({ type: types.GET_ADD_ON + PENDING });
  try {
    const response = await REQUESTS.getRequest(API.addOns());
    console.log('Add ons', response);
    dispatch({
      type: types.GET_ADD_ON + FULFILLED,
      payload: {
        addOns: response.data,
      },
    });
    /* return response.data.country; */
  } catch (error) {
    console.log('error in getAddons', error);
    dispatch({
      type: types.GET_ADD_ON + REJECTED,
      payload: { error },
    });
  }
};

const getBookings = (userId) => async (dispatch) => {
  // console.log('User id===>', userId);
  dispatch({ type: types.GET_BOOKINGS + PENDING });
  try {
    const response = await REQUESTS.getRequest(API.bookings(), {
      user_id: userId,
    });
    console.log('res===>', response);
    dispatch({
      type: types.GET_BOOKINGS + FULFILLED,
      payload: {
        bookings: response.data,
      },
    });
    /* return response.data.country; */
  } catch (error) {
    console.log('error in get bookings===>', error);
    dispatch({
      type: types.GET_BOOKINGS + REJECTED,
      payload: { error },
    });
  }
};

const getAvailableRooms =
  (arrival, departure, hotel_id) => async (dispatch) => {
    // /*   console.log('avail url: ', API.availableRooms());*/
    dispatch({ type: types.GET_AVAILABLE_ROOMS + PENDING });
    try {
      const formData = {
        arrival: arrival,
        departure: departure,
        hotel_id: hotel_id,
      };
      const response = await REQUESTS.postRequest(
        API.availableRooms(),
        formData,
      );
      // console.log('available rooms response:444 ', response);
      dispatch({
        type: types.GET_AVAILABLE_ROOMS + FULFILLED,
        payload: {
          available: response.roomCount.filter((item) => {
            return item.id != 20;
          }),
          is_blackout: response.is_blackout,
          discount: response.discount,
        },
      });
    } catch (error) {
      console.log('error in getAvailableRooms', error);
      dispatch({
        type: types.GET_AVAILABLE_ROOMS + REJECTED,
        payload: { error },
      });
    }
  };

const getAvailableSingleRoom =
  (arrival, departure, room_id, hotel_id) => async (dispatch) => {
    // console.log(API.checkAvailabilityRoom());
    // console.log('avail room url: ', API.checkAvailabilityRoom()+`?arrival=${arrival}&departure=${departure}&hotel_id=${hotel_id}&room_id=${room_id}`);
    try {
      const formData = {
        arrival: arrival,
        departure: departure,
        hotel_id,
        room_id,
      };
      // console.log(formData);
      const response = await REQUESTS.postRequest(
        API.checkAvailabilityRoom() +
        `?arrival=${arrival}&departure=${departure}&hotel_id=${hotel_id}&room_id=${room_id}`,
        formData,
      );
      console.log('Single room check availability response = ', response);
      dispatch({
        type: types.GET_AVAILABLE_ROOM + FULFILLED,
        payload: {
          availableRoom: response.roomCount,
          is_blackout: response.is_blackout,
          discount: response.discount,
        },
      });
    } catch (error) {
      console.log('error in getAvailableRoom', error);
      dispatch({
        type: types.GET_AVAILABLE_ROOM + REJECTED,
        payload: { error },
      });
    }
  };

const getPackageDetail = (package_id, hotel_id) => async (dispatch) => {
  console.log('getPackageDetail api is called', package_id, hotel_id);
  try {
    const response = await REQUESTS.getRequest(
      API.packagesDetails() + `/${package_id}?hotel_id=${hotel_id}`,
    );
    console.log('API RESPONSE => ', response);
    console.log('API RESPONSE DATA => ', response.data);
    dispatch({
      type: types.GET_PACKAGE_DETAILS + FULFILLED,
      payload: {
        packageDetails: response.data,
        message: response.message,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllRooms = (hotel_id,userEmail) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ROOMS + PENDING });
  try {
    const formData = {
      hotel_id: hotel_id,
      app_user_email:userEmail
    };
    console.log('formDataformData',formData)
    const response = await REQUESTS.postRequest(API.allRooms(), formData);
    
    dispatch({
      type: types.GET_ALL_ROOMS + FULFILLED,
      payload: {
        allRooms: response.data.filter((item) => {
          return item.id != 20;
        }),
      },
    });
  } catch (error) {
    console.log('error in getAllRooms', error);
    dispatch({
      type: types.GET_ALL_ROOMS + REJECTED,
      payload: { error },
    });
  }
};

const getPackagesDetails = (hotel_id) => async (dispatch) => {
  console.log('getPackagesDetails is called');
  console.log('hotel_id ==> ', hotel_id);
  dispatch({ type: types.GET_ALL_PACKAGES + PENDING });
  try {
    const response = await REQUESTS.getRequest(
      API.allPackages() + `hotel_id=${hotel_id}`,
    );
    console.log('packages response -> ', response);
    const { similar_packages } = response.data;
    console.log(similar_packages);
    dispatch({
      type: types.GET_ALL_PACKAGES + FULFILLED,
      payload: {
        similar_packages,
      },
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_PACKAGES + REJECTED });
    console.log(error.response);
  }
};

const getNotifications = (userId) => async (dispatch) => {
  dispatch({ type: types.GET_NOTIFICATIONS + PENDING });
  // console.log("userId => ",userId);
  try {
    const payload = {
      user_id: userId,
    };
    console.log(API.getNotifications() + `?user_id=${userId}`);
    const response = await REQUESTS.postRequest(
      API.getNotifications() + `?user_id=${userId}`,
    );
    console.log('Notifications response: ', response);
    dispatch({
      type: types.GET_NOTIFICATIONS + FULFILLED,
      payload: {
        notifications: response.data,
      },
    });
  } catch (error) {
    console.log('error in getNotifications', error);
    dispatch({
      type: types.GET_NOTIFICATIONS + REJECTED,
      payload: { error },
    });
  }
};

const changeBranch = (branch) => async (dispatch) => {

  dispatch({ type: types.CHANGE_BRANCH, payload: { branch: branch } });
  if (branch == 'Nishat Johar Town')
    API.setJT()
  else
    API.setGB()
  //branch == 'Nishat Johar Town' ? API.setJT() : API.setGB();
  // console.log('base url', API.availableRooms());
};

const saveUserSession = (isLoggedIn, user) => async (dispatch) => {
  // console.log('SAVE', user);
  dispatch({
    type: types.IS_LOGGED_IN,
    payload: { isLoggedIn: isLoggedIn, user: user },
  });
};
const openSheet = (open) => async (dispatch) => {
  // console.log('SAVE', open);
  dispatch({
    type: types.OPEN_SHEET,
    payload: { isOpen: open },
  });
};

const login =
  (payload, onSuccess = () => { }) =>
    async (dispatch) => {
      const { email, password } = payload;
      dispatch({ type: types.LOGIN + PENDING });
      let formData = new FormData();
      formData.append('user_name', email);
      formData.append('password', password);
      // formData.append('user_name', 'saqib');
      // formData.append('password', 'saqib123123');
console.log(';;sssssss',)
      try {
        const isFormData = true;
        const response = await REQUESTS.postRequest(
          API.login(),
          formData,
          isFormData,
        );
        if (response.code == 200) {
          onSuccess();
          AsyncStorage.setItem('user', JSON.stringify(response.data));
          AsyncStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true }));
          dispatch({
            type: types.IS_LOGGED_IN,
            payload: { isLoggedIn: true, user: response.data },
          });
          dispatch({
            type: types.LOGIN + FULFILLED,
            payload: {
              loginResponse: response,
            },
          });
        } else {
          console.log('response', response);
          Alert.alert('Failed!', 'Invalid username and password.');
        }
      } catch (error) {
        console.log('REJECTED', error);
        Alert.alert('Failed!', 'Something went wrong, Please try again.');
        dispatch({
          type: types.LOGIN + REJECTED,
          payload: { error },
        });
      }
    };

const signup =
  (payload, onSuccess = () => { }) =>
    async (dispatch) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        country,
        address,
        city,
        state,
        zipCode,
        source,
        password,
      } = payload;
      dispatch({ type: types.SIGNUP + PENDING });
      console.log('Payload', payload);
      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('telephone', phone);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      formData.append('zip', zipCode);
      formData.append('hear_about', source);
      try {
        const isFormData = true;
        const response = await REQUESTS.postRequest(
          API.signup(), 
          formData,
          isFormData,
        );
        const data = {
          email: email,
        }
        const mobileResponse = await REQUESTS.postRequest(API.mobileUserRegister, data);
        console.log('mobileResponse',mobileResponse)
        onSuccess();
        dispatch({
          type: types.SIGNUP + FULFILLED,
          payload: {
            signupResponse: response,
          },
        });
      } catch (error) {
        console.log('Error', error);
        alert(error.data?.message);
        dispatch({
          type: types.SIGNUP + REJECTED,
          payload: { error },
        });
      }
    };

const changePassword =
  (payload, onSuccess = () => { }) =>
    async (dispatch) => {
      console.log('Change PASSWORD PAYLOAD', onSuccess);

      const { currentPassword, newPassword, email, userId } = payload;

      dispatch({ type: types.CHANGE_PASSWORD + PENDING });
      try {
        const response = await REQUESTS.postRequest(API.changePassword(), {
          user_email: email,
          old_password: currentPassword,
          new_password: newPassword,
          user_id: userId,
        });
        console.log('Change Password Response', response);
        if (!response.code) {
          onSuccess();
          dispatch({
            type: types.CHANGE_PASSWORD + FULFILLED,
            payload: {
              changePasswordResponse: response,
            },
          });
        } else {
          alert(response.message);
          dispatch({
            type: types.CHANGE_PASSWORD + REJECTED,
            payload: { response },
          });
        }
      } catch (error) {
        console.log('error in api', error);
        alert(error?.message);

        dispatch({
          type: types.CHANGE_PASSWORD + REJECTED,
          payload: { error },
        });
      }
    };
const updateProfile = (payload) => async (dispatch) => {
  // console.log('PAYLOAd', payload);
  const {
    firstName,
    lastName,
    phone,
    userCity,
    userState,
    userCountry,
    zipCode,
    userAddress,
    user_id,
    where_did_you_hear_about_us,
    image,
  } = payload;

  let formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('telephone', phone);
  formData.append('address', userAddress);
  formData.append('city', userCountry);
  formData.append('state', userState);
  formData.append('country', userCountry);
  formData.append('zip', zipCode);
  formData.append('where_did_you_hear_about_us', where_did_you_hear_about_us);

  var filename = image.substr(image.lastIndexOf('/') + 1);
  if (image) {
    formData.append('profilepicture', {
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
      type: 'image/jpeg',
      name: filename,
    });
  }
  console.log('FORM DATA', formData);
  dispatch({ type: types.UPDATE_PROFILE + PENDING });
  const isFormData = true;
  try {
    const response = await REQUESTS.postRequest(
      API.updateProfile(),
      formData,
      isFormData,
    );

    console.log('Update Profile Response', response);
    if (response.code == 200) {
      // navigation.navigate(Routes.Home);
      Alert.alert('Success!', 'Profile updated successfully');
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      dispatch({
        type: types.IS_LOGGED_IN,
        payload: { isLoggedIn: true, user: response.data },
      });
      dispatch({
        type: types.UPDATE_PROFILE + FULFILLED,
        payload: {
          updateProfileResponse: response,
        },
      });
    } else {
      alert(response.message);
      dispatch({
        type: types.UPDATE_PROFILE + REJECTED,
        payload: { response },
      });
    }
  } catch (error) {
    console.log('error in api', error);
    alert(error?.data?.message);
    dispatch({
      type: types.UPDATE_PROFILE + REJECTED,
      payload: { error },
    });
  }
};
const forgotPassword =
  (payload, onSuccess = () => { }) =>
    async (dispatch) => {
      console.log('FORGOT PASSWORD PAYLOAD', payload);

      dispatch({ type: types.FORGOT_PASSWORD + PENDING });
      try {
        const response = await REQUESTS.postRequest(API.forgotPassword(), {
          user_email: payload.email,
        });
        alert(response.message);
        onSuccess();
        dispatch({
          type: types.FORGOT_PASSWORD + FULFILLED,
          payload: {
            forgotPassword: response,
          },
        });
      } catch (error) {
        console.log('error in api', error);
        alert(error?.data.message);
        dispatch({
          type: types.FORGOT_PASSWORD + REJECTED,
          payload: { error },
        });
      }
    };

export {
  changeBranch,
  bookRoom,
  getCountries,
  getPackageDetail,
  getAvailableRooms,
  getAvailableSingleRoom,
  // getAvailablePackageDetail,
  getAddOns,
  getBookings,
  login,
  signup,
  changePassword,
  forgotPassword,
  saveUserSession,
  updateProfile,
  getNotifications,
  openSheet,
  getAllRooms,
  getPackagesDetails,
};
