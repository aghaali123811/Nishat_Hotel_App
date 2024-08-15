import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');
// console.log("height is ", height);

const AppTheme = {
  colors: {
    greyPrimary: 'rgb(186,195,210)',
    greySecondary: 'rgb(129,129,129)',
    notificationHighlight: 'rgb(243,243,243)',
    profileBackground: 'rgb(245,245,245)',
    goldenPrimary: '#a78f42',
    greyLight: 'rgb(209,209,209)',
    dark: 'rgb(49,49,49)',
    green: 'rgb(25,174,51)',
    pink: 'rgb(245,197,197)',
    pinkLight: 'rgb(252,237,237)',
    black: 'rgb(17,17,17)',
    transparent: 'rgb(0,0,0,0,0.2) ',
  },
  fonts: {
    PFregular: 'Playfair Display',
    PFsemiBold: 'PlayfairDisplay-SemiBold',
    PFbold: 'PlayfairDisplay-Bold',
    OSregular: 'OpenSans',
    OSsemiBold: 'OpenSans-Semibold',
    OSBold: 'OpenSans-Bold',
  },
  fontSize: {
    heading: RFValue(20),
    title: RFValue(18),
    subtitle: RFValue(14),
  },
  metrics: {
    deviceWidth: width,
    deviceHeight: height,
  },
  borderRadius: {
    xs: 2,
    sm: 4,
    lg: 8,
    xl: 12,
  },
};
export default AppTheme;
