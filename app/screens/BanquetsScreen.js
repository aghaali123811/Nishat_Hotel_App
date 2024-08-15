/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import Header from '../components/Header';
import BranchSelector from '../components/BranchSelector';
import WhatsappFloating from '../components/WhatsappFloating';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';
import {connect} from 'react-redux';
import {Banquets} from '../store/utils/branchData';

const {deviceHeight, deviceWidth} = AppTheme.metrics;
const {PFbold, OSregular} = AppTheme.fonts;
const ref = React.createRef();

/* const data = [
  {
    image: require('../assets/banquet.png'),
  },

  {
    image: require('../assets/banquet.png'),
  },
]; */

const BanquetsScreen = (props) => {
  const [show, setshow] = useState(false);
  return (
    <View style={{flex: 1}}>
      <WhatsappFloating/>
      <Header title="Banquets" marginLeft={RFValue(90)} />
      <BranchSelector />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={Banquets[props.app.branch]}
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
        <Text style={styles.hall}>Banquet Halls</Text>
        <Text style={styles.desc}>
          {props.app.branch === 'Nishat Johar Town' &&
            'Sit down formal dinner setup for 2500 guests, U-shape/block table setup capacity of 200 guests, The only Banquet facility having its own concourse of 1124 sq. meters. The attached Mall offers 2 basements of parking with capacity of 2500 cars'}

          {props.app.branch === 'Nishat Gulberg' &&
            'Theatrical style arrangement for 130 guests, Sit down formal dinner setup for 110 guests can be divided into 2 halls Centrally controlled air conditioning and heating'}
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

export default connect(mapStateToProps)(BanquetsScreen);

const styles = StyleSheet.create({
  hall: {
    marginLeft: RFValue(15),
    fontFamily: PFbold,
    fontSize: RFValue(30),
    paddingBottom: RFValue(10),
  },

  desc: {
    marginLeft: RFValue(15),
    fontFamily: OSregular,
    fontSize: RFValue(14),
    color: 'rgb(44,44,44)',
    marginBottom: RFValue(50),
    paddingRight: RFValue(12),
  },

  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.40)',
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    zIndex: 3,
  },
});
