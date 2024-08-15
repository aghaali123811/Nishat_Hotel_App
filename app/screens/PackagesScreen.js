import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  RFValue,
  RFPercentage,
  PFregular,
} from 'react-native-responsive-fontsize';
import {getPackagesDetails} from '../store/actions/AppActions';
import Header from '../components/Header';
import {connect} from 'react-redux';
import PrimaryButton from '../components/PrimaryButton';
import Routes from '../navigations/Routes';
// import {SvgUri} from 'react-native-svg';
import RoomDetailBox from '../components/RoomDetailBox';
import BookNowContainer from '../components/BookNowContainer';
import BranchSelector from '../components/BranchSelector';
import CustomeModel from '../components/CustomeModel';

const RenderItem = ({item, navigation, totalGuest: totalGuests}) => {
  const [rooms, setRooms] = useState(1);
  return (
    <>
      <RoomDetailBox
        room={item}
        setNoOfRooms={setRooms}
        NoOfRooms={rooms}
        screenName="RoomScreen"
      />
      {/* <BookNowContainer
        price={Number(item.aptr_price)}
        showPrice={true}
        onPress={() =>
          BottomSheetHelper.openNextTime() +
          navigation.navigate(Routes.RoomDetail, {room: item, totalGuests})
        }
      /> */}
    </>
  );
};

const PackagesScreen = ({navigation, ...props}) => {
  // console.log('Packages ==> ', props.app.allpackages);
  const hotel_id = props.app.branch === 'Nishat Johar Town' ? 2 : 1;
  console.log('hotel id ===> ', hotel_id);
  const packageDetail = props.app.allpackages;
  console.log('packages --> ', packageDetail);
  /*console.log("addons image ---> ", packageDetail[0]?.package_adons[0]?.adons?.image);*/ //package_adons?.adons.image
  const [showLoader, setShowLoader] = useState(true);

  const onPress = (item) => {
    navigation.navigate(Routes.PackageDetail, {
      branch: props.app.branch,
      item: item,
    });
  };

  useEffect(() => {
    setShowLoader(true);
    // const unsubscribe = navigation.addListener('focus', () => {
    props.getPackagesDetails(hotel_id).then(() => {
      setShowLoader(false);
    });
    // });
    // return unsubscribe;
  }, [hotel_id]);
  return (
    <ScrollView>
        <Header title="Packages" marginLeft={RFValue(105)} />
        <BranchSelector />

        {packageDetail?.length == 0 && !showLoader ? (
          <Text style={{marginTop: 50, color: 'red', textAlign: 'center'}}>
            Packages not available
          </Text>
        ) : (
          <></>
        )}
        {
          /*packageDetail.length == 0 && */ showLoader ? (
            <CustomeModel modalVisible={showLoader} />
          ) : (
            <></>
          )
        }

        {packageDetail.map((item, index) => {
          return (
            <View style={{marginBottom: 15}}>
              <Image
                source={{uri: item.feature_image}}
                style={{width: '100%', height: 229}}
                resizeMode='contain'
              />
              <View style={styles.roomNameContainer}>
                <Text style={styles.packageName}>{item.name}</Text>
              </View>
              <View style={{paddingHorizontal: 15, paddingTop: 5}}>
                <Text style={styles.packagePrice}>USD {item.actual_price}</Text>
                <Text style={styles.packageDescription}>
                  {item.description}
                </Text>
                <PrimaryButton
                  onPress={() => onPress(item)}
                  label="View Details"
                />
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};
const mapStateToProps = (state) => ({
  app: state.appReducer,
});

const mapDispatchToProps = {getPackagesDetails};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesScreen);
const styles = StyleSheet.create({
  imageConatiner: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.7,
    paddingVertical: 5,
    paddingHorizontal: 8,
    margin: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  roomNameContainer: {
    flexDirection: 'row',
    marginBottom: RFValue(15),
    justifyContent: 'space-between',
    marginHorizontal: RFValue(13),
    alignItems: 'center',
    marginTop: RFValue(20),
  },

  packageName: {
    fontFamily: PFregular,
    fontSize: RFValue(25),
    marginTop: RFValue(-17),
    paddingTop: 10,
  },

  packagePrice: {
    fontFamily: PFregular,
    fontSize: RFValue(20),
    marginTop: RFValue(-15),
  },

  packageDescription: {
    fontFamily: PFregular,
    fontSize: RFValue(14),
    marginTop: 5,
    marginBottom: 15,
  },
});


//Flatlist
{/* <FlatList
          data={packageDetail}
          renderItem={({item}) => (
            <View style={{marginBottom: 15}}>
              <Image
                source={{uri: item.feature_image}}
                style={{width: '100%', height: 229}}
              />
              <View style={styles.imageConatiner}>
                <Image source={require('../assets/icCheck.png')} />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: 6,
                  }}>
                  Free Cancellation
                </Text>
              </View>
              <View
                onTouchEnd={() => RootNav.navigate(Routes.RoomDetail, {room})}
                style={styles.roomNameContainer}>
                <Text style={styles.packageName}>{item.name}</Text>
              </View>
              <View style={{paddingHorizontal: 15, paddingTop: 5}}>
                <Text style={styles.packagePrice}>PKR {item.actual_price}</Text>
                {item?.package_adons[0]?.adons ? (
                  <View style={{marginTop: 5}}>
                    <SvgUri marginRight={RFValue(7)} uri={item.package_adons[0].adons?.image} />
                    <Text>{item.package_adons[0].adons.quantity != null && item.package_adons[0].adons.quantity}</Text>
                  </View>
                ) : (
                  <></>
                )}
                <Text style={styles.packageDescription}>
                  {item.description}
                </Text>
                <PrimaryButton
                  onPress={() => onPress(item)}
                  label="View Details"
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        /> */}