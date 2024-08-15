// dev for jt: https://dev.nishathotels.jt.crewlogix.com/api/v2
// dev for gb: https://dev.nishathotels.gulberg.crewlogix.com/api/v2/'
import AsyncStorage from '@react-native-community/async-storage';
import moment from "moment";
export const API = {
  // url: 'https://nishathotels.jt.crewlogix.com/api/v2/', //live url
  url: 'https://nishat.dev.crewlogix.com/',
  authUrl: 'https://nishat.dev.crewlogix.com/wp-json/',
  latestCurrencyObject: {},
  lastUpdatedCurrencyObject: '',
  branch: 'gulberg',
  getUrl() {
    return this.url;
  },
  getBranch() {
    return this.branch;
  },
  setJT() {
    this.url = 'https://nishathotels.jt.crewlogix.com/api/v3/';
    this.branch = 'johar-town'
  },
  setGB() {
    this.url = 'https://nishathotels.gulberg.crewlogix.com/api/v3/';
    this.branch = 'gulberg'
  },
  bookRoom() {
    return this.url + 'book-room';
  },
  countries() {
    return this.url + 'countries';
  },
  addOns() {
    return this.url + 'get-addons';
  },
  bookings() {
    return this.url + 'user-bookings';
  },
  availableRooms() {
    return this.url + 'room-availability';
  },
  packagesDetails() {
    return this.url + 'packages-details';
  },
  packageAvailability() {
    return this.url + 'package-availability';
  },
  checkAvailabilityRoom() {
    return this.url + 'room-availability';
  },
  cancelBooking() {
    return this.url + 'cancel-booking';
  },
  allRooms() {
    return this.url + 'get-rooms';
  },
  allPackages() {
    return this.url + 'packages-details/2?';
  },
  getNotifications() {
    return this.url + 'get-notifications';
  },
  login() {
    return this.authUrl + 'api/login';
  },
  signup() {
    return this.authUrl + 'api/users/register';
  },
  mobileUserRegister(){
    return this.authUrl + 'api/v3/registerAppUser';
  },
  forgotPassword() {
    return this.authUrl + 'api/forget-password';
  },
  changePassword() {
    return this.authUrl + 'api/update_password';
  },
  updateProfile() {
    return this.authUrl + 'api/update-user';
  },
  contactUs() {
    return this.url + 'contact-us';
  },
  getLastUpdatedCurrencyObject() {
    return this.lastUpdatedCurrencyObject
  },
  getLatestCurrencyObject() {
    return this.latestCurrencyObject
  },
  setLastUpdatedCurrencyObject(value) {
    this.lastUpdatedCurrencyObject = value
  },
  setLatestCurrencyObject(value) {
    this.latestCurrencyObject = value
  },
};

export default API;
