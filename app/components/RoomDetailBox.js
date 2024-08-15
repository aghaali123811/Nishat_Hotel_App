import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';
import * as RootNav from '../navigations/RootNavigation';
import Routes from '../navigations/Routes';
import { SvgUri } from 'react-native-svg';
import VideoSlider from './VideoSlider';
import { Rooms } from '../store/utils/branchData';
import FastImage from '../utils/Image'
const { greyPrimary, greySecondary } = AppTheme.colors;
const { PFbold, OSregular, OSsemiBold, PFregular } = AppTheme.fonts;
const { deviceWidth } = AppTheme.metrics;

const RenderItem = (imageFile) => {

  return (
    <View>
      {/* <Image source={{uri: imageFile}} style={{width: '100%', height: 229}} /> */}
      <VideoSlider images={imageFile} />
      {/*imageFile?.length > 0 && (
        <>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.7,
            paddingVertical: 5,
            paddingHorizontal: 8,
            margin: 8,
            left: imageFile?.length < 10 ? 55 : 62,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
          style={{
            position: 'absolute',
            backgroundColor: 'black',
            opacity: 0.7,
            paddingVertical: 5,
            paddingHorizontal: 8,
            margin: 8,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={require('../assets/icPic.png')}/>
          <Text
            style={{
              color: 'white',
              marginLeft: 6,
            }}>
            {imageFile?.length}
          </Text>
        </View>
        </>
      )*/}
    </View>
  );
};

const ImageTextRow = ({ icon1, text1, icon2, text2 = '' }) => {
  return (
    <View style={styles.ImageTextRowContainer}>
      <View style={styles.centered}>
        <Image source={icon1} style={styles.icon} />
        <Text style={styles.detailTxt}>{text1}</Text>
      </View>
      <View style={styles.centered}>
        {icon2 && <Image source={icon2} style={[styles.icon]} />}
        <Text style={styles.detailTxt}>{text2}</Text>
      </View>
    </View>
  );
};
const TextRow = ({ text1, text2 = '', text3 = '' }) => {
  return (
    <View style={styles.ImageTextRowContainer}>
      <View style={styles.centered}>
        <Text style={styles.detailTxt}>{text1} •</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.detailTxt}>{text2} {(text3!='')?'•':''}</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.detailTxt}>{text3}</Text>
      </View>
    </View>
  );
};

const RoomServiceItem = ({ icon, text }) => {
  let extention = icon.split('.');
  if (
    extention[extention.length - 1] == 'svg' ||
    extention[extention.length - 1] == 'SVG'
  ) {
    return (
      <View style={styles.centered}>
        <View style={{width:35}}>
        <SvgUri marginRight={RFValue(7)} uri={icon} />
        </View>
        <Text style={styles.detailTxt}>{`${text}`}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.centered}>
        <View style={{width:35}}>
        <FastImage source={{ uri: icon }} style={{ width: 20, height: 20, marginRight: RFValue(7) }} />
        </View>
        <Text style={styles.detailTxt}>{`${text}`}</Text>
      </View>
    );
  }
};

