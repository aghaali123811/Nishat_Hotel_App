import { FULFILLED, PENDING, REJECTED } from '../utils/constants';
import { Dimensions } from 'react-native'
import * as types from '../types/index';
import createReducer from '../utils/createReducer';
const initialState = {
  availableRoom: [],
  allpackages: [],
  branch: 'Nishat Johar Town',
  loadedGetAvailable: false,
  is_blackout: false,
  discount: [],
  availableRoomChanged: false,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

const AppReducer = createReducer(initialState)({
  [types.CHANGE_BRANCH]: (state, { payload }) => ({
    ...state,
    branch: payload.branch,
  }),
  [types.IS_LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isLoggedIn: payload.isLoggedIn,
    user: payload.user,
  }),
  [types.OPEN_SHEET]: (state, { payload }) => ({
    ...state,
    isOpen: payload.isOpen,
  }),
  [types.BOOK_ROOM + PENDING]: (state) => ({
    ...state,
    errorBookRoom: null,
    loadingBookRoom: true,
    loadedBookRoom: false,
  }),
  [types.BOOK_ROOM + FULFILLED]: (state, { payload }) => ({
    ...state,
    response: payload.response,
    loadingBookRoom: false,
    loadedBookRoom: true,
    errorBookRoom: null,
  }),
  [types.BOOK_ROOM + REJECTED]: (state, { payload }) => ({
    ...state,
    errorBookRoom: payload.error,
    loadingBookRoom: false,
    loadedBookRoom: false,
  }),
  [types.GET_COUNTRIES + PENDING]: (state) => ({
    ...state,
    errorGetCountries: null,
    loadingGetCountries: true,
    loadedGetCountries: false,
  }),
  [types.GET_COUNTRIES + FULFILLED]: (state, { payload }) => ({
    ...state,
    countries: payload.countries,
    loadingGetCountries: false,
    loadedGetCountries: true,
    errorGetCountries: null,
  }),
  [types.GET_COUNTRIES + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetCountries: payload.error,
    loadingGetCountries: false,
    loadedGetCountries: false,
  }),

  [types.GET_ROOMS + PENDING]: (state) => ({
    ...state,
    errorGetRooms: null,
    loadingGetRooms: true,
    loadedGetRooms: false,
  }),
  [types.GET_ROOMS + FULFILLED]: (state, { payload }) => ({
    ...state,
    rooms: payload.rooms,
    loadingGetRooms: false,
    loadedGetRooms: true,
    errorGetRooms: null,
  }),
  [types.GET_ROOMS + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetRooms: payload.error,
    loadingGetRooms: false,
    loadedGetRooms: false,
  }),

  [types.GET_ALL_PACKAGES + PENDING]: (state) => ({
    ...state,
    errorGetAllPackages: null,
    loadingGetPackages: true,
    loadedGetPackages: false,
  }),
  [types.GET_ALL_PACKAGES + FULFILLED]: (state, { payload }) => ({
    ...state,
    allpackages: payload.similar_packages,
    loadingGetPackages: false,
    loadedGetPackages: false,
  }),
  [types.GET_ALL_PACKAGES + REJECTED]: (state) => ({
    ...state,
    errorGetAllPackages: null,
    loadingGetPackages: false,
    loadedGetPackages: false,
  }),

  [types.GET_PACKAGE_DETAILS + FULFILLED]: (state, { payload }) => ({
    ...state,
    packageDetails: payload.packageDetails,
    is_blackout: payload.is_blackout,
    message: payload.message,
    loadingGetPackages: false,
    loadedGetPackages: false,
  }),

  [types.GET_NOTIFICATIONS + PENDING]: (state) => ({
    ...state,
    errorGetNotifications: null,
    loadingGetNotifications: true,
    loadedGetNotifications: false,
  }),
  [types.GET_NOTIFICATIONS + FULFILLED]: (state, { payload }) => ({
    ...state,
    notifications: payload.notifications,
    loadingGetNotifications: false,
    loadedGetNotifications: true,
    errorGetNotifications: null,
  }),
  [types.GET_NOTIFICATIONS + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetNotifications: payload.error,
    loadingGetNotifications: false,
    loadedGetNotifications: false,
  }),

  [types.GET_ADD_ON + PENDING]: (state) => ({
    ...state,
    errorGetAddOns: null,
    loadingGetAddOns: true,
    loadedGetAddOns: false,
  }),
  [types.GET_ADD_ON + FULFILLED]: (state, { payload }) => ({
    ...state,
    addOns: payload.addOns,
    loadingGetAddOns: false,
    loadedGetAddOns: true,
    errorGetAddOns: null,
  }),
  [types.GET_ADD_ON + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetAddOns: payload.error,
    loadingGetAddOns: false,
    loadedGetAddOns: false,
  }),
  [types.GET_BOOKINGS + PENDING]: (state) => ({
    ...state,
    errorGetBookings: null,
    loadingGetBookings: true,
    loadedGetBookings: false,
  }),
  [types.GET_BOOKINGS + FULFILLED]: (state, { payload }) => ({
    ...state,
    bookings: payload.bookings,
    loadingGetBookings: false,
    loadedGetBookings: true,
    errorGetBookings: null,
  }),
  [types.GET_BOOKINGS + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetBookings: payload.error,
    loadingGetBookings: false,
    loadedGetBookings: false,
  }),

  [types.GET_AVAILABLE_ROOMS + PENDING]: (state) => ({
    ...state,
    errorGetAvailable: null,
    loadingGetAvailable: true,
    loadedGetAvailable: false,
  }),
  [types.GET_AVAILABLE_ROOMS + FULFILLED]: (state, { payload }) => ({
    ...state,
    available: payload.available,
    is_blackout: payload.is_blackout,
    discount: payload.discount,
    loadingGetAvailable: false,
    loadedGetAvailable: true,
    errorGetAvailable: null,
  }),
  [types.GET_AVAILABLE_ROOMS + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetAvailable: payload.error,
    loadingGetAvailable: false,
    loadedGetAvailable: false,
  }),

  [types.GET_AVAILABLE_ROOM + PENDING]: (state) => ({
    ...state,
    errorGetAvailable: null,
    loadingGetAvailable: true,
    loadedGetAvailable: false,
  }),
  [types.GET_AVAILABLE_ROOM + FULFILLED]: (state, { payload }) => (
    {
      ...state,
      availableRoom: payload.availableRoom,
      is_blackout: payload.is_blackout,
      discount: payload.discount,
      loadingGetAvailable: false,
      loadedGetAvailable: true,
      errorGetAvailable: null,
      availableRoomChanged: !state.availableRoomChanged
    }),
  [types.GET_AVAILABLE_ROOM + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetAvailable: payload.error,
    loadingGetAvailable: false,
    loadedGetAvailable: false,
  }),

  [types.GET_ALL_ROOMS + PENDING]: (state) => ({
    ...state,
    errorGetRooms: null,
    loadingGetRooms: true,
    loadedGetRooms: false,
  }),
  [types.GET_ALL_ROOMS + FULFILLED]: (state, { payload }) => ({
    ...state,
    allRooms: payload.allRooms,
    loadingGetRooms: false,
    loadedGetRooms: true,
    errorGetRooms: null,
  }),
  [types.GET_ALL_ROOMS + REJECTED]: (state, { payload }) => ({
    ...state,
    errorGetRooms: payload.error,
    loadingGetRooms: false,
    loadedGetRooms: false,
  }),

  [types.LOGIN + PENDING]: (state) => ({
    ...state,
    errorLogin: null,
    loadingLogin: true,
    loadedLogin: false,
  }),
  [types.LOGIN + FULFILLED]: (state, { payload }) => ({
    ...state,
    loginResponse: payload.loginResponse,
    loadingLogin: false,
    loadedLogin: true,
    errorLogin: null,
  }),
  [types.LOGIN + REJECTED]: (state, { payload }) => ({
    ...state,
    errorLogin: payload.error,
    loadingLogin: false,
    loadedLogin: false,
  }),

  [types.SIGNUP + PENDING]: (state) => ({
    ...state,
    errorSignup: null,
    loadingSignup: true,
    loadedSignup: false,
  }),
  [types.SIGNUP + FULFILLED]: (state, { payload }) => ({
    ...state,
    signupResponse: payload.signupResponse,
    loadingSignup: false,
    loadedSignup: true,
    errorSignup: null,
  }),
  [types.SIGNUP + REJECTED]: (state, { payload }) => ({
    ...state,
    errorSignup: payload.error,
    loadingSignup: false,
    loadedSignup: false,
  }),
  [types.CHANGE_PASSWORD + PENDING]: (state) => ({
    ...state,
    errorChangePassword: null,
    loadingChangePassword: true,
    loadedChangePassword: false,
  }),
  [types.CHANGE_PASSWORD + FULFILLED]: (state, { payload }) => ({
    ...state,
    changePasswordResponse: payload.changePasswordResponse,
    loadingChangePassword: false,
    loadedChangePassword: true,
    errorChangePassword: null,
  }),
  [types.CHANGE_PASSWORD + REJECTED]: (state, { payload }) => ({
    ...state,
    errorChangePassword: payload.error,
    loadingChangePassword: false,
    loadedChangePassword: false,
  }),
  [types.UPDATE_PROFILE + PENDING]: (state) => ({
    ...state,
    errorUpdateProfile: null,
    loadingUpdateProfile: true,
    loadedUpdateProfile: false,
  }),
  [types.UPDATE_PROFILE + FULFILLED]: (state, { payload }) => ({
    ...state,
    updateProfileResponse: payload.updateProfileResponse,
    loadingUpdateProfile: false,
    loadedUpdateProfile: true,
    errorUpdateProfile: null,
  }),
  [types.UPDATE_PROFILE + REJECTED]: (state, { payload }) => ({
    ...state,
    errorUpdateProfile: payload.error,
    loadingUpdateProfile: false,
    loadedUpdateProfile: false,
  }),
  [types.FORGOT_PASSWORD + PENDING]: (state) => ({
    ...state,
    errorForgotPassword: null,
    loadingForgotPassword: true,
    loadedForgotPassword: false,
  }),
  [types.FORGOT_PASSWORD + FULFILLED]: (state, { payload }) => ({
    ...state,
    forgotPasswordResponse: payload.forgotPasswordResponse,
    loadingForgotPassword: false,
    loadedForgotPassword: true,
    errorForgotPassword: null,
  }),
  [types.FORGOT_PASSWORD + REJECTED]: (state, { payload }) => ({
    ...state,
    errorForgotPassword: payload.error,
    loadingForgotPassword: false,
    loadedForgotPassword: false,
  }),
});

export default AppReducer;
