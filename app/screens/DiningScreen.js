/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ImageTextSlider from '../components/ImageTextSlider';
import PrimaryButton from '../components/PrimaryButton';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import Routes from '../navigations/Routes';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';
import {connect} from 'react-redux';
import {Themes, Dining} from '../store/utils/branchData';

const {deviceHeight, deviceWidth} = AppTheme.metrics;
const ref = React.createRef();

const DiningScreen = ({navigation, ...props}) => {

  const [show, setshow] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Header title="Dining" marginLeft={RFValue(105)} />
      <BranchSelector />

      <ImageTextSlider
        data={Dining[props.app.branch]}
        navigation={navigation}
      />
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
        enabledInnerScrolling={false}
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

export default connect(mapStateToProps)(DiningScreen);

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
