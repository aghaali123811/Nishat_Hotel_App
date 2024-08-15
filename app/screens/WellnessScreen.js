/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ImageTextSlider from '../components/ImageTextSlider';
import PrimaryButton from '../components/PrimaryButton';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';
import {connect} from 'react-redux';
import {Themes, Wellness} from '../store/utils/branchData';

const {deviceHeight, deviceWidth} = AppTheme.metrics;
const ref = React.createRef();
/* const data = [
  {
    image: require('../assets/pool.png'),
    name: 'Pool',
    desc:
      '24 hour heated pool equipped with professionally trained instructors.',
  },

  {
    image: require('../assets/pool.png'),
    name: 'Gym',
    desc:
      'Providing our guests with fitness goals, the right dose of inspiration, ultra-modern equipment and the best fitness trainers – our gym is the beacon of health and fitness!',
  },
]; */

const WellnessScreen = (props) => {
  const [show, setshow] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Header title="Wellness" marginLeft={RFValue(94)} />
      <BranchSelector />

      <ImageTextSlider data={Wellness[props.app.branch]} canNavigate={false} />
      <View style={{flexDirection: 'row', marginLeft: RFValue(19)}}>
        <PrimaryButton
          label="RESERVE NOW"
          width={RFPercentage(46)}
          onPress={() => ref.current.snapTo(0)}
        />
        {/*         <TouchableOpacity
          activeOpacity={0.5}
          style={{
            ...styles.arrowContainer,
            borderColor: Themes[props.app.branch],
          }}>
          <Image
            source={require('../assets/cleft.png')}
            style={{tintColor: Themes[props.app.branch]}}
          />
        </TouchableOpacity> */}
      </View>

      {show && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => ref.current.snapTo(1)}
        />
      )}

      <BottomSheet
        ref={ref}
        initialSnap={1}
        snapPoints={[RFPercentage(32), 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Contact Details" refer={ref} />
        )}
        renderContent={() => <ContactSheetContent refer={ref} />}
        onOpenStart={() => setshow(true)}
        onCloseEnd={() => setshow(false)}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  app: state.appReducer,
});

export default connect(mapStateToProps)(WellnessScreen);

const styles = StyleSheet.create({
  arrowContainer: {
    width: RFValue(49),
    height: RFValue(49),
    borderWidth: 1,
    margin: RFValue(14),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 3,
  },
});