const RoomDetailBox = ({ room, setNoOfRooms, NoOfRooms, screenName }) => {

  // let photos = [];
  // let services = []
  // console.log("photos", room.package_gallery);
  // if(room?.photos){
  //   photos = room?.photos;
  //   services = room?.room_services;
  // }else if(room?.package_gallery){
  //   photos = room.package_gallery;
  //   services = room?.package_services;
  // }
  // console.log("photos array => ", photos);
  return (
    <View>
      {
        (room?.photos.length) ? RenderItem(room?.photos) : RenderItem([{ file: room.background_image }])
      }

      <>
        <View style={styles.roomNameContainer}>
          {/* onTouchEnd={() => RootNav.navigate(Routes.RoomDetail, {room})}
           style={styles.roomNameContainer} */}
          <Text style={styles.roomName}>{room.aptr_name}</Text>

          {/* <View
              style={{
                flexDirection: 'row',
                marginTop: RFValue(-5),
                alignItems: 'center',
              }}>
              <Text style={styles.detailsBtn}>Details</Text>
              <Image source={require('../assets/cright.png')} />
            </View> */}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', lineHeight: 0 }}>
          
          <TextRow
            text1={room.capacity + ' guests'}
            text2={room.no_of_bedrooms + ' bedroom'}
            text3={room.no_of_bathrooms + ' bathroom'}
          />
          <TextRow
            text1={room.bed_type}
            text2={room.covered_area}
          />
        </View>
        {/* <Text style={styles.description}>{room.small_description}</Text> */}
        <View
          style={{
            marginTop: RFValue(0),
            marginBottom: RFValue(16),
          }}>
          <FlatList new comment
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            //numColumns={1}
            showsHorizontalScrollIndicator={false}
            data={room?.room_services}
            renderItem={({ item }) => (
              <View
                style={{
                  marginLeft: RFValue(12),
                  marginVertical: RFValue(6),
                }}>

                <RoomServiceItem
                  icon={item?.service?.image}
                  text={item.service.title}
                />
              </View>
            )}
          />
        </View>
      </>

      {room?.photos && (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: RFValue(8),
              marginBottom: RFValue(12),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {screenName != 'RoomScreen' && (
              <>
                <Text style={styles.add}> Select Rooms: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() =>
                      NoOfRooms > 1 ? setNoOfRooms(NoOfRooms - 1) : undefined
                    }>
                    <Image
                      source={require('../assets/mins.png')}
                      style={styles.btn}
                    />
                  </TouchableOpacity>

                  <Text style={styles.numberOfRooms}>{NoOfRooms}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      setNoOfRooms(NoOfRooms < 3 ? NoOfRooms + 1 : NoOfRooms)
                    }>
                    <Image
                      source={require('../assets/plus.png')}
                      style={styles.btn}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default RoomDetailBox;

const styles = StyleSheet.create({
  roomNameContainer: {
    flexDirection: 'row',
    marginBottom: RFValue(15),
    justifyContent: 'space-between',
    marginHorizontal: RFValue(13),
    alignItems: 'center',
    marginTop: RFValue(20),
  },

  icon: {
    marginRight: RFValue(7),
  },

  ImageTextRowContainer: {
    flexDirection: 'row',
    marginHorizontal: RFValue(10),
    marginBottom: RFValue(13),
    // justifyContent: 'space-between',
  },

  bottomContainer: {
    flexDirection: 'row',
    marginTop: RFValue(7),
    marginBottom: RFValue(27),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: greyPrimary,
    justifyContent: 'space-between',
  },

  price: {
    marginLeft: RFValue(20),
    marginTop: RFValue(3),
    color: greyPrimary,
    fontFamily: PFbold,
    fontSize: RFValue(33),
  },

  pkr: {
    marginTop: RFValue(10),
    marginLeft: RFValue(6),
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },

  bookNow: {
    fontFamily: OSsemiBold,
    color: '#fff',
    fontSize: RFValue(18),
  },

  detailsBtn: {
    color: greySecondary,
    fontSize: RFValue(15),
  },

  roomName: {
    fontFamily: PFregular,
    fontSize: RFValue(25),
    marginTop: RFValue(-17),
  },

  detailTxt: {
    fontFamily: OSregular,
    fontSize: RFValue(14),
  },

  details: {
    fontFamily: OSregular,
    fontSize: RFValue(15),
    marginHorizontal: RFValue(16),
    marginBottom: RFValue(14),
  },
  add: {
    marginRight: RFValue(6),
    fontFamily: OSregular,
    fontSize: RFValue(16),
  },

  btn: {
    marginHorizontal: RFValue(17),
  },

  numberOfRooms: {
    marginTop: RFValue(-10),
    marginHorizontal: RFValue(5),
    fontSize: RFValue(29),
    fontFamily: PFregular,
    color: 'black',
  },
  centered: { flexDirection: 'row', alignItems: 'center', marginRight: 5 },

  description: {
    paddingHorizontal: RFValue(14),
    fontFamily: OSregular,
    fontSize: RFValue(13),
    marginBottom: RFValue(17),
  },
});
