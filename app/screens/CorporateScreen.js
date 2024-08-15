/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';
import {connect} from 'react-redux';
import {Corporate} from '../store/utils/branchData';

const {PFbold, OSregular} = AppTheme.fonts;
const ref = React.createRef();
const {deviceHeight, deviceWidth} = AppTheme.metrics;

const CorporateScreen = (props) => {
  console.log(Corporate);
  const [show, setshow] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Header title="Corporate" marginLeft={RFValue(90)} />

      <BranchSelector />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Corporate[props.app.branch]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Image
            source={item}
            style={{
              marginRight: RFValue(3),
              height: RFPercentage(44),
              width: RFPercentage(48),
            }}
          />
        )}
      />

      <View>
        <Text style={styles.hall}>Corporate</Text>
        <Text style={styles.desc}>
          {
            'STAY CONNECTED TO THE WORLD..\n\n ..in our state of the art, intelligently designed corporate conference rooms; a touch of class adorned with technology that suits your corporate needs.'
          }
        </Text>
      </View>

      <PrimaryButton
        label="RESERVE NOW"
        onPress={() => ref.current.snapTo(0)}
      />

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

export default connect(mapStateToProps)(CorporateScreen);

const styles = StyleSheet.create({
  hall: {
    marginLeft: RFValue(15),
    fontFamily: PFbold,
    fontSize: RFValue(30),
    paddingBottom: RFValue(8),
  },

  desc: {
    marginLeft: RFValue(15),
    fontFamily: OSregular,
    fontSize: RFValue(16),
    color: 'rgb(44,44,44)',
    marginBottom: RFValue(30),
    paddingRight: RFValue(31),
  },

  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 3,
  },
});
