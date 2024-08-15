/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheetHeader from '../components/BottomSheetHeader';
import ContactSheetContent from '../components/ContactSheetContent';

const ref = React.createRef();
const {deviceHeight, deviceWidth} = AppTheme.metrics;
const {PFbold, OSregular} = AppTheme.fonts;

const menuImages = {
  'Green Room Dining': [
    'http://gulberg.nishathotels.com/images/green_room/01.jpg',
    'http://gulberg.nishathotels.com/images/green_room/02.jpg',
  ],

  'Cube Dining': [
    'http://gulberg.nishathotels.com/images/cube_menu/img_02.png',
    'http://gulberg.nishathotels.com/images/cube_menu/img_03.png',
  ],
};

const DiningDetailsScreen = ({route}) => {
  const [show, setshow] = useState(false);
  const {restaurant} = route.params;

  return (
    <>
      <ScrollView>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={restaurant.images}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Image
              source={item}
              style={{
                resizeMode: 'cover',
                marginRight: RFValue(3),
                padding: RFValue(10),
                height: deviceHeight / 2.5,
                width: RFValue(330),
              }}
            />
          )}
        />

        <View>
          <Text style={styles.hall}>{restaurant.name}</Text>
          <Text style={styles.desc}>{restaurant?.desc}</Text>
        </View>

        {!restaurant.desc && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={menuImages[restaurant.name]}
            renderItem={({item}) => (
              <Image
                source={{uri: item}}
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  width: deviceWidth - 40 /* RFValue(290) */,
                  height: RFValue(610),
                  marginVertical: RFValue(6),
                  borderWidth: 1,
                  borderColor: '#000',
                }}
              />
            )}
          />
        )}

        <PrimaryButton
          label="RESERVE NOW"
          onPress={() => ref.current.snapTo(0)}
        />
      </ScrollView>
      {show && (
        <View
          style={styles.backDrop}
          onTouchEnd={() => ref.current.snapTo(1)}
        />
      )}
      <BottomSheet
        enabledInnerScrolling={false}
        ref={ref}
        initialSnap={1}
        snapPoints={[deviceHeight * 0.3, 0]}
        renderHeader={() => (
          <BottomSheetHeader title="Contact Details" refer={ref} />
        )}
        renderContent={() => <ContactSheetContent refer={ref} />}
        onOpenStart={() => setshow(true)}
        onCloseEnd={() => setshow(false)}
      />
    </>
  );
};

export default DiningDetailsScreen;

const styles = StyleSheet.create({
  hall: {
    marginLeft: RFValue(15),
    fontFamily: PFbold,
    fontSize: RFValue(30),
    paddingBottom: RFValue(10),
    marginTop: RFValue(20),
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
    zIndex: 1,
  },
});
